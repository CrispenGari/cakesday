import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}
const P: React.FC<Props> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default P;
