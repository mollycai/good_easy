<template>
    <div :style="{ padding: '24px', background: '#fff' ,minHeight:'760px'}"> 
        <a-table :columns="columns" :data-source="userData" :rowKey="record=>record.id" bordered>
            <!-- 用户名列 -->
            <a slot="username" slot-scope="text">{{ text }}</a>
            <span slot="customTitle"><a-icon type="smile-o" /> 用户名</span>
            <!-- 状态列 -->
            <span slot="isActive" slot-scope="isActive">
                <a-tag :color="isActive == false ? 'volcano' : 'green'">
                    {{ isActive == false ? '禁用':'正常' }}
                </a-tag>
            </span>
            <!--性别列-->
            <span slot="sex" slot-scope="sex">
                {{ sex == 1 ? '男' : '女' }}
            </span>
            <!-- 操作列 -->
            <span slot="opera" slot-scope="text,record">
                <a @click="showModal(record.id)">查看详细信息</a>
                <a-divider type="vertical" />
                <!-- 修改状态的确认框 -->
                <a-popconfirm placement="right" ok-text="是" cancel-text="否" @confirm="activeConfirm(record.id,record.isActive)">
                    <template slot="title">
                        <p>您确定要将此用户<span style="color: #fa541c;">{{record.isActive == false ? '解禁':'禁用'}}</span>吗？</p>
                    </template>
                    <a style="color: #fa541c;">{{record.isActive == false ? '解禁':'禁用'}}</a>
                </a-popconfirm>
            </span>
        </a-table>

        <a-modal title="用户详情"  @cancel="hideModal" @ok="hideModal" :visible="visible">
                    <a-descriptions :title="ModalText.name" layout="vertical">
                     <a-descriptions-item label="状态" :span="2">
                        <a-tag :color="ModalText.isActive == false ? 'volcano' : 'green'">
                    {{ ModalText.isActive == false ? '禁用':'正常' }}
                        </a-tag>
                     </a-descriptions-item>
                     <a-descriptions-item label="OpenId" :span="1">
                       {{ ModalText.openId }}
                     </a-descriptions-item>
                     <a-descriptions-item label="用户名" :span="2">
                       {{ ModalText.username }}
                     </a-descriptions-item>
                     <a-descriptions-item label="性别" :span="1">
                       {{ ModalText.sex == 1? '男' : '女' }}
                     </a-descriptions-item>
                     <a-descriptions-item label="电话" :span="2">
                       {{ ModalText.mobile }}
                     </a-descriptions-item>
                     <a-descriptions-item label="邮箱" :span="1">
                        {{ ModalText.email}}
                     </a-descriptions-item> 
                     <a-descriptions-item label="学校" :span="2">
                       {{ ModalText.school }}
                     </a-descriptions-item>
                     <a-descriptions-item label="注册时间" :span="1">
                       {{ ModalText.createTime }}
                     </a-descriptions-item>
                     <a-descriptions-item label="修改时间" :span="3" >
                       {{ ModalText.updateTime }}
                     </a-descriptions-item>
                     <a-descriptions-item label="简介" :span="3">
                      {{ ModalText.desc }}
                     </a-descriptions-item>                
                   </a-descriptions>
                </a-modal>
    </div> 
</template>

<script>
    export default{
        name:'UserForm',
        data(){
            return{
                ModalText:[],
                // 列数据
                columns:[{
                    dataIndex: 'username',
                    key: 'username',
                    slots: { title: 'customTitle' },
                    scopedSlots: { customRender: 'username' },
                },{
                    title: 'OpenId',
                    dataIndex: 'openId',
                    key: 'openId',
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
                },{
                    title: '操作',
                    key: 'opera',
                    scopedSlots: { customRender: 'opera' },
                }],
                // 用户信息数据
                userData: [],
                // 用户数据的请求路径参数
                pathInfo: {
                    page: '1',
                    limit: '10'
                },
                // 控制用户详细信息的弹窗是否展示
                visible: false,
                
            }
        },
        methods:{
            // 获取用户信息表
            async getUserList(){
                const res = await this.$http.get(`user/list/${this.pathInfo.page}/${this.pathInfo.limit}`)
                if (res.data.code !== 20000) return this.$message.error('获取用户列表失败！')
                this.userData = res.data.data.records
            },
            // 修改用户状态
            async changeActive(id,state){
                const userInfo = {"id":id,"isActive":Number(!state)}
                const res = await this.$http.put('/user/status',userInfo)
                if(res.data.code !== 20000) return this.$message.error('修改状态失败！');
                this.$message.success('修改状态成功！');
                // 此处两种方法？ 一种直接再次请求数据(数据保真？)，一种是在请求后直接在页面上修改相应数据(可以减少请求次数)，哪种方式更优？
                this.getUserList()
                // this.userData.filter(item => item.id === id)[0].isActive = !state
            },
            // 获取用户详细信息
            async getUserInfo(id){
                const res = await this.$http.get(`/user/userInfo/${id}`)
                if(res.data.code !== 20000) { this.$message.error('获取用户详细信息失败！')}else{
                this.visible = true
                this.ModalText = res.data.data.userInfo
                }

            },
            // 修改用户状态确认提示弹框
            activeConfirm(id,state) {
                this.changeActive(id,state)
            },
            // 展示用户详细信息的弹窗
            showModal(id) {
                this.getUserInfo(id)
            },
            // 隐藏用户详细信息的弹窗
            hideModal() {
                this.visible = false;
            },
        },
        created(){
            this.getUserList()
        }
    }
</script>

<style lang="less" scoped>
</style>