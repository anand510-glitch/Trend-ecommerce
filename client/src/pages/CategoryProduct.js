import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import Layout from "../components/layout/Layout";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Grid, GridItem, Heading, Image, Stack, Text, useToast } from "@chakra-ui/react";
import { useCart } from "../context/cart";
const CategoryProduct = () => {
  const toast =useToast()
  const [cart,setCart] =useCart()
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  
    <Layout>
      
      <div className="container mt-3 ml-auto mr-auto category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 ">
            <div className="d-flex flex-wrap">
            <Grid
              ml={"auto"} mr={"auto"}
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
                    <Card maxW="xs"  >
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
            </div>
          
        
          </div>
        </div>
      </div>
    </Layout>

  );
};

export default CategoryProduct;