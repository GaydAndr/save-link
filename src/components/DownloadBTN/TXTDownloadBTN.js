const TXTDownloadBTN = (data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Link-List.txt";
  anchor.click();
};
export default TXTDownloadBTN;
