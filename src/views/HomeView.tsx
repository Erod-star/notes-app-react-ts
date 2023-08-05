import { Link } from "react-router-dom";
import {
  useDisclosure,
  Heading,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";

import CreateReactSelect from "react-select";
import { NotesList } from "../components";
import { Tag, Note } from "../interfaces";
import { useState } from "react";

interface HomeViewProps {
  availableTags: Tag[];
  notes: Note[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
}

export const HomeView = ({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: HomeViewProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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

            <Button onClick={onOpen}>Edit tags</Button>
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

      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={true} variant="wide">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit tags</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {availableTags.length > 0 && (
              <FormControl w="100%">
                {availableTags.map(({ label, id }) => {
                  return (
                    <Flex key={id}>
                      <Input
                        mr="4"
                        mb="3"
                        key={id}
                        value={label}
                        onChange={(e) => onUpdateTag(id, e.target.value)}
                        type="text"
                      />
                      <Button
                        variant="outline"
                        color="red.500"
                        colorScheme="red"
                        onClick={() => onDeleteTag(id)}
                      >
                        &times;
                      </Button>
                    </Flex>
                  );
                })}
              </FormControl>
            )}
            <hr />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
