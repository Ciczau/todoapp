//@ts-nocheck

import express from "express";
import { Login, Register, refreshToken } from "./controllers/UserControllers";
import {
  AddTask,
  checkTask,
  getSingleTask,
  getUserTasks,
} from "./controllers/TaskControllers";

export const router = express();

router.post("/api/register", Register);
router.post("/api/login", Login);
router.post("/api/token", refreshToken);

router.post("/api/task/add", AddTask);
router.post("/api/tasks/get", getUserTasks);
router.post("/api/task/check", checkTask);
router.post("/api/task/get", getSingleTask);
