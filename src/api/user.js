import request from "@utils/request";

// 封装发送请求登录的功能函数
export const reqLogin = (phone, password) => {
  return request({
    method: "POST",
    url: "/user/passport/login",
    data: {
      phone,
      password,
    },
  });
};

//注册请求
export const reqRegister = ({ phone, password, code }) => {
  return request({
    method: "POST",
    url: "/user/passport/register",
    data: {
      phone,
      password,
      code,
    },
  });
};
