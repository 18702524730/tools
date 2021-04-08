<template>
  <div class="searchDetail" v-loading="loading" element-loading-text="拼命加载中">
  <!--{{resultData}}-->
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="post" class="content">
      <table width="100%" class="searchDetailtb">
        <tbody>
          <tr>
            <td colspan="8" class="tl til">商标名称：{{resultData.tmName}}</td>
          </tr>
          <tr>
            <td width="12.5%">注册号</td>
            <td width="12.5%">{{resultData.regNo}}</td>
            <td width="12.5%">类别</td>
            <td width="12.5%">{{resultData.intCls}}</td>
            <td width="12.5%">申请日期</td>
            <td width="25%" colspan="3">{{resultData.appDate}}</td>
          </tr>
          <tr>
            <td width="12.5%">申请人名称<br>（中文）</td>
            <td colspan="7" class="tl">{{resultData.applicantCn}}</td>
          </tr>
          <tr>
            <td width="12.5%">申请人地址<br>（中文）</td>
            <td colspan="7" class="tl">{{resultData.addressCn}}</td>
          </tr>
          <tr>
            <td width="12.5%">申请人名称<br>（英文）</td>
            <td colspan="2">{{resultData.applicantEn}}</td>
            <td width="12.5%">申请人地址<br>（英文）</td>
            <td colspan="4">{{resultData.addressEn}}</td>
          </tr>
          <tr>
            <td>商标图片</td>
            <td colspan="2"><img class="imgw" :src="resultData.tmImg"></td>
            <td>商品/服务列表</td>
            <td colspan="4" class="goodLists">
              <div v-for="item in resultData.goodsList">
                {{item.goodsCode}} - {{item.goodsName}}
              </div >
            </td>
          </tr>
          <tr>
            <td>初审公告期号</td>
            <td colspan="2" class="tl">{{resultData.announcementIssue}}</td>
            <td colspan="2">注册公告期号</td>
            <td colspan="3" class="tl">{{resultData.regIssue}}</td>
            
          </tr>
          <tr>
            <td>初审公告日期</td>
            <td colspan="2" class="tl">{{resultData.announcementDate}}</td>
            <td colspan="2">注册公告日期</td>
            <td colspan="3" class="tl">{{resultData.regDate}}</td>
          </tr>
          <tr>
            <td>专用权期限</td>
            <td colspan="2" class="tl">{{resultData.privateDate}}</td>
            <td colspan="2">商标类型</td>
            <td colspan="3" class="tl">{{resultData.category}}</td>
            
          </tr>
          <!-- <tr>
            <td>后期指定日期</td>
            <td colspan="2" class="tl">1988-01-11</td>
            <td colspan="2">国际注册日期</td>
            <td colspan="3" class="tl">1988-01-11</td>
          </tr>
          <tr>
            <td>优先权日期</td>
            <td colspan="2" class="tl">1988-01-11</td>
            <td colspan="2">代理人名称</td>
            <td colspan="3" class="tl">1988-01-11</td>
          </tr> -->
          <tr>
            <td>商标状态</td>
            <td colspan="6" class="tl">
              <div v-for="item in resultData.flowList">
                {{item.flowDate || '目前'}} --- {{item.flowName}}
              </div >
            </td>
        
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading', 'error', 'post', 'resultData'],
  data() {
    return {
      loading2: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.searchDetail{padding: 20px 0;min-height: 400px;}
.searchDetailtb{border: 1px solid #f1f1f1;border-collapse:collapse;line-height: 26px}
.searchDetailtb tbody{width: 100%;}
.searchDetailtb tr{width: 100%;}
.searchDetailtb td{border: 1px solid #f1f1f1;color: #333;padding: 10px 0}
.searchDetailtb td.tl{text-align: left;padding-left: 15px;}
.searchDetailtb td.til{font-size: 16px;color: #777}
.imgw{max-height: 300px;max-width: 300px}
.goodLists{text-align: left;}
.goodLists div{padding-left: 10px;}
</style>