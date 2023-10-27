export const cssStyleModules = {
  resize: {
    resize: "vertical",
  },
  row: (rowH: number) => {
    return {
      height: `${rowH}px`,
    };
  },
  textarea: {
    overflowX: "hidden",
    overflowY: "auto",
  },
  autogrow: {
    height: "auto",
    whiteSpace: "wrap",
  },
  input: {
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  },
  editableContainer: (baseHeight: number) => {
    return {
      minHeight: `${baseHeight}px`,
      width: "180px",
      display: "block",
      padding: "5px 15px",
      lineHeight: "1.5",
      boxSizing: "border-box",
      fontSize: "inherit",
      color: "#606266",
      backgroundColor: "#ffffff",
      backgroundImage: "none",
      border: "1px solid #dcdfe6",
      borderRadius: "4px",
      transition: "border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
    };
  },
};
