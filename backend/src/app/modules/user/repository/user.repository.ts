import { QueryResult } from "mysql2";
import PasswordService from "../../../../core/security/password.service.js";
import { db } from "../../../config/database.js";
import CreateUserDTO from "../dto/create-user.dto.js";

export default class UserRepository {

    public async getAll(): Promise<QueryResult> {

        const [ rows ] = await db.query("SELECT * FROM users");

        return rows;

    };

    public async findByEmail(
        email: string
    ): Promise<QueryResult> {
        
        const [ rows ] = await db.query(
            "SELECT * FROM users WHERE email = ?", 
            [ email ]
        );

        return rows;

    };

    public async findByCPF(
        cpf: string
    ): Promise<QueryResult> {
        
        const [ rows ] = await db.query(
            "SELECT * FROM users WHERE cpf = ?", 
            [ cpf ]
        );

        return rows;

    };

    public async create(
        data: CreateUserDTO
    ): Promise<Record<string, unknown>> {

        const { name, cpf, email, password, role } = data;

        console.log(
            name, 
            cpf,
            email, 
            password, 
            role
        );

        const [ result ]: any = await db.query(
            "INSERT INTO users (name, cpf, email, password_hash, role) VALUES (?, ?, ?, ?, ?)", 
            [ name, cpf, email, password, role ]
        );

        return {
            id: result.insertId,
            name,
            email
        };


    };

};