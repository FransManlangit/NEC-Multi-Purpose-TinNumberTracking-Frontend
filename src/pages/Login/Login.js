import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      message.success("Login Successfully");
      navigate("/");
    }
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email address";
      }
    }

    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const loginHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    dispatch(login(formData));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-wrap container items-center bg-white p-8 gap-14">
          <div>
            <img
              src="/images/loginimage.jpg"
              alt="SariSariCart Logo"
              className="h-[32em] w-[32rem]"
            />
          </div>
          <form className="space-y-8 min-w-[30rem] sm:p-0 p-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-6xl font-extrabold text-[#1E4BCA]">
                NECMPC
              </p>
              <span className="">Empowering Communities Enriching Lives.</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>
                  Email <span className="text-red-500">*</span>
                </p>
                <Input
                  status={errors.email ? "error" : null}
                  placeholder="levelup@example.com"
                  variant="filled"
                  size="large"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>

              <div className="space-y-1">
                <p>
                  Password <span className="text-red-500">*</span>
                </p>
                <Input.Password
                  status={errors.password ? "error" : null}
                  placeholder="password"
                  variant="filled"
                  size="large"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                size="large"
                className="font-medium"
                onClick={loginHandler}
                loading={loading}
              >
                Login
              </Button>

              <p className="text-sm">
                Don't Have Account?{" "}
                <a className="text-[#1E4BCA]" href="/signup">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
