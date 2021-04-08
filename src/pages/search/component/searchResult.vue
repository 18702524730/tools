<template>
<div class="searchResult" v-loading="loading2" element-loading-text="拼命加载中">
  <div v-if="myResult.code === '0' && myResult.list.length">
    <div class="mt-20 resultHead">
    <el-checkbox class="chkAl" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox><!--@change="check.chkAll = !check.chkAll;clickAllObj(check.chkAll);"-->
      <div class="fr topPage">
        <span :class="{prev: true, disabled: currentPage == 1}" @click="handleCurrentChange('prev')">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
        </span>
        <span :class="{next: true, disabled: currentPage == totalPages}" @click="handleCurrentChange('next')">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </div>
      <span class="fr resultInfo">查询结果共<span style="color:#ff7019;"> {{myResult.total}} </span>条记录 <i class="highlight">{{myResult.pageNo || 1}}</i>/{{totalPages}} </span>
      <!-- <a href="javascript:;" class="fr batexport" @click="batExport">批量导出</a> -->
      <!--<el-button type="text" @click.native="dialogVisible = true" class="fr batexport">批量导出</el-button>-->
      <el-button type="text" class="fr batexport" @click.native="showSechReport">
      <img src="../../../assets/img/file2.png" style="width:10%;position: relative;top: 2px;margin-right: 3px;">生成商标查询报告</el-button>
    </div>
    <div class="resultBody">
      <ul class="resultlists">
        <li class="itemCon" v-for="(item, index) in myResult.list">
          <el-checkbox-group class="chkItem" v-model="checkedItems" @change="handleCheckedItemsChange">
            <el-checkbox :label="item"></el-checkbox>
          </el-checkbox-group><!--@change="chooseList(check.chkItem[index],index)"-->
            <span class="img-lb">
              <!-- <img class="lazy" :src="item.tmImg.replace('http://images.cha-tm.cn','https://tools.ipsebe.com/tools')" width="103" height="103"> -->
              <img class="lazy" :src="item.tmImg" width="103" height="103">
            </span>
            <div class="c48">
              <span class="mr" :title="item.tmName">第{{item.intCls}}类：{{item.tmName}}</span>
              <span class="mr">注册号：{{item.regNo}}</span>
              <span class="mr" v-if="item.announcementDate">初审日期：{{item.announcementDate}}</span>
              <span class="mr">当前进度：<b class="highlight">{{item.currentStatus}}</b></span>
              <span class="mr">申请日期：{{item.appDate}}</span>
              <span class="mr" v-if="item.regDate">注册日期：{{item.regDate}}</span>
              <span style="width:38%;" class="mr">申请人：{{item.applicantCn}}</span>
              <!-- <span class="mr" style="width:30%;">代理机构：{{item.agent}}</span> -->
              <!-- <span style="width:38%;" :class="{'hide': searchType!==4}" >群组号：{{item.goodsCode}}</span> -->
            <div>
              <a href="javascript:;" class="viewt fl" @click="view(item.applicantOther2, item.intCls, item.detailsType || '0')">查看详情</a>
              <a :href="path+'/rabbit/report.do?intCls='+item.intCls+'&regNo='+item.applicantOther2" class="export fl ml-20" target="_blank">导出</a>
            </div>
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
          :current-page="myResult.pageNo || 1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="20"
          layout="total, prev, pager, next, jumper"
          :total="myResult.total">
        </el-pagination>
      </div>
    </div>

    <!-- 查看详情 -->
    <el-dialog title="查看详情" size="small" :visible.sync="dialogTableVisible" :append-to-body="true" :lock-scroll="true">
      <el-search-detail :loading="loading" :error="error" :post="post" :result-data="resultData"></el-search-detail>
    </el-dialog>

    <!-- 商标查询报告 -->
    <el-dialog title="商标查询报告" size="small" :visible.sync="tmarkSearchReport" class="tmarkSearchReport">
      <el-search-report :loading="loading" :keyword="keyword" :searchType="searchType" :error="error" :post="post" :intCls="intCls" :checkedItems="checkedItems" :typeResult="typeResult" :myResult="myResult"></el-search-report>
    </el-dialog>

    <!-- 批量导出 -->
    <el-dialog title="请选择要导出的数量，默认当前页" :visible.sync="dialogVisible" size="tiny">
      <span>
        <el-radio-group v-model="radio">
          <el-radio :label="10">10条</el-radio>
          <el-radio :label="50">50条</el-radio>
          <el-radio :label="100">100条</el-radio>
          <el-radio :label="200">200条</el-radio>
        </el-radio-group>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="batExport">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <div class="noresult" style="color:red;" v-else-if="myResult.code === '99'">
    温馨提示：亲，您已超过查询次数，请耐心等待10分钟...
  </div>
  <div v-else class="noresult">
    温馨提示：亲，未检索到您关注的商标
  </div>
</div>

</template>

