import { styled } from '@mui/material/styles';
import { Popper } from '@mui/material';

const StyledPopperWhite = styled(Popper)({
    '& .MuiAutocomplete-paper': {
      backgroundColor: '#282c34',
    },
  });

export default StyledPopperWhite;