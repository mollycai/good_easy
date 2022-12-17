<template>
    <div :style="{ padding: '24px', background: '#fff' }"> 
      <!--搜索框-->
          <div class="search">
            <a-form-model layout="inline" :model="searchForm">
               <a-form-model-item>
                <a-input v-model="searchForm.sellerName" placeholder="卖家名称">
                </a-input>
           </a-form-model-item>
           <a-form-model-item>
              <a-input v-model="searchForm.customerName" placeholder="买家名称">         
              </a-input>
           </a-form-model-item>
           <a-form-model-item>
              <a-input v-model="searchForm.goodsName" placeholder="商品名称">         
              </a-input>
           </a-form-model-item>
           <a-form-model-item>
              <a-button
                type="primary"
                @click="goodsSearch(searchForm)">
                 搜索
              </a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
          <!--表格数据-->
          <a-table 
            :data-source="data" 
            :columns="columns"
            :pagination="pagination"
            :rowKey="record => record.id"
            @change="onChange"               
            >
            <span slot="status" slot-scope="status">
              <a-tag
                   :color="status == '未支付' ? 'orange' : status == '已支付' ? '#87d068' : status == '已取消' ? '#f50' : '#2db7f5'">
                {{ status }}
              </a-tag>
                </span>
            <span slot="action" slot-scope="scope">
                  <a @click="getDetails(scope.id)">订单详情</a>
                </span>
              </a-table>

              <div>

          <!--订单详情表单-->
                <a-modal
                title="订单详情"
                 :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
                >
                   <a-descriptions  layout="vertical">
                     <a-descriptions-item label="id" :span="2">
                       {{ ModalText.id }}
                     </a-descriptions-item>
                     <a-descriptions-item label="卖家id" :span="1">
                       {{ ModalText.sellerId }}
                     </a-descriptions-item>
                     <a-descriptions-item label="卖家名称" :span="2">
                       {{ ModalText.sellerName }}
                     </a-descriptions-item>
                     
                     <a-descriptions-item label="商品id" :span="1">
                       {{ ModalText.goodsId }}
                     </a-descriptions-item>
                     <a-descriptions-item label="商品名称" :span="2">
                       {{ ModalText.goodsName }}
                     </a-descriptions-item>
                     <a-descriptions-item label="状态" :span="1">
                       <a-badge :status="badge" :text="ModalText.status" />
                     </a-descriptions-item> 
                     <a-descriptions-item label="商品价格" :span="2">
                       {{ ModalText.goodsPrice}}
                     </a-descriptions-item>
                     <a-descriptions-item label="顾客id" :span="1">
                       {{ ModalText.customerId }}
                     </a-descriptions-item>
                     <a-descriptions-item label="顾客名称" :span="2" >
                       {{ ModalText.customerName}}
                     </a-descriptions-item>
                     <a-descriptions-item label="数量" :span="1">
                      {{ ModalText.number}}
                     </a-descriptions-item>                
                     <a-descriptions-item label="总计" :span="2">
                       {{ ModalText.totalAmount }}
                     </a-descriptions-item>
                     <a-descriptions-item label="remark" :span="1">
                      {{ ModalText.remark}}
                     </a-descriptions-item>                
                     <a-descriptions-item label="地址" :span="2">
                       {{ ModalText.address }}
                     </a-descriptions-item>
                     <a-descriptions-item label="手机" :span="1">
                      {{ ModalText.phone}}
                     </a-descriptions-item>                
                     <a-descriptions-item label="createTime" :span="2">
                       {{ ModalText.createTime }}
                     </a-descriptions-item>
                     <a-descriptions-item label="updateTime" :span="2">
                       {{ ModalText.updateTime }}
                     </a-descriptions-item>
                   </a-descriptions>
                </a-modal>
            </div>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      //表格数据
      data:[],
      //详情表单可见与隐藏
      visible:false,

      confirmLoading: false,
      //详情文本
      ModalText:[],
      //徽标数
      badge:'default',
      //搜索表单
      searchForm:{
        sellerName:'',
        goodsName:'',
        customerName:''
      },
      //分页数据
      pagination:{
               current:1,
               pageSizeOptions: ['5', '10', '15', '20'],
               total:100,
               pageSize:6
      },
      //列数据
      columns: [
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
        {
          title: 'Action',
          key: 'action',
         scopedSlots: { customRender: 'action' },
        },
      ],
    };
  },
  methods: {
    //搜索请求
    async goodsSearch(searchForm){
      const res = await this.$http.post('/orders/list/'+this.pagination.current+'/'+this.pagination.pageSize,
                      searchForm)
                  if(res.data.code == "20000"){
                    console.log(res)
                    this.data =  res.data.data.records
                    this.pagination.total = res.data.data.total
                    this.data.forEach(element => {
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
    //详情表单ok事件
    handleOk(e) {
      this.visible = false;
     },
     //详情表单取消按钮事件
     handleCancel(e) {
      this.visible = false;
     },
     //分页按钮
    onChange(pagination) {
      this.pagination.current = pagination.current  // 重新设置当前页
      this.pagination.pageSize = pagination.pageSize
      this.getData()
    },
    //获取表格数据
    async getData(){
    const res = await this.$http.post('/orders/list/'+this.pagination.current+'/'+this.pagination.pageSize,{})
          if(res.data.code == "20000"){
            console.log(res)
            this.data =  res.data.data.records
            this.pagination.total = res.data.data.total
            this.data.forEach(element => {
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
    //获取详情请求
    async getDetails(id){
      this.visible = true
      const res = await this.$http.get(`/orders/${id}`)
        if(res.data.code == "20000"){
          console.log(res)
          console.log("获取成功")             
             this.ModalText = res.data.data.order
             if(this.ModalText.status == '0'){
              this.ModalText.status = '未支付'
              this.badge = 'default'
             }else if(this.ModalText.status == '-1'){
              this.ModalText.status = '已取消'
              this.badge = 'warning'
             }else if(this.ModalText.status == '1'){
              this.ModalText.status = '已支付'
              this.badge = 'success'
             }else{
              this.ModalText.status = '已收货'
              this.badge = 'error'
             }
        }else{
          console.log("获取失败")
        }
    }
  },
  mounted(){
    this.getData()
  }
};
</script>

<style lang="less" scoped>
.search{
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 20px;
}
</style>