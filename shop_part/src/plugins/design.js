// ant design UI插件
import Vue from 'vue';
import 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

import { Layout, Menu, Input, Popover, Avatar, Icon, Button, Card, Tooltip, Tabs, Form, Checkbox, Select, message, Divider, Row, Col, Tag, Empty, FormModel, InputNumber, Upload, Radio, Cascader, Modal, Badge, Comment, List, Steps, Spin, Alert, Result, Breadcrumb, Table, Rate } from 'ant-design-vue';

Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;

Vue.use(Layout);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Popover);
Vue.use(Avatar);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Card);
Vue.use(Tooltip);
Vue.use(Tabs);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Divider);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tag);
Vue.use(Empty);
Vue.use(FormModel);
Vue.use(InputNumber);
Vue.use(Upload);
Vue.use(Radio);
Vue.use(Cascader);
Vue.use(Modal);
Vue.use(Badge);
Vue.use(Comment);
Vue.use(List);
Vue.use(Steps);
Vue.use(Spin);
Vue.use(Alert);
Vue.use(Result);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(Rate);