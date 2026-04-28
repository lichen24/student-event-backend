/// <reference types="jest" />

import request from "supertest";
import app from "../app.js";

let token: string;
let eventId: number;
let registrationId: number;

const testEmail = `test${Date.now()}@test.com`;
const password = "123456";

describe("Full API Integration Tests", () => {

  // =========================
  // AUTH
  // =========================
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        email: testEmail,
        password,
      });

    expect(res.statusCode).toBe(201);
  });

  it("should login and return token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: testEmail,
        password,
      });

    expect(res.statusCode).toBe(200);
    token = res.body.token;
  });

  it("should get current user profile", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  // =========================
  // EVENTS
  // =========================
  it("should create event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Event", // ✅ 修复
        date: "2026-05-01T10:00:00.000Z",
        location: "Helsinki",
        description: "Test event",
      });

    expect(res.statusCode).toBe(201);
    eventId = res.body.id;
  });

  it("should get all events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toBe(200);
  });

  it("should get single event", async () => {
    const res = await request(app).get(`/api/events/${eventId}`);
    expect(res.statusCode).toBe(200);
  });

  // =========================
  // REGISTRATIONS
  // =========================
  it("should register for event", async () => {
    const res = await request(app)
      .post("/api/registrations")
      .set("Authorization", `Bearer ${token}`)
      .send({ eventId });

    expect(res.statusCode).toBe(201);

    // 🔥 从返回里拿 id
    registrationId = res.body.registration.id;
  });

  it("should not allow duplicate registration", async () => {
    const res = await request(app)
      .post("/api/registrations")
      .set("Authorization", `Bearer ${token}`)
      .send({ eventId });

    expect(res.statusCode).toBe(400);
  });

  it("should get my registrations", async () => {
    const res = await request(app)
      .get("/api/registrations/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("should cancel registration", async () => {
    const res = await request(app)
      .delete(`/api/registrations/${registrationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});