import { faker } from "@faker-js/faker";
import { Todo, TaskStatus, TaskPriority } from "../types/todo.types";

//randomness starting point
faker.seed(42);

const statuses = Object.values(TaskStatus);
const priorities = Object.values(TaskPriority);

function generateTodo(overrides?: Partial<Todo>): Todo {
  const createdAt = faker.date.past({ years: 1 }).toISOString();

  return {
    id: faker.string.uuid(),
    title: faker.hacker.phrase(),
    description: faker.lorem.sentences({ min: 1, max: 2 }),
    status: faker.helpers.arrayElement(statuses),
    priority: faker.helpers.arrayElement(priorities),
    createdAt,
    updatedAt: faker.date
      .between({ from: createdAt, to: new Date() })
      .toISOString(),
    deletedAt: null,
    ...overrides,
  };
}

//total todo count
export const mockTodos: Todo[] = [
  ...Array.from({ length: 28 }, () => generateTodo()),

  ...Array.from({ length: 4 }, () =>
    generateTodo({
      deletedAt: faker.date.recent({ days: 7 }).toISOString(),
    })
  ),
];