import ActionBtn from "../ActionBtn/ActionBtn";
import {Link, Paper, Stack, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {sprintAction} from "../../redux/sprint_slice";
import InputPaper from "../SprintForm/InputPaper";

const SprintLink = ({title, type, href, handelDelete, id}) => {
  const dispatch=useDispatch()
  const deleteLink = () => {
    dispatch(sprintAction.removeLink(id))
  }

  return (
    <InputPaper hover>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1}
      >
        <Link
          underline="none"
          target="_blank"
          rel="noopener"
          component={'a'}
          href={href}
          variant={'h6'}
          flex={1}
          color={'#000'}
          borderRadius={1}
          p={1}
        >
          {title}
        </Link>
        <Typography
          component={'h6'}
          variant={'body1'}
          borderRadius={1}
          p={1}
        >
          {type}
        </Typography>
        <ActionBtn
          variant={'contained'}
          color={'error'}
          icoBtn={<DeleteIcon/>}
          funcs={deleteLink}
        />
      </Stack>
    </InputPaper>
  );
};

export default SprintLink;