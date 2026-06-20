import { QueryResult } from "mysql2";
import { db } from "../../../config/database.js";
import { CreateCategoryDTO } from "../dto/create-category.dto.js";

export default class CategoryRepository {

    public async getAll(): Promise<QueryResult> {
        
        const [ rows ] = await db.query(
            "SELECT * FROM categories"
        );

        return rows;

    };

    public async getById(id: number): Promise<QueryResult> {
        
        const [ rows ] = await db.query(
            "SELECT * FROM categories WHERE id = ?", 
            [ id ]
        );

        return rows;

    };

    public async create(
        data: CreateCategoryDTO
    ): Promise<Record<string, unknown>> {

        const { name, description } = data;

        const [ result ]: any = await db.query(
            "INSERT INTO categories (name, description) VALUES (?, ?)", 
            [ name, description ]
        );

        return {
            id: result.insertId,
            name,
            description
        };

    };

};
