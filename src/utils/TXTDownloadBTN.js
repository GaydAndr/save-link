const TXTDownloadBTN = (data) => {
  let textContent = '';
  data.forEach(list => {
    textContent += `Список: ${list.listName}\n`;
    list.words.forEach(wordPair => {
      textContent += `  - ${wordPair.word} - ${wordPair.translation}\n`;
    });
    textContent += '\n'; // Пустий рядок між списками
  });
  const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Link-List.txt";
  anchor.click();
};
export default TXTDownloadBTN;
