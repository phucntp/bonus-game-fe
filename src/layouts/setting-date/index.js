import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import api from "layouts/axios";

// Data
import { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ArgonInput from "components/ArgonInput";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function SettingDate() {
  const [data, setData] = useState();
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
    const res = await api.get("date-price");
    const convertDate = {
      ...res.data?.data?.[0],
      sumStart: res.data?.data?.[0]?.sumStart
        ? dayjs(res.data?.data?.[0]?.sumStart).format("HH:mm")
        : "",
      sumEnd: res.data?.data?.[0]?.sumEnd ? dayjs(res.data?.data?.[0]?.sumEnd).format("HH:mm") : "",
      dailyStart: res.data?.data?.[0]?.dailyStart
        ? dayjs(res.data?.data?.[0]?.dailyStart).format("HH:mm")
        : "",
      dailyEnd: res.data?.data?.[0]?.dailyEnd
        ? dayjs(res.data?.data?.[0]?.dailyEnd).format("HH:mm")
        : "",
    };
    setData(convertDate || {});
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangeValue = useCallback((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleEdit = useCallback(
    async (newDate) => {
      try {
        const convertDate = {
          ...newDate,
          sumStart: newDate?.sumStart ? dayjs(newDate?.sumStart, "HH:mm").toISOString() : "",
          sumEnd: newDate?.sumEnd ? dayjs(newDate?.sumEnd, "HH:mm").toISOString() : "",
          dailyStart: newDate?.dailyStart ? dayjs(newDate?.dailyStart, "HH:mm").toISOString() : "",
          dailyEnd: newDate?.dailyEnd ? dayjs(newDate?.dailyEnd, "HH:mm").toISOString() : "",
        };
        if (newDate._id) {
          await api.put(`date-price/${newDate._id}`, { data: convertDate });
          await fetchData();
          handleVisibleAlert("Cập nhật thành công")
        } else {
          await api.post(`date-price`, { data: convertDate });
          await fetchData();
          handleVisibleAlert("Tạo mới thành công")
        }
      } catch (error) {
        console.log(error, "err");
        handleVisibleAlert("Có lỗi xảy ra!", true)
      }
    },
    [fetchData]
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <Box
              style={{
                backgroundColor: "#ffffff",
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
                    onChange={(v) => handleChangeValue("sumStart", v.target.value)}
                    size="large"
                    type="time"
                    value={data?.sumStart}
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Thời gian kết thúc tổng cộng
                  </ArgonTypography>
                  <ArgonInput
                    onChange={(v) => handleChangeValue("sumEnd", v.target.value)}
                    size="large"
                    type="time"
                    value={data?.sumEnd}
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Thời gian bắt đầu hàng ngày
                  </ArgonTypography>
                  <ArgonInput
                    onChange={(v) => handleChangeValue("dailyStart", v.target.value)}
                    size="large"
                    type="time"
                    value={data?.dailyStart}
                  />
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonTypography fontSize="16px" size="sm">
                    Thời gian kết thúc hàng ngày
                  </ArgonTypography>
                  <ArgonInput
                    onChange={(v) => handleChangeValue("dailyEnd", v.target.value)}
                    size="large"
                    type="time"
                    value={data?.dailyEnd}
                  />
                </ArgonBox>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button style={{ border: "1px solid" }} onClick={() => handleEdit(data)}>
                    Cập nhật
                  </Button>
                </Box>
              </ArgonBox>
            </Box>
            <AutoCloseMessage
          message={message}
          visible={visibleMessage}
          setVisible={setVisibleMessage}
          status={!!isError && "error"}
        />
          </Card>
        </ArgonBox>

      </ArgonBox>
    </DashboardLayout>
  );
}

export default SettingDate;
