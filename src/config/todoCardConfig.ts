import { TaskPriority, TaskStatus } from "../types/todo.types";

export const statusConfig: Record<
  TaskStatus,
  { label: string; pillClass: string; borderClass: string, hover: string }
> = {
  [TaskStatus.TODO]: {
    label: "To Do",
    pillClass: "bg-blue-500/15 text-blue-500",
    borderClass: "bg-blue-500",
    hover: "hover:bg-blue-300/10"
  },
  [TaskStatus.IN_PROGRESS]: {
    label: "In Progress",
    pillClass: "bg-orange-400/15 text-orange-400",
    borderClass: "bg-orange-400",
    hover: "hover:bg-orange-300/10"
  },
  [TaskStatus.DONE]: {
    label: "Done",
    pillClass: "bg-green-500/15 text-green-500",
    borderClass: "bg-green-500",
    hover: "hover:bg-green-300/10"
  },
};

export const priorityConfig: Record<TaskPriority, { label: string; dotClass: string }> = {
  [TaskPriority.HIGH]: { label: "High", dotClass: "bg-high" },
  [TaskPriority.MEDIUM]: { label: "Medium", dotClass: "bg-medium" },
  [TaskPriority.LOW]: { label: "Low", dotClass: "bg-low" },
};