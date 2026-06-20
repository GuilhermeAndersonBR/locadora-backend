import JWTService from "../../../../core/security/jwt.service.js";
import UserRepository from "../../user/repository/user.repository.js";
import { LoginDTO } from "../dto/login.dto.js";
import LoginPolicy from "../policy/login.policy.js";

export default class AuthService {

    private readonly policy: LoginPolicy;
    
    public constructor(
        private readonly repository = new UserRepository(),
    ) {
        this.policy = new LoginPolicy(this.repository);
    };

    public async login(
        data: LoginDTO
    ): Promise<string> {

        const user = await this.policy.validate(data);

        return JWTService.sign({
            id: user.id,
            role: user.role
        });

    };

};
