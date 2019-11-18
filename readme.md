<h1 align="center">Welcome to chili-request 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/chili-request" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/chili-request.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## 简介

`chili-request` 使用 axois 来发送 http 请求，但尝试解决了 axios 里使用存在的几个缺陷:
- axios 的 get/post 请求传参方式不一致
- axios 没有明确的针对于每一个接口的响应数据拦截器

同时，`chili-request` 专注于解决 http 请求配置分散到项目各个角落的问题，实现在一个目录下管理所有 http 请求配置。

`chili-request` 专注于解决的另一个问题是：无法定义请求传参类型和响应数据类型。

## 安装

```sh
npm install chili-request
```

or

```sh
yarn chili-request
```

## 案例

1. 全局配置(与 axios 配置基本一致)
```js
import chiliReqBase from 'chili-request';
export default chiliReqBase({
  baseURL: config.apiUrl,
  interceptorReq: (request: any) => {
    ...
    // 请求发送前拦截器，可以对请求头进行统一处理。比如 携带自定义的 accessToken
    // 将处理后的请求头返回
    return request;
  },
  interceptorRes: (response: any) => {
    ...
    // 对获取到的响应数据进行统一处理
    // 比如对登录错误或其他类型错误进行统一处理
    return res
  }
});
```

2. 书写 http 请求配置
```js
// 响应数据类型/接口描述
export interface Res {
  [key:string]:any
}

// login 函数参数是接口请求调用传参的类型/接口描述
export default function login(data: { name: string; pwd: string }) {
  return {
    option: { 
      method: "GET", // http method
      url: "/login", // relative url
      data // params(get/post/delete/ 等一致)
    }
  };
}

```

3. 使用 `chiliReq` 和 `login` 发送请求
```js
chiliReq<Res>(login(name: "", pwd: "")).then(res => {
  // res 的类型即 Res
}).catch() => {

}
```

基于 `chili-request` 实现的 restful-api 前端接口管理实现的目录一般如下图：
![接口目录](http://static.ohcat.xyz/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-11-18%20%E4%B8%8B%E5%8D%8812.25.13.png)

## 支持

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
