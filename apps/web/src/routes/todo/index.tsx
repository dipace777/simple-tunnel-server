import { TodoFeatureUI } from "@/lib/defaultMetadata";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/todo/")({
  component: RouteComponent,
});

function RouteComponent() {
  const logpointVersion: keyof typeof TodoFeatureUI = "7.2.0.0";

  return (
    <div className="p-32">
      {TodoFeatureUI[logpointVersion] ? (
        React.createElement(TodoFeatureUI[logpointVersion])
      ) : (
        <div>No Todo Feature available for this version.</div>
      )}
    </div>
  );
}
