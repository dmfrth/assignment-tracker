import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AssignmentListPage from "./pages/AssignmentListPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AssignmentListPage />} />
        {}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}