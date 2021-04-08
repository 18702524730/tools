/*
注意：谨慎在全局中增加模块，这儿的模块必须是公用3次以上的，
若是私有的请在相应的入口js或者vue文件中引入
*/
import 'assets/css/reset.css';
//import 'assets/css/css.css';
import 'assets/css/font-awesome.min.css';

import Vue from 'vue'
import 'babel-polyfill'
import Element from 'element-ui'
import 'assets/css/element-variables.scss';
import 'assets/css/common.scss'
Vue.use(Element)

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

import axios from 'axios'
import VueAxios from 'vue-axios'
require('es6-promise').polyfill();
Vue.use(VueAxios, axios)
const userUrl = Config.userUrl;
// 配置全局根路径
global.Path = axios.defaults.baseURL = Config.path;
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = VueCookie.get('user_token');
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 拦截未登录
axios.interceptors.response.use(function (response) {
  var data = response.data;
  //401表示token错误
  /*if (data && data.errorCode == '401') {
    location.href = userUrl + '/iprp/#/access/login?return_url='+ encodeURIComponent(location.href);
  }*/
  return response;
}, function (error) {
  return Promise.reject(error);
});

import Config from 'assets/config';
import Util from 'assets/common';
import Filters from 'assets/filters';
import { EventBus } from 'assets/js/event-bus.js';

export default {
	...Util, Filters, EventBus
};
