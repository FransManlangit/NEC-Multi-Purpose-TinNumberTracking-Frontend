import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, clearErrors } from "../../actions/userActions";
import { Bounce, toast } from "react-toastify";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { loading, error, success } = useSelector((state) => state.register);

  useEffect(() => {
    if (success) {
      dispatch(clearErrors());
      navigate("/login");
      
      message.success("Registration successful!");
    }

    if (error) {
      message.error(error);
    }
  }, [loading, error, success, dispatch]);

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!companyId) errors.companyId = "Company Id is required";

    if (!mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else {
      const phonePattern = /^[0-9]{10,11}$/; // Adjust the regex according to your phone format
      if (!phonePattern.test(mobileNumber)) {
        errors.mobileNumber = "Invalid mobile number";
      }
    }


    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email address";
      }
    }

    if (!password) errors.password = "Password is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const registerHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.set("name", name);
    formData.set("companyId", companyId);
    formData.set("mobileNumber", mobileNumber);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(register(formData));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-wrap container items-center bg-white p-8 gap-8">
          <form className="space-y-8 min-w-[30rem] sm:p-0 p-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-6xl font-extrabold text-[#1E4BCA]">
               NECMPC
              </p>
              <span className="text-center">
                “A Billionaire Cooperative that is member responsive and socially responsible.”
              </span>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 grid-rows-1 gap-4">
                <div className="space-y-1">
                  <p>
                    Name <span className="text-red-500">*</span>
                  </p>
                  <Input
                    size="large"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="filled"
                    status={errors.name ? "error" : null}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <p>
                   Company Id <span className="text-red-500">*</span>
                  </p>
                  <Input
                    size="large"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    variant="filled"
                    status={errors.companyId ? "error" : null}
                  />
                  {errors.companyId && (
                    <p className="text-red-500">{errors.companyId}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <p>
                  Mobile Number <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  variant="filled"
                  status={errors.mobileNumber ? "error" : null}
                />
                {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
              </div>
              <div className="space-y-1">
                <p>
                  Email <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  status={errors.email ? "error" : null}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <p>
                  Password <span className="text-red-500">*</span>
                </p>
                <Input.Password
                  size="large"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                  status={errors.password ? "error" : null}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="space-y-1">
                <p>
                  Confirm Password <span className="text-red-500">*</span>
                </p>
                <Input.Password
                  size="large"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="filled"
                  status={errors.confirmPassword ? "error" : null}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                size="large"
                className="font-semibold"
                onClick={registerHandler}
                loading={loading}
              >
                Sign Up
              </Button>
              <p className="text-sm">
                Have an account?{" "}
                <a className="text-[#1E4BCA]" href="/login">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}