import axios from 'axios';
import qs from 'qs';
import React, { useContext } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * @description transform json Data to FormData
 * @param data
 */
function transformToFormData(data) {
    var formData = new FormData();
    Object.keys(data).forEach(function (key) {
        formData.append(key, data[key]);
    });
    return formData;
}

/*
 * @Description: axios 参数转换函数，抹平 get/post/application 间传参的差异性
 * @Type: function
 * @Author: Ben
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-05 18:04:27
 * @LastEditTime: 2019-05-09 16:02:59
 */
function axiosParamsConvert(params) {
    var res = {};
    Object.keys(params).forEach(function (item) {
        // NOTE: sign = true , 将 data => params
        if (item === 'data') {
            if (params.method === 'GET') {
                res.params = params.data;
            }
            if (params.method === 'POST') {
                if (params.data &&
                    params.headers &&
                    params.headers['Content-Type'] === 'multipart/form-data') {
                    res.data = transformToFormData(params.data);
                }
                else if (params.data &&
                    params.headers &&
                    params.headers['Content-Type'] === 'application/json') {
                    res.data = params.data;
                }
                else {
                    res.data = qs.stringify(params.data);
                }
            }
            /* eslint-disable-next-line */
        }
        else {
            res[item] = params[item];
        }
    });
    return res;
}

function chiliReqBase(config) {
    var _this = this;
    axios.defaults.baseURL = config.baseURL;
    // NOTE:发送前拦截，用于获取 token 等...
    if (config.interceptorReq) {
        axios.interceptors.request.use(function (request) {
            // @ts-ignore
            return config.interceptorReq(request);
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }
    // NOTE:返回接口数据前拦截，用于token过期重置等
    if (config.interceptorRes) {
        axios.interceptors.response.use(function (response) {
            try {
                // @ts-ignore
                return config.interceptorRes(response);
            }
            catch (error) {
                throw error;
            }
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }
    return function (regConfig) { return __awaiter(_this, void 0, void 0, function () {
        var paramCopy, response, error_1, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paramCopy = axiosParamsConvert(regConfig.option);
                    response = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios(paramCopy)];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4:
                    data = response.data;
                    // NOTE: middle 转换数据
                    if (regConfig.middle) {
                        data = regConfig.middle(data);
                    }
                    return [2 /*return*/, data];
            }
        });
    }); };
}

var ChiliReqContext = React.createContext(undefined);
function useChiliReq() {
    var config = useContext(ChiliReqContext);
    if (config === undefined) {
        throw 'chiliReq missing baseConfig.';
    }
    return function () { return chiliReqBase(config); };
}

// import axios from 'axios';

export default chiliReqBase;
export { ChiliReqContext, useChiliReq };
//# sourceMappingURL=index.es.js.map
