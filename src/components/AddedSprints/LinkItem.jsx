import React from 'react';
import {ListItem, ListItemButton, ListItemText} from "@mui/material";

const LinkItem = ({item}) => {
  return (
      <ListItemButton
        component={'a'}
        href={item.href}
        target={'_blank'}
        sx={{
          py: 0,
          minHeight: 32,
          color: 'rgba(255,255,255,.8)'
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