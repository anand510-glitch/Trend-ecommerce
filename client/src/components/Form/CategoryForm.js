import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
  } from '@chakra-ui/react'
const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
  <>
  
  <FormControl >
  <FormLabel>Enter new category</FormLabel>
  <Input type='text'   value={value} onChange={(e)=>setValue(e.target.value)} />
<Button onClick={handleSubmit} mt={3}  type='submit' colorScheme='blue'> Submit</Button>
</FormControl>
  </>
  )
}

export default CategoryForm
