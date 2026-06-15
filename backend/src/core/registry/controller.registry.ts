export default class ControllerRegistry {

    public static _registries: Map<any, any> = new Map();

    public static register(Controller: any) {

        if(this._registries.has(Controller.name)) return;

        this._registries.set(Controller, new Controller());

    };

    public static get(Controller: any) {

        return this._registries.get(Controller);

    };

    public static getAll(): Array<new (...args: Array<any>) => any> { 

        return Array.from(this._registries.values());

    };

    public static clear(): void { 

        this._registries = new Map();

    };

};