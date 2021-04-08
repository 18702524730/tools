//大陆个体
const dlgtRules = (function () {
	//大陆个体身份证验证
	let dlgt_checkId = (rule, value, callback) => {
		let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (!value) {
				return callback(new Error('请填写身份证号码'));
		}
		setTimeout(() => {
				if (!reg.test(value)) {
					callback(new Error('身份证格式错误'));
				} else {
					callback();
				}
		}, 50);
	};
	//大陆个体手机号码\固定电话验证
	let dlgt_checkPhone = (rule, value, callback) => {
		let reg = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
		if (!value) {
				return callback(new Error('请填写申请人联系电话'));
		}
		setTimeout(() => {
				if (!reg.test(value)) {
					callback(new Error('请填写正确的手机号码，固话前请加区号和-'));
				} else {
					callback();
				}
		}, 50);
	};
	//大陆个体邮箱验证
	let dlgt_checkEmail = (rule, value, callback) =>{
		let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!value) {
				return callback(new Error('申请人邮箱不能为空'));
		}
		if (value.length > 30) {
				return callback(new Error('邮箱不能超过30个字符'));
		}
		setTimeout(() => {
				if (!emailReg.test(value)) {
					callback(new Error('邮箱格式错误'));
				} else {
					callback();
				}
		}, 50);
	};

	//统一邮编验证
	let checkZipCode = (rule, value, callback) =>{
		let zipCodeReg = /^\d{6}$/;
		if (!value) {
				return callback(new Error('请填写邮政编码'));
		}
		setTimeout(() => {
				if (!zipCodeReg.test(value)) {
					callback(new Error('邮政编码仅限6位数字'));
				} else {
					callback();
				}
		}, 50);
	};

	return {
		apply_name:[
			{ required: true, message: '请填写申请人姓名', trigger: 'blur' },
			{ pattern: /^[\u4e00-\u9fa5]{2,20}$/, message: '请填写2-20个汉字', trigger: 'blur' }
		],
		apply_number: [
			{ required: true, validator:dlgt_checkId, trigger: 'blur' }
		],
		apply_phone: [
			{ required: true, validator:dlgt_checkPhone, trigger: 'blur' }
		],
		/*apply_email:[
			{ required: true, validator:dlgt_checkEmail, trigger: 'blur' }
		],*/
		province_id:[
			{ required: true, type:'number', message: '请选择省份', trigger: 'change' }
		],
		city_id:[
			{ required: true, type:'number', message: '请选择城市', trigger: 'change' }
		],
		/*area_id:[
			{ required: true, type:'number', message: '请选择区', trigger: 'change' }
		],*/
		address:[
			{ required: true, message: '请填写详细地址', trigger: 'blur' },
			//{ min: 2, max: 30, message: '详细地址长度 2到 30个字符', trigger: 'blur' }
		],
		zip_code:[
			{ required: true, validator:checkZipCode, trigger: 'blur' }
			/*{ required: true, message: '请填写申请人邮编', trigger: 'blur' },
			{ max: 12, message: '邮编最长12个字符', trigger: 'blur' }*/
		]
	};
})();


