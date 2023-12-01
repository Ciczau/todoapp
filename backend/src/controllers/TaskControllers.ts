//@ts-nocheck

import { ObjectId } from "mongodb";
import { tasks } from "../models/database";

export const AddTask = async (req, res) => {
  const { nick, title, description, date } = req.body;
  if (!nick || !title || !description || !date)
    return res.json({ success: false });
  const dateParts = date.split("/");
  const formattedDate = new Date(dateParts[2], dateParts[1], dateParts[0]);
  await tasks.insertOne({
    nick: nick,
    title: title,
    description: description,
    date: formattedDate,
    checked: false,
  });
  return res.json({ success: true });
};

export const getUserTasks = async (req, res) => {
  const { nick } = req.body;
  if (!nick) return res.json({ success: false });

  const taskList = await tasks.find({ nick: nick }).sort({ _id: -1 }).toArray();
  return res.json({ success: true, tasks: taskList });
};

export const checkTask = async (req, res) => {
  const { taskId, checked } = req.body;
  const _id = new ObjectId(taskId);
  await tasks.updateOne({ _id: _id }, { $set: { checked: !checked } });
  return res.json();
};
