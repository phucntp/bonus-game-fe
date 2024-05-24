import { useCallback, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import api from "layouts/axios";
import AutoCloseMessage from "examples/AutoMessage";

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate();

  const handleVisibleAlert = useCallback((message) => {
    setVisibleMessage(true)
    setMessage(message);
  }, [])

  const handelLogin = useCallback(async () => {
    setIsError(false)
    if (password && name) {
      try {
        const res = await api.post("login", { data: { name, password } });
        if (res.data) {
          handleVisibleAlert("Đăng nhập thành công.");
          sessionStorage.setItem("userLogin", JSON.stringify(res.data));
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      } catch (error) {
        handleVisibleAlert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin");
        setIsError(true)
      } 
    } else if(!name) {
      handleVisibleAlert("Vui lòng nhập tên!")
      setIsError(true)
    } else if(!password) {
      handleVisibleAlert("Vui lòng nhập mật khẩu!")
      setIsError(true)
    }
  }, [password, name, handleVisibleAlert]);
  return (
    <IllustrationLayout title="Đăng nhập" description="Hãy nhập tên và mật khẩu để đăng nhập">
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput
            value={name}
            onChange={(v) => setName(v.target.value)}
            placeholder="Name"
            size="large"
          />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput
            value={password}
            onChange={(v) => setPassword(v.target.value)}
            type="password"
            placeholder="Password"
            size="large"
          />
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton onClick={() => handelLogin()} color="info" size="large" fullWidth>
            Đăng nhập
          </ArgonButton>
        </ArgonBox>
        {/* <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Không có tài khoản
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Đăng ký
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox> */}
        <AutoCloseMessage
          message={message}
          visible={visibleMessage}
          setVisible={setVisibleMessage}
          status={!!isError && "error"}
        />
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
