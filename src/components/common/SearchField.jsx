import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import {getSearchQuery, uiAction} from "../../redux/ui_slice";

const SearchField = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);

  const handleSearchChange = (e) => {
    dispatch(uiAction.setSearchQuery(e.target.value));
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Пошук слів..."
      value={searchQuery }
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchField;