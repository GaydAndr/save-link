import React, {memo} from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box,
  createTheme,
  List,
  ListItem,
  styled,
  ThemeProvider, Zoom
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useSelector} from "react-redux";
import {getListOfSprints} from "../../redux/sprint_slice";
import LinkItem from "./LinkItem";
import LinkHeader from "./LinkHeader";
import ActionBtn from "../ActionBtn/ActionBtn";
import DocxDownloadBTN from "../DownloadBTN/DocxDownloadBTN";
import DownloadBtn from "../DownloadBTN/DownloadBTN";
import BtnStack from "./BtnStack";

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
          background: {paper: "rgb(154,154,154)"},
        },
      })}
    >
      {/*<Zoom in={ListOfSprints}>*/}

        {ListOfSprints.length > 0 && <BtnStack/>}
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
                            bgcolor: 'rgba(215,215,215,0.8)',
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
      {/*</Zoom>*/}
    </ThemeProvider>

  );
};

export default memo(AddedSprints);