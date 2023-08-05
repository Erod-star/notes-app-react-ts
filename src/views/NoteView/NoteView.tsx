import { Link, useNavigate } from "react-router-dom";
import { Heading, Box, Flex, Button, Tag as ChakraTag } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import styles from "./NoteView.module.css";

import { useNote } from "./NoteLayout";

interface NoteViewProps {
  onDelete: (id: string) => void;
}

export const NoteView = ({ onDelete }: NoteViewProps) => {
  const { title, markdown, tags, id } = useNote();
  const navigate = useNavigate();

  return (
    <Box>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading h="75px" as="h1" size="3xl" mb="3" noOfLines={1}>
            {title}
          </Heading>

          {tags.map(({ id, label }) => {
            return (
              <ChakraTag mt="3" colorScheme="blue" mr="2" key={id}>
                {label}
              </ChakraTag>
            );
          })}
        </Box>

        <Flex align="center" justify="end">
          <Link to={`/${id}/edit`}>
            <Button mr="2" colorScheme="blue">
              Edit
            </Button>
          </Link>

          <Link
            to="/"
            onClick={() => {
              onDelete(id);
              navigate("/");
            }}
          >
            <Button mr="2" variant="outline" color="red.500" colorScheme="red">
              Delete
            </Button>
          </Link>

          <Link to="/">
            <Button variant="outline" color="gray" colorScheme="gray">
              Back
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Box mt="5">
        <ReactMarkdown
          skipHtml={true}
          children={markdown}
          className={styles.markdownContainer}
        />
      </Box>
    </Box>
  );
};
