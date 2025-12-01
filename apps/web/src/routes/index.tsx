import { Button } from "@/components/ui/button";
import TodoFeature from "@/features/todo";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2 mt-20">
      <Link to="/todo">
        <Button>Configure Todo</Button>
      </Link>
    </div>
  );
}
