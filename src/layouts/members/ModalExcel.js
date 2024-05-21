import {
  Button,
  Modal,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography";
import React, { useEffect, useState } from "react";
// import XLSX from "xlsx";

const ModalExcel = ({ visible, handleClose }) => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // reader.onload = (e) => {
    //   const workbook = XLSX.read(e.target.result, { type: "binary" });
    //   const sheetName = workbook.SheetNames[0];
    //   const sheet = workbook.Sheets[sheetName];
    //   const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    //   setData(parsedData);
    // };

    reader.readAsBinaryString(file);
  };
  return (
    <Modal
      open={visible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
      }}
    >
      <Box
        style={{
          width: "450px",
          backgroundColor: "#ffffff",
          padding: "30px",
          fontSize: "12px",
        }}
      >
        <ArgonTypography size="lg">Thông tin import</ArgonTypography>
        <input accept=".xlsx, .xls" type="file" id="excel-file" onChange={handleFileUpload} />
        <Button size="sm">Tải xuống file mẫu</Button>
      </Box>
    </Modal>
  );
};

export default ModalExcel;
