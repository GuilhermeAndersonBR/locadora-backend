import app from "./app.js";
import dotenv from "dotenv";
import Log from "./core/messages/log.js";
import logMessage from "../data/logMessage.json" with { type: "json"};

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    
    Log.info(
        logMessage.PORT_LOG,
        PORT
    );

});