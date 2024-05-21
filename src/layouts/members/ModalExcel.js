import { Button, Modal, Box } from "@mui/material";
import ArgonTypography from "components/ArgonTypography";
import React, { useCallback, useEffect, useState } from "react";
import { read, utils, writeFile } from "xlsx";
import { fitToColumn, styleExcel } from "./excel";

const ModalExcel = ({ visible, handleClose, handleImport }) => {
  const [data, setData] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataExcel = utils.sheet_to_json(sheet, { header: 1 });
      const dataReadExcel = [];
      let itemAdd = {};
      for (let j = 1; j < dataExcel.length; j += 1) {
        for (let i = 0; i < dataExcel[0].length; i += 1) {
          if (dataExcel[0][i]) {
            if (String(dataExcel[0][i]).trim() === "Mã thành viên") {
              itemAdd = Object.assign(itemAdd, {
                code: dataExcel[j][i] || "",
              });
            } else if (String(dataExcel[0][i]).trim() === "Số tiền cược/Đặt cọc hiệu quả") {
              itemAdd = Object.assign(itemAdd, {
                betAmount: dataExcel[j][i] || "",
              });
            } else if (String(dataExcel[0][i]).trim() === "Tổng số lần tham gia") {
              itemAdd = Object.assign(itemAdd, {
                timesJoin: dataExcel[j][i] || "",
              });
            } else if (String(dataExcel[0][i]).trim() === "Số lần còn lại") {
              itemAdd = Object.assign(itemAdd, {
                timesRest: dataExcel[j][i] || "",
              });
            } else if (String(dataExcel[0][i]).trim() === "Tên người vận hành") {
              itemAdd = Object.assign(itemAdd, {
                nameAdmin: dataExcel[j][i] || "",
              });
            }
          }
          if (i === dataExcel[0].length - 1) {
            dataReadExcel.push(itemAdd);
            itemAdd = {};
          }
        }
      }
      setData(dataReadExcel);
    };

    reader.readAsBinaryString(file);
  };

  const exportExcelTemPlate = useCallback(async () => {
    const headers = [
      "Mã thành viên",
      "Số tiền cược/Đặt cọc hiệu quả",
      "Tổng số lần tham gia",
      "Số lần còn lại",
      "Tên người vận hành",
    ];
    const finalData = [];
    finalData.push(headers);
    const fileName = `MauThanhVien.xlsx`;
    const ws = utils.aoa_to_sheet(finalData);
    ws["!cols"] = fitToColumn(finalData, finalData.length);
    styleExcel(ws, finalData.length);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "SheetJS");
    writeFile(wb, fileName);
  }, []);

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
          padding: "15px 30px",
          fontSize: "12px",
        }}
      >
        <ArgonTypography size="lg" mb={4}>
          Thông tin import
        </ArgonTypography>
        <input accept=".xlsx, .xls" type="file" id="excel-file" onChange={handleFileUpload} />
        <Button
          size="sm"
          onClick={() => {
            exportExcelTemPlate();
            setData(undefined);
          }}
        >
          Tải xuống file mẫu
        </Button>
        <Box
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button style={{ border: "1px solid" }} onClick={() => handleImport(data)}>
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalExcel;