<script>
import qs from 'qs'
import elSearchDetail from './searchDetail.vue'
import elSearchReport from './searchReport.vue'
export default {
  props: ['myResult', 'loading2', 'pageSize', 'keyword','typeResult','searchType','totalPages','checkedItems','intCls'/*,'checkAll'*/],
  data() {
    return {
    	path: CONFIG.path,
      dialogVisible: false,
      radio: 10,
      dialogTableVisible: false,
      currentPage: 1,
      //totalPages:1,
      resultData: '',
      loading: false,
      error: null,
      post: null,
      checkAll:false,//全选
      //checkedItems:[],  //选中项
      isIndeterminate: false,
      tmarkSearchReport:false,
      //isDisabled:false
      //intCls:''
      //check:{'chkAll':false,'chkItem':[]}//全选反选单选
    }
  },
  components: {elSearchDetail,elSearchReport},
  //NAN bug
  /*updated () {
    this.totalPages = Math.ceil(this.myResult.total/this.myResult.pageSize);
    alert(this.totalPages);
  },*/
  methods: {
    view (regNo, intCls, detailsType){

      this.dialogTableVisible = true;
      this.error = this.post = null
      this.loading = true

      this.$http.post('./rabbit/findTrademarkByDetail.do', qs.stringify({
        regNo: regNo,
        intCls: intCls,
        detailsType: detailsType
      }))
      .then((response) => {
        //console.log(JSON.parse(response.data));
        // 这里是处理正确的回调
        this.loading = false;
        this.post = true;
        this.resultData = response.data.data;
        //console.log("resultDataDetail:");
        //console.log(this.resultData);

      })
      .catch((response) => {
        // 这里是处理错误的回调
        this.error = true;
        console.log(response)
      });
    },
    batExport (){
      this.dialogVisible = false;
      this.$emit('batExport',{_pageSize: this.radio});
    },
    handleSizeChange (){

    },
    handleCurrentChange (currentPage){
      if (currentPage == 'prev') {
        if(this.currentPage == 1) return;
        currentPage = this.currentPage - 1;
      } else if(currentPage == 'next') {
        if(this.currentPage == this.totalPages) return;
        currentPage = this.currentPage + 1;
      }
      //console.log(currentPage)
      this.currentPage = currentPage;
      var ret = {};
      ret._pageNo = currentPage;

      this.$emit('render', ret)
    },
    //正选反选单选
    handleCheckAllChange(val) {
      this.checkedItems = val ? this.myResult.list : [];
      this.isIndeterminate = false;
      //console.log(this.checkedItems);
    },
    handleCheckedItemsChange(value) {
      //console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.myResult.list.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.myResult.list.length;
      this.checkedItems = value;
      //console.log(this.checkedItems);
    },
    //商标查询报告
    showSechReport(){
      //this.isDisabled = false;
      if(this.checkedItems.length > 0){
        this.tmarkSearchReport = true;
      }else{
        this.$message('请选择需要导出报告的商标！');
      }
    }

    /*initChkItem(){
      if(this.check.chkItem.length==0 && this.myResult.list.length > 0){
        //console.log("myResult.list:");
        //console.log(this.myResult.list);
        for(var i = 0; i<this.myResult.list.length; i++){
          this.check.chkItem[i] = false;
        }

      }
    },
    chooseList(chkflag,$index){
      this.initChkItem();
      this.check.chkItem[$index] = !chkflag;
      //console.log(this.check.chkItem);
      //console.log($index);
      if(!this.check.chkItem[$index]){
        this.check.chkAll = false;
      }else{
        var isAllChecked = true;
        for(var i = 0; i < this.check.chkItem.length; i++){
          if(!this.check.chkItem[i]){
            isAllChecked = false;
            break;
          }
        }
        if(isAllChecked){
          this.check.chkAll = true;
        }
      }
    },
    clickAllObj(flag){
      console.log(flag);
      this.initChkItem();
      for(var i = 0; i < this.check.chkItem.length; i++){
        this.check.chkItem[i] = flag;
      }
    }*/

  },

  mounted(){}
}
</script>

<style scoped>
.searchResult{min-height: 400px;}
.resultHead{position: relative;height: 42px;line-height:42px;background-color: #f1f1f1;}
.batexport{margin-right: 30px;color:#ff7019;line-height: 22px;font-size: 14px;line-height: 42px;padding:0;}
.resultInfo{margin-right: 20px;}
.resultInfo i{font-style: normal;font-weight: bold;margin-left: 10px}
.chkAl{float: left;margin-left:10px; }
.topPage{padding-right: 10px}
.topPage span{border: 1px solid #ddd;width:35px;line-height: 22px;height: 22px;display: inline-block;margin-right: -1px;font-size: 20px;background-color: #fff;cursor: pointer;margin-top: 9px;}
.topPage span.disabled{background-color: #f1f1f1;cursor: default;}
.topPage span.disabled i{color:#ccc;}
.topPage span:hover{background-color: #f1f1f1;}
.itemCon{margin: 0;width: 100%;min-height:106px;padding: 10px 0;text-align: left;border-bottom: 1px solid #eaeaea;}
.chkItem{float: left;margin-left:10px;height: 103px;line-height: 103px; }
.img-lb{float: left;margin:0px 10px; }
.img-lb img{display: inline;}
.c48{float: right;width: 1000px;}
.c48 .mr{width: 24%;display: inline-block;line-height: 24px;height: 24px;margin-bottom: 10px;overflow: hidden;}
.mr .highlight{color: red;}
.viewt{height: 24px;line-height: 24px;display: inline-block;color:#ff7019;}
.export{height: 24px;line-height: 24px;display: inline-block;color:#3db1fa;}

#pagenation{padding:20px 0 50px;text-align: right;}

.noresult{height: 150px;line-height: 150px;font-size: 16px}
.hide{display: none;}
/*.el-checkbox__label{display: none;}*/
</style>
<style>
.el-checkbox__label{display: none;}.el-dialog__title{font-size: 21px;}
.tmarkSearchReport .el-dialog{width: 950px}
.el-pagination__editor .el-input__inner{width: 40px;}
</style>
