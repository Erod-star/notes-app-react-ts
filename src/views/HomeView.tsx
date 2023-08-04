import { Link } from "react-router-dom";
import {
  Heading,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import CreateReactSelect from "react-select";
import { NotesList } from "../components";
import { Tag, Note } from "../interfaces";
import { useState } from "react";

interface HomeViewProps {
  availableTags: Tag[];
  notes: Note[];
}

export const HomeView = ({ availableTags, notes }: HomeViewProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  return (
    <Box>
      <Flex w="100%" justify="space-between">
        <Heading as="h1" size="3xl" mb="3" noOfLines={1}>
          Your notes
        </Heading>
        <Flex mt="1.5em">
          <Link to="/new">
            <Button colorScheme="blue" mr="0.8em">
              Create
            </Button>
          </Link>

          <Button>Edit tags</Button>
        </Flex>
      </Flex>

      <FormControl mt="5">
        <Flex justify="space-between">
          <Box w="49%">
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box w="49%">
            <FormLabel>Tags</FormLabel>
            <CreateReactSelect
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { id: tag.value, label: tag.label };
                  })
                );
              }}
              isMulti
            />
          </Box>
        </Flex>
      </FormControl>

      <Flex mt="7">
        <NotesList notes={notes} title={title} selectedTags={selectedTags} />
      </Flex>
    </Box>
  );
};
