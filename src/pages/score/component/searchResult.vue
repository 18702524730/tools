<template>
  <article class="result" v-loading="loading2" element-loading-text="拼命加载中">
    <!--<section class="msg">
      商标打分:输入您需要打分的商标名称等,如"XX"。
    </section>-->
    <section class="detail" v-if="myResult.errorCode === '0'">
      <div class="outline">
        <span class="brandName">
          <span class="bName">您输入的商标名称：</span>
          <span class="bDetail">{{myResult.data.trademarkName}}</span>
          <span class="score">
            <span style="font-size:20px;font-weight:600;">{{myResult.data.score}}</span>
            <span style="font-weight:500;">分</span>
            <span style="color:#999999;font-weight:500;">(评分仅供参考)</span>
          </span>
        </span>
      </div>
      <div class="content">
        <p class="h40 fw600">综合得分：<span class="ftw500">{{myResult.data.total}}</span></p>
        <p class="h40 fw600">商标与所填行业的匹配度：<span class="ftw500">{{myResult.data.matching}}</span></p>
        <p class="h40 fw600">五行：<span class="ftw500">{{myResult.data.wx}}</span></p>
        <p class="h40 fw600">笔画：<span class="ftw500">{{myResult.data.bh}}</span></p>
        <p class="h40 fw600">天格：<span class="ftw500">{{myResult.data.tg}}</span></p>
        <p class="h40 fw600">地格：<span class="ftw500">{{myResult.data.dg}}</span></p>
        <!--<p class="h40">人格：<span class="wuXing">{{myResult.data.rg}}</span></p>
        <p class="h40">外格：<span class="wuXing">{{myResult.data.wg}}</span></p>-->
        <p class="h40 fw600">总格：<span class="ftw500">{{myResult.data.zg}}</span></p>
        <!--<p class="h40" style="font-weight: bold;">推荐行业：<span class="wuXing">{{myResult.data.industry}}</span></p>-->
      </div>
      <!-- <div class="investigate">
        <span>打分满意度调查：</span>
        <ul>
          <li v-for="s in satis">
            <button class="btn" :disabled="isDisable" :class="{true: 'modalActive', false: 'modalInactive'}[sa]" @click="satisInvestigate(s)">{{s.id}}</button>
          </li>
        </ul>
      </div> -->
    </section>
  </article>
</template>

<script>
export default {
  props: ['myResult','isDisable','sa','intCls'],
  data() {
    return {
      loading2: false,
      apiUrl:Path + 'tmmark/saveSatisfationRecord.do',
      satis:[
        { id: '非常满意' },
        { id: '满意' },
        { id: '不满意' }
      ],
      //sa:true,
      //isDisable:false,
    }
  },
  components: {},
  updated () {

  },
  methods: {
    satisInvestigate(s){
      this.loading2 = true;
      //防止重复提交
      this.sa = false;
      this.$http.post(this.apiUrl, {
        tradeMarkName: this.myResult.data.trademarkName,
        industry:this.intCls,
        total:this.myResult.data.total,
        matching:this.myResult.data.matching,
        satisfaction:s.id,
        resource:0
      }).then((data) => {
        this.loading2 = false;
        if(data.body.errorCode==0){
          this.isDisable = true;
          this.$message(data.body.data + ",谢谢您的支持！");
        }else{
          this.$message('网络异常,提交失败!');
        }
      }).catch((err) => {
        this.loading2 = false;
        this.isDisable = true;
        this.$message('网络异常,提交失败!');
      });
    },

  }
}
</script>

<style scoped>
  .result{width: 1200px;margin: 20px auto 10px;min-height: 550px;}
  .msg{font-size: 12px;color: #88888d;text-align: left;}
  .detail{text-align: left;position: relative;}
  .outline{background-color: #f2f2f2;padding:20px 10px}
  .brandName {padding-top: 10px;}
  .bName{padding-left:10px;}
  .bDetail{color:#ff7019;font-size:20px;font-weight:600;}
  .content{padding: 20px 10px;}
  .h40 {height: 40px;line-height: 40px;}
  .fw600{font-weight: 600;}
  .score{color:#ff7019;font-size: 20px;float:right;font-weight:600;}
  .wuXing {position: absolute;padding-right: 15px;}
  .ftw500{font-weight:500;}
  .investigate{padding-left: 10px;font-weight: 600;}
  .btn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #bfcbd9;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 5px 5px 0px 0px;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }
  .modalActive{background-color: #20a0ff;}
  .modalInactive {background-color: #ccc;border:1px solid #ccc;}
</style>