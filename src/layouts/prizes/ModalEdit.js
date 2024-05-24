import { Button, Modal, Box, MenuItem, InputLabel, FormControl } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography";
import React, { useCallback, useEffect, useState } from "react";
import api from "layouts/axios";
import AutoCloseMessage from "examples/AutoMessage";

const ModalEdit = ({ visible, handleClose, handleEdit, prize }) => {
  const [itemSelected, setItemSelected] = useState();
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [isError, setIsError] = useState(false)

  const handleVisibleAlert = useCallback((message, error) => {
    setVisibleMessage(true)
    setMessage(message);
    if(error) {
      setIsError(true)
    }
  }, [])

  const handleChangeValue = useCallback((key, value) => {
    setItemSelected((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    setItemSelected(prize);
  }, [prize]);

  const closeModal = useCallback(() => {
    handleClose();
    setItemSelected(undefined);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    // Check if any file is selected
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      // Check if the selected file is an image
      if (imageFile.type.startsWith("image/")) {
        setSelectedImage(imageFile);
      } else {
        handleVisibleAlert("Please select an image file.", true)
      }
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      handleVisibleAlert("Please select an image.", true)
      return;
    }

    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("image", selectedImage);

    // Make a POST request to your API endpoint
    api
      .post(
        "files/upload",
        { data: formData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Upload successful:", response.data);
        // Handle response if needed
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error if needed
      });
  };

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
        <ArgonTypography size="lg">Thông tin giải thưởng</ArgonTypography>
        <ArgonBox component="form" role="form" mt={2}>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Tên giải thưởng
            </ArgonTypography>
            <ArgonInput
              value={itemSelected?.name}
              onChange={(v) => handleChangeValue("name", v.target.value)}
              size="large"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Số tiền thưởng
            </ArgonTypography>
            <ArgonInput
              value={itemSelected?.numberBonus}
              onChange={(v) => handleChangeValue("numberBonus", v.target.value)}
              size="large"
              type="number"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonTypography fontSize="16px" size="sm">
              Tỷ lệ chiến thắng (%)
            </ArgonTypography>
            <ArgonInput
              value={itemSelected?.percentWin}
              onChange={(v) => handleChangeValue("percentWin", v.target.value)}
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
              value={itemSelected?.order}
              onChange={(v) => handleChangeValue("order", v.target.value)}
              size="large"
              type="number"
            />
          </ArgonBox>
          <ArgonBox mb={2}>
            {/* <ArgonTypography fontSize="16px" size="sm">
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
            </Select> */}
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tài khoản</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={itemSelected?.status}
              label="Trạng thái"
              onChange={(v) => handleChangeValue('status', v)}
            >
            <MenuItem value={"Hoạt Đông"}>Hoạt động</MenuItem>
                        <MenuItem value={"Tạm dừng"}>Tạm Dừng</MenuItem>
            </Select>
          </FormControl>
          </ArgonBox>
          <div>
            <h2>Upload Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
              <div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              </div>
            )}
            <button onClick={handleUpload}>Upload</button>
          </div>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button style={{ border: "1px solid", marginRight: "10px" }} onClick={() => handleEdit(itemSelected)}>
              {itemSelected ? "Cập nhật" : "Thêm"}
            </Button>
            <Button style={{ border: "1px solid" }} onClick={closeModal} color="secondary">
              Hủy
            </Button>
          </Box>
        </ArgonBox>
        <AutoCloseMessage
          message={message}
          visible={visibleMessage}
          setVisible={setVisibleMessage}
          status={!!isError && "error"}
        />
      </Box>
    </Modal>
  );
};

export default ModalEdit;
