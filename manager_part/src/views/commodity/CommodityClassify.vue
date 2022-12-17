<template>
    <div :style="{ padding: '24px', background: '#fff' }"> 
      <div class="h">
<!--搜索表单-->       
        <div class="hr">
<!--添加数据按钮-->
            <a-button  @click="addModal">Add</a-button>
        </div>
<!--数据表格-->          
        </div>
        <div>
            <a-table
             :pagination="{ pageSize: 6 }"
             :scroll="{ y: 480 }"
             :columns="columns"
             :data-source="tabledata"
             :rowKey="record => record.id">
             <a slot="name" slot-scope="text">{{ text }}</a>
               <span slot="customTitle">Id</span>
               <span slot="action" slot-scope="text">
                  <a-button type="primary" @click="upVi(text)">Update</a-button>
                </span>
        </a-table>
        </div>
<!--修改表单-->
        <a-modal
           title="修改"
           :visible="visible2"
           :confirm-loading="confirmLoading2"
           @ok="UpData"
           @cancel="upCancel"
           :model="upData"
    >
        <a-form-model>
          <a-form-model-item label="分类id">
                   <a-input v-model="upData.id" disabled></a-input>
                 </a-form-model-item>
                 <a-form-model-item label="修改名称为">
                   <a-input v-model="upData.name"></a-input>
                 </a-form-model-item>
               </a-form-model>
        </a-modal>
<!--添加数据对话框-->
       
        <a-modal
               title="添加分类"
               :visible="visible"
               :confirm-loading="confirmLoading"
               @ok="addData"
               @cancel="cancelModal"
               :model="addModel"
               >
               <a-form-model>
                 <a-form-model-item label="所属Id">
                   <a-input v-model="addModel.parentId"></a-input>
                 </a-form-model-item>
                 <a-form-model-item label="Name">
                   <a-input v-model="addModel.name"></a-input>
                 </a-form-model-item>
               </a-form-model>
        </a-modal>
      
    </div>
</template>

<script>
//列数据
const columns = [
{
    dataIndex: 'id',
    key: 'id',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'id' },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

    export default{
        data() {
            return {
              //分类表格对象
                    category:{
                      id:'',
                      name:''
                    },
                    //添加表单
                    addModel:{
                      parentId:'',
                      name:''
                    },
                    //更新表单
                    upData:{
                      id:'',
                      name:''
                    },
                    confirmLoading: false,
                    confirmLoading2:false,
                    //添加、更新显示与隐藏
                    visible:false,
                    visible2:false,
                    columns,
                    //表格数据
                    tabledata:[],
                    //展开列数据
                    expandedRowKeys: [],
                  };
             },
        methods:{
          //获取表格数据
            async getData(){
                const res = await this.$http.get('/category/list')
                  if(res.data.code == "20000")
                    this.tabledata =  res.data.data.allCategory
            },
            //更新按钮
            upVi(row){
              this.visible2 = true
              this.upData.id = row.id
              console.log(row.id)
              console.log(this.upData)
            },
            //更新请求
           async UpData(){
             const res = await this.$http.put('/category',this.upData)
                  if(res.data.code == "20000"){
                    this.visible2 = false
                    this.upData = {}
                    this.getData()
                    this.$message.success("修改成功！")}
                    else{
                  this.$message.success("修改失败！请检查所填数据！")
                }
            },
            //取消按钮
            upCancel(){
              this.visible2 = false
            },
            //显示添加数据表单
            addModal(){
              this.visible = true
            },
            //取消表单
            cancelModal(){
              this.visible = false
            },
            //添加数据请求
           async addData(){
              const res = await this.$http.post('/category',this.addModel)
                if(res.data.code == "20000"){                     
                  this.addModel = {}  
                  this.visible = false
                  this.getData()
                  this.$message.success("添加成功！")
                }else{
                  this.$message.success("添加失败！请检查所填数据！")
                }
            },    
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less" scoped>
.h {
  display: flex;
}
.search {
  flex-wrap: nowrap;
}

.hr {
  margin-bottom: 10px;
  margin-left: 10px;
}


</style>