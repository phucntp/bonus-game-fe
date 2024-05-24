import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import api from "layouts/axios";
import { compact } from "lodash";

// Data
import authorsTableData from "layouts/members/data/authorsTableData";
import { useCallback, useEffect, useState } from "react";
import ModalEdit from "./ModalEdit";
import AutoCloseMessage from "examples/AutoMessage";

function Members() {
  const [data, setData] = useState([]);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [memberSelected, setMemberSelected] = useState();
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [isError, setIsError] = useState(false)

  const fetchData = useCallback(async () => {
    const res = await api.get("user");
    setData(res.data?.data || []);
  }, []);

  const handleVisibleAlert = useCallback((message, error) => {
    setVisibleMessage(true)
    setMessage(message);
    if(error) {
      setIsError(true)
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (ids) => {
    try {
      if (compact(ids)?.length)
        await api.post("permission/remove-permission", { data: { ids: compact(ids) } });

      await fetchData();
      handleVisibleAlert("Xóa thành công")
    } catch (error) {
      handleVisibleAlert("Có lỗi xảy ra!", true)
    }
  }, []);

  const handleOpenEdit = useCallback((member) => {
    setMemberSelected(member);
    setVisibleEdit(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisibleEdit(false);
    setMemberSelected(undefined);
  }, []);

  const handleEdit = useCallback(async (newMember) => {
    try {
      if(!newMember.permissions) {
        handleVisibleAlert("Vui lòng nhập quyền", true)
        return;
      }
      if(!newMember.user) {
        handleVisibleAlert("Vui lòng nhập người được phân quyền", true)
        return;
      }
      if(newMember?._id) {
        await api.put(`permission/${newMember._id}`, { data: newMember });
        await fetchData();
        handleVisibleAlert("Câp nhật quyền thành công")
      } else {
        await api.post(`permission`, { data: newMember });
        handleVisibleAlert("Thêm quyền thành công")
      }
      handleClose();
    } catch (error) {
      handleVisibleAlert("Có lỗi xảy ra!", true)
    }
  }, [fetchData]);

  const { columns, rows } = authorsTableData(data, handleDelete, handleOpenEdit);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Danh sách người dùng</ArgonTypography>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <ModalEdit
        visible={visibleEdit}
        member={memberSelected}
        handleEdit={handleEdit}
        handleClose={handleClose}
      />
      <AutoCloseMessage
          message={message}
          visible={visibleMessage}
          setVisible={setVisibleMessage}
          status={!!isError && "error"}
        />
    </DashboardLayout>
  );
}

export default Members;
