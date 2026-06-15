import UserRepository from "../repository/user.repository.js";
import CreateUserDTO from "../dto/create-user.dto.js";
import CreateUserValidator from "../validator/create-user.validator.js";
import ConflictError from "../../../../core/errors/conflict.error.js";
import CreateUserPolicy from "../policy/create-user.policy.js";
import PasswordService from "../../../../core/security/password.service.js";

export default class UserService {

    private readonly policy;

    public constructor(
        private readonly repository = new UserRepository(),
        private readonly validator = new CreateUserValidator(),
    ) {

        this.policy = new CreateUserPolicy(this.repository);

    };

    public async getAll() {

        return this.repository.getAll();

    };

    public async create(
        data: CreateUserDTO
    ): Promise<Record<string, unknown>> { 

        const { name, cpf, email, role } = data;

        const treatedData = this.validator.validate(data);

        await this.policy.validate(treatedData);

        const password_hash = await PasswordService.hash(
            treatedData.password
        );

        return this.repository.create({
            name, 
            cpf, 
            email, 
            password: password_hash, 
            role
        });

    };

};