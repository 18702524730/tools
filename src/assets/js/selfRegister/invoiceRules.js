//纳税人识别号
let invoiceCodeCheck = (rule, value, callback) => {
	let reg = /(^[a-zA-Z0-9]{15}$)|(^[a-zA-Z0-9]{18}$)|(^[a-zA-Z0-9]{20}$)/;
	if (!value) {
			return callback(new Error('请填写纳税人识别号'));
	}
	setTimeout(() => {
			if (!reg.test(value)) {
				callback(new Error('纳税人识别号格式错误'));
			} else {
				callback();
			}
	}, 50);
};
//固定电话验证
let checkPhone = (rule, value, callback) => {
	let reg = /^[0-9]*[\+\-]?[0-9]+$/;
	if (!value) {
			return callback(new Error('请填写企业联系电话'));
	}
	setTimeout(() => {
			if (!reg.test(value)) {
				callback(new Error('请填写正确的联系电话'));
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
	let zipCodeReg = /^[a-zA-Z0-9\-]{1,10}$/;
	if (!value) {
			return callback(new Error('邮编不能为空'));
	}
	if (value.length > 10) {
			return callback(new Error('邮编不能超过10个字符'));
	}
	setTimeout(() => {
			if (!zipCodeReg.test(value)) {
				callback(new Error('邮编格式错误'));
			} else {
				callback();
			}
	}, 50);
};

const invoiceSpecRules = {
	//纳税人识别号
	invoice_code:[
		{ required: true, validator:invoiceCodeCheck, trigger: 'blur' }
	],
	regist_phone:[
		{ required: true, validator:checkPhone, trigger: 'blur' }
	],
	account_bank:[
		{ required: true, message: '请填写开户行名称', trigger: 'blur' },
	],
	invoice_province_id:[
		{ required: true, type:'number', message: '请选择省份', trigger: 'change' }
	],
	invoice_city_id:[
		{ required: true, type:'number', message: '请选择城市', trigger: 'change' }
	],
	invoice_area_id:[
		{ required: true, type:'number', message: '请选择区', trigger: 'change' }
	],
	address:[
		{ required: true, message: '请填写企业注册地址，与企业登记证件保持一致', trigger: 'blur' },
		//{ min: 2, max: 30, message: '详细地址长度 2到 30个字符', trigger: 'blur' }
	],
	account_number:[
		{ required: true, message: '请填写银行账号', trigger: 'blur' },
		{ pattern: /^[0-9]{11,19}$/, message: '请输入正确的银行账号', trigger: 'blur' }
	]
};
const invoiceNormRules = {
	//纳税人识别号
	invoice_code:[
		{ required: true, validator:invoiceCodeCheck, trigger: 'blur' }
	]
};
export default {invoiceSpecRules, invoiceNormRules}
