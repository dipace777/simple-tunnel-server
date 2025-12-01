import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { TunnelHandlers } from "./grpc-tunnel-server";

const PROTO_PATH_TUNNEL = path.resolve(process.cwd(), "proto/tunnel.proto");
const defTunnel = protoLoader.loadSync(PROTO_PATH_TUNNEL);

const tunnelPkg = grpc.loadPackageDefinition(defTunnel) as any;

const server = new grpc.Server();

server.addService(tunnelPkg.tunnel.TunnelService.service, TunnelHandlers);

export const startGRPCServer = () => {
  const grpcPort = "50051";
  server.bindAsync(
    `0.0.0.0:${grpcPort}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("gRPC server running on:", grpcPort);
    }
  );
};
