import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { allMembers, clearErrors, deleteMember } from "../../actions/memberActions";
import { DELETE_MEMBER_RESET } from "../../constants/memberConstants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/16/solid";

const MemberList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, members = [] } = useSelector((state) => state.fetchMembers);
  const { isDeleted } = useSelector((state) => state.deleteMember);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(allMembers());

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("Member deleted successfully");
      dispatch({ type: DELETE_MEMBER_RESET }); // Reset delete state
      dispatch(allMembers()); // Refresh the member list
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteMemberHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      dispatch(deleteMember(id));
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Link
          to={`/employee/member/${rowData._id}`}
          className="flex items-center gap-2 rounded-lg py-1.5 px-3 bg-blue-500 text-white hover:bg-blue-600"
        >
          <PencilSquareIcon className="w-6 h-6" />
        </Link>
        <button
          onClick={() => deleteMemberHandler(rowData._id)}
          className="flex items-center gap-2 rounded-lg py-1.5 px-3 bg-red-500 text-white hover:bg-red-600"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="row p-20">
        <div className="col-12 col-md-1"></div>
        <div className="col-12 col-md-10">
          <React.Fragment>
            <h1 className="my-5 font-semibold text-3xl">All Members</h1>
            {loading ? (
              <div className="flex justify-center items-center">
                <ProgressSpinner />
              </div>
            ) : (
              <DataTable
                value={members}
                responsiveLayout="scroll"
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 30]}
              >
                <Column
                  field="index"
                  header="No."
                  body={(data, options) => options.rowIndex + 1}
                  sortable
                />
                <Column field="_id" header="Member ID" sortable />
                <Column field="memberName" header="Name" sortable />
                <Column field="memberAge" header="Age" sortable />
                <Column field="sex" header="Sex" sortable />
                <Column field="tin" header="Tin Number" sortable />
                <Column field="mobileNumber" header="Mobile Number" sortable />
                <Column field="otherGovtId" header="Other Government ID" sortable />
                <Column body={actionBodyTemplate} header="Actions" />
              </DataTable>
            )}
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MemberList;
