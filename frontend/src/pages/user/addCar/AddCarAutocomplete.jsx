import  Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AddCarAutocomplete = ({ options, label, value, onChange, disabled }) => {
    return (
        <Autocomplete
            size='small'
            id="combo-box-brands"
            options={options}
            renderInput={(params) => <TextField
                {...params} label={label}
                color='primary'
                />}
            value={value}
            getOptionLabel={(option) => option || ""}
            onChange={onChange}
            isOptionEqualToValue={(option, value) => option === value || value === ""}
            disabled={disabled}
        />
    );
};

export default AddCarAutocomplete;