import z from "zod";
import { GetCategoryResponseSchema } from "./get-category.response.js";

export const GetAllCategoryResponseSchema = z.array(
    GetCategoryResponseSchema
);

export type GetAllCategoryResponse = z.infer<
    typeof GetAllCategoryResponseSchema
>;
