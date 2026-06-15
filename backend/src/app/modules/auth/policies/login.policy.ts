import UnauthorizedError from "../../../../core/errors/unauthorized.error.js";
import PasswordService from "../../../../core/security/password.service.js";
import { GetUserDTO } from "../../user/dto/get-user.dto.js";
import UserRepository from "../../user/repository/user.repository.js";
import { LoginDTO } from "../dto/login.dto.js";

export default class LoginPolicy {

    public constructor(
        private readonly repository: UserRepository
    ) {};
    
    public async validate(
        data: LoginDTO
    ): Promise<GetUserDTO> {

        const { email, password } = data;

        const [ userByEmail ] = 
            (await this.repository.findByEmail(email)) as
            Array<GetUserDTO>;

        if(!userByEmail) 
            throw new UnauthorizedError(
                "Credenciais inválidas",
                "INVALID_CREDENTIALS"
            );

        const valid = await PasswordService.verify(
            password, 
            userByEmail.password_hash);

        if(!valid)
            throw new UnauthorizedError(
                "Credenciais inválidas",
                "INVALID_CREDENTIALS"
            );

        return userByEmail;

    };

};