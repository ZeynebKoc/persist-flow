import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import TodoPage from "./pages/TodoPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos/:id?" element={<TodoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;