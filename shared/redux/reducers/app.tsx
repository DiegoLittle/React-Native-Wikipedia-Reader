import { IAction } from '../types/IAction';
import { ACTION_TYPES } from '../constants/actionTypes';


interface bookmark {
  title:string,
  isSynced:boolean,
}
const initialState = {
  "isLoading": true,
  "bookmarks": [],
  "current_page":null,
  "current_section":null,
  "user":{},
  "sectionPositions":[],
};

export default (state = initialState, action: IAction<any>) => {
  switch (action.type) {
    case ACTION_TYPES.SPLASH.SPLASH_LAUNCHED:
      return {
        ...state,
        isLoading: false,
      };
    case "bookmarks/add_by_title":
      return{
        ...state,
        bookmarks: [...state.bookmarks, {
          title: action.payload,
          isSynced: false
        }]
      }
    case "bookmarks/add":
      return{
        ...state,
        bookmarks: [...state.bookmarks, action.payload]
      }
    case "bookmarks/set":
      return{
        ...state,
        bookmarks: action.payload
      }
    case "bookmarks/remove_by_title":
      return{
        ...state,
        bookmarks: state.bookmarks.filter(item => item.title !== action.payload)
      }
    case "bookmarks/add_webview":
      return{
        ...state,
        bookmarks: [...state.bookmarks, action.payload]}
    case "current_page/set":
      return{ 
        ...state,
        current_page: action.payload
      }
    case "current_section/set":
      return{
        ...state,
        current_section: action.payload
      }
    case "user/set_access_token":
      return{
        ...state,
        user: {
          ...state.user,
          access_token: action.payload
      }
    }
    case "user/set_user":
      return{
        ...state,
        user: action.payload
    }
    case "state/reset":
      return{
        ...initialState
      }
    case "set_section_positions":
      return{
        ...state,
        sectionPositions: action.payload
      }
    default:
      return state;
  }
};
