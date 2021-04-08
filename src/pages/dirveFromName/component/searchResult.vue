<template>
<div class="searchResult" v-loading="loading2" element-loading-text="拼命加载中">
  <div v-if="myResult.code === '0'">
    <div class="resultBody">
      <ul class="resultlists">
        <div class="c48 banner">
          <span class="mr">商标名称</span>
          <span class="mr">效果</span>
          <span class="mr">人工注册咨询</span>
          <span class="mr">查询能否注册商标</span>
        </div>
        <li class="itemCon" v-for="(item, index) in myResult.list">
          <div class="c48">
            <span class=" name mr">{{item}}</span><!-- | getTop10-->
            <span class="mr effect">{{item}}</span>
            <!-- <span class="mr consult" @click="regConsultPop(item)">注册咨询</span> -->
            <a target="_blank" class="mr consult" href="http://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http://tools.ipsebe.com/tools/pages/driveFromName.html">注册咨询</a>
            <span class="mr selfQuery" @click="selfQuery(item)">自助查询</span>
          </div>
        </li>
      </ul>
      <!-- <router-view></router-view> -->
    </div>
    <div class="resultFooter">
      <div id="pagenation">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="myResult.total">
        </el-pagination>
      </div>
    </div>
  </div>

  <!--注册咨询-->
  <el-dialog title="注册咨询" v-model="regConsultDialogVisible" size="tiny" >
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px" v-loading="loading" element-loading-text="提交咨询中..." >    
      <el-form-item label="商标名称" prop="tmName">
        <el-input v-model ="form.tmName"></el-input>
      </el-form-item>       
      <el-form-item label="用户姓名" prop="truename">
        <el-input v-model ="form.truename"></el-input>
      </el-form-item>
      <i class="warning phonePos"></i>
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="regConsult('ruleForm')" size="large" style="width:100%;">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>

</template>

<script>
export default {
  props: ['myResult','loading2'],
  data() {
    //手机号码验证
      let checkPhone = (rule, value, callback) => {
        let reg = /^1\d{10}$/;
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('手机号格式错误'));
          } else {
            callback();
          }
        }, 1000);
      };
    return {
      dialogTableVisible: false,
      currentPage: 1,
      totalPages:1,
      resultData: '',
      loading: false,
      error: null,
      post: null,
      regConsultDialogVisible: false,
      form:{        
        tmName:'',      
        truename:'',
        phone:null,
      },
      rules:{
        tmName: [
          { required: true, message: '请输入商标名称', trigger: 'blur' }
        ],
        truename:[
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],         
        phone: [
          { validator:checkPhone, trigger: 'blur' }
        ],
      },
      apiUrl:Path + 'NameRecommendCorl/savaShopRecords.do'
    }
  },
  components: {},
  updated () {
    this.totalPages = Math.ceil(this.myResult.total/this.myResult.pageSize);
  },
  filters: {
    getTop10: function (value) {
      if (!value) return ''
      value = value.toString()
      return value + " getTop10FilterTest";
    }
  },
  methods: {
    handleSizeChange (){

    },
    handleCurrentChange (currentPage){
      if (currentPage == 'prev') {
        if(this.currentPage == 1) return;
        currentPage = this.currentPage - 1;    
      } else if(currentPage == 'next') {
        if(this.currentPage == this.totalPages) return;
        currentPage = this.currentPage + 1
      }
      
      this.currentPage = currentPage;
      var ret = {}
      ret._pageNo = currentPage;
      this.$emit('render', ret)
    },
    //自助查询
    selfQuery(item){
      sessionStorage.setItem("nameKeyword",item);
      //window.location = "http://localhost:8081/pages/search.html?keyword=" + item;
      window.location = CONFIG.toolsUrl+ "/tools/pages/search.html?keyword=" + item;
    },
    //注册咨询弹窗
    regConsultPop(item){
      this.regConsultDialogVisible = true;
      this.form.tmName = item;
    },
    //注册咨询
    regConsult(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交注册咨询吗?', '提示', {
            type: 'warning'
          }).then(() => {
            this.loading = true;
            //调注册咨询接口
            this.$http.post(this.apiUrl, {
              tradeMarkName: this.form.tmName,
              userName:this.form.truename,
              phone:this.form.phone
            }).then((response) => {              
              //console.log(response);
              if(response.body.code==0){               
                setTimeout(() => {
                  this.regConsultDialogVisible = false;
                  this.loading = false;
                  this.regResult();
                }, 1000)
              }else{
                this.$notify({
                  title: '提交失败',
                  message: response.error,
                  type: 'error'
                });
              }     
                        
            }).catch((response) => {
              console.log(response);
              setTimeout(() => {
                this.regConsultDialogVisible = false;
                this.loading = false;
                this.$notify({
                  title: '提交失败',
                  message: response.error,
                  type: 'error'
                });
              }, 1000)
           });

          }).catch(() => {
          });
        }
      });      
    },
    //咨询结果
    regResult() {
        this.$alert('请注意接听【拾贝知识产权】专属顾问来电 0571-28253786', '您的资料已提交', {
          confirmButtonText: '确定',
          callback: action => {
            /*this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*/
          }
        });
    }
  }
}
</script>

<style scoped>
.searchResult{min-height: 550px;margin-top: 30px;}
.resultBody{width: 1024px;margin: 0 auto;}
.resultHead{position: relative;height: 42px;line-height:42px;background-color: #f1f1f1;}
.batexport{margin-right: 30px;color:#3db1fa;}
.resultInfo{margin-right: 20px;}
.topPage{padding-right: 10px}
.topPage span{border: 1px solid #ddd;width:48px;line-height: 22px;height: 22px;display: inline-block;margin-right: -1px;font-size: 20px;background-color: #fff;cursor: pointer;margin-top: 9px;}
.topPage span.disabled{background-color: #f1f1f1;cursor: default;}
.topPage span.disabled i{color:#ccc;}
.topPage span:hover{background-color: #f1f1f1;}

.itemCon{margin: 0;width: 100%;padding: 10px 0;text-align: left;border-bottom: 1px solid #eaeaea;}
.img-lb{float: left;}
.c48{width: 1024px;text-align: center;height: 40px;line-height: 40px;}
.name{color: #ff7019;}
.c48 .mr{float:left;width: 24%;display: inline-block;text-align: left;text-align: center;cursor: pointer;}
.banner{color: #000;background-color: #f2f2f2;height: 45px;line-height: 45px;}
.mr .highlight{color: red;}
.c48 .effect{font-family: myFirstFont;color: #565656;font-size: 28px;color:#565656;font-weight: 700;margin-bottom: 0;}
.export, .viewt{height: 24px;line-height: 24px;display: inline-block;color:#3db1fa }
#pagenation{padding:20px 0 30px;}
a.consult,.selfQuery{color: #3db1fa;}
.warning:before {content: '*';color: #ff4949;margin-right: 4px;}
*>.phonePos{position:absolute;left: 36px;top: 223px;}
  @media screen and (-webkit-min-device-pixel-ratio:0) {.phonePos{position:absolute;left: 38px;top: 195px;}}
.resultFooter{text-align: center;}
</style>