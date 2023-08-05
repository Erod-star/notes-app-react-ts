import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import CreateReactSelect from "react-select/creatable";

import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  Textarea,
  Button,
} from "@chakra-ui/react";

import { NoteData, Tag } from "../interfaces";

interface NoteFormProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  title?: string;
  markdown?: string;
  tags?: Tag[];
}

export const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  // ? Methods
  const handleCreateOption = (label: string) => {
    const newTag = { id: uuidV4(), label };
    onAddTag(newTag);
    setSelectedTags((prev) => [...prev, newTag]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (titleRef.current && markdownRef.current) {
      onSubmit({
        title: titleRef.current.value,
        markdown: markdownRef.current.value,
        tags: selectedTags,
      });
      // navigate("..", { replace: true });
      navigate("..");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl w="100%" onSubmit={handleSubmit}>
        <Flex justify="space-between" mb="1.5em">
          <Box w="49%">
            <FormLabel>Title</FormLabel>
            <Input ref={titleRef} type="text" isRequired defaultValue={title} />
          </Box>
          <Box w="49%">
            <FormLabel>Tags</FormLabel>
            <CreateReactSelect
              onCreateOption={handleCreateOption}
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
        <Flex justify="center" direction="column">
          <FormLabel>Body</FormLabel>
          <Textarea ref={markdownRef} isRequired defaultValue={markdown} />
        </Flex>
        <Flex mt="1.5em" justify="end">
          <Button colorScheme="blue" mr="0.8em" type="submit">
            Save
          </Button>
          <Link to="..">
            <Button>Cancel</Button>
          </Link>
        </Flex>
      </FormControl>
    </form>
  );
};
