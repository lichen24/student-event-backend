import express from "express";
import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/events", eventRoutes);

app.use("/api/users", userRoutes);
app.use("/api/registrations", registrationRoutes);

export default app;
