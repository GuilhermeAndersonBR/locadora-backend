import ModuleRegistry from "../../../core/registry/module.registry.js";

ModuleRegistry.register(async () => {

    await import("./controller/user.controller.js");

});