import React, {memo, useEffect, useRef, useState} from 'react';
// import {getData} from "../../service/getData";
import {InputBase, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import InputField from "../InputField/InputField";


const AddedSprints = () => {
  const [dataList, setDataList] = useState([]);

  // useEffect(() => {
  //   getData().then((data) => {
  //     const parsedData = data.map((el) => JSON.parse(el))
  //     setDataList(parsedData);
  //   })
  // }, []);

  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const downloadFile = () => {
    const blob = new Blob([text, ...data], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "file.txt";
    anchor.click();
  };
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Введіть текст"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => setData([...data, Math.random().toString()])}>
          Додати дані
        </button>
        <button onClick={downloadFile}>Завантажити</button>
        <button onClick={handleClick}>
          Focus the input
        </button>
        {/*<InputBase*/}
        {/*  required*/}
        {/*  inputRef={inputRef}*/}
        {/*  fullWidth*/}
        {/*  name={'name'}*/}
        {/*  placeholder={'placeholder'}*/}
        {/*/>*/}
        <InputField
          placeholder='Назва спринта'
          flex={10}
          value={text}
          refValue={inputRef}
        />
      </div>
      <List>
        {dataList?.map((el) => {
          return (
            <ListItem key={el.id} disablePadding>
              <ListItemText primary={el.sprintTitle}/>
              {/*<List>*/}
              {/*  {el.sprintLinks.map((item) => {*/}
              {/*    console.log(item)*/}
              {/*    return (*/}
              {/*      <ListItem key={item.id} disablePadding>*/}
              {/*        <ListItemButton component={'a'} href={`#${item.body}`}}>*/}
              {/*          <ListItemText primary={item.title}/>*/}
              {/*          <ListItemText primary={item.type}/>*/}
              {/*        </ListItemButton>*/}
              {/*      </ListItem>*/}
              {/*    )*/}
              {/*  })*/}
              {/*  }*/}
              {/*</List>*/}
            </ListItem>
          )
        })}
      </List>
    </div>
  );
};

export default memo(AddedSprints);