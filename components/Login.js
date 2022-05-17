import Head from "next/head";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
    
      <Head>
        <title>Login</title>
      </Head>

      <Center h="100vh">

        <Stack
          align="center"
          bgColor="gray.600"
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="lg"
        >
          
          <Box
            bgColor="white"
            w="fit-content"
            p={5}
            rounded="3xl"
            boxShadow="lg"
            
          >
            {/* <ChatIcon w="100px" h="100px" color="white" /> */}
              <img src="Logo.png" alt="Logo Working on it..." w="10px" h="10px" rounded="3xl"  />
          </Box>

          <Button boxShadow="md" onClick={() => signInWithGoogle("", {prompt: "select_account"})}>Sign In with Google</Button>

        </Stack>

      </Center>
    
    </>
  )
}