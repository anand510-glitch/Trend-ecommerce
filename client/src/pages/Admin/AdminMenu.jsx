import React, { useState } from 'react';
import {
  
    Switch,
  Stat,
  StatLabel,
  StatNumber,
  useColorMode,
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

const AdminMenu= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [auth]=useAuth()
  const { colorMode, toggleColorMode } = useColorMode();
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
          <DrawerHeader>Admin Dashboard</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"flex-start"}>
                <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                   <Link to= {'/'}>Shop-Home</Link> 
                </Button>

                <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                   <Link  to="/dashboard/admin/create-category">create-category</Link> 
                </Button>
                <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                   <Link   to="/dashboard/admin/create-product">create-products</Link> 
                </Button>

                <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                   <Link to= {'/dashboard/admin/orders'}>Orders</Link> 
                </Button>
                <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                   <Link to= {'/dashboard/admin/products'}>Products</Link> 
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

export default AdminMenu;






