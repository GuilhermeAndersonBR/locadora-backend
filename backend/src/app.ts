import express from "express";
import cors from "cors";

import "./app/modules";
import { bootstrap } from "./core/http/bootstrap.js";

const app = express();

app.use(cors());
app.use(express.json());

await bootstrap(app);

export default app;