import { Box, Center, Container, Heading, Image, Input, Textarea, useToast } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import React, { useState ,useEffect} from 'react'
import AdminMenu from './AdminMenu'
import { useNavigate,useParams} from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
  const toast=useToast()


  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
     
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

    //create product function
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
        const { data } = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
          productData
        );
        if (data?.success) {
          console.log(data)
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
    const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
    console.log(data.category)
    if(data?.success){
      console.log(data.category)
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

//delete a product
const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast({
        title: "prouct deleted successfully",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error);
      toast({
        title: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };
  return (
    <div>
      
    <AdminMenu/>
    <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            
          </div>
          <div className="col-md-9 mt-4">
            <h1 >Update Product</h1>
            <div className="m-1 w-75">
              <Select
               value={category}
                bordered={false}
                placeholder="Select a category"
                size='lg'
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
              <div className="m-3">
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
                    <Image
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      boxSize={"100px"}
                     
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
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
                <Textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  size='lg'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  size='lg'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  size='lg'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  size='lg'
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default UpdateProduct
