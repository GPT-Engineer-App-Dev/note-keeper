import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Note {
  id: number;
  title: string;
  content: string;
}

const Index = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const localNotes = localStorage.getItem("notes");
    return localNotes ? JSON.parse(localNotes) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");

  const addNote = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      const newNote: Note = {
        id: Date.now(),
        title,
        content,
      };
      setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    setTitle("");
    setContent("");
  }
};

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => {
    const updatedNotes = prevNotes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    return updatedNotes;
  });
};

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="xl">
          Notes
        </Heading>
        <Button onClick={toggleColorMode}>Toggle Theme</Button>
      </Flex>
      <Stack spacing={4} mb={4}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
              addNote();
            }
          }}
        />
        <Button leftIcon={<FaPlus />} onClick={addNote}>
          Add Note
        </Button>
      </Stack>
      <Stack spacing={4}>
        {notes.map((note) => (
          <Box key={note.id} p={4} borderWidth={1} borderRadius="md" bg={bgColor}>
            <Flex justify="space-between" align="center">
              <Heading as="h2" size="md">
                {note.title}
              </Heading>
              <Button
                size="sm"
                leftIcon={<FaTrash />}
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </Button>
            </Flex>
            <Text mt={2}>{note.content}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Index;