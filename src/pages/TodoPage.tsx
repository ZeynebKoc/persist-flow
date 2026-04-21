import { useParams } from "react-router-dom";
import EditTodoModal from "../components/EditTodoModal.tsx";

function TodoPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
        <div>Todo List</div>

        {id && <EditTodoModal id={id} />}
    </div>
  );
}

export default TodoPage;