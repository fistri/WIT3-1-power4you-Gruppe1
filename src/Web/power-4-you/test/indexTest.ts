import request from "supertest";
import { expect } from "chai";
import app from "../index.js";
import "mocha";

describe("API-Tests", () => { //TODO Tests prüfen und auf ENGLISCH umformulieren
  const agent = request.agent(app);

  describe("GET /api/customer/:User_ID", () => {
    it("soll bei ungültiger User_ID 400 liefern", async () => {
      const res = await agent.get("/api/customer/abc");

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Ungültige User_ID.");
    });

    it("soll bei nicht vorhandener User_ID 404 liefern", async () => {
      const res = await agent.get("/api/customer/999999999");

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Kunde nicht gefunden.");
    });
  });

  describe("GET /api/solarmodule/:customerNumber", () => {
    it("soll bei ungültiger Kundennummer 400 liefern", async () => {
      const res = await agent.get("/api/solarmodule/abc");

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Ungültige Kundennummer.");
    });

    it("soll bei gültiger Kundennummer ein Array zurückgeben", async () => {
      const res = await agent.get("/api/solarmodule/1");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("GET /api/solarmodule/:modulnummer/leistung", () => {
    it("soll bei ungültiger Modulnummer 400 liefern", async () => {
      const res = await agent.get("/api/solarmodule/abc/leistung");

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Ungültige Modulnummer.");
    });

    it("soll bei ungültigem Zeitraum 400 liefern", async () => {
      const res = await agent
        .get("/api/solarmodule/1/leistung")
        .query({ from: "invalid-date", to: "also-invalid" });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message", "Ungültiger Zeitraum.");
    });

    it("soll bei gültiger Modulnummer ein Ergebnisobjekt liefern", async () => {
      const res = await agent.get("/api/solarmodule/1/leistung");

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("modulnummer", 1);
      expect(res.body).to.have.property("from");
      expect(res.body).to.have.property("to");
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.be.an("array");
    });
  });

  describe("POST /api/login", () => {
    it("soll bei fehlenden Credentials 400 liefern", async () => {
      const res = await agent.post("/api/login").send({ username: "test" });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Missing credentials");
    });

    it("soll bei falschen Credentials 401 liefern", async () => {
      const res = await agent
        .post("/api/login")
        .send({ username: "falsch", password: "falsch" });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("error", "Invalid credentials");
    });

    it("soll bei korrekten Credentials erfolgreich einloggen", async () => {
      const res = await agent
        .post("/api/login")
        .send({ username: "testuser", password: "testpass" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("isLoggedIn", true);
      expect(res.body).to.have.property("user");
      expect(res.body.user).to.have.property("id");
      expect(res.body.user).to.have.property("username", "testuser");
    });
  });

  describe("POST /api/logout", () => {
    it("soll die Session beenden und isLoggedIn false zurückgeben", async () => {
      await agent
        .post("/api/login")
        .send({ username: "testuser", password: "testpass" });

      const res = await agent.post("/api/logout");

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("isLoggedIn", false);
      expect(res.body).to.have.property("message", "Logged out successfully");
    });
  });
});