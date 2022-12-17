<template>
    <div>
        <a-menu 
        :defaultOpenKeys="['000']" 
        mode="inline" 
        :openKeys="openKeys"
        :selectedKeys="[$route.path]"
        theme="dark"
        @openChange="onOpenChange">
            <template v-for="item in menulist">
                <!-- 没有包含二级选项的一级选项 -->
                <a-menu-item 
                v-if="!item.children" 
                :key="item.key" 
                @click="saveNavState(item.name,item.title)" >
                    <a-icon :type="iconObj[item.id]" /> 
                    <span>{{item.title}}</span>
                </a-menu-item>
                <!-- 包含二级选项的一级选项 -->
                <a-sub-menu v-else :key="item.id + ''">
                    <span slot="title">
                        <a-icon :type="iconObj[item.id]" />
                        <span>{{item.title}}</span>
                    </span>
                    <!-- 二级选项，不过此处还未完全实现递归，只能遍历两级菜单-->                   
                    <a-menu-item 
                    v-for="subitem in item.children" 
                    :key="subitem.key" 
                    @click="saveNavState(subitem.name,item.title,subitem.title)">
                        <a-icon :type="iconObj[subitem.id]" />
                       <span> {{subitem.title}}</span>
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>

<script>
    export default {
        name:'Menu',
        data(){
            return{
                //左边菜单栏数据
                menulist:[
                    {
                    id:'000',
                    title:'首页',
                    key:'/default/defaultHome',
                    name:'defaultHome',
                    },
                    {
                    id:'100',
                    title:'用户管理',
                    children:[{
                        id:'101',
                        title:'用户列表',
                        key:'/user/form',
                        name:'userForm',
                   },{
                        id:'102',
                        title:'角色设置',
                        key:'/user/roles',
                        name:'userRoles',
                   }]
                },{
                    id:'200',
                    title:'商品管理',
                    children:[{
                        id:'201',
                        title:'商品分类',
                        key:'/commodity/classify',
                        name:'commodityClassify',
                   },{
                        id:'202',
                        title:'商品列表',
                        key:'/commodity/form',
                        name:'commodityForm',
                   },{
                        id:'203',
                        title:'上架审核',
                        key:'/commodity/audit',
                        name:'commodityAudit',
                   }]
                },{
                    id:'300',
                    title:'订单管理',
                    children:[{
                        id:'301',
                        title:'订单列表',
                        key:'/order/form',
                        name:'orderForm',
                    }]
                },{
                    id:'400',
                    title:'售后管理',
                    children:[{
                        id:'401',
                        title:'客服介入',
                        key:'/after-service/customer',
                        name:'cusService',
                    }]
                },{
                    id:'500',
                    title:'数据统计',
                    key:'/statistics/index',
                    name:'dataStatistics',
                },{
                    id:'600',
                    title:'关于我们',
                    key:'/about/index',
                    name:'aboutOurs',
                }],
                //icon名集合
                iconObj:{
                    '000':'home',
                    '100':'user',
                    '101':'solution',
                    '102':'apartment',
                    '200':'gift',
                    '201':'appstore',
                    '202':'profile',
                    '203':'safety-certificate',
                    '300':'audit',
                    '301':'profile',
                    '400':'transaction',
                    '401':'alert',
                    '500':'pie-chart',
                    '600':'smile',
                },
                //路由激活名称
                activeName:'',
                //被选中的标题
                activeTitle:[],
                //所有一级标题的id
                rootSubmenuKeys:['100','200','300','400'],
                //当前展开的一级标题的id，默认是100
                openKeys: ['000'],

                
            }
        },
        methods: {
            //保存链接激活状态，更新面包栏标题，并切换路由
            saveNavState(activeName,...activeTitle){
                window.sessionStorage.setItem('activeName',activeName)
                //将对应的路由激活名称进行存储
                this.activeName = activeName
                this.$router.push({name:activeName}).catch(err => { return err })
                //将选中的菜单标题进行储存
                this.activeTitle = activeTitle
            },
            //控制只展开某一一级标题
            onOpenChange(openKeys) {
                //筛选出目前点击的一级选项的id
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) { // 一级标题的id列表中没包含则添加
                    this.openKeys = openKeys;
                } else { // 包含则修改
                    this.openKeys = latestOpenKey ? [latestOpenKey] : [];

                }
            },
        },
        created(){
            //获取默认展示的路由名称，存入sessionStorage
            window.sessionStorage.setItem('activeName',this.menulist[0].name)
            this.activeName = window.sessionStorage.getItem('activeName')
            //自动跳转到该页面
            this.$router.push({name:this.activeName}).catch(err => { return err })
            //默认被选中的标题
            this.activeTitle = [this.menulist[0].title]
        },
        watch:{
            //监视菜单栏的变化，将选中的菜单标题传到Header的面包屑导航栏中
            activeTitle:{
                handler(){
                    this.$bus.$emit('activeTitle',this.activeTitle)
                }
            },
            //监视路由变化，将变化后的标题传到Header的面包屑导航栏中
            '$route'(to,from){
            if(to != from){
              switch(to.path){
                case '/default/defaultHome':
                 this.saveNavState('defaultHome',...['首页'],)
                 break
               
                case '/user/form':
                 this.saveNavState('userForm',...['用户管理','用户列表'])
                 break
                case '/user/roles':
                 this.saveNavState('userRoles',...['用户管理','角色设置'])
                 break

                 case '/commodity/classify':
                 this.saveNavState('commodityClassify',...['商品管理','商品分类'])
                 break
                 case '/commodity/form':
                 this.saveNavState('commodityForm',...['商品管理','商品列表'])
                 break
                 case '/commodity/audit':
                 this.saveNavState('commodityAudit',...['商品管理','上架审核'])
                 break

                 case '/order/form':
                 this.saveNavState('orderForm',...['订单管理','订单列表'])
                 break

                 case '/after-service/customer':
                 this.saveNavState('cusService',...['售后管理','客服介入'])
                 break

                 case '/statistics/index':
                 this.saveNavState('dataStatistics',...['数据统计'])
                 break

                 case '/about/index':
                 this.saveNavState('aboutOurs',...['关于我们'])
                 break
              }
            }}
        },
    };
</script>
    
<style lang="less" scoped>
    
</style>