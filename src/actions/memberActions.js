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



export const registerMember = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_MEMBER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
  
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/registerMember`,
        userData,
        config
      );
  
      dispatch({
        type: REGISTER_MEMBER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      console.log("actions error", error.response.data.errMessage);
      dispatch({
        type: REGISTER_MEMBER_FAIL,
        payload: error.response.data.errMessage,
      });
    }
  };


  export const allMembers = () => async (dispatch) => {
    try {
      dispatch({ type: FETCH_MEMBER_REQUEST });
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/allMembers`,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: FETCH_MEMBER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MEMBER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const singleMember = () => async (dispatch) => {
    try {
      dispatch({ type: SINGLE_MEMBER_REQUEST });
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/singleMember`,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: SINGLE_MEMBER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: SINGLE_MEMBER_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const updateMember = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_MEMBER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
  
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/employee/updateMember${id}`, userData, config);
  
      dispatch({
        type: UPDATE_MEMBER_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_MEMBER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const deleteMember = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_MEMBER_REQUEST });
  
      const config = {
        withCredentials: true,
      };
  
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/employee/deleteMember${id}`, config);
  
      dispatch({
        type: DELETE_MEMBER_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_MEMBER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
};