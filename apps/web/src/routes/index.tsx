import { createFileRoute } from "@tanstack/react-router";
import ReactJson from "react-json-view";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { todoSchemaVersion1 } from "@/schema/todoSchema";

type TodoFormData = z.infer<typeof todoSchemaVersion1>;

const jsonSchema = z.toJSONSchema(todoSchemaVersion1);

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchemaVersion1),
    defaultValues: {
      title: "A new task",
      done: false,
      status: "todo",
    },
  });

  const watchStatus = watch("status");
  const watchDone = watch("done");

  const onSubmit = (data: TodoFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2 mt-20">
      <ReactJson src={jsonSchema} displayDataTypes={false} />

      <Card className="shadow-xl border-0 backdrop-blur mt-10">
        <CardHeader className="border-b rounded-t-lg">
          <CardTitle className="text-2xl">Create New Task</CardTitle>
          <CardDescription>
            Fill in the details below to add a new task
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-base font-semibold text-gray-700"
              >
                Task Title
              </label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter task title"
                className={`text-base transition-all ${
                  errors.title
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="status"
                className="text-base font-semibold text-gray-700"
              >
                Status
              </label>
              <Select
                value={watchStatus}
                onValueChange={(value) =>
                  setValue("status", value as "todo" | "in-progress" | "done")
                }
              >
                <SelectTrigger id="status" className="text-base">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">
                    <div className="flex items-center gap-2">
                      <Circle className="w-4 h-4 text-gray-500" />
                      To Do
                    </div>
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      In Progress
                    </div>
                  </SelectItem>
                  <SelectItem value="done">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Done
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <Checkbox
                id="done"
                checked={watchDone}
                onCheckedChange={(checked) =>
                  setValue("done", checked as boolean)
                }
              />
              <label
                htmlFor="done"
                className="text-base font-medium cursor-pointer text-gray-700"
              >
                Mark as completed
              </label>
            </div>

            <Button
              onClick={handleSubmit(onSubmit)}
              className="w-full text-base h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Add Task
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
