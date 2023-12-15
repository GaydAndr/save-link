const JSONDownloadBTN = (data) => {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Link-List.json";
    anchor.click();
  };
export default JSONDownloadBTN;