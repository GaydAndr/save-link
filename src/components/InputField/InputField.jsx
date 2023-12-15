import {Button, InputBase, Stack, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const InputField = ({
                      placeholder,
                      name,
                      value,
                      clear = true,
                      disabled = false,
                      func,
                      refValue = null
                    }) => {
  return (
    <Stack
      direction={'row'}
      p={'0 10px'}
      sx={{
        // backgroundColor: '#fff',
        height: 1,
        borderRadius: '5px'

      }}
      justifyContent={'space-between'}
    >
      <InputBase
        required
        inputRef={refValue}
        fullWidth
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => func(e)}
      />
      {
        clear &&
        <Tooltip title="Видалити текст" placement="top" disableInteractive>
          <Button
            sx={{
              padding: 0,
              minWidth: '0'
            }}
            onClick={() => {
              const event = {
                target: {
                  name: name,
                  value: ''
                }
              };
              func(event);
            }}
          >
            <CloseIcon/>
          </Button>
        </Tooltip>

      }
    </Stack>
  );
};

export default InputField;