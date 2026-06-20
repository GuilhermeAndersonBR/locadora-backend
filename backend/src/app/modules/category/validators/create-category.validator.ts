import ValidationError from "../../../../core/errors/validation.error.js";
import { IValidator } from "../../../../core/interfaces/validator.interface.js";
import { CreateCategoryDTO } from "../dto/create-category.dto.js";

export default class CreateCategoryValidator implements IValidator<CreateCategoryDTO> {
    
    public validate(
        data: CreateCategoryDTO
    ): CreateCategoryDTO {
    
        const { name, description } = data;

        if(!name.trim()) 
            throw new ValidationError(
                "O campo 'name' é obrigatório",
                "NAME_IS_REQUIRED"
            );
        
        return data;
        
    };

};