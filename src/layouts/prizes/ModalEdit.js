import { Button, Modal, Box, MenuItem, InputLabel } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
        <ArgonTypography size="lg">Thông tin giải thưởng</ArgonTypography>
        <ArgonBox component="form" role="form" mt={2}>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Tên giải thưởng
            </ArgonTypography>
            <ArgonInput
              value={member?.code}
              onChange={(v) => handleChangeValue("name", v.target.value)}
              size="large"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Số tiền thưởng
            </ArgonTypography>
            <ArgonInput
              value={member?.betAmount}
              onChange={(v) => handleChangeValue("betAmount", v.target.value)}
              size="large"
              type="number"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Tỷ lệ chiến thắng (%)
            </ArgonTypography>
            <ArgonInput
              value={member?.betAmount}
              onChange={(v) => handleChangeValue("timesJoin", v.target.value)}
              placeholder="Số lần tham gia"
              size="large"
              type="number"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Số thứ tự
            </ArgonTypography>
            <ArgonInput
              value={member?.betAmount}
              onChange={(v) => handleChangeValue("order", v.target.value)}
              size="large"
              type="number"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Trạng thái
            </ArgonTypography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Trạng thái"
              // value={itemSelected?.status}
            >
              <MenuItem value={"Hoạt Đông"}>Hoạt động</MenuItem>
              <MenuItem value={"Tạm dừng"}>Tạm Dừng</MenuItem>
            </Select>
          </ArgonBox>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button style={{ border: "1px solid" }} onClick={() => handleEdit(itemSelected)}>
              {itemSelected ? "Cập nhật" : "Thêm"}
            </Button>
          </Box>
        </ArgonBox>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
