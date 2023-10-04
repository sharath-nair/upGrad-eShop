import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Typography, Card, CardContent, CardMedia, Button, CardActions, InputLabel, Select, MenuItem, Backdrop, CircularProgress } from '@mui/material';
import { FormControl } from '@mui/base/FormControl';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../../../Contexts/authContext';

import './Products.css'

import axios from 'axios';
import { Delete, Edit } from '@mui/icons-material';

const Products = () => {
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState("Default")
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState(null);
    const { authState } = useAuth();
    const { token } = authState;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };



        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
                setFilteredProducts(response.data)
                setSortedProducts(response.data)
            }
            catch (error) {
                console.log('Error fetching Products:', error)
            }
        }

        fetchCategories();
        fetchProducts();
    }, [])

    const handleClickOpen = (productId) => {
        setOpen(true);
        setDeletingProductId(productId);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOkClose = async () => {
        // Simulate API call delay
        try {
            // Mock API call to delete the product
            // You should replace the following line with your actual API call to delete the product
            const response = await axios.delete(`http://localhost:8080/api/products/${deletingProductId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Reload the screen after the toast timeout
            setTimeout(() => {
                handleClose();
            }, 1000);
            alert("Product Deleted Successfully")
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error deleting product:', error);
            // toast.error('Error deleting product', { position: 'top-right', autoClose: 3000 });
        } finally {
            // Reset deletingProductId to null after the API call is completed
            setDeletingProductId(null);
            handleClose();
        }
    };

    const handleSortChange = (event) => {
        setFilters(event.target.value)
        const sortBy = event.target.value;
        const sortedProducts = [...filteredProducts];
        if (sortBy === 'Price: Low to High') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High to Low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        console.log(sortedProducts)
        setSortedProducts(sortedProducts);
    }

    const handleChange = (e, updatedCategory) => {
        console.log(updatedCategory)
        setCategoryFilter(updatedCategory)
        if (updatedCategory === "ALL") {
            setFilteredProducts(products);
            setSortedProducts(products)
        } else {
            const updatedProducts = products.filter(product => product.category === updatedCategory);
            setFilteredProducts(updatedProducts);
            setSortedProducts(updatedProducts)
            setFilters("Default")
        }
    }

    return (
        <>

            <Box marginTop={2} marginBottom={2}>
                <ToggleButtonGroup
                    value={categoryFilter}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="ALL" aria-label='ALL'>ALL</ToggleButton>
                    {categories.map((category, index) => (
                        <ToggleButton key={index} value={category} aria-label='web'>
                            {category}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>
            <Box marginBottom={2} sx={{ textAlign: 'left', ml: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={handleSortChange}
                        value={filters}
                    >
                        <MenuItem value="Default">Default</MenuItem>
                        <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
                        <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
                        <MenuItem value="Newest">Newest</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {sortedProducts.length > 0 && (
                <Box display="flex" flexWrap="Wrap" flexDirection='row' width="100%" justifyContent="space-around" >
                    {sortedProducts.map((product, index) => (
                        <Card key={index} sx={{ maxWidth: 300, height: 350, marginBottom: 3, minWidth: 300 }}>
                            <CardMedia
                                sx={{ height: 140, maxHeight: '100%', objectFit: 'cover' }}
                                image={product.imageUrl}
                                component="img"
                            />
                            <CardContent sx={{ textAlign: 'left', minHeight: '90px' }}>
                                <Typography variant='h6' display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                                    <span>{product.name}</span>
                                    <span>₹ {product.price}</span>
                                </Typography>
                                <Typography variant='subtitle' sx={{ textAlign: 'left', maxHeight: '60px', overflow: 'hidden' }}>{product.description}</Typography>
                            </CardContent>

                            <Box sx={{ height: 100 }} display="flex" alignItems="flex-end" justifyContent="space-between">
                                <CardActions>
                                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" sx={{ bgcolor: '#3f51b5' }} >
                                            BUY
                                        </Button>
                                    </Link>
                                </CardActions>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }} >
                                    <Link to={`/products/modify/${product.id}`} style={{ textDecoration: 'none' }}>
                                        <Button sx={{ color: 'black', '&:hover': { color: 'black' } }} >
                                            <Edit sx={{ mb: 1.5 }} />
                                        </Button>
                                    </Link>

                                    <Button onClick={() => handleClickOpen(product.id)} sx={{ color: 'black', '&:hover': { color: 'black' } }}>
                                        <Delete sx={{ mr: 1.5, mb: 1.5 }} />
                                    </Button>

                                    <Dialog
                                        open={deletingProductId === product.id}
                                        onClose={() => { handleClose(product.id) }}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Confirm Deletion of Product!"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure you want to delete the product?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { handleOkClose(product.id) }} variant='contained' sx={{ bgcolor: '#3f51b5' }}>OK</Button>
                                            <Button onClick={handleClose} variant='outlined' sx={{ borderColor: '#3f51b5', color: '#3f51b5' }}>
                                                CANCEL
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </Box>
                            </Box>
                        </Card>
                    ))}

                </Box>
            )}
        </>

    )
}

export default Products