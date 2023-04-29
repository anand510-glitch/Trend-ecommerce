import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import Layout from "../components/layout/Layout";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Grid, Heading, Image, Stack, Text } from "@chakra-ui/react";
const CategoryProduct = () => {
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
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
            <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={{ base: 2, md: 6, lg: 8 }}
              >
              {products?.map((p) => (
               <>
                <Card maxW="xs" boxShadow={"lg"} mt={"2"} mb={"2"} >
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
                        
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
               </>
              ))}
                </Grid>
            </div>
          
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;