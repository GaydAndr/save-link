import { Document, Packer, Paragraph, TextRun } from "docx"; // Забрав зайві імпорти
import { saveAs } from "file-saver";

// Конфігурації та стилі можна залишити, якщо вони тобі подобаються

const DocxDownloadBTN = (data) => {
  const sections = [
    new Paragraph({ // Головний заголовок
      children: [
        new TextRun({ text: "Мої списки слів", bold: true, size: 40 }),
      ],
    }),
  ];

  data.forEach((list) => {
    // Заголовок списку
    const listTitle = new Paragraph({
      text: list.listName, // Використовуємо listName
      heading: "Heading1",
      spacing: { before: 200, after: 100 },
    });
    sections.push(listTitle);

    // Слова зі списку
    list.words.forEach((wordPair) => { // Ітеруємось по words
      const wordParagraph = new Paragraph({
        // Використовуємо табуляцію для відступу
        text: `\t${wordPair.word} - ${wordPair.translation}`, // Використовуємо word і translation
        style: "WellSpaced",
      });
      sections.push(wordParagraph);
    });
  });

  const doc = new Document({
    // Можна додати стилі, якщо потрібно
    sections: [{ children: sections }],
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, "Word-Lists.docx");
  });
}

export default DocxDownloadBTN;