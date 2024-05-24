// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import dayjs from "dayjs";
// Images
import team2 from "assets/images/team-2.jpg";

function Author({ image, name, email }) {
  return (
    <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
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
    { title: "Tài khoảnh", align: "left", name: "user" },
    { title: "Quyền", align: "left", name: "permissions" },
  ],

  rows: data.map((dt, index) => {
    return {
      user: (
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
      permissions: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.permissions?.join(', ')}
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
