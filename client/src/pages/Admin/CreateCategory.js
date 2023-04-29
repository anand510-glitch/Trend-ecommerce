import React, { useEffect } from 'react'
import AdminMenu from './AdminMenu'
import { useState } from 'react'
import {  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useToast, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Box,
  Container,
  Button,
  Center,
  useDisclosure, } from '@chakra-ui/react'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import Layout from '../../components/layout/Layout'
const CreateCategory = () => {
  const toast=useToast();
  const [categories,setCategories]=useState([]);
const [name,setName]=useState("");
const [selected, setSelected] = useState(null);
const [updatedName, setUpdatedName] = useState("");
const { isOpen, onOpen, onClose } = useDisclosure()
//handle form
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(`/api/v1/category/create-category`, {
      name,
    });
    if (data?.success) {
      toast({
        title: `${name} is created`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      getAllCategory();
    } else {
      toast({
        title:data.message ,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  } catch (error) {
    console.log(error);
   
  }
};

 //delete category
 const handleDelete = async (pId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/category/delete-category/${pId}`
    );
    if (data.success) {
       toast({
          title:"category is deleted",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

      getAllCategory();
    } else {
      toast({
        title:data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  } catch (error) {
    toast({
      title:"Something went wring",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }
};
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
       
        toast({
          title:`${updatedName} is updated`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setSelected(null);
        setUpdatedName("");
        onClose();
        getAllCategory();
      } else {
        toast({
          title:data.message ,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get all cat
  const getAllCategory=async ()=>{
    try{
      const {data}=await axios.get(`/api/v1/category/get-category`)
      console.log(data.category)
      if(data?.success){
        setCategories(data.category)
      }
    }catch(error){
      console.log(error);
      toast({
        title: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(()=>{
    getAllCategory()

  },[])
  return (
  <>
<Layout>
<AdminMenu/>
<Center >
  <Heading>
   Manage Category
  </Heading>
</Center>
<Box  ml={20} mr={20}>
<CategoryForm  handleSubmit={handleSubmit} value={name} setValue={setName}/>



<TableContainer mt={10} boxShadow={"dark-lg"}>
  <Table variant='striped' colorScheme='teal'>
   
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      
      {categories?.map((c) => (
        <>
        <Tr>
         <Td key={c.name}>{c.name} </Td>
         <Td>
        <Button  m={2}colorScheme='blue' size={"sm"}  onClick={()=>{
        onOpen();
        setUpdatedName(c.name)
        setSelected(c)
        }}>Edit</Button>
        <Button colorScheme='red' size={"sm"} onClick={
          ()=>{
            handleDelete(c._id)
          }
        }>Delete</Button>
        </Td>
         </Tr>
        </>
       
      ))}
       
     
    
     
    </Tbody>
    
  </Table>
</TableContainer>

</Box>


<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Category</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <CategoryForm value={updatedName} setValue={setUpdatedName}handleSubmit={handleUpdate}/>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
    
    </ModalFooter>
  </ModalContent>
</Modal>
</Layout>
  </>
  )
}

export default CreateCategory

