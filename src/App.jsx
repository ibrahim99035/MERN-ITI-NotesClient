import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import NotesList from "./pages/notesList";
import NoteCreate from "./pages/noteCreate";
import NoteUpdate from "./pages/noteUpdate";
import NoteDetails from "./pages/noteDetails";
import Profile from "./pages/profile";
import Home from "./pages/home";

import Header from "./components/main/header";
import Footer from "./components/main/footer";

export default function App() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-[#121212] min-h-screen">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/notes/new" element={<NoteCreate />} />
            <Route path="/notes/:noteId/edit" element={<NoteUpdate />} />
            <Route path="/notes/:noteId" element={<NoteDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}