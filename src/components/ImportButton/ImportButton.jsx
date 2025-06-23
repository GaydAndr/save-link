import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import ActionBtn from "../ActionBtn/ActionBtn";
import { wordListAction } from "../../redux/wordList_slice";
import {isValidWordList} from "../../utils/validators";

const parseAndValidateFile = (file, dispatch) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const content = event.target.result;
      const parsedData = JSON.parse(content);

      if (!Array.isArray(parsedData)) {
        throw new Error("Файл має містити масив даних.");
      }

      if (!parsedData.every(isValidWordList)) {
        throw new Error("Структура даних у файлі не відповідає очікуваному формату.");
      }

      console.log("Файл успішно розпарсено:", parsedData);

      dispatch(wordListAction.importLists(parsedData));

      alert('Списки слів успішно імпортовано!');

    } catch (error) {
      console.error("Помилка імпорту:", error);
      alert(`Помилка: не вдалося імпортувати файл. Переконайтеся, що це коректний JSON файл.\n(${error.message})`);
    }
  };

  reader.onerror = () => {
    alert('Не вдалося прочитати файл.');
  };

  reader.readAsText(file);
};


const ImportButton = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/json") {
        parseAndValidateFile(file, dispatch);
      } else {
        alert("Будь ласка, виберіть файл у форматі .json");
      }
    }
    event.target.value = null;
  };

  return (
    <>
      <ActionBtn
        text={"Імпортувати слова"}
        color={'info'}
        variant={'contained'}
        funcs={handleButtonClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: 'none' }}
      />
    </>
  );
};

export default ImportButton;