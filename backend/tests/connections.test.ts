import { describe, test, expect } from "vitest";
import request from "supertest";

import pool from "../src/config/database.js";
import app from "../src/app.js";

describe("Testing the connections...", () => {

    test("Should connect to database", async () => {
        
        const response = pool.query("SELECT 1 ");

        expect(response).toBeDefined();
    
    });

    test("Should return health check", async () => {
        
        const response = await request(app).get("/health");
        
        expect(response.status).toBe(200);
        
        expect(response.body.status).toBe("ok");

    });

});