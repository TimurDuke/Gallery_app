import React from 'react';
import {Grid, TextField} from "@mui/material";
import PropTypes from 'prop-types';

const FormElement = ({name, value, onChange, label, error, type, required}) => (
    <Grid item xs={12}>
        <TextField
            fullWidth
            autoComplete={name}
            label={label}
            name={name}
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error}
        />
    </Grid>
);

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
};

export default FormElement;