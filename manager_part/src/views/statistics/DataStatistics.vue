<template>
    <div :style="{ padding: '24px', background: '#fff' }"> 
        <div class="top">
            <div class="tl">
                <a-card :hoverable="true" >
                <a-statistic title="昨日注册" :value="Date1.registerNum" style="margin-right: 50px" />
                </a-card>
                <a-card :hoverable="true" style="margin-top: 20px;">
                <a-statistic title="昨日成交总额" :precision="2" :value="Date1.turnover" />
                </a-card>
                <a-card :hoverable="true" style="margin-top: 20px;">
                <a-statistic title="昨日新增发布商品数量"  :value="Date1.goodsPublishNum" />
                </a-card>
            </div>
            <div class="tr">
                <a-card :hoverable="true" title="商品分类占比">
                <div ref="Chart1" style="height: 270px; width: 740px;"></div>
                </a-card>
            </div>
        </div>
        <div class="bottom">
            <a-card :hoverable="true" title="商品数量">
                <div ref="Chart2" style="height: 470px; width: 1000px;"></div>
            </a-card>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
    export default{
        data(){
            return{
              cateData:[],
              Date1:{},
              date:0,
              optionData:[],//用来存储扇状图的data
            }
        },
        methods:{
          //扇形图数据
          async getData(){
            const res = await this.$http.get('/statistics/category')
            if(res.data.code == "20000"){
                    console.log(res)
                    this.cateData =  res.data.data.data

                const Chart1 = echarts.init(this.$refs.Chart1);
                //遍历获取data
            this.cateData.forEach(key => {
          this.optionData.push({
                 value: key.count,
                 name: key.cateName,
                 
          })
        })
        console.log(this.optionData)
        const option1 = {
          series : {
            type : 'pie',
            data:this.optionData
          }
        }
              Chart1.setOption(option1)
              //柱状图
              var Chart2 = echarts.init(this.$refs.Chart2);
             // 绘制图表
              Chart2.setOption({
               title: {
                 text: '商品分类柱状图统计'
               },
               tooltip: {},
               xAxis: {
                 data: this.optionData.map(item => item.name)
               },
               yAxis: {},
               series: [
                 {
                   name: '销量',
                   type: 'bar',
                   data: this.optionData.map(item => item.value)
                 }
               ]
             });

                }else{
                    console.log(res)
                }
          },
          async getData2(){
            this.date = Date.parse(new Date())-86400000
            const res = await this.$http.get('/statistics/data/'+this.date)
            console.log(res)
            if(res.data.code == "20000"){
              this.Date1 = res.data.data.data
              console.log(this.Date1)
            }else{
              console.log(res)
            }
          }
        },
        mounted(){
          this.getData()
          this.getData2()

            
        }
    }
</script>

<style lang="less" scoped>
.top {
    display: flex;
    .tr{
        margin-left: 100px;
    }
}

.bottom {
    margin-top: 50px;
}
</style>