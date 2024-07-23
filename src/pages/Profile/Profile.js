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
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);

  const { user = {}, isLogout } = useSelector((state) => state.auth || {});
  const { error, isUpdated, loading } = useSelector((state) => state.user || {});


  useEffect(() => {
    console.log("user:", user);
    console.log("isUpdated:", isUpdated);
    console.log("error:", error);
  
    if (user) {
      setName(user.name);
      setMobileNumber(user.mobileNumber);
      setCompanyId(user.companyId);
      setEmail(user.email);
    }
  
    if (isUpdated) {
      message.success("Profile Successfully Updated");
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [user, dispatch, error, isUpdated]);
  

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!companyId) errors.companyId = "Company Id is required";

    if (!mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else {
      const phonePattern = /^[0-9]{10,15}$/; // Adjust the regex according to your phone format
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
      const file = info.fileList[0]?.originFileObj; // Get the actual File/Blob object

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

  const updateHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.set("name", name);
    formData.set("companyId", companyId);
    formData.set("mobileNumber", mobileNumber);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    dispatch(updateProfile(formData));
  };

  return (
    <div className="flex flex-1 flex-col container mx-auto py-4">
      <div className="flex relative gap-6">
        <div className="sticky top-0">
          <ProfileSidebar />
        </div>

        <form className="flex flex-1 flex-col gap-4">
          <div>
            <p className="text-2xl">My Information</p>
          </div>

          <div className="flex-1 bg-zinc-100 p-8 space-y-4">
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
                  block
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

            <div className="grid grid-cols-2 grid-rows-1 gap-4">
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
                <p>Profile Avatar</p>

                <Upload {...fileProps} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-row justify-end">
            <Button size="large" type="primary" onClick={() => updateHandler()}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
