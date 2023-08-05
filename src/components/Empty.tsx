import {
  Card,
  CardHeader,
  Center,
  Heading,
  CardBody,
  Text,
} from "@chakra-ui/react";

interface EmptyProps {
  emptyTitle?: string;
  emptyMessage?: string;
}

export const Empty = ({
  emptyTitle = "Oppss",
  emptyMessage = "Sorry nothing here!",
}: EmptyProps) => {
  return (
    <Center w="100%" h="100%">
      <Card w="450px">
        <CardHeader>
          <Center>
            <Heading size="lg">{emptyTitle}</Heading>
          </Center>
        </CardHeader>

        <CardBody>
          <Center>
            <Text> {emptyMessage} </Text>
          </Center>
        </CardBody>
      </Card>
    </Center>
  );
};
