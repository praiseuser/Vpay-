import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { inputFieldStyle } from '../../countryFormStyles';

const CurrencyField = ({ value, onChange, fiatCurrencies, loading }) => {
    const safeFiatCurrencies = fiatCurrencies || [];


    return (
        <Autocomplete
            options={safeFiatCurrencies}
            getOptionLabel={(option) => option.currency_name || 'Unknown'}
            onChange={(event, newValue) => onChange(newValue ? newValue.currency_id : '')}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Currency"
                    required
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading && <CircularProgress color="inherit" size={20} />}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    sx={inputFieldStyle}
                />
            )}
            value={safeFiatCurrencies.find((c) => String(c.currency_id) === String(value)) || null}
            isOptionEqualToValue={(option, value) =>
                String(option.currency_id) === String(value.currency_id)
            }
            disabled={loading}
        />
    );
};

CurrencyField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    fiatCurrencies: PropTypes.arrayOf(
        PropTypes.shape({
            currency_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            currency_name: PropTypes.string.isRequired,
            status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CurrencyField;