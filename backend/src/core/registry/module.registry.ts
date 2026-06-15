export default class ModuleRegistry {

    private static _modules: Array<() => Promise<void>> = [];

    public static register(module: () => Promise<void>) {

        this._modules.push(module);

    };

    public static async load() {

        for (const module of this._modules) 
            await module();

    };

};