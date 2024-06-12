import  Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

const AutocompleteWithCheckboxes = ({ options, placeholder, onChange}) => {
    return (
        <Autocomplete
            multiple
            size='small'
            id="cities-standard"
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={onChange}
            renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;

                return (<li key={option.name} {...rest}>
                    <Checkbox
                        checked={selected}
                        sx={{
                            color: 'secondary.main',
                            '&.Mui-checked': {
                            color: 'primary.main',
                            },
                        }}
                />
                    {option.name}
                </li>);
            }}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                    const { key, ...rest } = getTagProps({ index });
                    return (
                        <Chip
                            label={option.name}
                            {...rest}
                            key={key}
                        />
                    );
                })
            }
            renderInput={(params) => (
                <TextField {...params} placeholder={placeholder} />
            )}
    />
    );
};

export default AutocompleteWithCheckboxes;