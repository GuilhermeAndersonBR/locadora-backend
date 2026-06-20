import { CreateCategoryDTO } from "../dto/create-category.dto.js";
import CategoryRepository from "../repository/category.repository.js";
import CreateCategoryValidator from "../validators/create-category.validator.js";

export default class CategoryService {

    public constructor(
        private readonly repository = new CategoryRepository(),
        private readonly validator = new CreateCategoryValidator(),
    ) {};

    public async getAll() {
        return this.repository.getAll();
    };

    public async create(data: CreateCategoryDTO) {

        const { name, description } = this.validator.validate(data);

        const category = await this.repository.create({
            name,
            description
        });

        return category;

    };

};