<template>
    <!-- 商品详细信息页面 -->
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content style="background-color: var(--bottom-white);padding: 25px 0;">
            <a-layout style="background: var(--bottom-white);margin: 0 auto;max-width: 1180px;">
                <a-layout-content >
                    <!-- 面包屑 -->
                    <div class="breadcrumb_box">
                        <a-breadcrumb>
                            <a-breadcrumb-item>{{this.cate}}</a-breadcrumb-item>
                            <a-breadcrumb-item>{{this.subcate}}</a-breadcrumb-item>
                        </a-breadcrumb>
                    </div>
                    <!-- 商品主要信息 -->
                    <div class="info_box">
                        <div class="main_msg_box">
                            <!-- 图片 -->
                            <div class="img_box">
                                <div class="swiper-box">
                                    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                                        <swiper-slide :class="`slide-${GoodImageList.indexOf(item)+1}`" v-for="item in GoodImageList" :key="GoodImageList.indexOf(item)">
                                            <div class="main_img">
                                                <img v-lazy="item.url" alt="" :class="item.imgHeight > item.imgWidth ? 'height':'width'" >
                                            </div>
                                        </swiper-slide>
                                    </swiper>
                                    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                                        <swiper-slide :class="`slide-${GoodImageList.indexOf(item)+1}`" v-for="item in GoodImageList" :key="GoodImageList.indexOf(item)">
                                            <div class="mini_img">
                                                <img v-lazy="item.url" alt="" :class="item.imgHeight > item.imgWidth ? 'height':'width'">
                                            </div>
                                        </swiper-slide>
                                    </swiper>
                                </div>
                            </div>
                            <!-- 简要信息 -->
                            <div class="message_box">
                                <div class="title_box ">
                                    {{goodDetail.goodsName}} 
                                </div>
                                <div class="price_box">
                                    ￥{{((goodDetail.price * 100) / 100).toFixed(2)}}
                                </div>
                                <div class="msg_box">
                                    <div class="mini_msg">
                                        <table>
                                            <tr>
                                                <td class="key">库存：</td>
                                                <td class="value">{{goodDetail.number}}</td>
                                            </tr>
                                            <tr v-for="item in goodDetail.attributes" :key="item.id">
                                                <td class="key">{{item.key}}：</td>
                                                <td class="value">{{item.value}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <!-- 按钮行 -->
                                <div class="btn_box" v-if="goodDetail.sellerId !== userId">
                                    <div style="margin-bottom: 30px;">
                                        <span style="margin:0 10px;">购买数量:</span>
                                        <a-input-number id="inputNumber" v-model="buyNum" :max="goodDetail.number" :min="1" />
                                    </div>
                                    <a-button type="primary" size="large" @click="addToShopCart()">
                                        <a-icon type="shopping-cart" />
                                        加入购物车
                                    </a-button>
                                    <a-button type="danger" style="margin-left: 30px;" @click="connectToSeller()">
                                        <a-icon type="phone" />
                                        联系商家
                                    </a-button>
                                    <div class="circle_box" style="float: right;">
                                        <a-tooltip placement="bottom">
                                            <template slot="title">
                                                <span>收藏</span>
                                            </template>
                                            <a-button shape="circle" icon="star"/>
                                        </a-tooltip>
                                        <a-tooltip placement="bottom">
                                            <template slot="title">
                                                <span>分享</span>
                                            </template>
                                            <a-button shape="circle" icon="share-alt" style="margin-left: 20px;"/>
                                        </a-tooltip>                   
                                    </div>
                                </div>
                                <div class="btn_box" v-else>
                                    <a-button type="primary" size="large" @click="showModal()">
                                        <a-icon type="edit" />
                                        修改发布内容
                                    </a-button>
                                    <a-button type="danger" style="margin-left: 30px;" @click="cancelPlog()">
                                        <a-icon type="close" />
                                        取消发布
                                    </a-button>
                                    <div class="circle_box" style="float: right;">
                                        <a-tooltip placement="bottom">
                                            <template slot="title">
                                                <span>分享</span>
                                            </template>
                                            <a-button shape="circle" icon="share-alt" style="margin-left: 20px;"/>
                                        </a-tooltip>                   
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 修改发布商品的模态框 -->
                        <a-modal v-model="visible" title="修改发布商品信息" ok-text="确认" cancel-text="取消" @ok="updatePlogGoodsInfo()" width="1180px">
                            <a-form-model ref="ruleForm" :model="goods" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" >
                                <a-form-model-item label="物品标题/名" prop="name">
                                    <a-input v-model="goods.goodsName" />
                                </a-form-model-item>
                                <a-form-model-item label="价格" prop="price">
                                    <a-input v-model="goods.price" prefix="￥" suffix="RMB" />
                                </a-form-model-item>
                                <a-form-model-item label="分类" prop="cateId">
                                    <a-cascader :options="plogCategoryList" :default-value="[`${goods.cateParentId}`,`${goods.cateId}`]" @change="onChange"/>
                                </a-form-model-item>
                                <a-form-model-item label="数量" prop="number">
                                    <a-input-number id="inputNumber" v-model="goods.number" :min="1" />
                                </a-form-model-item>
                                <a-form-model-item label="上传图片" prop="image" >
                                    <a-upload
                                    name="multipartFile"
                                    action="http://139.9.48.23:8081/shop/oss/upload"
                                    :multiple="true"
                                    list-type="picture"
                                    class="upload-list-inline"
                                    :before-upload="beforeUpload"
                                    @change="handleChange"
                                    :file-list="imageList"
                                    >
                                        <a-button><a-icon type="upload" />点击上传</a-button>
                                        <span style="margin-left: 15px;">支持jpg、png、jpeg 格式大小 2M 以内的图片，限4张以内</span>
                                    </a-upload>
                                </a-form-model-item>
                                <div style="margin: 20px 0;padding: 0 5% 0 12%">
                                    <a-button class="editable-add-btn" @click="handleAdd" style="margin-bottom: 10px;">
                                        添加自定义属性
                                    </a-button>
                                    <a-table bordered :data-source="dataSource" :columns="columns">
                                        <template slot="key" slot-scope="text, record">
                                            <editable-cell :text="text" @change="onCellChange(record.id, 'key', $event)"/>
                                        </template>
                                        <template slot="value" slot-scope="text, record">
                                            <editable-cell :text="text" @change="onCellChange(record.id, 'value', $event)" />
                                        </template>
                                        <template slot="operation" slot-scope="text, record">
                                            <a href="javascript:;" @click="onDelete(record.id)">删除</a>
                                        </template>
                                    </a-table>
                                </div>
                                <a-form-model-item label="商品详情" :wrapper-col="{ span: 20}" prop="description" style="min-height: 500px;">
                                    <vue-editor 
                                    v-model="goods.description" 
                                    placeholder="买家更关注品牌型号、入手渠道、转手原因..." 
                                    useCustomImageHandler @image-added="handleImageAdded"
                                    style="min-height: 400px;"></vue-editor>
                                </a-form-model-item>
                            </a-form-model>
                        </a-modal>
                        <!-- 具体描述 -->
                        <div class="desc_box">
                            <div class="seller_box">
                                <a>
                                    <AvatarBox :avatar="goodDetail.avatar" :name="goodDetail.sellerName"/>
                                </a>
                                <div class="detail_title">
                                    商品详情
                                </div>
                            </div>
                            <div class="good_desc_box1">
                                <div class="subject-content" v-html="goodDetail.description"></div>
                            </div>
                        </div>
                    </div>
                    <!-- 评论 -->
                    <div class="comment_box">
                        <Comment :avatar="userAvatar" :username="username"/>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>

<script>
const EditableCell = {
    template: `
        <div class="editable-cell">
            <div v-if="editable" class="editable-cell-input-wrapper">
            <a-input :value="value" @change="handleChange" @pressEnter="check" style="width:90%"/><a-icon
                type="check"
                class="editable-cell-icon-check"
                @click="check"
            />
            </div>
            <div v-else class="editable-cell-text-wrapper">
            {{ value || ' ' }}
            <a-icon type="edit" class="editable-cell-icon" @click="edit" />
            </div>
        </div>
        `,
    props: {
        text: String,
    },
    data() {
        return {
            value: this.text,
            editable: false,
        };
    },
    methods: {
        handleChange(e) {
            const value = e.target.value;
            this.value = value;
        },
        check() {
            this.editable = false;
            this.$emit('change', this.value);
        },
        edit() {
            this.editable = true;
        },
    },
};
import Comment from '@/components/comment/Comment.vue';
import AvatarBox from '@/components/layout/AvatarBox.vue';
import { VueEditor } from 'vue2-editor';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState,mapGetters } from 'vuex'
import { updatePlogGoodsInfo } from '@/api/good';
export default{
    name:'GoodInfo',
    components: {
        Comment,
        AvatarBox,
        swiper,
        swiperSlide,
        VueEditor,
        EditableCell,
    },
    data(){
        return{
            // 主要图片
            swiperOptionTop: {
                loop: true,
                loopedSlides: 3, 
            },
            // 略缩图
            swiperOptionThumbs: {
                loop: true,
                loopedSlides: 3, 
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: "auto",
                touchRatio: 0.2,
                slideToClickedSlide: true,
            },
            // 控制模态框的展示
            visible: false,
            // 表单行列的占位
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
            // 待修改的商品详情
            goods: {
                userId:'',
                name: '',
                price:'',
                description:'',
                image: '',
                number:1,
                cateId:'',
                cateParentId:'',
                goodDetail:'',
                attributes:[]
            },
            // 购买数量
            buyNum:1,
            // 轮播图列表
            GoodImageList:[],
            // 待修改发布商品的图片列表
            imageList:[],
            // 分类列表
            plogCategoryList:[],
            // 一级分类
            cate:'',
            // 二级分类
            subcate:'',
            // 校验规则
            rules: {
                // name: [{ required: true, message: '请输入商品名', trigger: 'blur' }],
                price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
                image: [{ required: true, message: '请添加商品图片', trigger: 'blur' }],
                description: [{ required: true, message: '请添加商品描述', trigger: 'blur' }],
                cateId:[{ required: true, message: '请添加商品分类', trigger: 'blur' }],
                cateParentId:[{ required: true, message: '请添加商品分类', trigger: 'blur' }],
            },
            columns: [{
                title: '商品属性名',
                dataIndex: 'key',
                width: '40%',
                scopedSlots: { customRender: 'key' },
            },
            {
                title: '商品属性值',
                dataIndex: 'value',
                width: '40%',
                scopedSlots: { customRender: 'value' },
            },{
                title: '操作',
                dataIndex: 'operation',
                width: '20%',
                scopedSlots: { customRender: 'operation' },
            },],
            dataSource: [{
                id: '0',
                key: '',
                value: '',
            },],
        }
    },
    computed:{
        // 获取商品详情
        ...mapState({
            goodDetail:(state) => state.good.goodDetail
        }),
        // 获取用户id
        ...mapState({
            userId: (state) => state.user.userInfo.id,
            userAvatar: (state) => state.user.userInfo.avatar,
            username: (state) => state.user.userInfo.username
        }),
        // 获取该用户的购物车列表
        ...mapGetters(['realShopcart']),
        // 获取面包屑一级分类
        getCate(){
            const categoryList = JSON.parse(sessionStorage.getItem('categoryList'));
            const cate = categoryList.filter(item => item.id == this.goodDetail.cateId);
            return cate.name;
        },
        // 获取面包屑二级分类
        getSubCate(){
            const cate = this.realCategoryList.filter(item => item.value == this.goodDetail.cateId);
            return cate.label;
        }
    },
    methods:{
        // 加入购物车
        async addToShopCart(){
            // 先判断这件商品是否已经在购物车中
            // 如果是，提示并且返回
            if(this.realShopcart.some(item => item.goodsId == this.goodDetail.id)){
                this.$message.warning('此商品已经在购物车中,请在购物车中修改数量!');
                return ;
            }
            const data = {
                userId:this.userId,
                goodsId:this.goodDetail.id,
                number:this.buyNum
            }
            try {
                await this.$store.dispatch('addToShopcart',data);
                // 控制导航栏购物车的小红点
                this.$store.dispatch('setNoticeCount',data.number);
                this.$message.success('加入购物车成功！');
            } catch (error) {
                this.$message.error(`${error}`);
            }
        },
        // 联系商家
        connectToSeller(){
            // 封装双方的聊天基本信息
            const chatMsg = {
                userId: this.userId,
                username:this.username,
                avatar: this.userAvatar,
                sellerId: this.goodDetail.sellerId,
                sellerName:this.goodDetail.sellerName,
                sellerAvatar: this.goodDetail.sellerAvatar,
                goodId: this.goodDetail.id
            }
            const routeData = this.$router.resolve({path:'/chat'});
            // 派发储存基本信息
            this.$store.dispatch('setChatMsg',chatMsg);
            // 跳转到聊天室
            window.open(routeData.href,'_blank');
        },
        // 修改发布内容
        updatePlogGoodsInfo(){
            // 先对自定义属性进行校验
            if(this.dataSource.some(item => (item.key.trim() == '' || item.value.trim() == '')) && this.dataSource.length >= 2){
                this.$message.warning('请将空的自定义属性补齐或删除！');
                return;
            }
            if(this.dataSource.length == 1 && (this.dataSource[0].key.trim() == '' || this.dataSource[0].value.trim() == '')){
                this.dataSource = null;
            }
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    try {
                        this.goods.attributes = JSON.stringify(this.dataSource);
                        await this.$store.dispatch('updatePlogGoodsInfo', this.goods);
                        this.$message.success('修改成功！');
                        this.hideModal();
                        window.location.reload();
                    } catch (error) {
                        this.$message.error(`${error}`);
                    }
                } else {
                    this.$message.error('请将表单填写完整');
                    return false;
                }
            });
        },
        // 取消发布
        cancelPlog(){
            let _this = this
            this.$confirm({
                title: `提示`,
                content: `您想取消发布${_this.goodDetail.goodsName}吗？`,
                async onOk() {
                    try {
                        await _this.$store.dispatch('cancelPlogGoods',_this.goodDetail.id)
                        _this.$message.success('取消发布成功！')
                        _this.$router.push({path:'/info'})
                    } catch (error) {
                        _this.$message.error(`${error}`)
                    }
                },
                onCancel() {},
            });
        },
        // 展示修改商品模态框
        showModal() {
            this.visible = true;
        },
        // 隐藏...
        hideModal() {
            this.visible = false;
        },
        // 重置表单
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
        // 修改分类
        onChange(value) {
            this.goods.cateParentId = value[0]
            this.goods.cateId = value[1]
        },
        // 由于首antdUI的属性名限制，需要重置属性名
        categoryList(realCategoryList){
            const plogCategoryList = []
            for(let item of realCategoryList){
                let first_cate = {value:item.id,label:item.name,children:[]}
                for(let subitem of item.children){
                    let second_cate = {value:subitem.id,label:subitem.name,}
                    first_cate.children.push(second_cate)
                }
                plogCategoryList.push(first_cate)
            }
            return plogCategoryList
        },
        // 图片的上传状态，注意每次都需动态修改goods.image
        handleChange(info) {
            let fileList = [...info.fileList];
            // 限制4张图片，多的替换旧的
            fileList = fileList.slice(-4);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = file.response.data.imageUrl
                }
                return file;
            });
            this.imageList = fileList;
            this.goods.image = this.imageList.map(file => file.url).join(',')
        },
        // 图片的校验规则
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                this.$message.error('只支持jpg或png文件!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('图片大小必须小于2MB!')
            }
            return isJpgOrPng && isLt2M
        },
        // 重新组装修改商品模态框中的默认图片文件列表
        getImageList(goodImageList){
            for(const i in goodImageList){
                const item = {
                    uid: `${-(i+1)}`,
                    name: `${-(i+1)}`,
                    status: 'done',
                    url: goodImageList[i].url,
                }
                this.imageList.push(item)
            }
        },
        // 监视自定义属性的改变
        onCellChange(id, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find(item => item.id === id);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
        // 删除自定义属性
        onDelete(id) {
            const dataSource = [...this.dataSource];
            this.dataSource = dataSource.filter(item => item.id !== id);
        },
        // 添加自定义属性
        handleAdd() {
            // 先进行校验
            const { count, dataSource } = this;
            if(count >= 4){
                this.$message.warning('最多只能添加四个！');
                return;
            }
            if(dataSource[0].key.trim() == '' || dataSource[0].value.trim() == ''){
                this.$message.warning('请将自定义属性填写完整！');
                return;
            }
            const newData = {
                id: count,
                key:'',
                value:''
            };
            this.dataSource = [...dataSource, newData];
            this.count = count + 1;
        },
        // 商品详情添加图片返回地址
        handleImageAdded(file, Editor, cursorLocation, resetUploader){
            const formData = new FormData();
            formData.append("multipartFile", file); //第一个file 后台接收的参数名
            requests({
                url: "/oss/upload",//上传路径
                method: "POST",
                data: formData,
                'Content-type' : 'multipart/form-data'
            }).then(result => {
                let url = result.data.imageUrl; // 返回给你的图片路径
                Editor.insertEmbed(cursorLocation, "image", url);
                resetUploader();
            })
            .catch(err => {
                this.$message.error('上传失败：',err);
            });
        }
    },
    mounted() {
        // 派发获取商品详情
        this.$store.dispatch('goodDetail',this.$route.params.id).then(()=>{
            this.goods = this.$store.state.good.goodDetail;
            this.GoodImageList = this.$store.getters.GoodImageList;
            this.getImageList(this.GoodImageList);
            // 设置面包屑
            const cate = (JSON.parse(sessionStorage.getItem('categoryList')) || []).filter(item => item.id == this.goodDetail.cateParentId);
            this.cate = cate[0].name;
            const subcate = cate[0].children.filter(item => item.id == this.goodDetail.cateId);
            this.subcate = subcate[0].name;
            // 设置待修改框的自定义属性
            if(this.goods.attributes == null){
                this.dataSource = [{
                    id: '0',
                    key: '',
                    value: '',
                }]
            }else{
                this.dataSource = this.goods.attributes;
            }
            // 数据量大的等到请求到数据再取消加载动画
            this.removeLoading(); 
            // 缩小图片
            let DomList = document.getElementsByClassName('subject-content')[0].querySelectorAll('img');
            for(let i in  DomList){
                if( DomList[i].style){
                    DomList[i].style.width = '60%';
                }
            }
        })
        // 派发分类列表
        this.$store.dispatch('categoryList').then(()=>{
            const realCategoryList = JSON.parse(JSON.stringify(this.$store.state.square.categoryList));
            this.plogCategoryList = this.categoryList(realCategoryList);
        })
        // 继续派发用户信息以及购物车信息
        this.$store.dispatch('getUserInfo').then(()=>{
            this.$store.dispatch('getShopcartInfo',this.userId);
        })
        // 挂载绑定主要图片与略缩图同步变化
        this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper;
            const swiperThumbs = this.$refs.swiperThumbs.swiper;
            swiperTop.controller.control = swiperThumbs;
            swiperThumbs.controller.control = swiperTop;
        })
    },
    beforeMount() {
        document.title = this.$route.meta.title
    },
}
</script>

