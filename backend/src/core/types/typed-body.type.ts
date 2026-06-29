import z from "zod";

export type TypedBody<T extends Record<string, unknown>> = T;

export type TypedFileBody<T extends Record<string, unknown>> = T & {
    file: Express.Multer.File
};