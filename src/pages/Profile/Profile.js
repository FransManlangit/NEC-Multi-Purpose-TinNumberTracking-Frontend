import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);

  const { user = {} } = useSelector((state) => state.auth || {});
  const { error, isUpdated, loading } = useSelector((state) => state.user || {});


  // const { user, isLogout } = useSelector((state) => state.auth);

  // const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("user:", user);
    console.log("isUpdated:", isUpdated);
    console.log("error:", error);

    if (user) {
      setName(user.name);
      setRole(user.role);
      setMobileNumber(user.mobileNumber);
      setCompanyId(user.companyId);
      setEmail(user.email);
    }

    if (isUpdated) {
      message.success("Profile Successfully Updated");
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      console.log("Profile updated successfully");  
    }
   
 
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [user, dispatch, error, isUpdated]);

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!role) errors.role = "Role is required";
    if (!companyId) errors.companyId = "Company Id is required";

    if (!mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else {
      const phonePattern = /^[0-9]{10,15}$/;
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

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  

  const fileProps = {
    name: "image",
    multiple: false,
    listType: "picture",
    fileList,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: () => false,
    onChange: (info) => {
      console.log(info, "info onchange");

      const file = info.fileList[0]?.originFileObj; // Get the actual File/Blob object

      console.log(file, "file onchange");
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setAvatar(e.target.result);
        };

        reader.readAsDataURL(file);

        setFileList(info.fileList); // Update fileList state
      }
    },
  };

  const updateHandler = async () => {
    if (!validateForm()) {
      return;
    }
  
    const formData = new FormData();
    formData.set("name", name);
    formData.set("role", role);
    formData.set("companyId", companyId);
    formData.set("mobileNumber", mobileNumber);
  
    if (avatar) {
      formData.append("avatar", avatar);
    }
  
    try {
      // Dispatch the action and wait for it to complete
      await dispatch(updateProfile(formData));
      message.success("Profile Successfully Updated");
      dispatch(loadUser());
    } catch (error) {
      
      // Handle any errors that occur during dispatch
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex flex-1 flex-col container mx-auto py-20">
      <div className="flex relative gap-6">
        <div className="sticky top-0">
          <ProfileSidebar />
        </div>

        <form className="flex flex-1 flex-col gap-20">
          <div className="items-center">
            <p className="text-4xl">My Information</p>
          </div>
          <div className="flex flex-col space-y-12">
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Name <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="filled"
                  className="font-medium"
                  status={errors.name ? "error" : null}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Role <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  variant="filled"
                  className="font-medium"
                  status={errors.role ? "error" : null}
                />
                {errors.role && <p className="text-red-500">{errors.role}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Company Id <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  variant="filled"
                  className="font-medium"
                  status={errors.companyId ? "error" : null}
                />
                {errors.companyId && <p className="text-red-500">{errors.companyId}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Mobile Number <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  variant="filled"
                  className="font-medium"
                  status={errors.mobileNumber ? "error" : null}
                />
                {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Profile Avatar</p>
              <Upload {...fileProps} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </div>
          </div>

          <div className="flex flex-1 flex-row justify-center">
            <Button
              className="w-60 h-14 py-4 px-6 font-poppins font-medium text-[18px] text-white bg-[#1E4BCA] bg-blue-gradient rounded-[10px] outline-none"
              onClick={() => updateHandler()}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
