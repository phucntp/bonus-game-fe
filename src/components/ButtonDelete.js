import React, { useCallback, useState } from "react";
import ArgonTypography from "./ArgonTypography";
import ArgonBox from "./ArgonBox";
import ModalDelete from "./ModalDelete";

const ButtonDelete = ({ handleDelete, title, content }) => {
  const [visible, setVisible] = useState(false);

  const handleConfirmDelete = useCallback(() => {
    if (handleDelete) handleDelete();
    setVisible(false);
  }, []);

  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <ArgonBox style={{display: "flex"}}>
      <ArgonTypography
        component="a"
        href="#"
        variant="caption"
        color="#ff0000"
        fontWeight="medium"
        ml={2}
        onClick={() => setVisible(true)}
      >
        Xóa
      </ArgonTypography>
      <ModalDelete
        visible={visible}
        title={title}
        content={content}
        handleSave={handleConfirmDelete}
        handleClose={onCloseModal}
      />
    </ArgonBox>
  );
};

export default ButtonDelete;
