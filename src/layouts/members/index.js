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
import ModalExcel from "./ModalExcel";
import AutoCloseMessage from "examples/AutoMessage";

function Members() {
  const [data, setData] = useState([]);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [memberSelected, setMemberSelected] = useState();
  const [visibleExcel, setVisibleExcel] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [isError, setIsError] = useState(false)

  const fetchData = useCallback(async () => {
    const res = await api.get("member");
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
        await api.post("member/remove-members", { data: { ids: compact(ids) } });

      await fetchData();
      handleVisibleAlert("Xóa thành viên thành công")
    } catch (error) {
      handleVisibleAlert("Có lỗi xảy ra!", true)
    }
  }, []);

  const handleOpenEdit = useCallback((member) => {
    setMemberSelected(member);
    setVisibleEdit(true);
  }, []);

  const handleOpenExcel = useCallback(() => {
    setVisibleExcel(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisibleEdit(false);
    setMemberSelected(undefined);
  }, []);

  const handleCloseExcel = useCallback(() => {
    setVisibleExcel(false);
  }, []);

  const handleEdit = useCallback(async (newMember) => {
    try {
      if(!newMember.code) {
        handleVisibleAlert("Vui lòng nhập mã số thành viên", true)
        return;
      }
      await api.put(`member/${newMember._id}`, { data: newMember });
      await fetchData();
      handleClose();
      handleVisibleAlert("Câp nhật thành viên thành công")
    } catch (error) {
      handleVisibleAlert("Có lỗi xảy ra!", true)
    }
  }, [fetchData]);

  const handleImport = useCallback(async (dataImport) => {
    try {
      if (dataImport?.length) {
        await api.post(`member/upload-excel`, { data: dataImport });
        handleCloseExcel();
        await fetchData();
      }
      handleVisibleAlert("Cập nhật excel thành công")
    } catch (error) {
      handleVisibleAlert("Có lỗi xảy ra!", true)
    }
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
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                onClick={() => handleOpenExcel()}
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="4.494"
                    y1="-2092.086"
                    x2="13.832"
                    y2="-2075.914"
                    gradientTransform="translate(0 2100)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#18884f" />
                    <stop offset="0.5" stopColor="#117e43" />
                    <stop offset="1" stopColor="#0b6631" />
                  </linearGradient>
                </defs>
                <title>file_type_excel</title>
                <path
                  d="M19.581,15.35,8.512,13.4V27.809A1.192,1.192,0,0,0,9.705,29h19.1A1.192,1.192,0,0,0,30,27.809h0V22.5Z"
                  style={{ fill: "#185c37" }}
                />
                <path
                  d="M19.581,3H9.705A1.192,1.192,0,0,0,8.512,4.191h0V9.5L19.581,16l5.861,1.95L30,16V9.5Z"
                  style={{ fill: "#21a366" }}
                />
                <path d="M8.512,9.5H19.581V16H8.512Z" style={{ fill: "#107c41" }} />
                <path
                  d="M16.434,8.2H8.512V24.45h7.922a1.2,1.2,0,0,0,1.194-1.191V9.391A1.2,1.2,0,0,0,16.434,8.2Z"
                  style={{ opacity: "0.10000000149011612", isolation: "isolate" }}
                />
                <path
                  d="M15.783,8.85H8.512V25.1h7.271a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.783,8.85Z"
                  style={{ opacity: "0.20000000298023224", isolation: "isolate" }}
                />
                <path
                  d="M15.783,8.85H8.512V23.8h7.271a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.783,8.85Z"
                  style={{ opacity: 0.20000000298023224, isolation: "isolate" }}
                />
                <path
                  d="M15.132,8.85H8.512V23.8h6.62a1.2,1.2,0,0,0,1.194-1.191V10.041A1.2,1.2,0,0,0,15.132,8.85Z"
                  style={{ opacity: 0.20000000298023224, isolation: "isolate" }}
                />
                <path
                  d="M3.194,8.85H15.132a1.193,1.193,0,0,1,1.194,1.191V21.959a1.193,1.193,0,0,1-1.194,1.191H3.194A1.192,1.192,0,0,1,2,21.959V10.041A1.192,1.192,0,0,1,3.194,8.85Z"
                  style={{ fill: "url(#a)" }}
                />
                <path
                  d="M5.7,19.873l2.511-3.884-2.3-3.862H7.758L9.013,14.6c.116.234.2.408.238.524h.017c.082-.188.169-.369.26-.546l1.342-2.447h1.7l-2.359,3.84,2.419,3.905H10.821l-1.45-2.711A2.355,2.355,0,0,1,9.2,16.8H9.176a1.688,1.688,0,0,1-.168.351L7.515,19.873Z"
                  style={{ fill: "#fff" }}
                />
                <path
                  d="M28.806,3H19.581V9.5H30V4.191A1.192,1.192,0,0,0,28.806,3Z"
                  style={{ fill: "#33c481" }}
                />
                <path d="M19.581,16H30v6.5H19.581Z" style={{ fill: "#107c41" }} />
              </svg>
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
      <ModalExcel
        visible={visibleExcel}
        handleClose={handleCloseExcel}
        handleImport={handleImport}
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
