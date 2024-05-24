import { Button, Modal, Box } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import React, { useCallback, useEffect, useState } from "react";

const ModalDelete = ({ visible, handleClose, handleSave, title, content }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const closeModal = useCallback(() => {
    if (handleClose) handleClose();
    setOpen(false);
  }, []);

  const handleOk = useCallback(() => {
    if (handleSave) handleSave();
    setOpen(false);
  }, []);

  return (
    <Modal
      open={open}
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
          padding: "15px",
          fontSize: "12px",
        }}
      >
        <ArgonTypography size="lg">{title || "Xác nhận xóa"}</ArgonTypography>
        <ArgonBox component="form" role="form" mt={2}>
          <ArgonBox>{content || "Bạn chắc chắn muốn xóa?"}</ArgonBox>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button style={{ border: "1px solid", marginRight: "10px" }} className="!mr-2" onClick={handleOk} color="primary">
              Có
            </Button>
            <Button style={{ border: "1px solid" }} onClick={closeModal} color="secondary">
              Không
            </Button>
          </Box>
        </ArgonBox>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
