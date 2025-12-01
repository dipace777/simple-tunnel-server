import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { todoSchemaVersion1 } from "@/schema/todoSchema";
import ReactJson from "react-json-view";

type TodoFormData = z.infer<typeof todoSchemaVersion1>;

const jsonSchema = z.toJSONSchema(todoSchemaVersion1);

const TodoFeatureVersion1 = () => {
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
    },
  });

  const watchDone = watch("done");

  const onSubmit = (data: TodoFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
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
};

export default TodoFeatureVersion1;
