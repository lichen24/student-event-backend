import express from "express";
import userRoutes from "./routes/user.routes";
import eventRoutes from "./routes/event.routes";


const app = express();

app.use(express.json());

app.use("/events", eventRoutes);

app.use("/api/users", userRoutes);
app.use("/api/registrations", registrationRoutes);

export default app;
