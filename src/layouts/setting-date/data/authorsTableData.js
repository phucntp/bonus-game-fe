// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import dayjs from "dayjs";
// Images
import team2 from "assets/images/team-2.jpg";
import numeral from "numeral";

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

const authorsTableData = (data, handleDelete) => ({
  columns: [
    { title: "ID", align: "center", name: "id" },
    { title: "Số thành viên", align: "left", name: "numberMember" },
    { title: "Số tiền thưởng", align: "left", name: "numberBonus" },
    { title: "Đã gửi chưa?", name: "sent", align: "left" },
    { title: "Ip", name: "ip", align: "left" },
    { title: "Thời gian trúng giải", align: "left", name: "date" },
    { title: "Người thực hiện thao tác", align: "left", name: "implementer" },
    { title: "action", align: "center", name: "action" },
  ],

  rows: data.map((dt, index) => {
    return {
      implementer: (
        <Author
          image={team2}
          name={dt.implementer?.name || ""}
          email={dt.implementer?.email || ""}
        />
      ),
      id: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {index + 1}
        </ArgonTypography>
      ),
      numberMember: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.numberMember}
        </ArgonTypography>
      ),
      numberBonus: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {numeral(dt.numberBonus || 0).format("0,0")} USD
        </ArgonTypography>
      ),
      sent: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.sent ? "Đã gửi" : "Chưa gửi"}
        </ArgonTypography>
      ),
      ip: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.ip}
        </ArgonTypography>
      ),
      date: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.date ? dayjs(dt.date).format("DD/MM/YYYY HH:mm") : ""}
        </ArgonTypography>
      ),
      action: (
        <ArgonTypography>
          <ArgonTypography
            component="a"
            variant="caption"
            color="#ff0000"
            fontWeight="medium"
            ml={2}
            onClick={() => handleDelete([dt._id])}
          >
            Xóa
          </ArgonTypography>
        </ArgonTypography>
      ),
    };
  }),
});

export default authorsTableData;
