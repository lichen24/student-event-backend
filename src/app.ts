import express from "express";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes";


const app = express();

app.use(express.json());

app.use("/events", eventRoutes);

app.use("/api/users", userRoutes);

export default app;