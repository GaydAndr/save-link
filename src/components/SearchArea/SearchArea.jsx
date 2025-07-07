import SearchField from "./SearchField";
import {Box, Button, Stack} from "@mui/material";
import React, {memo, useCallback} from "react";

const SearchArea = ({setExpanded,filteredWordLists}) => {

  const handleExpandAll = useCallback(() => {
    setExpanded(filteredWordLists.map(list => list.id));
  },[setExpanded, filteredWordLists]);

  const handleCollapseAll = useCallback(() => {
    setExpanded([]);
  },[setExpanded]);

  return (
    <>
      <Box sx={{ mb: 2, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
        <SearchField />
        <Stack direction="row" spacing={1}>
          <Button onClick={handleExpandAll} size="small">Розгорнути все</Button>
          <Button onClick={handleCollapseAll} size="small">Згорнути все</Button>
        </Stack>
      </Box>
    </>
  )
}

export default memo(SearchArea) ;