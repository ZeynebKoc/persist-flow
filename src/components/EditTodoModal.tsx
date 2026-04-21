import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
};

function EditTodoModal({ id }: Props) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/todos");
  };

  return (
    <div>
      <h2>Edit Todo</h2>
      <p>ID: {id}</p>

      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default EditTodoModal;