//大陆企业
const dlqyRules = (function () {
	//大陆企业营业执照
  let dlqy_checkNumber = (rule, value, callback) =>{
    let reg = /(^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$)|([0-9A-Za-z]{15})/;
    if (!value) {
        return callback(new Error('请填写统一社会信用代码'));
    }
    setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('请输入阿拉伯数字或大小写英文'));
        } else {
          callback();
        }
    }, 50);
  };
  //大陆个体固定电话验证
	let dlqy_checkPhone = (rule, value, callback) => {
		let reg = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
		if (!value) {
				return callback(new Error('请填写申请人联系电话'));
		}
		setTimeout(() => {
				if (!reg.test(value)) {
					callback(new Error('请填写正确的联系电话，固话前请加区号和-'));
				} else {
					callback();
				}
		}, 50);
	};
  //大陆企业邮箱验证
  let dlqy_checkEmail = (rule, value, callback) =>{
    let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!value) {
        return callback(new Error('企业邮箱不能为空'));
    }
    if (value.length > 30) {
        return callback(new Error('邮箱不能超过30个字符'));
    }
    setTimeout(() => {
        if (!emailReg.test(value)) {
          callback(new Error('邮箱格式错误'));
        } else {
          callback();
        }
    }, 50);
  };
  //统一邮编验证
	let checkZipCode = (rule, value, callback) =>{
		let zipCodeReg = /^\d{6}$/;
		if (!value) {
				return callback(new Error('请填写邮政编码'));
		}
		setTimeout(() => {
				if (!zipCodeReg.test(value)) {
					callback(new Error('邮政编码仅限6位数字'));
				} else {
					callback();
				}
		}, 50);
	};

	return {
    //大陆企业
    apply_name:[
      { required: true, message: '请填写企业名称', trigger: 'blur' },
      //{ min: 1, max: 30, message: '企业名称长度 1到 30个字符', trigger: 'blur' }
    ],
    apply_number: [
      { required: true, validator:dlqy_checkNumber, trigger: 'blur' }
    ],
    apply_phone: [
      { required: true, validator:dlqy_checkPhone, trigger: 'blur' }
    ],
    /*apply_email:[
      { required: true, validator:dlqy_checkEmail, trigger: 'blur' }
    ],*/
    province_id:[
      { required: true, type:'number', message: '请选择省份', trigger: 'change' }
    ],
    city_id:[
      { required: true, type:'number', message: '请选择城市', trigger: 'change' }
    ],
    /*area_id:[
      { required: true, type:'number', message: '请选择区', trigger: 'change' }
    ],*/
    address:[
      { required: true, message: '请填写详细地址', trigger: 'blur' },
      //{ min: 2, max: 30, message: '详细地址长度 2到 30个字符', trigger: 'blur' }
    ],
    zip_code:[
      { required: true, validator:checkZipCode, trigger: 'blur' }
      /*{ required: true, message: '请填写邮政编码', trigger: 'blur' },
      { max: 12, message: '邮编最长12个字符', trigger: 'blur' }*/
    ]
  };
})();


//港澳台及境外个人
const gatgrRules = (function () {
	//境外个体邮箱验证
  let jwgt_checkEmail = (rule, value, callback) =>{
    let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!value) {
        return callback(new Error('申请人邮箱不能为空'));
    }
    if (value.length > 30) {
        return callback(new Error('邮箱不能超过30个字符'));
    }
    setTimeout(() => {
        if (!emailReg.test(value)) {
          callback(new Error('邮箱格式错误'));
        } else {
          callback();
        }
    }, 30);
  };
  //统一邮编验证
	let checkZipCode = (rule, value, callback) =>{
		let zipCodeReg = /^\d{6}$/;
		if (!value) {
				return callback(new Error('请填写邮政编码'));
		}
		setTimeout(() => {
				if (!zipCodeReg.test(value)) {
					callback(new Error('邮政编码仅限6位数字'));
				} else {
					callback();
				}
		}, 50);
	};

  //手机号码\固定电话验证
	let gatgr_checkPhone = (rule, value, callback) => {
		let reg = /^[0-9]*[\+\-]?[0-9]+$/;
		if (!value) {
				return callback(new Error('请填写申请人联系电话'));
		}
		setTimeout(() => {
				if (!reg.test(value)) {
					callback(new Error('请填写正确的联系电话，固话前请加区号和-'));
				} else {
					callback();
				}
		}, 50);
	};

	return {
    //境外个体
    name_en:[
      { required: true, message: '请填写申请人英文姓名', trigger: 'blur' },
      //{ min: 2, max: 20, message: '姓名长度 2到 20个字符', trigger: 'blur' }
    ],
    apply_name:[
      { required: true, message: '请填写申请人中文姓名', trigger: 'blur' },
      //{ min: 2, max: 20, message: '姓名长度 2到 20个字符', trigger: 'blur' }
    ],
    apply_number: [
      { required: true, message: '请填写申请人护照号', trigger: 'blur' },
      //{ min: 2, max: 30, message: '护照号长度 2到 30个字符', trigger: 'blur' }
    ],
    apply_phone: [
      { required: true, validator:gatgr_checkPhone, trigger: 'blur' }
      //{ min: 2, max: 20, message: '电话长度 2到 20个字符', trigger: 'blur' }
    ],
    /*apply_email:[
      { required: true, validator:gatgr_checkEmail, trigger: 'blur' }
    ],
    apply_fax:[
      //{ required: true, message: '请填写申请人传真', trigger: 'blur' },
      { min: 2, max: 20, message: '传真长度 2到 20个字符', trigger: 'blur' }
    ],*/
    area_id:[
      { required: true, type:'number', message: '请选择国家/地区', trigger: 'change' }
    ],
    address:[
      { required: true, message: '请填写详细地址', trigger: 'blur' },
      //{ min: 2, max: 30, message: '详细地址长度 2到 30个字符', trigger: 'blur' }
    ],
    zip_code:[
      { required: true, validator:checkZipCode, trigger: 'blur' }
      /*{ required: true, message: '请填写邮政编码', trigger: 'blur' },
      { max: 12, message: '邮编最长12个字符', trigger: 'blur' }*/
    ]
  };
})();




