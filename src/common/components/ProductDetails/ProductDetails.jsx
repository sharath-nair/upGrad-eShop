import { Box, Button, Card, CardContent, CardMedia, Chip, FormControl, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [chipLabel, setChipLabel] = useState("");
 
    useEffect(() => {
       const fetchProductDetails = async () => {
          try {
             const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
             setProductDetails(response.data);
             setChipLabel(`Available Quantity: ${response.data.availableItems}`)
          } catch (error) {
             console.error('Error fetching product details:', error);
          }
       };
 
       fetchProductDetails();
    }, [productId]);
 
    if (!productDetails) {
       return <div>Loading...</div>;
    }
 
    // Render product details using productDetails
 
    return (
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            mt: 9
        }}
>
  <Box sx={{ display: 'flex', height: '100%' }}>
    {/* Image on the left side covering 40% width and 100% height */}
    <Box sx={{ width: '50%', height: '100%', overflow: 'hidden' }}>
      <img
        src={productDetails.imageUrl}
        alt="Product Image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>

    {/* Content on the right side */}
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', alignItems: 'flex-start' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
          <Typography component="div" variant="h5" sx={{ mr: 4 }}>
            {productDetails.name}
          </Typography>
          <Chip label={chipLabel} sx={{ bgcolor: "#3f51b5", color: 'white' }} />
        </Box>
        <Box  sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
            <Typography variant="subtitle1">
                Category
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginLeft: '8px' }}>
                {productDetails.category}
            </Typography>
        </Box>
        {/* Add more content here if needed */}
        <Typography variant='body2' sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, overflow: 'hidden' }}>
            {productDetails.description}
        </Typography>
        <Typography variant='h5' sx={{ display: 'flex', alignItems: 'flex-start', color: 'red' }}>
            ₹ {productDetails.price}
        </Typography>
        <FormControl margin="normal" required fullWidth>
        
        <TextField
          id="outlined-quantity"
          type="number"
          label="Enter Quantity"
          size="small"
        />
      </FormControl>
      
      </CardContent>
      <Button variant="contained" sx={{ bgcolor: "#3f51b5", color: 'white', ml: 2}}>PLACE ORDER</Button>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        {/* Your IconButton code */}
      </Box>
    </Box>
  </Box>
</Box>
  );
 };

 export default ProductDetails