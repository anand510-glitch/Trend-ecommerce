import React, { useState } from 'react';

import {
  

  Stat,
  StatLabel,
  StatNumber,
  Switch,
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
import AdminMenu from './AdminMenu';

const AdminDashboard= () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [auth]=useAuth()
  return (
    <>
  <Layout>
     <AdminMenu/>
 <Heading m={10}>Admin Details</Heading>
<Stat
    m={10}
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'dark-lg'}
     
      rounded={'lg'}>
       <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
       Name : {auth?.user?.name}
      </StatNumber>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
       Email : {auth?.user?.email}
      </StatNumber>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
       Contact: {auth?.user?.phone}
      </StatNumber>
    </Stat>
    </Layout>
    </>
  );
};

export default AdminDashboard;





