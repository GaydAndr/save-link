import { InputBase, Stack} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import {getSearchQuery, uiAction} from "../../redux/ui_slice";
import {memo} from "react";
import InputPaper from "../SprintForm/InputPaper";

const SearchField = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);

  const handleSearchChange = (e) => {
    dispatch(uiAction.setSearchQuery(e.target.value));
  };

  return (
    <InputPaper >
      <Stack flexDirection={"row"} gap={1} alignItems={"center"} height={'2.5rem'}>
        <SearchIcon />
        <InputBase
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Пошук слів..."
          value={searchQuery }
          onChange={handleSearchChange}
        />
      </Stack>

    </InputPaper>
  );
};

export default memo(SearchField);