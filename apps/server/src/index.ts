import "dotenv/config";
import cors from "cors";
import express from "express";
import { startGRPCServer } from "./grpc";
import { sendCommand } from "./grpc-tunnel-server";
import jwt from "jsonwebtoken";

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

app.post("/issue-token", (req, res) => {
  const { clientId } = req.body;

  if (!clientId) {
    return res.status(400).json({ error: "Missing clientId" });
  }

  const token = jwt.sign(
    { clientId },
    process.env.JWT_SECRET || "randomsecret",
    {
      expiresIn: "24h",
    }
  );

  res.json({ token });
});

// Trigger client command via REST
app.post("/trigger", async (req, res) => {
  const { clientId, command, payload } = req.body;

  const data = JSON.stringify(payload);

  const ok = sendCommand(clientId, command, data);

  if (!ok) return res.status(400).json({ error: "Client not connected" });

  res.json({ status: "Command sent" });
});

// Start gRPC server
startGRPCServer();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
