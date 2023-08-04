import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Center,
  Wrap,
  WrapItem,
  Tag as ChakraTag,
} from "@chakra-ui/react";

import { Tag } from "../interfaces";

interface NoteCardProps {
  id: string;
  title: string;
  tags: Tag[];
}

export const NoteCard = ({ id, title, tags }: NoteCardProps) => {
  return (
    <Card
      w="100%"
      h="100%"
      as={Link}
      to={`/${id}`}
      transition="ease-in-out"
      transitionDuration="300ms"
      _hover={{
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2)",
        translate: "0 -5px",
      }}
    >
      <CardHeader>
        <Center>
          <Heading size="lg">{title}</Heading>
        </Center>
      </CardHeader>

      <CardBody>
        {tags.length > 0 && (
          <Wrap>
            {tags.map(({ id, label }) => {
              return (
                <WrapItem key={id}>
                  <ChakraTag colorScheme="blue" mr="2">
                    {label}
                  </ChakraTag>
                </WrapItem>
              );
            })}
          </Wrap>
        )}
      </CardBody>
    </Card>
  );
};
