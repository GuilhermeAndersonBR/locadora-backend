import z from "zod";

export type TypedBody<TSchema> = z.infer<TSchema>;