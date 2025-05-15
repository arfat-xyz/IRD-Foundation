import sqlite3 from "sqlite3";
import { open } from "sqlite";

import path from "path";

export const openDb = async () => {
  return open({
    filename: path.resolve(__dirname, "./dua_main.sqlite"),
    driver: sqlite3.Database,
  });
};
