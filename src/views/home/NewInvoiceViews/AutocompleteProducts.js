import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  Button,
  CardHeader,
  Typography,
  Autocomplete,
  TextField,
} from '@material-ui/core';
import { addCart } from 'src/redux/slices/invoice';

// ----------------------------------------------------------------------

function AutocompleteProducts() {
  const dispatch = useDispatch();
  const { productWithStockList } = useSelector((state) => state.product);

  const handleChangeValue = (event, value) => {
    if (value) {
      const newProduct = {
        ...value,
        subtotal: value.price,
        quantity: 1,
      };
      dispatch(addCart(newProduct));
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Busca y selecciona los productos
          </Typography>
          <Autocomplete
            fullWidth
            options={productWithStockList}
            onChange={handleChangeValue}
            getOptionLabel={(option) => `[${option.shasis}] ${option.modelo}`}
            renderInput={(params) => <TextField {...params} label="Producto" />}
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default AutocompleteProducts;
