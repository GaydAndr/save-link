import React, {memo} from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box,
  createTheme,
  List,
  ListItem,
  styled,
  ThemeProvider
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useSelector} from "react-redux";
import {getListOfSprints} from "../../redux/sprint_slice";
import LinkItem from "./LinkItem";
import LinkHeader from "./LinkHeader";
import ActionBtn from "../ActionBtn/ActionBtn";
import DownloadBtn from "../DownloadBTN/DownloadBTN";

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const AddedSprints = () => {
  const ListOfSprints = useSelector(getListOfSprints)
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
        },
        palette: {
          mode: "dark",
          primary: {main: "rgb(102, 157, 246)"},
          background: {paper: "rgb(193,215,234)"},
        },
      })}
    >
      <DownloadBtn/>
      <FireNav
        disablePadding
        sx={{
          width: '100%',
          overflow: 'auto',
          // maxHeight: '80vh',
          '& ul': {padding: 0},
        }}
      >
        {ListOfSprints?.map((sprintObj, i) => (
          <ListItem
            key={sprintObj.id}
            sx={{
              padding: 0
            }}
          >
            <Box sx={{
              width: '100%',
              position: 'relative',
            }}>
              <Accordion
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}

              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <LinkHeader title={sprintObj.sprintTitle}/>
                </AccordionSummary>
                <AccordionDetails sx={{
                  padding: 0
                }}>
                  <List disablePadding>
                    {sprintObj.sprintLinks.map((sprintLink) => (
                      <ListItem
                        disablePadding
                        key={sprintLink.id}
                        sx={{
                          py: 0,
                          color: "rgba(255,255,255,.8)",
                          bgcolor: 'rgb(28,68,108)',
                        }}
                      >
                        <LinkItem item={sprintLink}/>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>

              </Accordion>
            </Box>
          </ListItem>
        ))}
      </FireNav>
    </ThemeProvider>
  );
};

export default memo(AddedSprints);