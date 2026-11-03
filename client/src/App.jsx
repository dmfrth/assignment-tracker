import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AssignmentListPage from "./pages/AssignmentListPage.jsx";
import CreateAssignmentPage from "./pages/CreateAssignmentPage.jsx";
import AssignmentDetailPage from "./pages/AssignmentDetailPage.jsx";
import EditAssignmentPage from "./pages/EditAssignmentPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// this is basically a map, tells which page to show for each url
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AssignmentListPage />} />
        <Route path="/assignments/new" element={<CreateAssignmentPage />} />
        <Route path="/assignments/:id" element={<AssignmentDetailPage />} />
        <Route path="/assignments/:id/edit" element={<EditAssignmentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}