import {
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
  DELETE_USER_FAIL,
} from "../constants/userConstants";

export const registerUser = (state = { user: {} }, action) => {
  switch (action.type) {
    //request
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    //success
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        success: true,
      };

    //fail
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case REGISTER_USER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case REGISTER_USER_FAIL:
    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        isLogout: true,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


// export const authReducer = (state = { user: {} }, action) => {
//   switch (action.type) {
//     case REGISTER_USER_REQUEST:
//     case LOGIN_REQUEST:
//     case LOAD_USER_REQUEST:
//       return {
//         loading: true,
//         isAuthenticated: false,
//       };

//     case REGISTER_USER_SUCCESS:
//     case LOGIN_SUCCESS:
//     case LOAD_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isAuthenticated: true,
//         user: action.payload,
//       };

//     case REGISTER_USER_FAIL:
//     case LOGIN_FAIL:
//     case LOAD_USER_FAIL:
//       return {
//         ...state,

//         loading: false,

//         isAuthenticated: false,

//         user: null,

//         error: action.payload,
//       };

//     case LOGOUT_SUCCESS:
//       return {
//         loading: false,
//         isAuthenticated: false,
//         user: null,
//         isLogout: true,
//       };
//     case LOGOUT_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,

//         error: null,
//       };

//     default:
//       return state;
//   }
// };

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    // case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:

    // case UPDATE_PASSWORD_SUCCESS:

    case UPDATE_USER_SUCCESS:
      return {
        ...state,

        loading: false,

        isUpdated: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,

        loading: false,

        isDeleted: action.payload,
      };

    case UPDATE_PROFILE_RESET:

    // case UPDATE_PASSWORD_RESET:

    case UPDATE_USER_RESET:
      return {
        ...state,

        isUpdated: false,
      };

    case DELETE_USER_RESET:
      return {
        ...state,

        isDeleted: false,
      };

    case UPDATE_PROFILE_FAIL:

    // case UPDATE_PASSWORD_FAIL:

    case UPDATE_USER_FAIL:

    case DELETE_USER_FAIL:
      return {
        ...state,

        loading: false,

        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,

        error: null,
      };

    default:
      return state;
  }
};