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
    DELETE_MEMBER_FAIL
} from "../constants/memberConstants";

export const registerMemberReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                success: true,
            };
        case REGISTER_MEMBER_FAIL:
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

export const fetchMembersReducer = (state = { members: [] }, action) => {
    switch (action.type) {
        case FETCH_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                members: action.payload,
            };
        case FETCH_MEMBER_FAIL:
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

export const singleMemberReducer = (state = { member: {} }, action) => {
    switch (action.type) {
        case SINGLE_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SINGLE_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                member: action.payload,
            };
        case SINGLE_MEMBER_FAIL:
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

export const updateMemberReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case UPDATE_MEMBER_FAIL:
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

export const deleteMemberReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case DELETE_MEMBER_FAIL:
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
