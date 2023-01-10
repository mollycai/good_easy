<template>
    <!-- 发布商品页面 -->
    <a-layout id="components-layout-demo-top-side">
        <a-layout-content style="background-color: var(--bottom-white);padding: 25px 0;">
            <a-layout style="background: var(--bottom-white);margin: 0 auto;max-width: 1180px;">
                <a-layout-content>
                    <div class="msg_title">
                        <a-icon type="form" class="icon_box"/>&nbsp;发布宝贝
                    </div>
                    <a-form-model ref="ruleForm" :model="goods" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <div class="msg_box">
                            <div class="sub_title">
                                基本信息
                            </div>
                            <a-form-model-item label="物品标题/名" prop="name">
                                <a-input v-model="goods.name" />
                            </a-form-model-item>
                            <a-form-model-item label="价格" prop="price">
                                <a-input v-model="goods.price" prefix="￥" suffix="RMB" />
                            </a-form-model-item>
                            <a-form-model-item label="分类" prop="cateId">
                                <a-cascader :options="plogCategoryList" @change="onChange" placeholder="请选择分类"/>
                            </a-form-model-item>
                            <a-form-model-item label="库存数量" prop="number">
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
                        </div>
                        <div class="msg_box">
                            <div class="sub_title">
                                自定义属性
                            </div>
                            <div>
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
                        </div>
                        <div class="msg_box">
                            <div class="sub_title">
                                商品详情
                            </div>
                            <a-form-model-item label="" :wrapper-col="{ span: 24}" prop="description" >
                                <vue-editor 
                                v-model.lazy="goods.description" 
                                placeholder="买家更关注品牌型号、入手渠道、转手原因..." 
                                useCustomImageHandler @image-added="handleImageAdded">
                                </vue-editor>
                            </a-form-model-item>
                        </div>
                        <div class="btn_box">
                            <a-form-model-item :wrapper-col="{ span: 4, offset: 20 }">
                                <a-button type="primary" @click="onSubmit">
                                    确定
                                </a-button>
                                <a-button style="margin-left: 10px;" @click="resetForm">
                                    取消
                                </a-button>
                            </a-form-model-item>
                         </div>
                    </a-form-model>
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
import requests from "@/api/request";
import { VueEditor } from 'vue2-editor';
export default{
    name:'Plog',
    components: {
        VueEditor,
        EditableCell,
    },
    data() {
        return {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
            goods: {
                userId:'',
                name: '',
                price:'',
                description:'',
                image: '',
                number:1,
                cateId:'',
                cateParentId:'',
                attributes:''
            },
            imageList:[],
            plogCategoryList:[],
            rules: {
                name: [{ required: true, message: '请输入商品名', trigger: 'blur' }],
                price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
                image: [{ required: true, message: '请添加商品图片', trigger: 'blur' }],
                description: [{ required: true, message: '请添加商品描述', trigger: 'blur' }],
                cateId:[{ required: true, message: '请添加商品分类', trigger: 'blur' }],
                cateParentId:[{ required: true, message: '请添加商品分类', trigger: 'blur' }],
            },
            dataSource: [{
                id: '0',
                key: '',
                value: '',
            },],
            count: 1,
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
            },]
        };
    },
    computed:{
    },
    methods: {
        onSubmit() {
            // 先对自定义属性进行校验
            if(this.dataSource.some(item => (item.key.trim() == '' || item.value.trim() == '')) && this.dataSource.length >= 2){
                this.$message.warning('请将空的自定义属性补齐或删除！');
                return;
            }
            if(this.dataSource.length == 1 && (this.dataSource[0].key.trim() == '' || this.dataSource[0].value.trim() == '')){
                this.dataSource = null;
            }
            // 转化自定义属性
            this.goods.attributes = JSON.stringify(this.dataSource);
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    try {
                        await this.$store.dispatch('reqPlogGoods', this.goods)
                        this.$message.success('发布成功，请刷新页面，切勿再次发布！')
                        this.resetForm()
                    } catch (error) {
                        this.$message.error(`${error}`)
                    }
                } else {
                    this.$message.error('请将表单填写完整！')
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },
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
                    let second_cate = {value:subitem.id,label:subitem.name,children:undefined}
                    first_cate.children.push(second_cate)
                }
                plogCategoryList.push(first_cate)
            }
            return plogCategoryList
        },
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
    mounted(){
        this.$store.dispatch('categoryList').then(()=>{
            const realCategoryList = JSON.parse(JSON.stringify(this.$store.state.square.categoryList));
            this.plogCategoryList = this.categoryList(realCategoryList);
        })
        this.$store.dispatch('getUserInfo').then(()=>{
            this.goods.userId = this.$store.state.user.userInfo.id;
        })
    },
    beforeMount() {
        document.title = this.$route.meta.title
    },
    created(){
        this.removeLoading(); 
    }
}
</script>

<style lang="less" scoped>
    .msg_box{
        width: 100%;
        // min-height: 330px;
        background-color: var(--main-white);
        box-shadow: 0 1px 2px 0 var(--main-shadow-light);
        padding: 30px 30px;
        margin-top: 20px;
    }
    .btn_box{
        background-color: var(--main-white);
        margin-top: 20px;
        padding: 20px 0 8px 0;
    }
    .msg_title{
        padding: 15px 30px;
        background-color: var(--main-white);
        color: var(--main-black);
        font-size: 20px;
        font-weight: 700;
    }

    .sub_title{
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 20px;
    }

    .editable-cell {
        position: relative;
    }

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
        padding-right: 24px;
    }

    .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }

    .editable-cell-icon {
        line-height: 18px;
        display: none;
    }

    .editable-cell-icon-check {
        line-height: 28px;
    }

    .editable-cell:hover .editable-cell-icon {
        display: inline-block;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
        color: var(--main-blue);
    }

    .editable-add-btn {
        margin-bottom: 15px;
    }
</style>