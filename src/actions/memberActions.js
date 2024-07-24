import axios from "axios";
import {
  CLEAR_ERRORS,
  REGISTER_MEMBER_REQUEST,
  REGISTER_MEMBER_SUCCESS,
  REGISTER_MEMBER_FAIL,
  FETCH_MEMBER_REQUEST,
  FETCH_MEMBER_SUCCESS,
  FETCH_MEMBER_FAIL,
  SINGLE_MEMBER_REQUEST,
  SINGLE_MEMBER_SUCCESS,
  SINGLE_MEMBER_FAIL,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAIL,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAIL,
} from "../constants/memberConstants";
import { showToast } from "../components/Toast/memberToast"; // Import the showToast utility

export const registerMember = (userData, toastRef) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_MEMBER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Adjust if needed
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/register`,
      userData,
      config
    );

    dispatch({
      type: REGISTER_MEMBER_SUCCESS,
      payload: data.member, // Ensure this matches the API response
    });

    showToast(toastRef, 'success', 'Success', 'Member registered successfully');
  } catch (error) {
    dispatch({
      type: REGISTER_MEMBER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });

    showToast(toastRef, 'error', 'Error', error.response ? error.response.data.message : error.message);
  }
};

export const allMembers = (toastRef) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MEMBER_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/all`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: FETCH_MEMBER_SUCCESS,
      payload: data.members, // Ensure this matches the API response
    });
  } catch (error) {
    dispatch({
      type: FETCH_MEMBER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });

    showToast(toastRef, 'error', 'Error', error.response ? error.response.data.message : error.message);
  }
};

export const singleMember = (id, toastRef) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_MEMBER_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: SINGLE_MEMBER_SUCCESS,
      payload: data.member, // Ensure this matches the API response
    });
  } catch (error) {
    dispatch({
      type: SINGLE_MEMBER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });

    showToast(toastRef, 'error', 'Error', error.response ? error.response.data.message : error.message);
  }
};

export const updateMember = (id, userData, toastRef) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MEMBER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json", // Change this to application/json
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/update/${id}`, // Ensure this matches the backend route
      userData,
      config
    );

    dispatch({
      type: UPDATE_MEMBER_SUCCESS,
      payload: data.member, // Ensure this matches the API response
    });

    showToast(toastRef, 'success', 'Success', 'Member updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_MEMBER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });

    showToast(toastRef, 'error', 'Error', error.response ? error.response.data.message : error.message);
  }
};

export const deleteMember = (id, toastRef) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MEMBER_REQUEST });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/delete/${id}`, // Ensure this matches the backend route
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: DELETE_MEMBER_SUCCESS,
      payload: data.success, // Ensure this matches the API response
    });

    showToast(toastRef, 'success', 'Success', 'Member deleted successfully');
  } catch (error) {
    dispatch({
      type: DELETE_MEMBER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });

    showToast(toastRef, 'error', 'Error', error.response ? error.response.data.message : error.message);
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
