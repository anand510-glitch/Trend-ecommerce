import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../../context/auth";
import moment from "moment";

import Layout from "../../components/layout/Layout";
import AdminMenu from "./AdminMenu";


import { Select, useColorModeValue, useToast , Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text} from "@chakra-ui/react";
const { Option } = Select;

const AdminOrders = () => {
  const textColor = useColorModeValue("gray.800", "white");
 
    const toast=useToast()
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, event) => {
    try {
      const value = event.target.value; // Extract the value from the event object
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard" style={{ color: textColor }}>
        <div className="col-md-1">
          <AdminMenu />
        </div>
        <div className="col-md-10 mt-3 mb-4" >
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table" style={{ color: textColor }}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">items</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <option key={i} value={s}>
                              {s}
                            </option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container" style={{ color: textColor }}>
                  {o?.products?.map((p, i) => (
                      <Card
                      direction={{ base: 'column', sm: 'row' }}
                      overflow='hidden'
                      variant='outline'
                      m={"3"}
                      boxShadow={"lg"}
                    >
                      <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                       
                      />
                    
                      <Stack>
                        <CardBody>
                          <Heading size='md'>{p.name}</Heading>
                    
                          <Text >
                          {p.description.substring(0, 60)}...
                          </Text>
                          <Text  color="green">
                         <b>Price : ${p.price}</b>
                          </Text>
                        </CardBody>
                    
                      
                      </Stack>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;