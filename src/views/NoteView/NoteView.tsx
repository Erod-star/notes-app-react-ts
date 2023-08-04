import { Heading, Box, Text, Flex } from "@chakra-ui/react";
import { useNote } from "./NoteLayout";

export const NoteView = () => {
  const note = useNote();
  return (
    <Box>
      <Flex>
        <Box>
          <Heading as="h1" size="3xl" mb="3" noOfLines={1}>
            {note.title}
          </Heading>
        </Box>
      </Flex>

      <Text>{note.markdown}</Text>
    </Box>
  );
};
