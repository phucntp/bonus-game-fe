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
import { Box, Button } from "@mui/material";
import ArgonInput from "components/ArgonInput";

function SettingDate() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await api.get("bonus");
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

  const { columns, rows } = authorsTableData(data, handleDelete);

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
              <ArgonTypography size="lg">Thiết lập thời gian</ArgonTypography>
              <ArgonBox component="form" role="form" mt={2}>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Thời gian bắt đầu tổng cộng
                  </ArgonTypography>
                  <ArgonInput
                    onChange={(v) => handleChangeValue("betAmount", v.target.value)}
                    size="large"
                    type="date"
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Thời gian kết thúc tổng cộng
                  </ArgonTypography>
                  <ArgonInput
                    onChange={(v) => handleChangeValue("timesJoin", v.target.value)}
                    size="large"
                    type="date"
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Thời gian bắt đầu hàng ngày
                  </ArgonTypography>
                  <ArgonInput
                    onChange={(v) => handleChangeValue("timesRest", v.target.value)}
                    size="large"
                    type="date"
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Thời gian kết thúc hàng ngày
                  </ArgonTypography>
                  <ArgonInput
                    onChange={(v) => handleChangeValue("timesRest", v.target.value)}
                    size="large"
                    type="date"
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
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default SettingDate;
