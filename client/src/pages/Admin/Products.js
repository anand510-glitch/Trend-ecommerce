import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter,Text,Center, Grid, GridItem, Heading, useToast, Divider, Stack, Image, Button, ButtonGroup, Box } from '@chakra-ui/react'
import AdminMenu from './AdminMenu'

import axios from 'axios'
import { Link } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
const Products = () => {
    const toast=useToast();
    const [products, setProducts] = useState([]);

    //getall products
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get( `${process.env.REACT_APP_API}/api/v1/product/get-product`);
        setProducts(data.products);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong");
      }
    };
     //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  
  return (
    <>
    <Layout>
    <AdminMenu/>
    <Center>
        <Heading>
            All Products
        </Heading>
    </Center>
    
  
    <Box ml="auto" mr="auto" w={{ base: '80%', md: '75%' }} mb={"2"} >
              
              <Grid 
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }}
                gap={{ base: 4, md: 6, lg: 8 }}
              >
                {products?.map(p => (
                  <GridItem key={p._id} boxShadow={"dark-lg"} borderRadius={"lg"}>
                    <Link
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="product-link"
                    >
                      <Card maxW="sm">
                        <CardBody>
                          <Image
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            alt="product image"
                            borderRadius="lg"
                          />
                          <Stack mt="2" spacing="0">
                            <Heading size="md">{p.name}</Heading>
                            <Text>{p.description.substring(0, 40)}....</Text>
                            <Text color="green" fontSize="md">
                          <b>   {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}</b>  
                            </Text>
                          </Stack>
                        </CardBody>
                       
       
                      </Card>
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            </Box>
         
       
            </Layout>
    
 
    
    </>
  )
}

export default Products
