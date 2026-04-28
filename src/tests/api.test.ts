/// <reference types="jest" />
import request from "supertest";
import app from "../app.js";

let token: string;
let eventId: number;
let registrationId: number;

describe("Full API Integration Tests", () => {

  // =========================
  // 1. REGISTER USER (关键！)
  // =========================
  it("should register a new user", async () => {
    await request(app)
      .post("/api/users/register")
      .send({
        email: "test@test.com",
        password: "123456"
      });
  });

  // =========================
  // 2. LOGIN
  // =========================
  it("should login and return token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "test@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  // =========================
  // 3. GET PROFILE
  // =========================
  it("should get current user profile", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  // =========================
  // 4. CREATE EVENT
  // =========================
  it("should create event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Event",
        description: "Test Description",
        date: new Date()
      });

    expect(res.statusCode).toBe(201);

    eventId = res.body.id;
  });

  // =========================
  // 5. GET EVENTS
  // =========================
  it("should get all events", async () => {
    const res = await request(app)
      .get("/api/events");

    expect(res.statusCode).toBe(200);
  });

  it("should get single event", async () => {
    const res = await request(app)
      .get(`/api/events/${eventId}`);

    expect(res.statusCode).toBe(200);
  });

  // =========================
  // 6. REGISTRATION
  // =========================
  it("should register for event", async () => {
    const res = await request(app)
      .post("/api/registrations")
      .set("Authorization", `Bearer ${token}`)
      .send({ eventId });

    expect(res.statusCode).toBe(201);

    registrationId = res.body.id;
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

  // =========================
  // 7. DELETE
  // =========================
  it("should cancel registration", async () => {
    const res = await request(app)
      .delete(`/api/registrations/${registrationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect([200, 204]).toContain(res.statusCode);
  });

});