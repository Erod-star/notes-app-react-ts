import { Wrap, WrapItem } from "@chakra-ui/react";
import { Note, Tag } from "../interfaces";
import { useMemo } from "react";
import { NoteCard } from "./NoteCard";
import { Empty } from "./Empty";

// import styles from "./NoteCard/NoteCard.module.css";

interface NotesListProps {
  notes: Note[];
  title: string;
  selectedTags: Tag[];
}

export const NotesList = ({ notes, title, selectedTags }: NotesListProps) => {
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, title, selectedTags]);

  return (
    <>
      {filteredNotes.length > 0 ? (
        <Wrap spacing="6">
          {filteredNotes.map(({ id, title, tags }) => {
            return (
              <WrapItem w="240px" minH="160px" key={id}>
                <NoteCard id={id} title={title} tags={tags} />
              </WrapItem>
            );
          })}
        </Wrap>
      ) : (
        <Empty />
      )}
    </>
  );
};
