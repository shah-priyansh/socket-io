import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/ChatProvider";
import api from "../utils/axios";
import { addUserToLocalStorage } from "../utils/localStorage";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState();

  const { setChats, setUser } = useAppContext();

  const handleSearch = async (query) => {
    setSelectedUsers({ name: query });
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error("Please Fill Up All The Fields");
      return;
    }

    try {
      const { data } = await api.post(`/api/v1/chat/joinGroup`, {
        name: groupChatName,
        users: selectedUsers,
      });
      setChats([data]);
      const user = data.users.find((x) => x.username === selectedUsers.name);
      addUserToLocalStorage(user);
      setUser(user);

      onClose();
      toast.success("SuccessFully Created New Group");
    } catch (error) {
      toast.error("Failed To Create Group");
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            display="flex"
            justifyContent="center"
            fontFamily="Poppins"
          >
            Join Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Select
                placeholder="Select Group"
                onChange={(e) => setGroupChatName(e.target.value)}
              >
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
              </Select>
            </FormControl>
            <FormControl marginTop={2}>
              <Input
                placeholder="Add User:"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              fontFamily="Poppins"
              onClick={handleSubmit}
              colorScheme="blue"
              background=" rgba(67, 43, 255, 0.8)"
              _hover={{
                background: " rgba(67, 43, 255, 0.8)",
                color: "white",
              }}
            >
              Join Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
