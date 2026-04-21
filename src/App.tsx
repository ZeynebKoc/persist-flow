import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import TodoPage from "./pages/TodoPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todos" element={<TodoPage />} />
      <Route path="/todos/:id?" element={<TodoPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;