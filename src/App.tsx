import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Box } from "@chakra-ui/react";

import { RawNote, Tag, NoteData } from "./interfaces";
import { NewNoteView, HomeView, NoteView } from "./views";
import { useLocalStorage } from "./hooks";
import { NoteLayout } from "./views/NoteView/NoteLayout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <Box my="4" px="16">
      <Routes>
        <Route
          path="/"
          element={<HomeView availableTags={tags} notes={notesWithTags} />}
        />
        <Route
          path="/new"
          element={
            <NewNoteView
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteView />} />
          <Route path="edit" element={<NoteView />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default App;
