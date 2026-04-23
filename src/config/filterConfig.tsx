import { TaskPriority } from "../types/todo.types";

export type PriorityValue = TaskPriority | "all";

export const options: { value: PriorityValue; label: string }[] = [
  { value: "all", label: "All Priorities" },
  { value: TaskPriority.HIGH, label: "High" },
  { value: TaskPriority.MEDIUM, label: "Medium" },
  { value: TaskPriority.LOW, label: "Low" },
];