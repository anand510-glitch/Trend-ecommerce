import { Text,Heading, Flex, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinne = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
          setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
          navigate(`/${path}`, {
            state: location.pathname,
          });
        return () => clearInterval(interval);
      }, [count, navigate, location, path]);

  return (
    <div>
        <Flex  height="100vh"alignItems="center" justifyContent="center">

   <Heading size="md">Redirecting to you in {count} second </Heading>

   <Spinner  size='xl' />
   </ Flex>
    </div>
  )
}

export default Spinne
