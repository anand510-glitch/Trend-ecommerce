import { Box, Center, Container, Heading, Input, Textarea, useToast } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import React, { useState ,useEffect} from 'react'
import AdminMenu from './AdminMenu'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../../components/layout/Layout';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const toast=useToast()

    //create product function
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
        const { data } = await axios.post(
          `/api/v1/product/create-product`,
          productData
        );
        if (data?.success) {
         
          toast({
            title: "Product created successfully",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          navigate("/dashboard/admin/products");
        } else {
          toast({
            title: data.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          
        }
      } catch (error) {
        console.log(error);
        toast({
          title:"something went wrong",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    };
  
//get all categories
const getAllCategory=async ()=>{
  
  try{
    const {data}=await axios.get(`/api/v1/category/get-category`)
   
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
     <div  >
      <Layout>
    <AdminMenu/>
    <div className="container-fluid   ">
        <div className="row">
          <div className="col-md-3 ">
            
          </div>
          <div className="col-md-6 mt-4  ">
            <h1>Create Product</h1>
            <div className="m-auto w-80">
              <Select
              size={"lg"}
               value={category}
                bordered={false}
                placeholder="Select a category"
                
                showSearch
                
                onChange={(ev) => {
                    setCategory(ev.target.value);
                  }}
                >
                  {categories?.map(c => (
                    <>
                   
                    <option key={c._id} value={c._id} >
                      {c.name}
                    </option>
                    </>
                  ))}
              </Select>
              <div className="mt-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):""}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Textarea size='lg'
                  type="text"
                  value={description}
                  placeholder="write a description"
                 
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Input size='lg'
                  type="number"
                  value={price}
                  placeholder="write a Price"
                 
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Input
                size='lg'
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                  size='lg'
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      </Layout>
  </div>

  )
}

export default CreateProduct
