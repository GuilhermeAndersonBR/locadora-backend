import { db } from "../../app/config/database.js";
import { TransactionContext } from "./transaction-context.config.js";

export async function transaction<T>(
    callback: () => Promise<T>
): Promise<T> {

    const connection = 
        await db.getConnection();

    let shouldRollback = true;
    
    try {

        await connection.beginTransaction();

        const result = 
            await TransactionContext.run(
                {
                    executor: connection,
                    isTransaction: true
                },
                callback
            );
        
        await connection.commit();

        shouldRollback = false;

        return result;

    } catch (error) {

        if (!shouldRollback)
            await connection.rollback();

        throw error;

    } finally {

        connection.release();

    };

};