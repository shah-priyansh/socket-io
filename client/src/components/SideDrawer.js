import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { useAppContext } from "../context/ChatProvider";

const SideDrawer = () => {
  const { onClose } = useDisclosure();

  const { setSelectedChat, chats, setChats } = useAppContext();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Text
          fontSize="2xl"
          fontFamily="Poppins"
          css={{
            background:
              "linear-gradient(110.29deg, #2E5CFF 11.11%, #973DF0 60.96%)",
            textFillColor: "text",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            " -webkit-text-fill-color": "transparent",
            fontWeight: 700,
          }}
        >
          Chatify
        </Text>
      </Box>
    </>
  );
};

export default SideDrawer;
