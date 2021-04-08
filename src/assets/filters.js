var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        //日期转yyyy-mm-dd格式
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        },
        //日期转时间戳
        timeStamp:function(date){
            var timestamp = Date.parse(new Date(date));
            timestamp = timestamp / 1000;
            return timestamp
        },
        //日期格式转换
        dateFormat: function (input,type) {
            if(input == null || input=='' || typeof(input) == "undefined"){
                return "";
            }
            var _date = new Date(input);
            var year = _date.getFullYear();
            var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
            var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
            var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
            var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
            var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
            if(type == "date"){
                return year + "-" + month + "-" + day;
            } else if(type == "time") {
                return hour + ":" + minutes + ":" + seconds;
            } else {
                return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
            }
            return "";
      }
    },
    //支付订单状态
    orderStatusformat: function (input) {
      var ret = ''
      switch (input+''){
        case '-1':
          ret = "已关闭";
          break;
        case '0':
          ret = "待付款";
          break;
        case '1':
          ret = "已付款";
          break;
        case '2':
          ret = "已完成";
          break;
      }
      return ret;
    },
    //支付订单状态
    payStatusformat: function (input) {
      var ret = ''
      switch (input+''){
        case '0':
          ret = "未支付";
          break;
        case '1':
          ret = "已支付";
          break;
      }
      return ret;
    },
    //价格保留两位小数
    priceformat: function (input) {
      var ret = '';
      // input 有可能是数字0
      if (input !== null && input !== undefined) {
        ret = input+'';
        /*if(ret.indexOf('.') !== -1){
          ret = (ret-0).toFixed(2);
          ret = ret.replace(/((\.0{1,2})|0)$/, '');
        }else{*/
          ret = (ret-0).toFixed(2);
        /*}*/
      }
      return ret;
    },
    //价格转换为万元
    priceUnitFilter(td){
      var ret = td/10000+'';
      if(ret.indexOf('.') !== -1){
        ret = (ret-0).toFixed(2);
        ret = ret.replace(/((\.0{1,2})|0)$/, '');
      }
      return ret;
    },
    refundStateFilter(input){
      var ret = ''
      switch (input+''){
        case '0':
          ret = "待受理";
          break;
        case '1':
          ret = "退款中";
          break;
        case '2':
          ret = "已退款";
          break;
        case '3':
          ret = "已驳回";
          break;
      }
      return ret;
    },
    fileSizeFilter(v){
      if (!v) {
        return '';
      }
      var ret = v;
      if (v > 1024*1024) {
        ret = (ret/1024/1024).toFixed(1) + 'M';
      }else{
        var t = (ret/1024).toFixed(1);
        ret = (t === '0.0' ? '0.1' : t) + 'KB';
      }
      return ret;
    },
    //申请主体类型
		subjectTypeFormat(input) {
			switch (input){
				case 1:
					return "大陆个体";
				case 2:
					return "大陆企业";
				case 3:
					return "港澳台及境外个人";
				case 4:
					return "港澳台及境外企业";
			}
		},
};
