import React from 'react'
import Layout from '../components/layout/Layout'
import { Heading ,AbsoluteCenter,Flex} from '@chakra-ui/react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
const Pagenotfound = () => {
  return (
    <div>
       <Layout>
      <AbsoluteCenter>
        <Flex>
        <Heading size={"xl"}><AiOutlineCloseCircle/> </Heading>
        <Heading size={"xl"}>    404 Page Not Found</Heading>
        </Flex>
       
      </AbsoluteCenter>
    </Layout>
    </div>
  )
}

export default Pagenotfound
