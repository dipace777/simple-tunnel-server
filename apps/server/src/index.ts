import "dotenv/config";
import cors from "cors";
import express from "express";
import { startGRPCServer } from "./grpc";
import { sendCommand } from "./grpc-tunnel-server";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

// Trigger client command via REST
app.post("/trigger", (req, res) => {
  const { clientId, command, payload } = req.body;

  const ok = sendCommand(clientId, command, payload);

  if (!ok) return res.status(400).json({ error: "Client not connected" });

  res.json({ status: "Command sent" });
});

// Start gRPC server
startGRPCServer();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
