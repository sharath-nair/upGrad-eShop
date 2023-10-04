import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../Contexts/authContext';

const AddProduct = () => {
    const { authState } = useAuth();
    const { token } = authState;
    const [productDetails, setProductDetails] = useState({
        availableItems: 0,
        category: '',
        description: '',
        imageUrl: '',
        manufacturer: '',
        name: '',
        price: 0,
    });

    const handleChange = (property) => (event) => {
        setProductDetails({
            ...productDetails,
            [property]: event.target.value,
        });
        console.log({ [property]: event.target.value })
    };

    const handleProductUpdate = async () => {
        try {
            console.log(productDetails)
            // Assuming you have a server endpoint like localhost:8080/products/{id}
            const response = await axios.post(`http://localhost:8080/api/products`, productDetails, {
                headers: {
                    // 'x-auth-token': authState.token,
                    Authorization: `Bearer ${token}`
                },
            });

            // Handle the response as needed
            alert(`Product: ${productDetails.name} added successfully`)
        } catch (error) {
            // Handle errors
            console.error('Error adding product:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                width: '50ch',
                mt: 4,
                mb: 3
            }}
        >
            <Typography variant='h5'>Add Product</Typography>
            <FormControl margin="normal" required fullWidth>
                <TextField
                    required
                    id="outlined-required"
                    value={productDetails.name}
                    label="Name"
                    onChange={handleChange('name')}
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <TextField
                    required
                    id="outlined-required"
                    value={productDetails.category}
                    label="Category"
                    onChange={handleChange('category')}
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <TextField
                    required
                    id="outlined-required"
                    value={productDetails.manufacturer}
                    label="Manufacturer"
                    onChange={handleChange('manufacturer')}
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <TextField
                    required
                    id="outlined-required"
                    value={productDetails.availableItems}
                    label="Available Items"
                    onChange={handleChange('availableItems')}
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <TextField
                    required
                    id="outlined-required"
                    value={productDetails.price}
                    label="Price"
                    onChange={handleChange('price')}
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <TextField
                    required
                    id="outlined-required"
                    value={productDetails.imageUrl}
                    label="Image URL"
                    onChange={handleChange('imageUrl')}
                />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
                <TextField
                    required
                    id="outlined-required"
                    value={productDetails.description}
                    label="Product Description"
                    onChange={handleChange('description')}
                />
            </FormControl>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#3f51b5" }} onClick={handleProductUpdate}>
                ADD PRODUCT
            </Button>
        </Box>
    )

}
export default AddProduct