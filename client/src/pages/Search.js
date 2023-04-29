import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/layout/Layout";
import { Button, ButtonGroup, Card, CardBody, CardFooter, GridItem, Heading, Image, Stack, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const toast=useToast()
  const navigate=useNavigate()
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
               <GridItem
               key={p._id}
               boxShadow={'dark-lg'}
               borderRadius={'lg'}
               m={4}
             >
               <Card maxW="xs">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;