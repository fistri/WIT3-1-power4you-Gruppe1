import request from "supertest";
import { expect } from "chai";
import app from "../index.js";
import "mocha";

describe("API-Tests", () => {
  const agent = request.agent(app);

  describe("GET /api/customer/:User_ID", () => {
    it("Should return 400 if the user ID is not valid", async () => {
      const res = await agent.get("/api/customer/abc");

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Wrong User_ID.");
    });

    it("Should return 404 if the user ID does not exist", async () => {
      const res = await agent.get("/api/customer/999999999");

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Customer not found.");
    });
  });

  describe("GET /api/solarmodule/:customerNumber", () => {
    it("Should return 400 if the customer number is not valid", async () => {
      const res = await agent.get("/api/solarmodule/abc");

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid customer number.");
    });

    it("Should return an array if the customer number is valid", async () => {
      const res = await agent.get("/api/solarmodule/1");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("GET /api/solarmodule/:modulnummer/power", () => {
    it("Should return 400 if the module number is not valid", async () => {
      const res = await agent.get("/api/solarmodule/abc/power");

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid module number.");
    });

    it("Should return 400 if the time range is invalid", async () => {
      const res = await agent
        .get("/api/solarmodule/1/power")
        .query({ from: "invalid-date", to: "also-invalid" });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Invalid time range.");
    });

    it("Should return a result object if the module number is valid", async () => {
      const res = await agent.get("/api/solarmodule/1/power");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      res.body.forEach((entry: unknown) => {
        expect(entry).to.have.property("Modulnummer", 1);
        expect(entry).to.have.property("Timestamp");
        expect(entry).to.have.property("Power_Out");
      });
    });
  });

  describe("POST /api/login", () => {
    it("Should return 400 if credentials are missing", async () => {
      const res = await agent.post("/api/login").send({ username: "test" });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Missing credentials");
    });

    it("Should return 401 if credentials are invalid", async () => {
      const res = await agent
        .post("/api/login")
        .send({ username: "falsch", password: "falsch" });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message", "Invalid credentials");
    });

    it("Should log in successfully with correct credentials", async () => {
      const res = await agent
        .post("/api/login")
        .send({ username: "testuser", password: "testuser" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("isLoggedIn", true);
      expect(res.body).to.have.property("user");
    });
  });

  describe("POST /api/logout", () => {
    it("Should end the session and return isLoggedIn as false", async () => {
      await agent
        .post("/api/login")
        .send({ username: "testuser", password: "testuser" });

      const res = await agent.post("/api/logout");

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("isLoggedIn", false);
    });
  });
});