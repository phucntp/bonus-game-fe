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
import authorsTableData from "layouts/bonus/data/authorsTableData";
import { useCallback, useEffect, useState } from "react";
import { Box, Button, MenuItem, Select } from "@mui/material";

function Permissions() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await api.get("user");
    setData(res.data?.data || []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (ids) => {
    try {
      if (compact(ids)?.length)
        await api.post("bonus/remove-members", { data: { ids: compact(ids) } });
    } catch (error) {}
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <Box
              style={{
                width: "450px",
                backgroundColor: "#ffffff",
                // height: "460px",
                padding: "15px",
                fontSize: "12px",
              }}
            >
              <ArgonTypography size="lg">Thiết lập quyền</ArgonTypography>
              <ArgonBox component="form" role="form" mt={2}>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Tài khoản
                  </ArgonTypography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Trạng thái"
                    // value={itemSelected?.status}
                  >
                    <MenuItem value={"Hoạt Đông"}>User 1</MenuItem>
                    <MenuItem value={"Tạm dừng"}>User 2</MenuItem>
                  </Select>
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Quyền
                  </ArgonTypography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Trạng thái"
                    // value={itemSelected?.status}
                  >
                    <MenuItem value={"Hoạt Đông"}>Quản lý thành viên</MenuItem>
                    <MenuItem value={"Tạm dừng"}>Quản lý hoạt động quay thưởng</MenuItem>
                    <MenuItem value={"Tạm dừng"}>Quản lý trang</MenuItem>
                  </Select>
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
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Permissions;
