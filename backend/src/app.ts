import express from "express";
import cors from "cors";

import "./app/modules";
import { bootstrap } from "./core/http/bootstrap.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json());

app.use(
    "/uploads",
    express.static("uploads")
);

await bootstrap(app);

export default app;