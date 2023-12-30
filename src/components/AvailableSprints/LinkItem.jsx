import React from 'react';
import {ListItemButton, ListItemText} from "@mui/material";

const LinkItem = ({item}) => {
  return (
      <ListItemButton
        component={'a'}
        href={item.href}
        target={'_blank'}
        sx={{
          py: 0,
          minHeight: 50,
          color: "rgba(32,5,42,0.8)",

        }}
      >
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: "medium",
          }}
        />
        <ListItemText
          primary={item.type}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: "medium",
          }}
        />
      </ListItemButton>
  );
};

export default LinkItem;