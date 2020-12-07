//生成唯一Id
import { v4 as uuidv4 } from "uuid";

// class UserTempId {
//   constructor() {
//     this.userTempId = this.getUserTempId();
//   }
//   function getUserTempId() {
//     let userTempId = localStorage.getItem("userTempId");
//     if (userTempId) {
//       return userTempId;
//     }
//     userTempId = uuidv4();
//     localStorage.setItem("userTempId", userTempId);
//     return userTempId;
//   }
// }

function getUserTempId() {
  let userTempId = localStorage.getItem("userTempId");
  //判断之前是否先有了这个userTempId，有就用之前的，没有就重新创建
  if (userTempId) {
    return userTempId;
  }
  //重新创建userTempId
  userTempId = uuidv4();
  localStorage.setItem("userTempId", userTempId);

  return userTempId;
}

export default getUserTempId;
