import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import Members from "layouts/members";
import Bonuses from "layouts/bonus";
import Prizes from "layouts/prizes";
import SettingDate from "layouts/setting-date";
import Users from "layouts/users";

const userLogin = sessionStorage.getItem("userLogin");
const dataUser = userLogin ? JSON.parse(userLogin) : "";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Thành viên",
    key: "members",
    route: "/members",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <Members />,
  },
  {
    type: "route",
    name: "Giải thưởng",
    key: "prices",
    route: "/prices",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <Prizes />,
  },
  {
    type: "route",
    name: "Trả thưởng",
    key: "bonuses",
    route: "/bonuses",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <Bonuses />,
  },
  {
    type: "route",
    name: "Thiết lập thời gian",
    key: "setting-date",
    route: "/setting-date",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <SettingDate />,
  },
  {
    type: "route",
    name: "Thiết lập người dùng",
    key: "users",
    route: "/users",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <Users />,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "route",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
  //   component: <Profile />,
  // },
  {
    type: "route",
    name: "Đăng xuất",
    key: "sign-out",
    route: "/authentication/sign-in",
    icon: (
      <ArgonBox
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <SignIn />,
  }
  ,
];

export default routes;
