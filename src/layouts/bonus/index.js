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

function Bonuses() {
  const [data, setData] = useState([]);
  const [valueTab, setValueTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

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
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Danh sách trả thưởng</ArgonTypography>
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
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example">
                  <Tab label="Đã trả" {...a11yProps(0)} />
                  <Tab label="Chưa trả" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={valueTab} index={0}>
              <Table columns={columns} rows={rows} />
              </CustomTabPanel>
              <CustomTabPanel value={valueTab} index={1}>
              <Table columns={columns} rows={rows} />
              </CustomTabPanel>
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Bonuses;
