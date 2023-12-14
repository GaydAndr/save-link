import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const SelectLinkType = ({linkType, handleChange}) => {

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id="demo-simple-select-label">Тип посилання</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={linkType}
        name={'linkType'}
        label="Тип посилання"
        onChange={(e) => handleChange(e)}
        color={"success"}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'video'}>Video</MenuItem>
        <MenuItem value={'PDF'}>PDF</MenuItem>
        <MenuItem value={'task'}>Task</MenuItem>
        <MenuItem value={'recording'}>Recording</MenuItem>
      </Select>

    </FormControl>
  );
};

export default SelectLinkType;