<style lang="less" scoped>
    .breadcrumb_box{
        margin: 0 0 15px 0;
    }
    .height{
        height: 100%;
    }
    .width{
        width: 100%;
    }
    .swiper-slide {
        background-size: cover;
        background-position: center;
    }
    .gallery-thumbs {
        height: 20%!important;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .gallery-thumbs .swiper-slide {
        width: 20%;
        opacity: 0.4;
    }
    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }
    .info_box,.comment_box{
        background-color: var(--main-white);
        width: 100%;
        box-shadow: 0 1px 2px 0 var(--main-shadow-light);
        border-radius: 2px;
        overflow: hidden;
        color: var(--main-gray2);
        padding: 30px 40px;
        min-height: 740px;
    }
    .comment_box{
        margin-top: 25px;
        min-height: 200px;
    }
    .main_msg_box{
        display: flex;
        background-color: var(--main-white);
        width: 100%;
    }
    .img_box{
        height: 550px;
        width: 420px;
        // border: 1px var(--main-black) solid;
        padding: 10px ;
        .main_img{
            width:400px;
            height: 400px;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            background: url(data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpi+P//PwMMP3369AUyH1mMKEVwhYQUgRUSowjFakJOYBhOngEIMAB1izbs6IM8DAAAAABJRU5ErkJggg==) repeat scroll 0 0;
        }
        .mini_img{
            // border: 1px var(--main-black) solid;
            height: 80px;
            width: 80px;
            margin-right: 10px;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            background: url(data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpi+P//PwMMP3369AUyH1mMKEVwhYQUgRUSowjFakJOYBhOngEIMAB1izbs6IM8DAAAAABJRU5ErkJggg==) repeat scroll 0 0;
        }
    
    }
    .message_box{
        // border: 1px var(--main-black) solid;
        width: 630px;
        height: 550px;
        margin-left: 50px;
        .title_box{
            padding: 50px 30px 15px 30px;
            // border: 1px var(--main-black) solid;
            font-size: 22px;
            font-weight: 700;
            color: var(--main-black);
            max-width: 600px;
            word-wrap:break-word;
        }
        .price_box{
            padding: 10px 30px;
            // border: 1px var(--main-black) solid;
            font-size: 32px;
            font-weight: 500;
            color: #FFA116;
        }
        .msg_box{
            padding: 20px 20px;
            // border: 1px var(--main-black) solid;
            .mini_msg{
                padding:15px 20px;
                width: 100%;
                background-color: var(--main-white5);
            }
        }
        .btn_box{
            padding: 20px 30px;
            // border: 1px var(--main-black) solid;
            height: 150px;
        }
    }
    .desc_box{
        // border: 1px var(--main-black) solid;
        // width: 100%;
        max-width: 1180px;
        // height:200px;
        margin-top: 30px;
        word-wrap:break-word;
        .seller_box{
            // border: 1px var(--main-black) solid;
            padding: 0px 0px 20px 10px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .detail_title{
                height: 100%;
                background-color: var(--hover-blue2);
                padding: 5px 10px;
                color: var(--main-blue);
            }
        }
        .good_desc_box1{
            // border: 1px var(--main-black) solid;
            padding: 20px 20px;
            width: 100%;
            color: var(--main-gray2);
            min-height: 120px;
            background-color: var(--main-white5);
        }
        .good_desc_box2{
            height: 100%;
            img{
                width: 100% !important;
            }
        }
    }
</style>