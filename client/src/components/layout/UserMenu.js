import React, { useState } from 'react';
import {
  

  Stat,
  StatLabel,
  StatNumber,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useColorModeValue,
  VStack,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useAuth } from '../../context/auth';
import Layout from '../../components/layout/Layout';

const  UserMenu= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [auth]=useAuth()
  return (
    <>
    
      <Button
       
       
        top={'15'}
        left={'4'}
        colorScheme="purple"
        p={'0'}
        w={'10'}
        h={'10'}
        borderRadius={'full'}
        onClick={onOpen}
        mr={4}
      >
        <BiMenuAltLeft size={'20'} /> 
      </Button>
    
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User Dashboard</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"flex-start"}>
                <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                   <Link to= {'/'}>Home</Link> 
                </Button>

                <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                   <Link  to="/dashboard/user/profile">Profile</Link> 
                </Button>


                <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                   <Link   to="/dashboard/user/orders">Orders</Link> 
                </Button>

              

            </VStack>

            <HStack pos={"absolute"} bottom={"10"} left={"0"} w={"full"} justifyContent={"space-evenly"}>

            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      

    
    </>
  );
};

export default UserMenu;


