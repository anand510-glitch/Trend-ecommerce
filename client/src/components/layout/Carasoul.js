
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Carasoul = () => {
  const navigate=useNavigate()
  return (
  <>
<Carousel autoPlay={true} showStatus={false}
interval={3000}
infiniteLoop={true}>
                <div>
                    <img src="https://www.thepavilions.co.uk/wp-content/uploads/2017/03/BW4500-The-Pavilions-Uxbridge-Autumn-Winter-Web-banner.jpg" alt="img" />
                    <p className="legend"><Button colorScheme='blue' onClick={()=>{
                      navigate("/category/women")
                    }} >Shop Now</Button></p>
                </div>
                <div>
                    <img src="https://storage.sg.content-cdn.io/in-resources/22a79ec5-e694-4d7a-ac5a-85c8fa45b7f1/Images/userimages/home-banner/mar/linen-summer-desk-mar16.png"alt="img" />
                    <p className="legend"><Button colorScheme='blue' onClick={()=>{
                      navigate("/category/men")
                    }}>Shop Now</Button></p>
                </div>
                <div>
                    <img src="https://stores.blackberrys.com/files/outlet/outlet_facebook_images/outlet_cover_photo/248231/banner_2_jpg.jpg" alt="img"  />
                    <p className="legend"><Button colorScheme='blue' onClick={()=>{
                      navigate("/category/men")
                    }}>Shop Now</Button></p>
                </div>
            </Carousel>
  
  </>
  )
}

export default Carasoul
