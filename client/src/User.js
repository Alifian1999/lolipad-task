import React,{useEffect} from "react";
import { getUsers } from "./store/actions/userActions";
import { useSelector,useDispatch } from "react-redux";

export default function UsersContainer(){
  const userData=useSelector(state=>state.user)
  const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getUsers())
    },[])
    return userData.loading?(
        <h2>loading</h2>
    ):userData.error?(
        <h2>{userData.error}</h2>
    ) :(
        <div>
            <h2>user list</h2>
            <div>
                {userData &&
                userData.users &&
                userData.users.result.map((user,id)=> 
                <div>
                  <p key={id}>{user.username}</p>
                  <p>{user.password}</p>
                </div> )}
            </div>
        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//       userData: state.user
//     }
//   }
  
  // const mapDispatchToProps = dispatch => {
  //   return {
  //     getUsers: () => dispatch(getUsers())
  //   }
  // }
  
  // export default connect(
  //   mapStateToProps,
  //   mapDispatchToProps
  // )(UsersContainer)