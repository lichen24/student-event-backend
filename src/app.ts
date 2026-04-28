import express from "express";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";


const app = express();

app.use(express.json());

app.use("/events", eventRoutes);

app.use("/api/users", userRoutes);
app.use("/api/registrations", registrationRoutes);

export default app;