const gatqyRules = (function () {
	//境外企业邮箱验证
  let jwqy_checkEmail = (rule, value, callback) =>{
    let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!value) {
        return callback(new Error('企业邮箱不能为空'));
    }
    if (value.length > 30) {
        return callback(new Error('邮箱不能超过30个字符'));
    }
    setTimeout(() => {
        if (!emailReg.test(value)) {
          callback(new Error('邮箱格式错误'));
        } else {
          callback();
        }
    }, 50);
  };

  //统一邮编验证
	let checkZipCode = (rule, value, callback) =>{
		let zipCodeReg = /^\d{6}$/;
		if (!value) {
				return callback(new Error('请填写邮政编码'));
		}
		setTimeout(() => {
				if (!zipCodeReg.test(value)) {
					callback(new Error('邮政编码仅限6位数字'));
				} else {
					callback();
				}
		}, 50);
	};

  //手机号码\固定电话验证
	let gatqy_checkPhone = (rule, value, callback) => {
		let reg = /^[0-9]*[\+\-]?[0-9]+$/;
		if (!value) {
				return callback(new Error('请填写申请人联系电话'));
		}
		setTimeout(() => {
				if (!reg.test(value)) {
					callback(new Error('请填写正确的手机号码，固话前请加区号和-'));
				} else {
					callback();
				}
		}, 50);
	};

	return {
    //境外企业
    name_en:[
      { required: true, message: '请填写企业英文名称', trigger: 'blur' },
      //{ min: 1, max: 45, message: '企业名称长度 1到 45个字符', trigger: 'blur' }
    ],
    apply_name:[
      { required: true, message: '请填写企业中文名称', trigger: 'blur' },
      //{ min: 1, max: 30, message: '企业名称长度 1到 30个字符', trigger: 'blur' }
    ],
    apply_phone: [
      { required: true, validator:gatqy_checkPhone, trigger: 'blur' }
    ],
    /*apply_email:[
      { required: true, validator:jwqy_checkEmail, trigger: 'blur' }
    ],
    apply_fax:[
      { required: true, message: '请填写企业传真', trigger: 'blur' },
      { min: 2, max: 20, message: '传真长度 2到 20个字符', trigger: 'blur' }
    ],*/
    area_id:[
      { required: true, type:'number', message: '请选择国家/地区', trigger: 'change' }
    ],
    address:[
      { required: true, message: '请填写详细地址', trigger: 'blur' },
      //{ min: 2, max: 30, message: '详细地址长度 2到 30个字符', trigger: 'blur' }
    ],
    zip_code:[
      { required: true, validator:checkZipCode, trigger: 'blur' }
      /*{ required: true, message: '请填写邮政编码', trigger: 'blur' },
      { max: 12, message: '邮编最长12个字符', trigger: 'blur' }*/
    ]
  };
})();

export default {
	dlgtRules,
	dlqyRules,
	gatgrRules,
	gatqyRules
}
