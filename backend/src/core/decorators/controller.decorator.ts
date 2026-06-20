import "reflect-metadata";
import ControllerRegistry from "../registry/controller.registry.js";
import Path from "../routes/path.js";
import Log from "../messages/log.js";
import logMessage from "../../../data/logMessage.json" with { type: "json"};

export default function Controller(controllerPath: string) {
    
    const path = new Path(controllerPath).value;

    return(
        target: any
    ): void => {

        Log.info(
            logMessage.MODIFYING_CONTROLLER,
            target.name  
        );

        target.__path__ = path;

        ControllerRegistry.register(target);

    };

};