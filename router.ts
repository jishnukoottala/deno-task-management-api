import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from "./controller/task.ts";

const API_TAG = `api`;
const API_VERSION = "v" + 1;

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get(`/${API_TAG}/${API_VERSION}/tasks`, getTasks)
  .get(`/${API_TAG}/${API_VERSION}/tasks/:id`, getTask)
  .post(`/${API_TAG}/${API_VERSION}/tasks`, addTask)
  .patch(`/${API_TAG}/${API_VERSION}/tasks/:id`, updateTask)
  .delete(`/${API_TAG}/${API_VERSION}/tasks/:id`, deleteTask);

export default router;
