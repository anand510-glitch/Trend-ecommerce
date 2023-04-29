import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiBasket} from "react-icons/bi";
import {
  Flex,
  IconButton,
  useDisclosure,
  Heading,
  Box,
  Stack,
  Text,
  Link,
  useColorMode,
  Switch,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useToast,
  Badge,
  AvatarBadge,
  Avatar,
  MenuItem,
  MenuDivider,
  Center,
  MenuList,
  MenuButton,
  Menu,
  Select,
} from "@chakra-ui/react";

import { AiOutlineShop ,AiOutlineShopping,AiOutlineHome} from "react-icons/ai";
import { HamburgerIcon, CloseIcon, SearchIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";


const Header = () => {
  const navigate=useNavigate()
  const [auth,setAuth]=useAuth()
  const [cart,setCart]=useCart()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories=useCategory()
  const [selectedCategory, setSelectedCategory] = useState('');

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast()
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    // Assuming that you have defined routes for each category page
   navigate(`/category/${categoryValue}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Searching for "${searchQuery}"...`);
    // implement search logic here
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
   
    toast({
      title: "Logedout Successfuly",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={1}
      boxShadow={"lg"}
    

    >
      <Flex align="center" mr={5}>
       
  <Heading> <BiBasket/></Heading> 
        <Text fontSize={{base:"sm",md:"xl"}} style={{cursor
        :"pointer"}} fontWeight="bold" onClick={()=>navigate("/")} mb={"auto"} mt={"auto"}>
          TREND
        </Text>
      </Flex>
    
    
      <Box display={{ base: "block", md: "none" }} onClick={onOpen}>
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          bg="transparent"
          _hover={{ bg: "transparent" }}
        />
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <SearchInput/>
           
           <RouterLink to={"/"}>
           <Text mb={"auto"}>
            Home
           </Text>
            
            </RouterLink>
           
            <Select placeholder='Category' width={"50"} border={"none"} onChange={handleCategoryChange}>
{categories?.map((c)=>(
  <option value={c.slug} >{c.name}</option>
))}


</Select>

           
           
           
          
         {
!auth.user?(<>
  
  <RouterLink to={"/login"}>
              <Text fontWeight="medium"  >
               login
              </Text>
            </RouterLink>
  <RouterLink to={"/register"}>
              <Text fontWeight="medium"  >
              Register
              </Text>
            </RouterLink>
</>):(<>  
  <RouterLink to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}>
              <Text fontWeight="medium"  mb={"auto"} >
             Dashboard
              </Text>
            </RouterLink>

           

  


            <RouterLink to={"/cart"}>
              <Text fontWeight="medium"  mb={
                "auto"  } >
                <Avatar size={"sm"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTfyQHxO53_TwcbegfcHEQX-68ZLqJWmIl0w&usqp=CAU">
              <AvatarBadge boxSize='1.25em' bg='red' >
              {cart?.length}
                </AvatarBadge>
                </Avatar>
              </Text>
            </RouterLink>
                
    


</>


)

         }
         
           <Button size={"sm"} mt={"auto"} mb={"auto"} onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
         
        </Stack>
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        mt={{ base: 4, md: 0 }}
      >
        <IconButton
          aria-label="Close menu"
          icon={<CloseIcon />}
          bg="transparent"
          _hover={{ bg: "transparent" }}
          onClick={onClose}
        />
      </Box>
      <Box>
      
      </Box>
     
      
      <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>  Name :  {auth?.user?.name. toUpperCase()}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <RouterLink to={`/dashboard/user/profile`}>
                  {
                      auth.user?(<> <MenuItem>Profile</MenuItem></>):(<></>)
                    }
                   </RouterLink>
                  <RouterLink to={`/dashboard/user/orders`}>
                  {
                      auth.user?(<> <MenuItem>Orders</MenuItem></>):(<></>)
                    }
                 
                   </RouterLink>
                 
                    {
                      auth.user?(<> <RouterLink to={"/"}><MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </RouterLink></>):(<> <RouterLink to={"/login"}><MenuItem >Login</MenuItem>
                      </RouterLink></>)
                    }
                  
                </MenuList>
              </Menu>
    </Flex>
);
};

export default Header;    