// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

// Images
import team2 from "assets/images/team-2.jpg";

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
    { title: "Tên nội dung", align: "left", name: "name" },
    { title: "Số tiền thưởng", align: "left", name: "numberBonus" },
    { title: "Tỷ lệ chiến thắng", name: "percentWin", align: "left" },
    { title: "Url", name: "url", align: "left" },
    { title: "Trạng thái", align: "left", name: "status" },
    { title: "action", align: "center", name: "action" },
  ],

  rows: data.map((dt, index) => {
    return {
      id: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {index + 1}
        </ArgonTypography>
      ),
      name: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.name}
        </ArgonTypography>
      ),
      numberBonus: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.numberBonus}
        </ArgonTypography>
      ),
      percentWin: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.percentWin}
        </ArgonTypography>
      ),
      url: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.url}
        </ArgonTypography>
      ),
      status: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.status}
        </ArgonTypography>
      ),
      action: (
        <ArgonTypography>
          <ArgonTypography
            component="a"
            href="#"
            variant="caption"
            color="primary"
            fontWeight="medium"
            onClick={() => handleOpenEdit(dt)}
          >
            Sửa
          </ArgonTypography>
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
