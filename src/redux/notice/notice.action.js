import axios from "axios";
import { ADD_NOTICE_FAILURE, ADD_NOTICE_REQUEST, ADD_NOTICE_SUCCESS, DELETE_NOTICE_FAILURE, DELETE_NOTICE_REQUEST, DELETE_NOTICE_SUCCESS, UPDATE_NOTICE_FAILURE, UPDATE_NOTICE_REQUEST, UPDATE_NOTICE_SUCCESS } from "./notice.actionType";


function addNotice(formData){
    return async function(dispatch){
        dispatch({type:ADD_NOTICE_REQUEST})
        try{
            const jwtToken=localStorage.getItem("jwt");
            const response=await axios.post("http://localhost:8084/api/addNoticeInfo",formData,{
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                  }
            });
            const data=response.data;
            dispatch({ type: ADD_NOTICE_SUCCESS, payload: data.message });
        }
        catch(error){
            const errorMessage = error.response?.data?.message ||"Unable to Add"
            dispatch({ type: ADD_NOTICE_FAILURE, payload: errorMessage });
        }
    }
}

function updateNotice(noticeId, formData) {
    return async function(dispatch) {
      dispatch({ type: UPDATE_NOTICE_REQUEST });
  
      try {
        const jwtToken = localStorage.getItem("jwt");
        const response = await axios.put(
          `http://localhost:8084/api/editNotice/${noticeId}`, formData,
          {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
              }
        }
        );
  
        const data = response.data;
        dispatch({ type: UPDATE_NOTICE_SUCCESS, payload: data.message });
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Unable to Update";
        dispatch({ type: UPDATE_NOTICE_FAILURE, payload: errorMessage });
      }
    };
  }

  function deleteNotice(noticeId){
    return async function(dispatch){
      dispatch({type:DELETE_NOTICE_REQUEST})
      try{
        const jwtToken=localStorage.getItem("jwt");
        const response=await axios.delete(`http://localhost:8084/api/removeNotice/${noticeId}`,
          {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
              }
        }
        )
        const data=response.data;
        dispatch({ type: DELETE_NOTICE_SUCCESS, payload: data.message });
      }
      catch(error){
        dispatch({type: DELETE_NOTICE_FAILURE, payload: error.message})
      }
    }
  }
  export {addNotice,updateNotice,deleteNotice}