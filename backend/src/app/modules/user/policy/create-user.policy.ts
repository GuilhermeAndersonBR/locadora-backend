import ConflictError from "../../../../core/errors/conflict.error.js";
import CreateUserDTO from "../dto/create-user.dto.js";
import { GetUserDTO } from "../dto/get-user.dto.js";
import UserRepository from "../repository/user.repository.js";

export default class CreateUserPolicy {

    public static readonly PASSWORD_MIN_LENGTH = 8;

    public constructor(
        private repository: UserRepository
    ) {};

    public async validate(
        data: CreateUserDTO
    ): Promise<void> {

        const { cpf, email } = data;

        const userByEmail = 
            (await this.repository.findByEmail(email)) as 
            Array<GetUserDTO>;

        if(userByEmail.length !== 0) 
            throw new ConflictError(
                "Já existe um usuário com o email informado",
                "EMAIL_ALREADY_EXISTS"
            );

        const userByCPF = 
            (await this.repository.findByCPF(cpf)) as 
            Array<GetUserDTO>;

        if(userByCPF.length !== 0) 
            throw new ConflictError(
                "Já existe um usuário com o CPF informado",
                "CPF_ALREADY_EXISTS"
            );

    };

};