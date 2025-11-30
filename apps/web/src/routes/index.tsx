import { createFileRoute } from "@tanstack/react-router";
import { RJSFSchema } from "@rjsf/utils";
import ReactJson from "react-json-view";
import * as z from "zod";

const todoSchema = z.object({
  title: z.string().default("A new task"),
  done: z.boolean().default(false),
});

const jsonSchema = z.toJSONSchema(todoSchema) as RJSFSchema;

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2 my-20">
      <ReactJson src={jsonSchema} displayDataTypes={false} />
    </div>
  );
}
