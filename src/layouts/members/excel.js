import { set } from "lodash";

export const fitToColumn = (exportData, indexHeader) => {
  // get maximum character of each column
  return exportData[indexHeader - 1].map((a, i) => ({
    wch: Math.max(
      ...exportData.map((a2) =>
        // eslint-disable-next-line no-nested-ternary
        a2[i] && a2[i].toString().length < 30
          ? a2[i].toString().length + 5
          : // eslint-disable-next-line no-nested-ternary
          a2[i] && a2[i].toString().length < 150
          ? a2[i].toString().length / 2
          : a2[i] && a2[i].toString().length > 150
          ? 70
          : 0
      )
    ),
  }));
};

export const styleExcel = (ws, indexHeader) => {
  const keys = Object.keys(ws);
  keys.forEach((key) => {
    if (key.replace(/[^0-9]/gi, "") === indexHeader?.toString()) {
      set(ws[key], "s", {
        fill: {
          fgColor: { rgb: "4f81bd" }, // add background color
        },

        font: {
          name: "Song Ti", // font
          sz: 12, // font size
          bold: true, // bold,
          color: {
            rgb: "FFFFFF",
          },
        },
        border: {
          // underline
          bottom: {
            style: "thin",
          },
          top: {
            style: "thin",
            color: "FF000000",
          },
        },
      });
    }
    if (Number(key.replace(/[^0-9]/gi, "")) !== indexHeader) {
      set(ws[key], "s", {
        alignment: { wrapText: true, horizontal: "left", vertical: "top" },
      });
    }
  });
};
