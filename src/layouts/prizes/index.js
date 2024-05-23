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
import authorsTableData from "layouts/prizes/data/authorsTableData";
import { useCallback, useEffect, useState } from "react";
import ModalEdit from "./ModalEdit";
import { Button } from "@mui/material";

function Prizes() {
  const [data, setData] = useState([]);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [prizeSelected, setPrizeSelected] = useState();
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


  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("prize");
    if (res.data?.data?.length) {
      setData(res.data?.data?.sort((a, b) => a.order - b.order));
    } else {
      setData([]);
    }
    } catch (error) {
      handleVisibleAlert("Có lỗi xảy ra!", true)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (ids) => {
    try {
      if (compact(ids)?.length)
        await api.post("prize/remove-prizes", { data: { ids: compact(ids) } });
      fetchData();
      handleVisibleAlert("Xóa thành công")
    } catch (error) {
      handleVisibleAlert("Có lỗi xảy ra!", true)
    }
  }, []);

  const handleOpenEdit = useCallback((member) => {
    setPrizeSelected(member);
    setVisibleEdit(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisibleEdit(false);
    setPrizeSelected(undefined);
  }, []);

  const handleEdit = useCallback(
    async (newMember) => {
      try {
        if (newMember._id) {
          await api.put(`prize/${newMember._id}`, { data: newMember });
          await fetchData();
        } else {
          await api.post(`prize`, { data: newMember });
          await fetchData();
        }
        handleClose();
        handleVisibleAlert("Cập nhật thành công")
      } catch (error) {
        handleVisibleAlert("Có lỗi xảy ra!", true)
      }
    },
    [fetchData]
  );

  const { columns, rows } = authorsTableData(data, handleDelete, handleOpenEdit);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Danh sách giải thưởng</ArgonTypography>
              <Button onClick={() => setVisibleEdit(true)}>Thêm giải thưởng</Button>
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
        prize={prizeSelected}
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

export default Prizes;
