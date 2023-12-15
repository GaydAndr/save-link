import {
  AlignmentType,
  convertInchesToTwip, Document,
  ExternalHyperlink,
  HeadingLevel,
  LevelFormat, Packer,
  Paragraph,
  TextRun
} from "docx";
import {saveAs} from "file-saver";

const docxNumberingConfig = {
  config: [
    {
      reference: "my-numbering",
      levels: [
        {
          level: 0,
          format: LevelFormat.UPPER_ROMAN,
          text: "%1",
          alignment: AlignmentType.START,
          style: {
            paragraph: {
              indent: {
                left: convertInchesToTwip(0.3),
                hanging: convertInchesToTwip(0.18),
              },
            },
          },
        },
        {
          level: 1,
          format: LevelFormat.DECIMAL,
          text: "%2)",
          alignment: AlignmentType.START,
          style: {
            paragraph: {
              size: 48,
              indent: {
                left: convertInchesToTwip(0.7),
                hanging: convertInchesToTwip(0.18)
              },
            },
          },
        },
      ],
    },
  ],
}
const docxListTitle = new Paragraph({
  spacing: {
    before: 100,
  },
  numbering: {
    reference: "my-numbering",
    level: 0,
  },
  heading: HeadingLevel.HEADING_1,
  children: [
    new TextRun({
      text: "docxListTitle",
      size: 36,
      color: "000000"
    }),
  ],
})
const docxListLink = new Paragraph({
  spacing: {
    before: 50,
  },
  numbering: {
    reference: "my-numbering",
    level: 1,
  },
  children: [
    new ExternalHyperlink({
      children: [
        new TextRun({
          text: "docxListLink",
          style: "Hyperlink",
          size: 28,
          color: "000000"
        }),
      ],
      link: "https://www.youtube.com/watch?v=zxd5-aTi8i0&ab_channel=PhonkPalace",
    }),
  ]
})
const docxMainTitle = new Paragraph({
  // spacing: {
  //   before: 150,
  // },
  children: [
    new TextRun({
      text: "\t\tСписок Посилань",
      bold: true,
      allCaps: true,
      size: 40,
    }),
  ],
})

const DocxDownloadBTN = (data) => {
  const sections = [
    docxMainTitle
  ];
  data.forEach((sprint) => {
    const sprintTitle = new Paragraph({
      spacing: {before: 100},
      numbering: {reference: 'my-numbering', level: 0},
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text: sprint.sprintTitle,
          size: 36,
          color: '000000',
        }),
      ],
    });
    sections.push(sprintTitle);
    sprint.sprintLinks.forEach((link) => {
      const linkParagraph = new Paragraph({
        spacing: {before: 50},
        numbering: {reference: 'my-numbering', level: 1},
        children: [
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: link.title,
                style: 'Hyperlink',
                size: 28,
                color: '000000',
              }),
            ],
            link: link.href,
          }),
        ],
      });

      sections.push(linkParagraph);
    });
  });
  const doc = new Document({
    numbering: docxNumberingConfig,
    sections: [{children: sections}],
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, "Link-List.docx");
  });
}

export default DocxDownloadBTN;