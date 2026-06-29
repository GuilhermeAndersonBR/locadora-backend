import { Request } from "express";

export type TypedRequest<T extends Record<string, unknown>> =
    Omit<Request, "body"> & {
        body: T;
    };

export type TypedFileRequest<T extends Record<string, unknown>> =
    Omit<Request, "body" | "file"> & {
        body: T;
        file: Express.Multer.File
    };