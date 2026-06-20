import UserRepository from "../repository/user.repository.js";
import CreateUserDTO from "../dto/create-user.dto.js";
import CreateUserPolicy from "../policy/create-user.policy.js";
import PasswordService from "../../../../core/security/password.service.js";

export default class UserService {

    private readonly policy;

    public constructor(
        private readonly repository = new UserRepository()
    ) {

        this.policy = new CreateUserPolicy(this.repository);

    };

    public async getAll() {

        return this.repository.getAll();

    };

    public async create(
        data: CreateUserDTO
    ): Promise<Record<string, unknown>> { 

        const { 
            name, 
            cpf, 
            email, 
            password, 
            role 
        } = data;

        await this.policy.validate(data);

        const password_hash = await PasswordService.hash(
            password
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