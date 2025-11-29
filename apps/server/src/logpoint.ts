import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(process.cwd(), "proto/service.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const client = new grpcObject.example.ExampleService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.SayHello({ name: "Dipesh" }, (err: any, response: any) => {
  console.log("error:", err);
  console.log(response);
});
