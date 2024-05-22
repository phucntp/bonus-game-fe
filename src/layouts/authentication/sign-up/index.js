/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { useCallback, useState } from "react";
import api from "layouts/axios";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handelRegister = useCallback(async () => {
    if (password && name) {
      try {
        const res = await api.post("user", { data: { name, password, email } });
        if (res.data) {
          navigate("/authentication/sign-in");
        }
      } catch (error) {}
    }
  }, [password, name]);

  return (
    <CoverLayout image={bgImage} imgPosition="top" button={{ color: "dark", variant: "gradient" }}>
      <Card>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput
                placeholder="Name"
                value={name}
                onChange={(v) => setName(v.target.value)}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                value={email}
                onChange={(v) => setEmail(v.target.value)}
                type="email"
                placeholder="Email"
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                value={password}
                onChange={(v) => setPassword(v.target.value)}
                type="password"
                placeholder="Password"
              />
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton
                onClick={() => handelRegister()}
                variant="gradient"
                color="dark"
                fullWidth
              >
                Đăng ký
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Bạn đã có tài khoản?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Đăng nhập
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
