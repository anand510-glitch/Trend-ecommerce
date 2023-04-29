import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/auth';
import {
  Box,
  chakra,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
  CardFooter,
  ButtonGroup,
  Button,
  Badge,
  IconButton,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import axios from 'axios';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Prices } from '../components/Prices';
import { AiOutlineReload } from 'react-icons/ai';
import { useCart } from '../context/cart';
import CaptionCarousel from '../components/layout/Carasoul';
import Carasoul from '../components/layout/Carasoul';

const Homepage = () => {
 
  const [cart,setCart]=useCart()
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //loadmore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //get filterd product
  const filterProduct = async () => {
    try {
    
      const { data } = await axios.post(
        `/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
     
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!checked?.length || !radio?.length) {
      getAllProducts();
    }
  
  }, [checked?.length, radio?.length]);

  useEffect(() => {
    if (checked?.length || radio?.length) filterProduct();
  }, [checked, radio]);
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category`
      );
     
      if (data?.success) {
       
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  };

  return (
    <div>

      <Layout title={'All Products-Best offers'}  >
     <Carasoul mt={"3"}/>
        <Box p={{ base: 4, md: 8 }}>
       
          <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }}>
            <Box w={{ base: '90%', md: '20%' }} pr={{ md: 2 }}>
              <Heading size={'md'} mb={{ base: 4, md: 8 }}>
                Filter By Category
              </Heading>
              {categories?.map(c => (
                <CheckboxGroup colorScheme="green">
                  <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox
                      onChange={e => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              ))}

<Heading mt={'2'} size={'md'} mb={{ base: 4, md: 8 }}>
  Filter By Price
</Heading>
     <RadioGroup  onChange={setRadio} value={radio} >
  {Prices?.map((p) => (
    <div key={p._id}>
      <Radio value={p?.array}>{p.name}</Radio>

    </div>
  ))}
</RadioGroup>

              <button
                className="btn btn-danger m-2"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </Box>

            <Box w={{ base: '80%', md: '75%' }} ml="auto" mr="auto">
              
              <Center>
                <Heading as={'h6'} mb={{ base: 4, md: 8 }}>
                
                  All Products
                </Heading>
              </Center>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={{ base: 2, md: 6, lg: 8 }}
              >
                {products?.map(p => (
                  <GridItem
                    key={p._id}
                    boxShadow={'dark-lg'}
                    borderRadius={'lg'}
                   
                  >
                    <Card maxW="xs">
                      <CardBody>
                        <Image
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt="product image"
                          borderRadius="lg"
                        />
                        <Stack mt="2" spacing="0">
                          <Heading size="md">{p.name}</Heading>
                          <Text>{p.description.substring(0, 40)}....</Text>
                          <Text color="green" fontSize="md">
                          {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                          </Text>
                        </Stack>
                      </CardBody>
                    
                      <CardFooter>
                        <ButtonGroup spacing="9">
                          <Button variant="solid" colorScheme="blue"onClick={() => navigate(`/product/${p.slug}`)}>
                            Know More
                          </Button>
                          <Button
                            colorScheme="blue"  onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                            toast({
                              title: "product added succesfully",
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                            })}}
                            
                          >
                            Add to cart
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
              <div className="m-2 p-3">
              {products && products.length < total && (
                <Button colorScheme='red'
                  onClick={e => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    'Loading ...'
                  ) : (
                    <>
                      {' '}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </Button>
              )}
            </div>
            </Box>
           
          </Flex>
          
        </Box>
      </Layout>
    </div>
  );
};

export default Homepage;
