import { create } from "zustand";
import { axiosInstance, IApiResponse } from "../axios-instance";
import { ICategoryWithSubcategories } from "../interfaces/category";
import { debounce, DebouncedFunc } from "lodash";

interface SidebarState {
  showSubCategories: number | null;
  duaId: number | null;
  showDuasList: number | null;
  categoryWithSubCategories: ICategoryWithSubcategories[];
  searchTerm: string;
  modalSearchTerm: string;
  isLoading: boolean;
  error: string | null;
  currentCategory: ICategoryWithSubcategories | null; // New field

  // Setters
  setShowSubCategories: (id: number | null) => void;
  setDuaId: (id: number | null) => void;
  setShowDuasList: (id: number | null) => void;
  setSearchTerm: (searchTerm: string) => void;
  setModalSearchTerm: (searchTerm: string) => void;
  setCategoryWithSubCategories: (
    categories: ICategoryWithSubcategories[]
  ) => void;

  // Async action
  initializeCategories: (searchValue?: string) => Promise<void>;
  initializeCategoriesForModal: (searchValue?: string) => Promise<void>;

  // Reset
  resetAll: () => void;

  debouncedSearch: DebouncedFunc<(term: string) => void>;
  debouncedSearchForModal: DebouncedFunc<(term: string) => void>;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  showSubCategories: null,
  duaId: null,
  showDuasList: null,
  categoryWithSubCategories: [],
  isLoading: false,
  error: null,
  currentCategory: null,
  searchTerm: "",
  modalSearchTerm: "",

  // Synchronous setters
  setShowSubCategories: (id) => {
    const { categoryWithSubCategories } = get();
    const currentCat =
      categoryWithSubCategories.find((cat) => cat?.cat_id === id) || null;

    set({
      showSubCategories: id,
      currentCategory: currentCat,
    });
  },

  setDuaId: (id) => set({ duaId: id }),
  setSearchTerm: (searchTerm) => set({ searchTerm: searchTerm }),
  setModalSearchTerm: (searchTerm) => set({ modalSearchTerm: searchTerm }),
  //   setSearchTerm: (searchTerm: string) => {
  //   // Only allow a-z, A-Z, 0-9, and spaces
  //   const cleanedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');
  //   set({ searchTerm: cleanedSearchTerm });
  // },

  setShowDuasList: (id) => set({ showDuasList: id }),

  setCategoryWithSubCategories: (categories) => {
    const { showSubCategories } = get();
    const currentCat = showSubCategories
      ? categories.find((cat) =>
          cat.subcategories.some((sub) => sub.subcat_id === showSubCategories)
        ) || null
      : null;

    set({
      categoryWithSubCategories: categories,
      currentCategory: currentCat,
    });
  },

  // Async initialization
  initializeCategories: async (searchValue: string = "") => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get<
        IApiResponse<ICategoryWithSubcategories[]>
      >(`/category${searchValue ? `?searchTerm=${searchValue}` : ""}`);
      if (data?.success && Array.isArray(data.data)) {
        const firstCategory = data.data[0] || null;
        const firstSubcategory = firstCategory?.subcategories[0] || null;

        set({
          categoryWithSubCategories: data.data,
          isLoading: false,
          showDuasList: firstCategory?.cat_id || null,
          showSubCategories: firstSubcategory?.subcat_id || null,
          currentCategory: firstCategory,
        });
      }
    } catch (error) {
      console.error("Initialization error:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to load categories",
        isLoading: false,
      });
    }
  },
  initializeCategoriesForModal: async (searchValue: string = "") => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get<
        IApiResponse<ICategoryWithSubcategories[]>
      >(`/category${searchValue ? `?searchTerm=${searchValue}` : ""}`);
      if (data?.success && Array.isArray(data.data)) {
        const firstCategory = data.data[0] || null;
        const firstSubcategory = firstCategory?.subcategories[0] || null;

        set({
          categoryWithSubCategories: data.data,
          isLoading: false,
        });
        if (searchValue !== "") {
          set({
            showDuasList: firstCategory?.cat_id || null,
            showSubCategories: firstSubcategory?.subcat_id || null,
            currentCategory: firstCategory,
          });
        }
      }
    } catch (error) {
      console.error("Initialization error:", error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to load categories",
        isLoading: false,
      });
    }
  },

  // Reset all state
  resetAll: () =>
    set({
      showSubCategories: null,
      duaId: null,
      showDuasList: null,
      categoryWithSubCategories: [],
      isLoading: false,
      error: null,
      currentCategory: null,
    }),

  debouncedSearch: debounce((term: string) => {
    get().initializeCategories(term);
  }, 1000), // 1000ms = 1 second
  debouncedSearchForModal: debounce((term: string) => {
    get().initializeCategoriesForModal(term);
  }, 1000), // 1000ms = 1 second
}));
