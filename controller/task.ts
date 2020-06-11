import { v4 } from "https://deno.land/std/uuid/mod.ts";

type Task = {
  id: string;
  name: string;
};

let tasks: Task[] = [
  { id: v4.generate(), name: "Update Documentation" },
  { id: v4.generate(), name: "Update DENO Documentation" },
  { id: v4.generate(), name: "Connect to a database" },
  { id: v4.generate(), name: "Create a cosmosdb account" },
];

// /getTasks
export const getTasks = (context: any) => {
  context.response.status = 200;
  context.response.body = {
    success: true,
    data: tasks,
  };
};

// get a single task
export const getTask = (context: any) => {
  console.log("params id -", context.params.id);
  const task: Task | undefined = tasks.find(
    (item) => item.id === context.params.id,
  );

  if (task) {
    context.response.status = 200;
    context.response.body = {
      success: true,
      data: task,
    };
  } else {
    context.response.status = 404;
    context.response.body = {
      success: false,
      message: "No records found",
    };
  }
};

//post
export const addTask = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  if (!request.hasBody) {
    request.status = 400;
  } else {
    const task: Task = body.value;
    task.id = v4.generate();
    tasks.push(task);
    response.status = 201;
    response.body = {
      success: true,
      data: task,
    };
  }
};

//update task
export const updateTask = async ({
  params,
  request,
  response,
}: {
  params: any;
  request: any;
  response: any;
}) => {
  const task: Task | undefined = tasks.find((item) => item.id === params.id);

  if (task) {
    const body = await request.body();

    const updatedTask: { name: string } = body.value;

    tasks = tasks.map((item: Task) =>
      item.id === params.id ? { ...item, ...updatedTask } : item
    );
    response.status = 200;
    response.body = {
      success: true,
      data: tasks,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "task not found",
    };
  }
};

//delete task
export const deleteTask = ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {
  tasks = tasks.filter((item: Task) => item.id !== params.id);
  response.body = {
    success: true,
    data: tasks,
  };
};
