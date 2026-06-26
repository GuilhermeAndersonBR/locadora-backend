import { Request } from "express";
import z from "zod";

export type TypedRequest<TSchema extends z.ZodTypeAny> =
    Omit<Request, "body"> & {
        body: z.infer<TSchema>;
    };