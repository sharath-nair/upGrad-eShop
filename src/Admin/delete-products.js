import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
Box,
Button,
Container,
Grid,
Link,
TextField,
Typography,
Snackbar,
Alert,
IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';
import { addProduct, deleteProduct, updateProduct } from '../redux/actions/productActions';
const AdminLogin = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const [products, setProducts] = useState([]);
const [open, setOpen] = useState(false);
const [message, setMessage] = useState('');
const [severity, setSeverity] = useState('success');
const [loading, setLoading] = useState(false);
const [deleting, setDeleting] = useState(false);
const [productId, setProductId] = useState('');
const [productName, setProductName] = useState('');
const { user } = useSelector((state) => state.auth);
useEffect(() => {
if (!user) {
navigate('/login');
} else {
axios.get('/products')
.then((response) => {
setProducts(response.data);
})
.catch((error) => {
console.log(error);
});
}
}, [user, navigate]);
const handleClose = (event, reason) => {
if (reason === 'clickaway') {
return;
}
setOpen(false);
};
const handleDelete = (id, name) => {
setDeleting(true);
axios.delete(`/products/${id}`)
.then((response) => {
setDeleting(false);
setMessage(`Product ${name} deleted successfully.`);
setSeverity('success');
setOpen(true);
dispatch(deleteProduct(id));
})
.catch((error) => {
setDeleting(false);
setMessage('Error deleting product.');
setSeverity('error');
setOpen(true);
});
};
const handleEdit = (id, name) => {
setProductId(id);
setProductName(name);
};
const handleUpdate = () => {
setLoading(true);
const updatedProduct = { id: productId, name: productName };
axios.put(`/products/${productId}`, updatedProduct)
.then((response) => {
setLoading(false);
setMessage('Product updated successfully.');
setSeverity('success');
setOpen(true);
dispatch(updateProduct(updatedProduct));
})
.catch((error) => {
setLoading(false);
setMessage('Error updating product.');
setSeverity('error');
setOpen(true);
});
};
return (
<Container component="main" maxWidth="xs">
<Box
sx={{
marginTop: 8,
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
}}
>
<Typography component="h1" variant="h5">
Admin Dashboard
</Typography>
<Box component="div" sx={{ marginTop: 3 }}>
<Grid container spacing={2}>
{products.map((product) => (
<Grid item xs={12} key={product._id}>
<Box
sx={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
}}
>
<Typography variant="body1">{product.name}</Typography>
<Button
variant="contained"
color="primary"
onClick={() => handleEdit(product._id, product.name)}
>
Edit
</Button>
<Button
variant="contained"
color="secondary"
onClick={() => handleDelete(product._id)}
>
Delete
</Button>
</Box>
</Grid>
))}
</Grid>
</Box>
<Dialog open={open} onClose={handleClose}>
<DialogTitle>{message}</DialogTitle>
<DialogActions>
<Button onClick={handleClose}>Close</Button>
</DialogActions>
</Dialog>
<Dialog open={editOpen} onClose={handleClose}>
<DialogTitle>Edit Product</DialogTitle>
<DialogContent>
<TextField
autoFocus
margin="dense"
id="name"
label="Product Name"
type="text"
fullWidth
value={productName}
onChange={(e) => setProductName(e.target.value)}
/>
</DialogContent>
<DialogActions>
<Button onClick={handleClose}>Cancel</Button>
<Button onClick={handleUpdate}>Update</Button>
</DialogActions>
</Dialog>
</Box>
</Container>
);
};
export default AdminDashboard;
