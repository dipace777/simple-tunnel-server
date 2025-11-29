import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_PATH = path.resolve(process.cwd(), "proto/service.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;

const examplePackage = grpcObject.example;

const server = new grpc.Server();

// gRPC method implementation
server.addService(examplePackage.ExampleService.service, {
  SayHello: (call: any, callback: any) => {
    const name = call.request.name || "Guest";
    callback(null, { message: `Hello, ${name}! from grpc server` });
  },
});

export const startGRPCServer = () => {
  const grpcPort = process.env.GRPC_PORT || "50051";

  server.bindAsync(
    `0.0.0.0:${grpcPort}`,
    grpc.ServerCredentials.createInsecure(),
    (err) => {
      if (err) {
        console.error("gRPC server error:", err);
        return;
      }
      server.start();
      console.log(`gRPC server running on port ${grpcPort}`);
    }
  );
};
