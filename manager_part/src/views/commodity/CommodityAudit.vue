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

          <!--表格-->
        <a-table 
            :scroll="{ x: 1300 }"
            :data-source="data" 
            :loading="loading"
            :columns="columns"
            :pagination="pagination"
            :rowKey="record => record.id"
            @change="onChange"
            size="small"
            bordered               
            >
            <span slot="status" slot-scope="status">
                <a-tag
                   :color="status == '0' ? 'orange' : status == '1' ? '#87d068' : status == '-1' ? '#f50' : '#2db7f5' "
              >
                {{ status == '0' ? '未审核' : status == '1' ? '已审核' : status == '-1' ? '未通过' : '已下架' }}
              </a-tag>
            </span>
            <span slot="description" slot-scope="description">
              <a @click="lookDe(description)">查看描述</a>
            </span>
            <span slot="image" slot-scope="image">
              <a @click="look(image)">查看图片</a>
            </span>
            <!--审核状态选择列-->

         <!--   <span slot="select" slot-scope="select">
              
               <a-select ref="se" @change="setValue" default-value=""  size="small" style="width: 105px">
               <a-select-option value="">
                 &nbsp;
               </a-select-option>
               <a-select-option value="0">
                <a-badge status="default" />未审核
               </a-select-option>
               <a-select-option value="1">
                <a-badge status="success" />审核通过
               </a-select-option>
               <a-select-option value="-1">
                <a-badge status="warning" />不通过
               </a-select-option>
               <a-select-option value="-2">
                <a-badge status="error" />下架
               </a-select-option>
             </a-select>    
             
            </span> -->
            
                <!--审核操作列-->
            <span slot="action" slot-scope="scope">
              <a @click="Check(0,scope)"><a-badge status="default" />未审核</a>
               <a-divider type="vertical" />
              <a @click="Check(1,scope)"><a-badge status="success" />审核通过</a>
               <a @click="Check(-1,scope)"><a-badge status="warning" />不通过</a>
               <a-divider type="vertical" />
               <a @click="Check(-2,scope)"><a-badge status="error" />下架</a>
          <!--     <a-button type="primary" @click="throttleUp(scope)">
                     审核
               </a-button> -->
               </span>
           
              </a-table>
             
              <!--查看详情表单-->
          
              <div>
                <a-modal
                title="详情描述"
                 :visible="visible2"
                :confirm-loading="confirmLoading"
                @ok="handleOk2"
                @cancel="handleCancel2"
                >
                <p>{{ this.de }}</p>
              </a-modal>
              </div>
              <!--查看照片表单-->
              <div>
                <a-modal
                title="详情图片"
                 :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
                >
                <img :src="imageUrl" :style="{ width:'470px', height:'300px'}">
              </a-modal>
              </div>
    </div>
</template>

<script>
import {Throttle} from '@/utils/thr';
let that=null;
    export default{
        data() {
           return {
            //搜索框表单数据
            searchForm:{
                username:'',
                goodsName:'',
                status:undefined
               },
               //详细描述
               de:'',
               loading: false,
               //表格数据
               data:[],
               //更新状态
               upload:{
                id:'',
                status:''
               },
               //详情表单的显示与隐藏
               visible:false,
               visible2:false,
               confirmLoading: false,
               //照片url
               imageUrl:'',
               //徽标
               badge:'',
               //分页数据
               pagination:{
                        current:1,
                        pageSizeOptions: ['5', '10', '15', '20'],
                        total:100,
                        pageSize:6
      },
      //表头数据
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
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          scopedSlots: {
            customRender: 'price',
          }
          
        },
        {
          title: 'ViewCount',
          dataIndex: 'viewCount',
          key: 'viewCount',
          scopedSlots: {
            customRender: 'viewCount',
          }
          
        },
        {
          title: 'CateId',
          dataIndex: 'cateId',
          key: 'cateId',
          scopedSlots: {
            customRender: 'cateId',
          }
          
        },
        {
          title: 'CateParentId',
          dataIndex: 'cateParentId',
          key: 'cateParentId',
          scopedSlots: {
            customRender: 'cateParentId',
          }
          
        },     
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          scopedSlots: {
            customRender: 'description',
          }
          
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          scopedSlots: {
            customRender: 'image',
          }
          
        },
      
        {
          title: 'Action',
          width:'160px',
          key: 'action',
          fixed: 'right',
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
                }else{
                    console.log(res)
                }
                
    },
    //节流并发送审核请求
    Check:Throttle((value,scope)=>{
      console.log(value)
      console.log(scope)
      that.upload.status = value 
      that.upload.id = scope.id
      that.$http.post('/goods/check',that.upload).then(res=>{
        if(res.data.code == "20000"){
          if(value == 0){
            that.$store.commit('addUnCheck')
        }else if (scope.status == 0){
          that.$store.commit('deUnCheck')
        }
          that.$message.success('审核成功!');
          console.log(that.$refs.se)
          that.goodsSearch(that.searchForm)
        }else{
          that.$message.error('审核失败!')
        }
      })
    },1500),
    /*
    //设置审核状态
    setValue(value){
      this.upload.status = value
    },
    //节流并发送审核请求
    throttleUp:Throttle((scope)=>{
      that.upload.id = scope.id
      that.$http.post('/goods/check',that.upload,{'token':window.localStorage.getItem('token')}).then(res=>{
        if(res.data.code == "20000"){
          that.$message.success('审核成功!');
          console.log(that.$refs.se)
          that.goodsSearch(that.searchForm)
          that.setValue('')
        }else{
          that.$message.error('审核失败!')
        }
      })
    },1500),
    //发送审核请求
    */
    //查看描述
    lookDe(description){
      this.de = description;
      this.visible2 = true;
    },
    //查看照片
    look(image){
      this.imageUrl = image;
      this.visible = true;
    },
    //查看详细描述的ok方法
    handleOk2(e) {
      this.visible2 = false;
     },
     //查看照片的ok方法
     handleCancel2(e) {
      this.visible2 = false;
     },
     //查看照片的channel
    handleOk(e) {
      this.visible = false;
     },
     //查看描述的channel
     handleCancel(e) {
      this.visible = false;
     },
     //点击分页的chang方法
    onChange(pagination) {
      this.pagination.current = pagination.current  // 重新设置当前页
      this.pagination.pageSize = pagination.pageSize
      this.getData()
    },
    //获取表格所有数据
    async getData(){
      const res = await this.$http.post('/goods/list/'+this.pagination.current+'/'+this.pagination.pageSize)
                  if(res.data.code == "20000"){
                    console.log(res)
                    this.data =  res.data.data.records
                    this.pagination.total = res.data.data.total
                    
                }else{
                    console.log(res)
                }
                
            },
        },
        mounted(){
          //渲染表格数据
         that = this
         this.getData()
        },
        beforeDestroy() {
    //组件销毁前，把定义的滞空
         that=null
        },

    }
</script>

<style lang="less" scoped>
.search{
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 20px;
}
</style>