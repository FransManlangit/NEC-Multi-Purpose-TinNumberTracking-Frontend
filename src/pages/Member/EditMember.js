import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, message } from "antd";
import { updateMember, clearErrors, singleMember } from "../../actions/memberActions";
import { UPDATE_MEMBER_RESET } from "../../constants/memberConstants";

const EditMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL parameters

  const [memberName, setMemberName] = useState("");
  const [memberAge, setMemberAge] = useState("");
  const [sex, setSex] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [tin, setTin] = useState("");
  const [otherGovtId, setOtherGovId] = useState("");
  const [errors, setErrors] = useState({});

  const { member, error, isUpdated, loading } = useSelector((state) => ({
    member: state.singleMember.member,
    error: state.updateMember.error,
    isUpdated: state.updateMember.success,
    loading: state.updateMember.loading,
  }));

  useEffect(() => {
    if (id) {
      dispatch(singleMember(id));
    }

    if (isUpdated) {
      message.success("Member successfully updated");
      navigate("/memberlist");
      dispatch({ type: UPDATE_MEMBER_RESET });
    }

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isUpdated, id, navigate]);

  useEffect(() => {
    if (member) {
      setMemberName(member.memberName || "");
      setMemberAge(member.memberAge || "");
      setSex(member.sex || "");
      setMobileNumber(member.mobileNumber || "");
      setTin(member.tin || "");
      setOtherGovId(member.otherGovtId || "");
    }
  }, [member]);

  const validateForm = () => {
    let errors = {};

    if (!memberName) errors.memberName = "Name is required";
    if (!memberAge) errors.memberAge = "Age is required";
    if (!sex) errors.sex = "Sex is required";
    if (!mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else {
      const phonePattern = /^[0-9]{11}$/;
      if (!phonePattern.test(mobileNumber)) {
        errors.mobileNumber = "Invalid mobile number";
      }
    }

    if (!tin && !otherGovtId) {
      errors.tinOrGovtId = "Either Tin or Other Government ID is required";
    } else if (tin && otherGovtId) {
      errors.tinOrGovtId = "Please provide only one of Tin or Other Government ID";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const updateHandler = () => {
    if (!validateForm()) {
      return;
    }
  
    const formData = new FormData();
    formData.set("memberName", memberName);
    formData.set("memberAge", memberAge);
    formData.set("sex", sex);
    formData.set("mobileNumber", mobileNumber);
  
    if (tin) {
      formData.set("tin", tin);
    } else if (otherGovtId) {
      formData.set("otherGovtId", otherGovtId);
    }
  
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    dispatch(updateMember(id, formData));
  };

  return (
    <div className="flex flex-1 flex-col container mx-auto py-20">
      <div className="flex relative gap-6">
        <form className="flex flex-1 flex-col gap-20" onSubmit={(e) => e.preventDefault()}>
          <div className="items-center">
            <p className="text-4xl">Edit Member Information</p>
          </div>
          <div className="flex flex-col space-y-12">
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Name <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="font-medium"
                  status={errors.memberName ? "error" : null}
                />
                {errors.memberName && <p className="text-red-500">{errors.memberName}</p>}
              </div>
              <div className="space-y-1">
                <p className="font-semibold">
                  Age <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  type="number"
                  value={memberAge}
                  onChange={(e) => setMemberAge(e.target.value)}
                  className="font-medium"
                  status={errors.memberAge ? "error" : null}
                />
                {errors.memberAge && <p className="text-red-500">{errors.memberAge}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Sex <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  className="font-medium"
                  status={errors.sex ? "error" : null}
                />
                {errors.sex && <p className="text-red-500">{errors.sex}</p>}
              </div>
              <div className="space-y-1">
                <p className="font-semibold">
                  Mobile Number <span className="text-red-500">*</span>
                </p>
                <Input
                  size="large"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="font-medium"
                  status={errors.mobileNumber ? "error" : null}
                />
                {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">
                  Tin Number
                </p>
                <Input
                  size="large"
                  value={tin}
                  onChange={(e) => setTin(e.target.value)}
                  className="font-medium"
                  status={errors.tinOrGovtId ? "error" : null}
                />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">
                  Other Government ID
                </p>
                <Input
                  size="large"
                  value={otherGovtId}
                  onChange={(e) => setOtherGovId(e.target.value)}
                  className="font-medium"
                  status={errors.tinOrGovtId ? "error" : null}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-row justify-center">
            <Button
              className="w-60 h-14 py-4 px-6 font-poppins font-medium text-[18px] text-white bg-[#1E4BCA] 
              bg-blue-gradient rounded-[10px] outline-none"
              onClick={updateHandler}
              loading={loading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMember;
