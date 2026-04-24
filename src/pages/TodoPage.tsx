import { useSearchParams } from "react-router-dom";
import { TodoModal } from "../components/ui/TodoModal.tsx";
import { TodoCard } from "../components/todo/TodoCard.tsx";
import { useTodoStore } from "../store/todoStore.ts";
import { TabBar } from "../components/ui/TabBar.tsx"
import { SearchBar } from "../components/ui/SearchBar.tsx"
import { PriorityFilter } from "../components/ui/Filter.tsx"
import { EmptyState } from "../components/ui/EmptyState.tsx"
import { SearchOffIcon, PlusIcon } from "../components/icons";
import { AddNewTaskButton } from "../components/ui/Button.tsx"
import { WindowVirtualizedList } from "virtua-restoration";
import { useVirtualListStore } from "../store/virtualListStore";
import type { CacheSnapshot } from "virtua";
import { Helmet } from "react-helmet-async";
import { ConfirmModal } from "../components/ui/ConfirmModal.tsx"
import { useState } from "react";

const cacheProvider = {
  get: () => useVirtualListStore.getState().get("feed"),
  set: (data: [number, CacheSnapshot]) =>
    useVirtualListStore.getState().set("feed", data),
};

function TodoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    todos,
    getFiltered,
    filters,
    setTab,
    getCounts,
    setSearch,
    setPriority,
    deleteTodo
  } = useTodoStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredTodos = getFiltered()
  const counts = getCounts();

  const editId = searchParams.get("edit");
  const editTodo = editId ? todos.find((t) => t.id === editId) : undefined;

  return (
    <>
      <Helmet>
        <title>Todos | Persist Flow</title>
        <meta name="description" content="View, manage and track all your tasks in one place." />
      </Helmet>

      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex gap-4 md:gap-5 items-center justify-between">
          <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-accent">My Tasks</h1>
          <AddNewTaskButton buttonName="Add New Task" icon={<PlusIcon />} onClick={() => setSearchParams({ add: "true" })} />
        </div>

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

        {filteredTodos.length === 0 ? (
          <EmptyState
            icon={<SearchOffIcon />}
            title={filters.search ? `No results for "${filters.search}"` : "No tasks here"}
            description={filters.search ? "Try a different keyword." : "Add a new task to get started."}
          />
        ) : (
          <WindowVirtualizedList
            cacheKey="feed"
            cacheSourceType="custom"
            customProvider={cacheProvider}
          >
            <div className="flex flex-col gap-2 md:gap-3">
              {filteredTodos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  isTrash={filters.tab === "trash"}
                  onDeleteRequest={setDeleteId}
                />
              ))}
            </div>
          </WindowVirtualizedList>
        )}
      </div>

      <ConfirmModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteTodo(deleteId);
          setDeleteId(null);
        }}
        title="Move to trash?"
        description="You can restore it anytime from Trash."
      />

      {editTodo && (
        <TodoModal
          mode="edit"
          todo={editTodo}
          modalTitle="Edit Task"
          buttonLabel="Save Changes"
          onClose={() => setSearchParams({})}
        />
      )}

      {searchParams.get("add") && (
        <TodoModal
          mode="add"
          modalTitle="Add Task"
          buttonLabel="Save New Task"
          onClose={() => setSearchParams({})}
        />
      )}
    </>
  );
}

export default TodoPage;
