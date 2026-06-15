import fs from "fs";
import path from "path";

const modulesDir = path.resolve("src/app/modules");
const outputFile = path.join(modulesDir, "index.ts");

function getModules(): Array<string> {
    
    const entries = fs.readdirSync(modulesDir, { withFileTypes: true });

    return entries
        .filter(e => e.isDirectory())
        .map(dir => dir.name);

};

function generate() {

    const modules = getModules();

    const imports = modules.map(
        mod => `import "./${mod}/${mod}.module.js";`
    );

    const content = [
        "// AUTO-GENERATED FILE - DO NOT EDIT",
        ...imports,
        ""
    ].join("\n");

    fs.writeFileSync(outputFile, content);

};

generate();