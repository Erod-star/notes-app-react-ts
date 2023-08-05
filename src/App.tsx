import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Box } from "@chakra-ui/react";

import { RawNote, Tag, NoteData } from "./interfaces";
import { NewNoteView, HomeView, NoteView, EditNoteView } from "./views";
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

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    // ? 1st approach (not so sure...)
    // const notesFiltereds = notes.filter((note) => note.id !== id);
    // setNotes(() => {
    //   return [
    //     ...notesFiltereds,
    //     { ...data, id, tagsIds: tags.map((tag) => tag.id) },
    //   ];
    // });
    // ? 2nd approach
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagsIds: tags.map((tag) => tag.id) };
        }
        return note;
      });
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const onUpdateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id == id) {
          return { ...tag, label };
        }
        return tag;
      });
    });
  };

  const onDeleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  };

  return (
    <Box my="4" px="16">
      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              availableTags={tags}
              notes={notesWithTags}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
          }
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
          <Route index element={<NoteView onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNoteView
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default App;
