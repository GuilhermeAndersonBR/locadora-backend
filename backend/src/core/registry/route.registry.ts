import { Route } from "../types/route.type.js";

export default class RouteRegistry {

    private static _registries: Array<Route> = [];

    public static register(route: Route): void {

        this._registries.push(route);
    
    };

    public static getAll(): Array<Route> { 
    
        return this._registries;

    };

    public static clear(): void { 
    
        this._registries = [];

    };

};