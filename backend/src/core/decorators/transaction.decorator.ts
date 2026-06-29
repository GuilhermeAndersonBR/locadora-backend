import { Request, Response } from "express";
import { transaction } from "../config/transaction.config.js";

export default function Transaction() {
    
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {

        const originalMethod = descriptor.value;

        descriptor.value = async function(
            ...args: Array<any>
        ) {

            await transaction(() => originalMethod.apply(
                this,
                args
            ));

        };

        return descriptor;

    };

};