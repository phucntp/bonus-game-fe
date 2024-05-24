
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";

// Argon Dashboard 2 MUI base styles
import { useCallback, useEffect, useState } from "react";
import api from "layouts/axios";
import numeral from "numeral";

function Default() {
  const [dataDashboard, setDataDashboard] = useState()

  const getDate = useCallback(async () => {
    const res = await api.post('member/dashboard', {})
    setDataDashboard(res?.data || {
      countMember: 0,
      countBonus: 0,
      countRote: 0,
      countAverage: 0,
    })
  }, [])

  useEffect(() => {
    getDate()
  }, [getDate])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3} style={{ height: "400px" }}>
            <DetailedStatisticsCard
              title="Tổng số tiền cược"
              count={`$${numeral(dataDashboard?.countBonus || 0).format("0,0")}`}
              height="150px"
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Tổng số thành viên"
              count={dataDashboard?.countMember || 0}
              height="150px"
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Tổng số lần quay thưởng"
              count={dataDashboard?.countRote || 0}
              height="150px"
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Số lần quay trung bình mỗi người"
              count={dataDashboard?.countAverage || 0}
              height="150px"
              icon={{ color: "warning", component: <i className="ni ni-paper-diploma" /> }}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Default;
