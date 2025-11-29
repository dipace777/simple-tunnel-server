import * as grpc from "@grpc/grpc-js";

const connectedClients = new Map<string, grpc.ServerDuplexStream<any, any>>();

export const TunnelHandlers = {
  Connect: (call: grpc.ServerDuplexStream<any, any>) => {
    let clientId = "";

    call.on("data", (req) => {
      clientId = req.clientId;
      console.log("Client connected:", clientId);

      connectedClients.set(clientId, call);
    });

    call.on("end", () => {
      console.log("Client disconnected:", clientId);
      connectedClients.delete(clientId);
      call.end();
    });
  },
};

export function sendCommand(
  clientId: string,
  command: string,
  payload: string
) {
  const clientStream = connectedClients.get(clientId);
  if (!clientStream) return false;

  clientStream.write({ command, payload });
  return true;
}
