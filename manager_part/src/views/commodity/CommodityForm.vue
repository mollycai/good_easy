<template>
    <div :style="{ padding: '24px', background: '#fff' }"> 
      <!--搜索框-->
          <div class="search">
            <a-form-model layout="inline" :model="searchForm">
               <a-form-model-item>
                <a-input v-model="searchForm.username" placeholder="用户名称">
                </a-input>
           </a-form-model-item>
           <a-form-model-item>
              <a-input v-model="searchForm.goodsName" placeholder="商品名称">         
              </a-input>
           </a-form-model-item>
           <a-select v-model="searchForm.status" default-value="" placeholder="商品状态" style="margin-right: 15px; margin-top: 4px;width: 150px">
               <a-select-option value="">
                 &nbsp;
               </a-select-option>
               <a-select-option value="0">
                 未审核
               </a-select-option>
               <a-select-option value="1">
                 已审核
               </a-select-option>
               <a-select-option value="-1">
                 不通过
               </a-select-option>
               <a-select-option value="-2">
                 已下架
               </a-select-option>
             </a-select>
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
                   :color="status == '未审核' ? 'orange' : status == '已审核' ? '#87d068' : status == '不通过' ? '#f50' : '#2db7f5'">
                {{ status }}
              </a-tag>
                </span>
            <span slot="action" slot-scope="scope">
                  <a @click="getDetails(scope.id)">商品详情</a>
                </span>
              </a-table>

              <div>

          <!--商品详情表单-->
                <a-modal
                title="商品详情"
                 :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
                >
                   <a-descriptions :title="ModalText.name" layout="vertical">
                     <a-descriptions-item label="商品id" :span="2">
                       {{ ModalText.id }}
                     </a-descriptions-item>
                     <a-descriptions-item label="价格" :span="1">
                       {{ ModalText.price }}
                     </a-descriptions-item>
                     <a-descriptions-item label="用户id" :span="2">
                       {{ ModalText.userId }}
                     </a-descriptions-item>
                     
                     <a-descriptions-item label="数量" :span="1">
                       {{ ModalText.number }}
                     </a-descriptions-item>
                     <a-descriptions-item label="浏览量" :span="2">
                       {{ ModalText.viewCount }}
                     </a-descriptions-item>
                     <a-descriptions-item label="状态" :span="1">
                       <a-badge :status="badge" :text="ModalText.status" />
                     </a-descriptions-item> 
                     <a-descriptions-item label="分类ID" :span="2">
                       {{ ModalText.cateId }}
                     </a-descriptions-item>
                     <a-descriptions-item label="父级分类ID" :span="1">
                       {{ ModalText.cateParentId }}
                     </a-descriptions-item>
                     <a-descriptions-item label="创建时间" :span="2" >
                       {{ ModalText.createTime}}
                     </a-descriptions-item>
                     <a-descriptions-item label="更新时间" :span="1">
                      {{ ModalText.updateTime}}
                     </a-descriptions-item>                
                     <a-descriptions-item label="商品描述" :span="3">
                       {{ ModalText.description }}
                     </a-descriptions-item>
                     <a-descriptions-item label="图片">
                      <img 
                      :src="ModalText.image"
                      :style="{ width:'100px', height:'100px'}"
                       >
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
        username:'',
        goodsName:'',
        status:undefined
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
      const res = await this.$http.post('/goods/list/'+this.pagination.current+'/'+this.pagination.pageSize,
                      searchForm)
                  if(res.data.code == "20000"){
                    console.log(res)
                    this.data =  res.data.data.records
                    this.pagination.total = res.data.data.total
                    this.data.forEach(element => {
                      if(element.status == '0'){
                        element.status = '未审核'                  
                         }else if(element.status == '-1'){
                          element.status = '不通过'       
                         }else if(element.status == '1'){
                          element.status = '已审核'
                         }else{
                          element.status = '已下架'
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
    const res = await this.$http.post('/goods/list/'+this.pagination.current+'/'+this.pagination.pageSize)
          if(res.data.code == "20000"){
            console.log(res)
            this.data =  res.data.data.records
            this.pagination.total = res.data.data.total
            this.data.forEach(element => {
              if(element.status == '0'){
                element.status = '未审核'                  
                 }else if(element.status == '-1'){
                  element.status = '不通过'       
                 }else if(element.status == '1'){
                  element.status = '已审核'
                 }else{
                  element.status = '已下架'
                 }
            });
        }else{
            console.log(res)
        }
        
    },
    //获取详情请求
    async getDetails(id){
      this.visible = true
      const res = await this.$http.get(`/goods/${id}`)
        if(res.data.code == "20000"){
          console.log(res)
          console.log("获取成功")             
             this.ModalText = res.data.data.goodsInfo
             if(this.ModalText.status == '0'){
              this.ModalText.status = '未审核'
              this.badge = 'default'
             }else if(this.ModalText.status == '-1'){
              this.ModalText.status = '不通过'
              this.badge = 'warning'
             }else if(this.ModalText.status == '1'){
              this.ModalText.status = '已审核'
              this.badge = 'success'
             }else{
              this.ModalText.status = '已下架'
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