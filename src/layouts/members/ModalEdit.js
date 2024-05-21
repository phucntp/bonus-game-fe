import { Button, Modal, Box } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography";
import React, { useCallback, useEffect, useState } from "react";

const ModalEdit = ({ visible, handleClose, handleEdit, member }) => {
  const [itemSelected, setItemSelected] = useState();

  const handleChangeValue = useCallback((key, value) => {
    setItemSelected((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    setItemSelected(member);
  }, [member]);

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
      }}
    >
      <Box
        style={{
          width: "450px",
          backgroundColor: "#ffffff",
          // height: "460px",
          padding: "15px",
          fontSize: "12px",
        }}
      >
        <ArgonTypography size="lg">Thông tin thành viên</ArgonTypography>
        <ArgonBox component="form" role="form" mt={2}>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Số hiệu tài khoản
            </ArgonTypography>
            <ArgonInput
              value={itemSelected?.code}
              onChange={(v) => handleChangeValue("code", v.target.value)}
              size="large"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Số Tiền Cược/Đặt Cọc Hiệu Quả
            </ArgonTypography>
            <ArgonInput
              value={itemSelected?.betAmount}
              onChange={(v) => handleChangeValue("betAmount", v.target.value)}
              size="large"
              type="number"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Số lần tham gia
            </ArgonTypography>
            <ArgonInput
              value={itemSelected?.timesJoin}
              onChange={(v) => handleChangeValue("timesJoin", v.target.value)}
              size="large"
              type="number"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Số lần còn lại
            </ArgonTypography>
            <ArgonInput
              value={itemSelected?.timesRest}
              onChange={(v) => handleChangeValue("timesRest", v.target.value)}
              size="large"
              type="number"
            />
          </ArgonBox>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button style={{ border: "1px solid" }} onClick={() => handleEdit(itemSelected)}>
              Cập nhật
            </Button>
          </Box>
        </ArgonBox>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
