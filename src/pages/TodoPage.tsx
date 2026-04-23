import { useSearchParams } from "react-router-dom";
import { TodoModal } from "../components/ui/TodoModal.tsx";
import { TodoCard } from "../components/todo/TodoCard.tsx";
import { useTodoStore } from "../store/todoStore.ts";
import { TabBar } from "../components/ui/TabBar.tsx"

function TodoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { todos, getFiltered, filters, setTab, getCounts } = useTodoStore();

  const filteredTodos = getFiltered();
  const counts = getCounts();

  const editId = searchParams.get("edit");
  const editTodo = editId ? todos.find((t) => t.id === editId) : undefined;

  return (
    <>
      <div className="flex flex-col gap-3">
        <TabBar
          activeTab={filters.tab}
          counts={counts}
          onTabChange={setTab}
        />

        {filteredTodos.map((todo) => (
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