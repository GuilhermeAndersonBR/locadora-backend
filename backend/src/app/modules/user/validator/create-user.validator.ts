import Status from "../../../../core/enums/status.enum.js";
import { AppError } from "../../../../core/errors/app-error.js";
import ValidationError from "../../../../core/errors/validation.error.js";
import EmailValidator from "../../../../core/validators/email.validator.js";
import CreateUserDTO from "../dto/create-user.dto.js";

export default class CreateUserValidator {

    public validate(
        data: CreateUserDTO
    ): CreateUserDTO {

        const { name, cpf, email, password, role } = data;

        if(!name.trim()) 
            throw new ValidationError(
                "O campo 'name' é obrigatório",
                "NAME_IS_REQUIRED"
            );

        if(!cpf.trim()) 
            throw new ValidationError(
                "O campo 'cpf' é obrigatório",
                "CPF_IS_REQUIRED"
            );

        if(!email.trim()) 
            throw new ValidationError(
                "O campo 'email' é obrigatório",
                "EMAIL_IS_REQUIRED"
            );

        if(!EmailValidator.validate(email))
            throw new ValidationError(
                "O campo 'email' é inválido",
                "INVALID_EMAIL"
            );

        if(!password.trim()) 
            throw new ValidationError(
                "O campo 'password' é obrigatório",
                "PASSWORD_IS_REQUIRED"
            );

        if(cpf.length !== 11)
            throw new ValidationError(
                "O campo 'cpf' deve ter no 11 caracteres",
                "INVALID_CPF"
            );

        if(password.length < 8)
            throw new ValidationError(
                "O campo 'password' deve ter no mínimo 8 caracteres",
                "INVALID_PASSWORD"
            );
        
        if(!role.trim()) 
            throw new ValidationError(
                "O campo 'role' é obrigatório",
                "ROLE_IS_REQUIRED"
            );

        return {
            name: name.trim(),
            cpf: cpf.trim(),
            email: email.trim(),
            password,
            role: role.trim()
        };

    };

};