import { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { useNotification } from "../contexts/notificationContext";
import logo from "../assets/icons/logo.png";
import { brand, primary, primaryGlow } from "../utils/uiConfig";
import {
  checkEmailExists,
  checkUsernameExists,
} from "../utils/debounceHelpers";

const { Title, Text } = Typography;

const titleStyle = {
  textAlign: "center",
  marginBottom: 4,
  marginTop: 0,
  color: "var(--timlink-text)",
};

const labelStyle = {
  marginBottom: 0,
  fontSize: 14,
  fontWeight: 500,
  marginTop: 0,
  color: "var(--timlink-text)",
};

const inputStyle = {
  marginBottom: 0,
  borderRadius: 8,
  marginTop: 0,
  minHeight: 42,
};

const submitBtnStyle = {
  minHeight: 44,
  borderRadius: 8,
  fontWeight: 700,
  transition: "all 0.3s ease",
  boxShadow: `0 10px 26px ${primaryGlow}`,
};

const signInTextStyle = {
  color: primary,
  cursor: "pointer",
  fontWeight: 700,
};

function Auth() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const openNotification = useNotification();
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const toggleSignIn = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const allValues = await form.getFieldsValue();

      const payload = isSignIn
        ? { email: allValues.email, password: allValues.password }
        : {
            email: allValues.email,
            password: allValues.password,
            username: allValues.username,
          };

      const res = await axios.post(
        `${isSignIn ? "auth/sign-in" : "auth/sign-up"}`,
        payload,
      );

      const { success, token, user, refreshToken } = res.data;

      if (success) {
        openNotification(
          "success",
          !isSignIn
            ? "Your account has been created successfully. Proceed to login."
            : "Login successful",
          "Success!",
        );

        if (!isSignIn) {
          setIsSignIn(true);
          return;
        }

        login(user, token, refreshToken);
      }
    } catch (error) {
      const emailErrorMessage = error.response?.data?.message;
      if (emailErrorMessage === "Email address is invalid") {
        setEmailError("Email address is invalid");
      } else {
        setEmailError("");
      }

      const passwordErrorMessage = error.response?.data?.message;
      if (passwordErrorMessage === "Password is invalid") {
        setPasswordError("Password is invalid");
      } else {
        setPasswordError("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(6,27,24,0.72), rgba(15,107,120,0.45)), url(https://images.unsplash.com/photo-1655720358066-2aab2a903ef8?w=1400) no-repeat center center/cover",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        className="auth-panel"
        style={{
          width: "min(920px, 100%)",
          display: "grid",
          gridTemplateColumns: "minmax(280px, 0.9fr) minmax(320px, 1fr)",
          border: "1px solid rgba(113,232,161,0.22)",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 24px 70px rgba(0,0,0,0.32)",
          background: "var(--timlink-surface)",
        }}
      >
        <div
          style={{
            minHeight: isSignIn ? 520 : 620,
            padding: 32,
            background:
              "linear-gradient(160deg, rgba(6,27,24,0.92), rgba(15,107,120,0.76)), url(https://images.unsplash.com/photo-1444664361762-afba083a4d77?w=900) no-repeat center center/cover",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={logo}
              alt="Timlink Healthcare Solutions"
              style={{
                width: 52,
                height: 52,
                borderRadius: 8,
                objectFit: "cover",
                boxShadow: "0 8px 26px rgba(0,0,0,0.28)",
              }}
            />
            <div
              style={{
                color: "#fff",
              }}
            >
              <Text
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.72)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: 11,
                }}
              >
                Timlink
              </Text>
              <Title
                level={3}
                style={{
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Healthcare Solutions
              </Title>
            </div>
          </div>
          <div>
            <Title
              level={2}
              style={{
                color: "#fff",
                marginBottom: 12,
                lineHeight: 1.12,
              }}
            >
              Connected care operations.
            </Title>
            <div
              style={{
                width: 72,
                height: 4,
                borderRadius: 999,
                background: brand.seed,
                boxShadow: `0 0 24px ${primaryGlow}`,
              }}
            />
          </div>
        </div>

        <div
          style={{
            minHeight: isSignIn ? 520 : 620,
            padding: "38px min(44px, 7vw)",
            background:
              "linear-gradient(180deg, var(--timlink-surface), var(--timlink-surface-muted))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Title level={1} style={{ ...titleStyle, fontSize: 36 }}>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Title>
          <Text
            style={{
              display: "block",
              textAlign: "center",
              color: "var(--timlink-text-muted)",
              marginBottom: 28,
            }}
          >
            {isSignIn
              ? "Access your Timlink workspace"
              : "Create your Timlink workspace account"}
          </Text>
          <div>
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSubmit}
                    requiredMark={false}
                  >
                    {!isSignIn && (
                      <Form.Item
                        label={<span style={labelStyle}>Username</span>}
                        name={"username"}
                        validateTrigger="onBlur"
                        rules={[
                          {
                            required: true,
                            message: "Please input a username",
                          },
                          {
                            validator: (_, value) =>
                              new Promise((resolve, reject) => {
                                if (!value) return resolve();
                                checkUsernameExists(value, resolve, reject);
                              }),
                          },
                        ]}
                      >
                        <Input
                          value={values.username}
                          onChange={(e) =>
                            handleChange("username", e.target.value)
                          }
                          style={inputStyle}
                          type="text"
                        />
                      </Form.Item>
                    )}
                    <Form.Item
                      label={<span style={labelStyle}>Email Address</span>}
                      name={"email"}
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a valid email address",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email address",
                        },
                        {
                          validator: (_, value) =>
                            isSignIn
                              ? Promise.resolve()
                              : new Promise((resolve, reject) => {
                                  if (!value) return resolve();
                                  checkEmailExists(value, resolve, reject);
                                }),
                        },
                      ]}
                      extra={
                        isSignIn && emailError ? (
                          <span style={{ color: "red" }}>{emailError}</span>
                        ) : null
                      }
                    >
                      <Input
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        style={inputStyle}
                        type="email"
                      />
                    </Form.Item>
                    <Form.Item
                      label={<span style={labelStyle}>Password</span>}
                      name={"password"}
                      rules={[
                        {
                          required: true,
                          message: "Please input your password",
                          min: 8,
                        },
                      ]}
                      extra={
                        passwordError ? (
                          <span style={{ color: "red" }}>{passwordError}</span>
                        ) : null
                      }
                    >
                      <Input.Password
                        iconRender={(visible) =>
                          visible ? (
                            <EyeTwoTone twoToneColor={primary} />
                          ) : (
                            <EyeInvisibleOutlined />
                          )
                        }
                        value={values.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        style={inputStyle}
                        allowClear
                      />
                    </Form.Item>
                    {!isSignIn && (
                      <Form.Item
                        dependencies={["password"]}
                        hasFeedback
                        label={
                          <span style={labelStyle}>Confirm Your Password</span>
                        }
                        name={"confirmPassword"}
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords do not match"),
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone twoToneColor={primary} />
                            ) : (
                              <EyeInvisibleOutlined />
                            )
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                    )}

                    {isSignIn && (
                      <div style={{ marginTop: 0, marginBottom: 10 }}>
                        <Text
                          style={{
                            color: "var(--timlink-text-muted)",
                            cursor: "pointer",
                          }}
                        >
                          Forgot your password?
                        </Text>
                      </div>
                    )}

                    <Form.Item>
                      <Button
                        block
                        loading={loading}
                        type="primary"
                        style={submitBtnStyle}
                        htmlType="submit"
                        disabled={!values.email}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform =
                            "translateY(-1px)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        {loading ? "" : "Submit"}
                      </Button>
                    </Form.Item>

                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 5,
                        fontWeight: 500,
                      }}
                    >
                      {isSignIn ? (
                        <Text
                          style={{
                            color: "var(--timlink-text-muted)",
                          }}
                        >
                          Don't have an account?{" "}
                          <span onClick={toggleSignIn} style={signInTextStyle}>
                            Sign Up
                          </span>
                        </Text>
                      ) : (
                        <Text
                          style={{
                            color: "var(--timlink-text-muted)",
                          }}
                        >
                          Already have an account?{" "}
                          <span onClick={toggleSignIn} style={signInTextStyle}>
                            Sign In
                          </span>
                        </Text>
                      )}
                    </div>
                  </Form>
          </div>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 780px) {
            [data-theme] .ant-form {
              width: 100%;
            }
          }
          @media (max-width: 720px) {
            .auth-panel {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Auth;
