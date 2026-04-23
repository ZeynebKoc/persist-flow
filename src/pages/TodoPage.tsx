import { useSearchParams } from "react-router-dom";
import { TodoModal } from "../components/ui/TodoModal.tsx";
import { TodoCard } from "../components/todo/TodoCard.tsx";
import { useTodoStore } from "../store/todoStore.ts";
import { TabBar } from "../components/ui/TabBar.tsx"
import { SearchBar } from "../components/ui/SearchBar.tsx"
import { PriorityFilter } from "../components/ui/Filter.tsx"
import { EmptyState } from "../components/ui/EmptyState.tsx"
import SearchOffIcon from "../components/icons/SearchIcon.tsx";

function TodoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { todos, getFiltered, filters, setTab, getCounts, setSearch, setPriority } = useTodoStore();

  const filteredTodos = getFiltered().filter((t) => t.deletedAt === null);
  const counts = getCounts();

  const editId = searchParams.get("edit");
  const editTodo = editId ? todos.find((t) => t.id === editId) : undefined;

  return (
    <>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex gap-3 md:gap-4 items-center">
          <SearchBar
            value={filters.search}
            onChange={setSearch}
          />

          <PriorityFilter
            value={filters.priority}
            onChange={setPriority}
          />
        </div>

        <TabBar
          activeTab={filters.tab}
          counts={counts}
          onTabChange={setTab}
        />

        <div className="flex flex-col gap-2 md:gap-3">
          {filteredTodos.length === 0 ? (
            <EmptyState
              icon={<SearchOffIcon />}
              title={filters.search ? `No results for "${filters.search}"` : "No tasks here"}
              description={filters.search ? "Try a different keyword." : "Add a new task to get started."}
            />
          ) : (
            filteredTodos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))
          )}
        </div>
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
