import { useEffect } from "react";
import NotesMain from "../components/notes/main";

export default function NotesList() {
  useEffect(() => { document.title = "My Notes — Notes" }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <NotesMain />
    </div>
  );
}
