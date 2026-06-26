import { AsyncLocalStorage } from "async_hooks";
import { TransactionStore } from "../types/database/transaction-store.type.js";

export const TransactionContext = 
    new AsyncLocalStorage<TransactionStore>();