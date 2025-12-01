import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(process.cwd(), "proto/tunnel.proto");

const def = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(def) as any;

const client = new grpcObj.tunnel.TunnelService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const stream = client.Connect();

stream.write({
  clientId: "client-1",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImNsaWVudC0xIiwiaWF0IjoxNzY0NTc3ODU0LCJleHAiOjE3NjQ2NjQyNTR9.p5zzy47TEiLBLUOsmP84u_kV51OXkFrP6Bo9J98auGU",
});

stream.on("data", async (msg: any) => {
  console.log("Received command:", msg.command, msg.payload);

  const data = await JSON.parse(msg.payload);

  console.log("acceee", data);

  if (msg.command === "HELLO") {
    console.log("Executing hello world");
  }
});
