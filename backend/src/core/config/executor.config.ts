import { db } from "../../app/config/database.js";
import { Executor } from "../types/database/executor.type.js";
import { TransactionContext } from "./transaction-context.config.js";

export function getExecutor(): Executor {

    const store = 
        TransactionContext.getStore();

    return store?.executor ?? db;

};