import { Heading, Box } from "@chakra-ui/react";
import { NoteForm } from "../components/";
import { NoteData, Tag } from "../interfaces";
import { useNote } from "./NoteView/NoteLayout";

interface EditNoteViewProps {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export const EditNoteView = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteViewProps) => {
  const note = useNote();

  return (
    <Box>
      <Heading as="h1" size="3xl" mb="3" noOfLines={1}>
        Edit note
      </Heading>

      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </Box>
  );
};
