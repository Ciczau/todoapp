//@ts-nocheck

import { ObjectId } from "mongodb";
import { tasks } from "../models/database";

export const AddTask = async (req, res) => {
  const { nick, title, description, date, priority } = req.body;
  if (!nick || !title || !description || !date)
    return res.json({ success: false });
  const dateParts = date.split("/");
  const formattedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  await tasks.insertOne({
    nick: nick,
    title: title,
    description: description,
    date: formattedDate,
    checked: false,
    priority: priority,
  });
  return res.json({ success: true });
};

export const getUserTasks = async (req, res) => {
  const { nick, priorityFilter, executionFilter } = req.body;
  if (!nick) return res.json({ success: false });

  let taskList = await tasks.find({ nick: nick }).sort({ _id: -1 }).toArray();
  if (priorityFilter !== 0) {
    taskList = taskList.filter((el) => el.priority === priorityFilter);
  }
  if (executionFilter !== 0) {
    taskList = taskList.filter(
      (el) => el.checked === Boolean(executionFilter - 1)
    );
  }
  return res.json({ success: true, tasks: taskList });
};

export const checkTask = async (req, res) => {
  const { taskId, checked } = req.body;
  const _id = new ObjectId(taskId);
  await tasks.updateOne({ _id: _id }, { $set: { checked: !checked } });
  return res.json({ success: true });
};

export const getSingleTask = async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) return res.json({ success: false });

  function isValidObjectId(id) {
    return (
      typeof id === "string" &&
      (id.length === 12 || (id.length === 24 && /^[0-9a-fA-F]+$/.test(id)))
    );
  }
  if (!isValidObjectId(taskId)) return res.json({ success: false });
  const _id = new ObjectId(taskId);
  const task = await tasks.findOne({ _id: _id });
  return res.json({ success: true, task: task });
};
