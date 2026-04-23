import { TabView, TaskStatus } from "../types/todo.types";

export const tabs: { view: TabView; label: string }[] = [
  { view: "all", label: "All" },
  { view: TaskStatus.TODO, label: "Todo" },
  { view: TaskStatus.IN_PROGRESS, label: "InProgress" },
  { view: TaskStatus.DONE, label: "Done" },
  { view: "trash", label: "Trash" },
];