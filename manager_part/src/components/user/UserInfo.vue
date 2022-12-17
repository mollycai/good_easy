<template>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="状态">
            <a-tag :color="form.isActive == false ? 'volcano' : 'green'">
                    {{ form.isActive == false ? '禁用':'正常' }}
            </a-tag>
        </a-form-model-item>
        <a-form-model-item label="OpenId">
            <a-input v-model="form.openId" />
        </a-form-model-item>
        <a-form-model-item label="用户名">
            <a-input v-model="form.username" />
        </a-form-model-item>
        <a-form-model-item label="性别">
            <a-radio-group v-model="form.sex">
            <a-radio value="男">
                男
            </a-radio>
            <a-radio value="女">
                女
            </a-radio>
            </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="电话">
            <a-input v-model="form.mobile" />
        </a-form-model-item>
        <a-form-model-item label="邮箱">
            <a-input v-model="form.email" />
        </a-form-model-item>
        <a-form-model-item label="学校">
            <a-input v-model="form.school" />
        </a-form-model-item>
        <a-form-model-item label="注册时间">
            <a-date-picker v-model="form.createTime" show-time type="date" style="width: 100%;"/>
        </a-form-model-item>
        <a-form-model-item label="修改时间">
            <a-date-picker v-model="form.updateTime" show-time type="date" style="width: 100%;"/>
        </a-form-model-item>
        <a-form-model-item label="简介">
            <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
    </a-form-model>
</template>
<script>
  export default {
    name:'UserInfo',
    props:{
        userInfo:Object,
    },
    data() {
      return {
        labelCol: { span: 5},
        wrapperCol: { span: 15 },
        form: {
            "id": "",
            "openId": "",
            "username": "",
            "sex": '',
            "mobile": "",
            "email": "",
            "school": "",
            "isActive": 0,
            "createTime": "",
            "updateTime": "",
            "desc":''
        },
      };
    },
    methods: {
      
    },
    // 注意：如果此处传的是引用类型的数据，需对其进行监视，原因可参考Vue的数据监测原理，如果没有，输出的是一个空的vm._data，即是一个observer函数
    watch:{
        userInfo:{
            deep:true,
            immediate:true,
            handler(newValue){
                this.form = newValue
            }
        }
    },
  };
</script>

<style>

</style>