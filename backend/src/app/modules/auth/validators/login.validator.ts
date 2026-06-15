import ValidationError from "../../../../core/errors/validation.error.js";
import { LoginDTO } from "../dto/login.dto.js";

export default class LoginValidator {

    public validate(
        data: LoginDTO
    ): void {
        
        const { email, password } = data;

        if(!email.trim())
            throw new ValidationError(
                "O campo 'email' é obrigatório",
                "EMAIL_IS_REQUIRED"
            );

        if(!password.trim())
            throw new ValidationError(
                "O campo 'password' é obrigatório",
                "PASSWORD_IS_REQUIRED"
            );
        
    }

};