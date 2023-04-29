import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    useToast,
  } from '@chakra-ui/react';
  import Layout from '../../components/layout/Layout';
  import { useState } from 'react';
  import axios from 'axios'
  import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
  const avatars = [
    {
      name: 'Ryan Florence',
      url: 'https://bit.ly/ryan-florence',
    },
    {
      name: 'Segun Adebayo',
      url: 'https://bit.ly/sage-adebayo',
    },
    {
      name: 'Kent Dodds',
      url: 'https://bit.ly/kent-c-dodds',
    },
    {
      name: 'Prosper Otemuyiwa',
      url: 'https://bit.ly/prosper-baba',
    },
    {
      name: 'Christian Nwamba',
      url: 'https://bit.ly/code-beast',
    },
  ];
  
  
  
  const Login=()=> {
    const toast = useToast()
    const navigate = useNavigate();
    const [auth,setAuth]=useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try{
       const res= await axios.post(`/api/v1/auth/login`,{email,password})
  
       if(res.data.success){
        toast({
            title: res.data.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth',JSON.stringify(res.data))
        navigate("/")
      
        
       }
       else{
        toast({
          title: res.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
       }
      }
       catch(error){
        console.log(error)
        toast({
          title: 'Something Went Wrong',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
       }
     ;}
  
    return (
      <Layout>
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 2, sm: 2, lg: 4}}>
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
             Welcome To Our Shop{' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                &
              </Text>{' '}
              New Deals are Waiting For You
            </Heading>
            <Stack direction={'row'} spacing={4} align={'center'}>
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    position={'relative'}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, red.400,pink.400)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                +
              </Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                rounded={'full'}
                minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
                minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}>
                YOU
              </Flex>
            </Stack>
          </Stack>
          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                Login
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text">
                  !
                </Text>
              </Heading>
              <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
               Hi,there welcome back to  our shop login to see latest product and exciting deals
              </Text>
            </Stack>
            <Box as={'form'} mt={10} >
              <Stack spacing={4}>
               
                <Input
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  required
                />
                <Input
                required
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter Your Password."
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
               
              </Stack>
              <Button
              onClick={handleSubmit}
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}>
               Login
              </Button>
              <Button
              onClick={()=>{
                navigate("/forgot-password")
              }}
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}>
               Forgot Password
              </Button>
            </Box>
            form
          </Stack>
        </Container>
       
      </Box>
      </Layout>
    );
  }
  
  
  

  
export default Login
