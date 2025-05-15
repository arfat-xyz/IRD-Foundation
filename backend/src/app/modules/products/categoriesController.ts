import { Request, Response } from "express";
import httpStatus from "http-status";
import { ICategory, IDua, ISubCategory } from "./categoryInterface";
import catchAsync from "../../../shared/cacheAsync";
import sendResponse from "../../../shared/sentResponse";
import pick from "../../../shared/pick";
import { duaFilterableFields, duaSearchableFields } from "./productConstant";
import QueryString from "qs";

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const db = req["db"];

  const { searchTerm }: { searchTerm?: string } = req.query;

  // Base query for categories and subcategories
  let query = `
    SELECT 
      c.id AS id,
      c.cat_id AS cat_id,
      c.cat_name_en,
      c.cat_name_bn,
      c.no_of_subcat,
      c.no_of_dua,
      c.cat_icon,
      sc.id AS subcat_id,
      sc.subcat_name_en,
      sc.subcat_name_bn,
      sc.no_of_dua
    FROM category c
    LEFT JOIN sub_category sc ON sc.cat_id = c.id
  `;

  let rows: Array<
    ICategory & {
      subcat_id: number | null;
      subcat_name_en: string | null;
      subcat_name_bn: string | null;
      no_of_dua: number | null;
    }
  > = await db.all(query);

  // Add search condition if searchTerm exists
  if (searchTerm) {
    // Allow letters (English, Arabic, Bengali), numbers, spaces, and basic punctuation
    const sanitizedSearchTerm = searchTerm.replace(
      /[^a-zA-Z0-9\u0600-\u06FF\u0980-\u09FF '"`-]/g,
      "",
    );

    // Use parameterized query to prevent SQL injection
    query += ` WHERE c.cat_name_en LIKE ? OR c.cat_name_bn LIKE ?`;
    const searchPattern = `%${sanitizedSearchTerm}%`;
    rows = await db.all(query, [searchPattern, searchPattern]);
  } else {
    rows = await db.all(query);
  }

  // Second query to get all duas with all required fields
  const duasRows = await db.all(`
    SELECT 
      id,
      cat_id,
      subcat_id,
      dua_id,
      dua_name_bn,
      dua_name_en,
      top_bn,
      top_en,
      dua_arabic,
      dua_indopak,
      clean_arabic,
      transliteration_bn,
      transliteration_en,
      translation_bn,
      translation_en,
      bottom_bn,
      bottom_en,
      refference_bn,
      refference_en,
      audio
    FROM dua
  `);

  // Create a map for duas grouped by subcategory_id
  const duasMap: Record<number, IDua[]> = {};

  for (const dua of duasRows) {
    if (!duasMap[dua.subcat_id]) {
      duasMap[dua.subcat_id] = [];
    }
    duasMap[dua.subcat_id].push({
      id: dua.id,
      cat_id: dua.cat_id,
      subcat_id: dua.subcat_id,
      dua_id: dua.dua_id,
      dua_name_bn: dua.dua_name_bn,
      dua_name_en: dua.dua_name_en,
      top_bn: dua.top_bn,
      top_en: dua.top_en,
      dua_arabic: dua.dua_arabic,
      dua_indopak: dua.dua_indopak,
      clean_arabic: dua.clean_arabic,
      transliteration_bn: dua.transliteration_bn,
      transliteration_en: dua.transliteration_en,
      translation_bn: dua.translation_bn,
      translation_en: dua.translation_en,
      bottom_bn: dua.bottom_bn,
      bottom_en: dua.bottom_en,
      refference_bn: dua.refference_bn,
      refference_en: dua.refference_en,
      audio: dua.audio,
    });
  }

  // Process categories and subcategories
  const categoryMap: Record<
    number,
    ICategory & {
      subcategories: Array<
        ISubCategory & {
          duas: IDua[];
        }
      >;
    }
  > = {};

  for (const row of rows) {
    const {
      id,
      cat_id,
      cat_name_en,
      cat_name_bn,
      no_of_subcat,
      no_of_dua,
      cat_icon,
      subcat_id,
      subcat_name_en,
      subcat_name_bn,
    } = row;

    if (!categoryMap[id]) {
      categoryMap[id] = {
        id,
        cat_id,
        cat_name_bn,
        cat_name_en,
        no_of_subcat,
        no_of_dua,
        cat_icon,
        subcategories: [],
      };
    }

    if (subcat_id) {
      const subcategory: ISubCategory & { duas: IDua[] } = {
        id: subcat_id,
        cat_id: id,
        subcat_id: subcat_id,
        subcat_name_en: subcat_name_en || "",
        subcat_name_bn: subcat_name_bn || "",
        no_of_dua: row.no_of_dua || 0,
        duas: duasMap[subcat_id] || [],
      };
      categoryMap[id].subcategories.push(subcategory);
    }
  }

  const result = Object.values(categoryMap);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories with subcategories and duas fetched successfully.",
    meta: null,
    data: result,
  });
});
const getAllDuas = catchAsync(async (req: Request, res: Response) => {
  const db = req["db"];

  const filters = pick(req.query, duaFilterableFields);
  const { cat_id, subcat_id, searchTerm } = filters;

  let baseQuery = `SELECT * FROM dua`;
  const whereClauses: string[] = [];
  const params: (string | number | QueryString.ParsedQs)[] = [];

  // Filter by cat_id
  if (cat_id) {
    whereClauses.push("cat_id = ?");
    params.push(cat_id as string);
  }

  // Filter by subcat_id
  if (subcat_id) {
    whereClauses.push("subcat_id = ?");
    params.push(subcat_id as string);
  }

  // Search across searchable fields
  if (searchTerm) {
    const searchConditions = duaSearchableFields.map(
      field => `${field} LIKE ?`,
    );
    whereClauses.push(`(${searchConditions.join(" OR ")})`);
    for (let i = 0; i < duaSearchableFields.length; i++) {
      params.push(`%${searchTerm}%`);
    }
  }

  if (whereClauses.length > 0) {
    baseQuery += ` WHERE ${whereClauses.join(" AND ")}`;
  }

  const duas = await db.all(baseQuery, params);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Duas fetched successfully.",
    meta: null,
    data: duas,
  });
});

export const CategoryController = { getAllCategories, getAllDuas };
