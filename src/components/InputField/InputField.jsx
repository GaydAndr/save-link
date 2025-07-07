import {Button, FormHelperText, InputBase, Stack, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const InputField = ({
                      value,
                      onChange,
                      inputRef,
                      clear,
                      error,
                      helperText,
                      ...rest
                    }) => {

  const handleClear = () => {
    const event = {
      target: {
        name: rest.name,
        value: ''
      }
    };
    onChange(event);
  };
  return (
    <Stack
      direction={'row'}
      p={'0 10px'}
      sx={{
        height: 40,
        borderRadius: '5px',
        border: error ? '1px solid #d32f2f' : 'none',
        transition: 'background-color 0.2s ease-in-out',
      }}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <InputBase
        required
        fullWidth
        value={value}
        onChange={onChange}
        inputRef={inputRef}
        error={error}
        {...rest}
      />
      {
        clear && value && !rest.disabled &&
        <Tooltip title="Видалити текст" placement="top" disableInteractive>
          <Button
            sx={{
              padding: 0,
              minWidth: '0'
            }}
            onClick={handleClear}
          >
            <CloseIcon/>
          </Button>
        </Tooltip>
      }
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </Stack>
  );
};

export default InputField;