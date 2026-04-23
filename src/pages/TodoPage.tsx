import { useSearchParams } from "react-router-dom";
import { TodoModal } from "../components/ui/TodoModal.tsx";
import { TodoCard } from "../components/todo/TodoCard.tsx";
import { useTodoStore } from "../store/todoStore.ts";

function TodoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { todos } = useTodoStore();

  const activeTodos = todos.filter((t) => t.deletedAt === null);

  const editId = searchParams.get("edit");
  const editTodo = editId ? todos.find((t) => t.id === editId) : undefined;

  return (
    <>
      <div className="flex flex-col gap-3">
        {activeTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>

      {editTodo && (
        <TodoModal
          mode="edit"
          todo={editTodo}
          modalTitle="Edit Task"
          buttonLabel="Save Changes"
          onClose={() => setSearchParams({})}
        />
      )}
    </>
  );
}

export default TodoPage;