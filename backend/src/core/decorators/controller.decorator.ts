import ControllerRegistry from "../registry/controller.registry.js";

export default function Controller(constructor: new (...args: Array<any>) => any) {
    
    ControllerRegistry.register(constructor);
    
};