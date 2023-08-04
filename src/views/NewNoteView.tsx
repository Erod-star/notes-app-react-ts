import { Heading, Box } from "@chakra-ui/react";
import { NoteForm } from "../components/";
import { NoteData, Tag } from "../interfaces";

interface NewNoteViewProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export const NewNoteView = ({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteViewProps) => {
  return (
    <Box>
      <Heading as="h1" size="3xl" mb="3" noOfLines={1}>
        New note
      </Heading>

      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </Box>
  );
};
