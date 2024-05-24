// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Images
import team2 from "assets/images/team-2.jpg";
import ButtonDelete from "components/ButtonDelete";

function Author({ image, name, email }) {
  return (
    <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
      {/* <ArgonBox mr={2}>
        <ArgonAvatar src={image} alt={name} size="sm" variant="rounded" />
      </ArgonBox> */}
      <ArgonBox display="flex" flexDirection="column">
        <ArgonTypography variant="button" fontWeight="medium">
          {name}
        </ArgonTypography>
        <ArgonTypography variant="caption" color="secondary">
          {email}
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}

const authorsTableData = (data, handleDelete, handleOpenEdit) => ({
  columns: [
    { title: "ID", align: "center", name: "id" },
    { title: "Mã thành viên", align: "left", name: "code" },
    { title: "Số tiền cược/Đặt cọc hiệu quả", name: "betAmount", align: "left" },
    { title: "Tổng số lần tham gia", name: "timesJoin", align: "left" },
    { title: "Số lần còn lại", align: "left", name: "timesRest" },
    { title: "IP Đăng nhập", align: "left", name: "ip" },
    { title: "Người vận hàng", align: "left", name: "admin" },
    { title: "action", align: "center", name: "action" },
  ],

  rows: data.map((dt, index) => {
    return {
      admin: <Author image={team2} name={dt.admin?.name || ""} email={dt.admin?.email || ""} />,
      id: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {index + 1}
        </ArgonTypography>
      ),
      code: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.code}
        </ArgonTypography>
      ),
      betAmount: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.betAmount}
        </ArgonTypography>
      ),
      timesJoin: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.timesJoin}
        </ArgonTypography>
      ),
      timesRest: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.timesRest}
        </ArgonTypography>
      ),
      ip: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.ip}
        </ArgonTypography>
      ),
      action: (
        <ArgonTypography>
          <ArgonTypography
            component="button"
            variant="caption"
            color="primary"
            fontWeight="medium"
            onClick={() => handleOpenEdit(dt)}
          >
            Sửa
          </ArgonTypography>
          <ButtonDelete
            handleDelete={() => handleDelete([dt._id])}
            content="Bạn có chắc chắn xóa thành viên này"
          />
        </ArgonTypography>
      ),
    };
  }),
});

export default authorsTableData;
