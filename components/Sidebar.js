import { Avatar, Flex, IconButton, Text, Button} from "@chakra-ui/react";
import { ArrowLeftIcon } from '@chakra-ui/icons'
import {signOut} from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from "firebase/firestore";
import getOtherEmail from "../utils/getOtherEmail";

import { useRouter } from "next/router";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  }

  const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    if (!chatExists(input) && (input != user.email)) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] })
    }
  }

  const chatList = () => {
    return (
      chats?.filter(chat => chat.users.includes(user.email))
      .map(
        chat => 
          <Flex key={Math.random()} p={3} align="center" _hover={{bg: "gray.100", cursor: "pointer"}} onClick={() => redirect(chat.id)}>
            <Avatar src="" marginEnd={3} />
            <Text>{getOtherEmail(chat.users, user)}</Text>
          </Flex>
      )
    )
  }

  return (
    <Flex
      // bg="blue.100"
      h="100%"
      w="300px"
      borderEnd="1px solid" borderColor="gray.200"
      direction="column"
    >

      <Flex
        // bg="red.100"
        h="81px" w="100%"
        align="center" justifyContent="space-between"
        borderBottom="1px solid" borderColor="gray.200"
        p={3}
      >

        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text>{user.displayName}</Text>
        </Flex>

        <Button size="sm" isRound  onClick={() => signOut(auth)}                             ><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> </Button>

      </Flex>

      <Button m={5} p={4} onClick={() => newChat()}>New Chat</Button>

      <Flex overflowX="scroll" direction="column" sx={{scrollbarWidth: "none"}} flex={1} >
        {chatList()}
      </Flex>

    </Flex>

  )
}