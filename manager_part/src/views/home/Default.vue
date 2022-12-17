<template>
    <div :style="{ padding: '24px', background: '#fff' }"> 
        <!--顶部 用户栏和数据统计栏-->
        <div class="top">
            <div class="tl">
                <a-card :hoverable="true">
                    <img 
                    slot="cover"
                    src="../../assets/images/bc5.png" 
                    alt="" 
                    style="height: 250px; width: 300px;">
                    <a-card-meta title="Admin" description="管理员">
                    <a-avatar
                      slot="avatar"
                      icon="user"
                      :size="60"
                    />
                </a-card-meta>
                </a-card>
            </div>
            <!--数据统计-->
            <div class="tr">        
                <a-card :hoverable="true" @click="turnOn('/statistics/index')">
                  <p>数据统计</p>
                  <div ref="echarts1" style="height: 270px; width: 740px;"></div>
                </a-card>
            </div>
        </div>
        <div class="bottom">

            <!--用户管理模块-->
            <div class="b1">
                <a-card title="用户管理" size="small" :hoverable="true">
                  <a-table
                    slot="cover"
                    :scroll="{ y:200 }"
                    :data-source="userData" 
                    :columns="userColumns"
                    :pagination="false"
                    :rowKey="record => record.id" 
                    size="small"
                     >
                     <span slot="sex" slot-scope="sex">
                {{ sex == 1 ? '男' : '女' }}
                     </span>
                     <span slot="isActive" slot-scope="isActive">
                <a-tag :color="isActive == false ? 'volcano' : 'green'">
                    {{ isActive == false ? '禁用':'正常' }}
                </a-tag>
            </span>
                     </a-table>
                  <template slot="actions" class="ant-card-actions">
                    <a-tooltip><template slot="title">
                                用户列表
                               </template>
                    <a-icon key="search" @click="turnOn('/user/form')" type="search" />
                    </a-tooltip>
                    <a-tooltip><template slot="title">
                                角色设置
                               </template>
                    <a-icon key="edit" @click="turnOn('/user/roles')" type="edit" />  
                    </a-tooltip>
                   </template>
                </a-card>
            </div>
           <!--订单管理模块-->
            <div class="b2">
                <a-card title="订单管理" size="small" :hoverable="true"> 
                  <a-table
                    slot="cover"
                    :scroll="{ y:170 }"
                    :data-source="orderData" 
                    :columns="orderColumns"
                    :pagination="false"
                    :rowKey="record => record.id" 
                    size="small"
                     />
                  <template slot="actions" class="ant-card-actions">
                    <a-tooltip><template slot="title">
                                订单列表
                               </template>
                            <a-icon key="search" type="search"  @click="turnOn('/order/form')"/>
                    </a-tooltip> 
                   </template>
                </a-card>
            </div>
        </div>

        <!--商品管理模块-->
        <div class="b3">
                <a-card title="商品管理" size="small" :hoverable="true">
                  <a-table
                    slot="cover"
                    :scroll="{ y:200 }"
                    :data-source="commodityData" 
                    :columns="comColumns"
                    :pagination="false"
                    :rowKey="record => record.id" 
                    size="small"
                    
                     >
                     <span slot="status" slot-scope="status">
                     <a-tag
                   :color="status == '未审核' ? 'orange' : status == '已审核' ? '#87d068' : status == '不通过' ? '#f50' : '#2db7f5'">
                     {{ status }}
                  </a-tag>
                </span>
                     </a-table>
                  <template slot="actions" class="ant-card-actions">
                    <a-tooltip><template slot="title">
                                分类管理
                               </template>
                                <a-icon key="bulid" @click="turnOn('/commodity/classify')" type="build" />
                    </a-tooltip>
                    <a-tooltip><template slot="title">
                                商品列表
                               </template>
                    <a-icon key="search" @click="turnOn('/commodity/form')" type="search" />
                    </a-tooltip>
                    <a-tooltip><template slot="title">
                                商品审核
                               </template>
                    <a-icon key="edit" @click="turnOn('/commodity/audit')" type="edit" />  
                    </a-tooltip>
                   </template>
                </a-card>
            </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
    export default{
        data(){
            return{
                //卡片大小
                size:'',
                //用户数据
                userData:[],
                //订单数据
                orderData:[],
                //商品数据
                commodityData:[],
                //路由跳转的value
                value:'',
                //用户表的列数据
                userColumns: [
                {
                    title:'Username',
                    dataIndex: 'username',
                    key: 'username',
                    scopedSlots: { customRender: 'username' },
                },{
                    title: 'OpenId',
                    dataIndex: 'openId',
                    key: 'openId',
                    scopedSlots: { customRender: 'openId' },
                },{
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex',
                    scopedSlots: { customRender: 'sex' },
                },{
                    title: '状态',
                    key: 'isActive',
                    dataIndex: 'isActive',
                    scopedSlots: { customRender: 'isActive' },
                }],

                //商品表的列数据
                comColumns: [
               {
                 title: 'Id',
                 dataIndex: 'id',
                 key: 'id',
                 scopedSlots: {
                   customRender: 'id',
                 },
               },
               {
                 title: 'UserId',
                 dataIndex: 'userId',
                 key: 'userId',
                 scopedSlots: {
                   customRender: 'userid',
                 },
               },
               {
                 title: 'UserName',
                 dataIndex: 'username',
                 key: 'username',
                 scopedSlots: {
                   customRender: 'username',
                 }
                 
               },
               {
                 title: 'Name',
                 dataIndex: 'name',
                 key: 'name',
                 scopedSlots: {
                   customRender: 'name',
                 }
                 
               },
               {
                 title: 'Status',
                 dataIndex: 'status',
                 key: 'status',
                 scopedSlots: {
                   customRender: 'status',
                 },
               }],

               //订单表的列数据
               orderColumns:[
               {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          scopedSlots: {
            customRender: 'id',
          },
        },
        {
          title: 'GoodsName',
          dataIndex: 'goodsName',
          key: 'goodsName',
          scopedSlots: {
            customRender: 'goodsName',
          },
        },
        {
          title: 'TotalAmount',
          dataIndex: 'totalAmount',
          key: 'totalAmount',
          scopedSlots: {
            customRender: 'totalAmount',
          }
          
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: {
            customRender: 'status',
          },
        },
        {
          title: 'CreateTime',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: {
            customRender: 'createTime',
          },
        },
        {
          title: 'UpdateTime',
          dataIndex: 'updateTime',
          key: 'updateTime',
          scopedSlots: {
            customRender: 'updateTime',
          },
        },

               ]
            }},


            
        methods: {
          onChange(a, b, c) {
                console.log(a, b, c);
                 },
            //按钮跳转路由的方法
            turnOn(value){
                this.$router.push(value);
            },
            //获取用户数据
          async getUserData(){
                const res = await this.$http.get('/user/list/'+1+'/'+99999)
                  if(res.data.code == "20000"){
                    this.userData =  res.data.data.records
                }else{
                    console.log(res)
                }
            },
            //获取商品数据
           async getCommodityData(){
               const res = await this.$http.post('/goods/list/'+1+'/'+99999)
                  if(res.data.code == "20000"){
                    console.log(res)
                    this.commodityData =  res.data.data.records
                    this.commodityData.forEach(element => {
                      if(element.status == '0'){
                        this.$store.commit('addUnCheck')
                        element.status = '未审核' 
                         }else if(element.status == '-1'){
                          element.status = '不通过'       
                         }else if(element.status == '1'){
                          element.status = '已审核'
                         }else{
                          element.status = '已下架'
                         }
                    });
                    console.log(this.$store.state.unCheck)
                }else{
                    console.log(res)
                }
            },
            //订单表
            async getData(){
    const res = await this.$http.post('/orders/list/'+1+'/'+99999,{})
          if(res.data.code == "20000"){
            console.log(res)
            this.orderData =  res.data.data.records
            this.orderData.forEach(element => {
              if(element.status == '0'){
                element.status = '未支付'                  
                 }else if(element.status == '-1'){
                  element.status = '已取消'       
                  element.updateTime='取消时间:'+element.updateTime
                 }else if(element.status == '1'){
                  element.status = '已支付'
                  element.updateTime='支付时间:'+element.updateTime
                 }else{
                  element.status = '已收货'
                 }
            });
        }else{
            console.log(res)
        }
        
    },
    
        },
        mounted(){
            //初始化表格数据
             this.getUserData()
             this.getCommodityData()
             this.getData()
             // 基于准备好的dom，初始化echarts实例
             var myChart = echarts.init(this.$refs.echarts1);
             // 绘制图表
             myChart.setOption({
               tooltip: {},
               xAxis: {
                 data: ['电子产品', '闲置衣物', '课本', '详细资料', '小家具']
               },
               yAxis: {},
               series: [
                 {
                   name: '销量',
                   type: 'bar',
                   data: [5, 20, 36, 10, 10]
                 }
               ]
             });
         }
    }
</script>

<style lang="less" scoped>

.top {
    display: flex;
    .tl{
        margin-right: 50px;
    }

}
.bottom {
   
    margin-top: 50px;
    display: flex;
    .b1 {
        margin-right: 100px;
        
    }
}

.b3 {
    margin-top: 50px;
}
</style>