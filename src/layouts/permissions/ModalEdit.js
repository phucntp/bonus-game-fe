import { Button, Modal, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography";
import React, { useCallback, useEffect, useState } from "react";

const ModalEdit = ({ visible, handleClose, handleEdit, member, users }) => {
  const [itemSelected, setItemSelected] = useState();

  const handleChangeValue = useCallback((key, value) => {
    setItemSelected((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    setItemSelected(member);
  }, [member]);

  const closeModal = useCallback(() => {
    handleClose();
    setItemSelected(undefined);
  }, []);

  return (
    <Modal
      open={visible}
      onClose={closeModal}
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
        <ArgonTypography size="lg">Thông tin phân quyền</ArgonTypography>
        <ArgonBox component="form" role="form" mt={2}>
          <ArgonBox mb={2}>
          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Tài khoản</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={itemSelected?.user}
    label="Tài khoản"
    onChange={(v) => handleChangeValue('user', v)}
  >
    {(users || []).map((user) => {
      return (<MenuItem value={user._id}>{user.name || ''}</MenuItem>)
    })}
  </Select>
</FormControl>
          </ArgonBox>
          <ArgonBox mb={2}>
          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Tài khoản</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={itemSelected?.permissions}
    label="Tài khoản"
    onChange={(v) => handleChangeValue('permissions', v)}
    multiple
  >
    {(users || []).map((user) => {
      return (<MenuItem value={user._id}>{user.name || ''}</MenuItem>)
    })}
  </Select>
</FormControl>
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
