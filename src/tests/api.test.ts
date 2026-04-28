/// <reference types="jest" />

import request from "supertest";
import app from "../app.js";

let token: string;
let eventId: number;
let registrationId: number;

const testEmail = `test${Date.now()}@test.com`;
const password = "123456";

describe("Full API Integration Tests", () => {

  // ============================
  // AUTH
  // ============================

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        email: testEmail,
        password
      });

    expect(res.statusCode).toBe(201);
  });

  it("should login and return token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: testEmail,
        password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  it("should get current user profile", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(testEmail);
  });

  // ============================
  // EVENTS
  // ============================

  it("should create event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Event",
        date: "2026-05-01T10:00:00.000Z",
        location: "Helsinki",
        description: "Test event"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();

    eventId = res.body.id;
  });

  it("should get all events", async () => {
    const res = await request(app)
      .get("/api/events");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get single event", async () => {
    const res = await request(app)
      .get(`/api/events/${eventId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(eventId);
  });

  // ============================
  // REGISTRATIONS
  // ============================

  it("should register for event", async () => {
    const res = await request(app)
      .post("/api/registrations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        eventId
      });

    expect(res.statusCode).toBe(201);
  });

  it("should not allow duplicate registration", async () => {
    const res = await request(app)
      .post("/api/registrations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        eventId
      });

    expect(res.statusCode).toBe(400);
  });

  it("should get my registrations and extract id", async () => {
    const res = await request(app)
      .get("/api/registrations/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // Right now we just take the first registration
    expect(res.body.length).toBeGreaterThan(0);
    registrationId = res.body[0].id;
  });

  it("should cancel registration", async () => {
    const res = await request(app)
      .delete(`/api/registrations/${registrationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});