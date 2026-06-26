import { Executor } from "./executor.type.js";

export type TransactionStore = {
    executor: Executor;
    isTransaction: boolean;
};