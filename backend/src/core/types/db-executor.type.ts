import { Pool, PoolConnection } from "mysql2/promise";

export type DBExecutor = Pool | PoolConnection;