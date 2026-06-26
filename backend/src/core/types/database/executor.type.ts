import { Pool, PoolConnection } from "mysql2/promise";

export type Executor = Pool | PoolConnection;