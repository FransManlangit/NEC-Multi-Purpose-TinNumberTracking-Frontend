import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
  import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { registerUser, authReducer } from "./reducers/userReducers";
import { 
  fetchMembersReducer, 
  deleteMemberReducer, 
  registerMemberReducer, 
  updateMemberReducer, 
  singleMemberReducer 
} from "./reducers/memberReducers";

const reducer = combineReducers({
  register: registerUser,
  auth: authReducer,
  fetchMembers: fetchMembersReducer,
  deleteMember: deleteMemberReducer,
  registerMember: registerMemberReducer,
  updateMember: updateMemberReducer,
  singleMember: singleMemberReducer,
  // other reducers can be added here
});

const middleware = [thunk];
const store = createStore(
  reducer,
  // initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
