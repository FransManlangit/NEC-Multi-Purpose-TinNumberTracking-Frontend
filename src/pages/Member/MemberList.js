
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allMembers, clearErrors, deleteMember } from "../../actions/memberActions";
import { DELETE_MEMBER_RESET } from "../../constants/memberConstants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const MemberList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastTopCenter = useRef(null);

  const { loading, error, members = [] } = useSelector((state) => state.fetchMembers);
  const { isDeleted } = useSelector((state) => state.deleteMember);

  useEffect(() => {
    dispatch(allMembers(toastTopCenter));

    if (error) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({ type: DELETE_MEMBER_RESET }); // Reset delete state
      dispatch(allMembers(toastTopCenter)); // Refresh the member list
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteMemberHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      dispatch(deleteMember(id, toastTopCenter));
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
        <Button 
          onClick={() => deleteMemberHandler(rowData._id)}
          className="flex items-center gap-2 rounded-lg py-1.5 px-3 bg-red-500 text-white hover:bg-red-600"
        >
          <TrashIcon className="w-6 h-6" />
        </Button>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Toast ref={toastTopCenter} position="top-center" />
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
