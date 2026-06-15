import fs from "fs";
import path from "path";
import { db } from "../app/config/database.js";

(async function runSchema(): Promise<void> {

    const schemaPath = path.join(
        process.cwd(),
        "src/database/schema"
    );

    const files = fs
        .readdirSync(schemaPath)
        .filter(f => f.endsWith(".sql"))
        .sort();

    console.log("Running database schema...\n");

    for (const file of files) {

        try {

            const filePath = path.join(schemaPath, file);
            const sql = fs.readFileSync(filePath, "utf-8");

            console.log(`→ ${file}`);

            await db.query(sql);

        } catch(error) {

            console.error(error);

            continue;

        };
    
    };

    console.log("\nDatabase schema loaded!\n");

})();