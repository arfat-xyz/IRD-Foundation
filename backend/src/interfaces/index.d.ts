import type { Database } from "sqlite";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      db: Database;
    }
  }
}
