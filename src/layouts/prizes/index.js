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
  const [memberSelected, setMemberSelected] = useState();

  const fetchData = useCallback(async () => {
    const res = await api.get("prize");
    setData(res.data?.data || []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (ids) => {
    try {
      if (compact(ids)?.length) await api.post("price", { data: { ids: compact(ids) } });
    } catch (error) {}
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
      if (newMember) {
        await api.put(`prize/${newMember._id}`, { data: newMember });
      } else {
        await api.post(`prize`, { data: newMember });
      }
    } catch (error) {}
  }, []);

  const { columns, rows } = authorsTableData(data, handleDelete, handleOpenEdit);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Danh sách thành viên</ArgonTypography>
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
        member={memberSelected}
        handleEdit={handleEdit}
        handleClose={handleClose}
      />
    </DashboardLayout>
  );
}

export default Prizes;
