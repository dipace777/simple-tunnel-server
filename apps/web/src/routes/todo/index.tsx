import TodoFeature from "@/features/todo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todo/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-32">
      <TodoFeature />
    </div>
  );
}
