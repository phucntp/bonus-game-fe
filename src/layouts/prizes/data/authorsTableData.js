// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import ButtonDelete from "components/ButtonDelete";
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

const authorsTableData = (data, handleDelete, handleOpenEdit) => ({
  columns: [
    { title: "ID", align: "center", name: "id" },
    { title: "Tên nội dung", align: "left", name: "name" },
    { title: "Số tiền thưởng", align: "left", name: "numberBonus" },
    { title: "Tỷ lệ chiến thắng", name: "percentWin", align: "left" },
    { title: "Url", name: "urlImage", align: "left" },
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
          {numeral(dt.numberBonus || 0).format("0,0")} USD
        </ArgonTypography>
      ),
      percentWin: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.percentWin}
        </ArgonTypography>
      ),
      urlImage: (
           <ArgonBox mr={2}>
            <ArgonAvatar src={dt.urlImage} alt={dt.urlImage} size="sm" variant="rounded" />
          </ArgonBox>
      ),
      status: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dt.status}
        </ArgonTypography>
      ),
      action: (
        <ArgonTypography>
          <div style={{display: 'flex', alignItems: 'center'}}><ArgonTypography
            component="a"
            href="#"
            variant="caption"
            color="primary"
            fontWeight="medium"
            onClick={() => handleOpenEdit(dt)}
          >
            Sửa
          </ArgonTypography>
          <ButtonDelete
            handleDelete={() => handleDelete([dt._id])}
            content="Bạn có chắc chắn xóa phần thưởng này"
          /></div>
        </ArgonTypography>
      ),
    };
  }),
});

export default authorsTableData;
