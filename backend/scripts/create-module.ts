import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

function createFolder(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function createFile(filePath: string, content: string) {
    fs.writeFileSync(filePath, content);
}

(async () => {

    const moduleName = await ask("Nome do módulo: ");
    const className = capitalize(moduleName);

    const basePath = path.join(
        process.cwd(), 
        "src/app/modules", 
        moduleName
    );

    const folders = [
        "controller",
        "service",
        "repository",
        "dto",
        "validators",
        "policies"
    ];

    folders.forEach(folder => {
        createFolder(path.join(basePath, folder));
    });

    // Controller
    createFile(
        path.join(basePath, "controller", `${moduleName}.controller.ts`),
`import { Request, Response } from "express";

export default class ${capitalize(moduleName)}Controller {

    public async example(req: Request, res: Response) {
        return res.json({ message: "${moduleName} controller working" });
    }

}
`
    );

    // Service
    createFile(
        path.join(basePath, "service", `${moduleName}.service.ts`),
`export default class ${capitalize(moduleName)}Service {

    constructor(
        private readonly repository: any
    ) {}

}
`
    );

    // Repository
    createFile(
        path.join(basePath, "repository", `${moduleName}.repository.ts`),
`export default class ${capitalize(moduleName)}Repository {

    // database operations here

}
`
    );

    // DTO
    createFile(
        path.join(basePath, "dto", `${moduleName}.dto.ts`),
`export interface ${capitalize(moduleName)}DTO {

}
`
    );

    
    createFile(
        path.join(basePath, `${moduleName}.module.ts`),
`import "./controller/${moduleName}.controller.js";
`
    );

    console.log(`\nMódulo "${moduleName}" criado com sucesso!\n`);

    rl.close();

})();

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}