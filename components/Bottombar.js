import { useState } from "react";
import { FormControl, Input, Button, Flex} from "@chakra-ui/react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseconfig";

export default function Bottombar({id, user}) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp()
    })
    setInput("");
  }

  return (
    <FormControl
      p={3}
      onSubmit={sendMessage}
      as="form"
      
    >
     <Flex
     direction ="row"
     >
       <Input placeholder="Type a message... Enter to Send" autoComplete="off" onChange={e =>   setInput(e.target.value)} value={input} />
       <Button type="submit"  isRounded marginStart={2} disabled={!input}>
         <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
         </Button>
      </Flex> 
      
      
    </FormControl>
  )
}