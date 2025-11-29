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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImNsaWVudC0xIiwiaWF0IjoxNzY0NDQxNzA1LCJleHAiOjE3NjQ1MjgxMDV9.eyOtVgsZvLgxP3g54VFTtlecC2AkvEHDPdXYRJfVnEk",
});

stream.on("data", (msg: any) => {
  console.log("Received command:", msg.command, msg.payload);

  if (msg.command === "HELLO") {
    console.log("Executing hello world");
  }
});
