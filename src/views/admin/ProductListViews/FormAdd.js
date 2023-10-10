import clsx from "clsx";
import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { UploadSingleFile } from "src/components/Upload";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { Form, FormikProvider, useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import eyeFill from "@iconify-icons/eva/eye-fill";
import eyeOffFill from "@iconify-icons/eva/eye-off-fill";
import { Icon } from "@iconify/react";
import {
  Box,
  Grid,
  TextField,
  Autocomplete,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { addProduct } from "src/redux/slices/product";
import { MButton } from "src/theme";
import { skuProductError, nameProductError } from "src/utils/helpError";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
}));

// ----------------------------------------------------------------------

General.propTypes = {
  className: PropTypes.string,
  handleCloseCallback: PropTypes.func,
};

function General({ className, handleCloseCallback }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);

  const UpdateUserSchema = Yup.object().shape({
    sku: Yup.string().required("Este campo es obligatorio"),
    marca: Yup.string().required("Este campo es obligatorio"),
    ano: Yup.string().required("Este campo es obligatorio"),
    color: Yup.string().required("Este campo es obligatorio"),
    shasis: Yup.string().required("Este campo es obligatorio"),
    transmicion: Yup.string().required("Este campo es obligatorio"),
    cilin: Yup.string().required("Este campo es obligatorio"),
    traccion: Yup.string().required("Este campo es obligatorio"),
    description: Yup.string().required("Este campo es obligatorio"),
    price: Yup.number()
      .required("Este campo es obligatorio")
      .positive("Debe ser un número mayor a 0")
      .integer("Debe ser un número entero"),
    stock: Yup.number()
      .required("Este campo es obligatorio")
      .positive("Debe ser un número mayor a 0")
      .integer("Debe ser un número entero"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sku:"",
      marca:"", 
      ano:"", 
      color:"", 
      shasis:"",
      transmicion:"",
      cilin:"",
      traccion:"",
      description:"",
      price:"",
      stock:"",
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      
      if (!file) {
        enqueueSnackbar("Selecciona una imágen", { variant: "warning" });
      } else {
        const formdata = new FormData();
        formdata.append("sku", values.sku);
        formdata.append('marca', values.marca);
        formdata.append('ano', values.ano);
        formdata.append('color', values.color);
        formdata.append('shasis', values.shasis);
        formdata.append('transmicion', values.transmicion);
        formdata.append('cilin', values.cilin);
        formdata.append('traccion', values.traccion);
        formdata.append("description", values.description);
        formdata.append("price", values.price);
        formdata.append("stock", values.stock);
        formdata.append("image", file.file);

        const response = await dispatch(addProduct(formdata));

        if (!response) {
          handleCloseCallback();
          enqueueSnackbar("Se guardó correctamente", { variant: "success" });
          if (isMountedRef.current) {
            setSubmitting(false);
          }
        } else {
          if(response.body === 'product/sku-already-in-use' || response.body === 'product/name-already-in-use') {
            if (isMountedRef.current) {
              setSubmitting(false);
              setErrors({ afterSubmit: response.body });
            }
          } else {
            enqueueSnackbar("Algo sucedió", { variant: "warning" });
            if (isMountedRef.current) {
              setErrors({ afterSubmit: response.message });
              setSubmitting(false);
            }
          }
        }
      }
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <div className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="SKU"
                    {...getFieldProps("sku")}
                    error={
                      Boolean(touched.sku && errors.sku) ||
                      skuProductError(errors.afterSubmit).error
                    }
                    helperText={
                      (touched.sku && errors.sku) ||
                      skuProductError(errors.afterSubmit).helperText
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Marca"
                    {...getFieldProps("marca")}
                    error={
                      Boolean(touched.marca && errors.marca) ||
                      nameProductError(errors.afterSubmit).error
                    }
                    helperText={
                      (touched.marca && errors.marca) ||
                      nameProductError(errors.afterSubmit).helperText
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Año"
                    {...getFieldProps("ano")}
                    error={
                      Boolean(touched.ano && errors.ano) ||
                      nameProductError(errors.afterSubmit).error
                    }
                    helperText={
                      (touched.ano && errors.ano) ||
                      nameProductError(errors.afterSubmit).helperText
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Color"
                    {...getFieldProps("color")}
                    error={
                      Boolean(touched.color && errors.color) ||
                      nameProductError(errors.afterSubmit).error
                    }
                    helperText={
                      (touched.color && errors.color) ||
                      nameProductError(errors.afterSubmit).helperText
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Shasis"
                    {...getFieldProps("shasis")}
                    error={
                      Boolean(touched.shasis && errors.shasis) ||
                      nameProductError(errors.afterSubmit).error
                    }
                    helperText={
                      (touched.shasis && errors.shasis) ||
                      nameProductError(errors.afterSubmit).helperText
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Transmición"
                    {...getFieldProps("transmicion")}
                    error={
                      Boolean(touched.transmicion && errors.transmicion) ||
                      nameProductError(errors.afterSubmit).error
                    }
                    helperText={
                      (touched.transmicion && errors.transmicion) ||
                      nameProductError(errors.afterSubmit).helperText
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cilindrada"
                    {...getFieldProps("cilin")}
                    error={
                      Boolean(touched.cilin && errors.cilin) ||
                      nameProductError(errors.afterSubmit).error
                    }
                    helperText={
                      (touched.cilin && errors.cilin) ||
                      nameProductError(errors.afterSubmit).helperText
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="tracción"
                    {...getFieldProps("traccion")}
                    error={
                      Boolean(touched.traccion && errors.traccion) ||
                      nameProductError(errors.afterSubmit).error
                    }
                    helperText={
                      (touched.traccion && errors.traccion) ||
                      nameProductError(errors.afterSubmit).helperText
                    }
                  />
                </Grid>
                


                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Precio"
                    {...getFieldProps("price")}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock"
                    {...getFieldProps("stock")}
                    error={Boolean(touched.stock && errors.stock)}
                    helperText={touched.stock && errors.stock}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <UploadSingleFile value={file} onChange={setFile} />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <MButton
                  sx={{ mr: 1 }}
                  color="inherit"
                  type="button"
                  onClick={handleCloseCallback}
                >
                  Cancelar
                </MButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  pending={isSubmitting}
                >
                  Guardar
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default General;
