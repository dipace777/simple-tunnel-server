import * as grpc from "@grpc/grpc-js";
import jwt from "jsonwebtoken";

const connectedClients = new Map<string, grpc.ServerDuplexStream<any, any>>();

export const TunnelHandlers = {
  Connect: (call: grpc.ServerDuplexStream<any, any>) => {
    let authenticatedClientId = "";

    call.on("data", (req) => {
      const { clientId, token } = req;

      try {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET || "randomsecret"
        );

        if (decoded.clientId !== clientId) {
          console.log("Token mismatch for client:", clientId);
          call.end();
          return;
        }

        authenticatedClientId = clientId;

        console.log(`Client authenticated: ${clientId}`);

        // 🔥 If old session exists, terminate it before replacing
        const existing = connectedClients.get(clientId);
        if (existing && existing !== call) {
          console.log(`Closing previous session for ${clientId}`);
          existing.write({ command: "ERROR", payload: "SESSION_REPLACED" });
          existing.end();
        }

        connectedClients.set(clientId, call);
      } catch (err) {
        console.error("Invalid token for client", clientId, err);
        call.write({ command: "ERROR", payload: "AUTH_FAILED" });
        call.end();
      }
    });

    call.on("end", () => {
      if (authenticatedClientId) {
        console.log("Client disconnected:", authenticatedClientId);
        connectedClients.delete(authenticatedClientId);
      }
      call.end();
    });
  },
};

export function sendCommand(
  clientId: string,
  command: string,
  payload: string
) {
  const stream = connectedClients.get(clientId);
  if (!stream) return false;

  stream.write({ command, payload });
  return true;
}
