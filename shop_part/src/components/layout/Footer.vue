<template>
    <!-- 底部组件 -->
    <a-layout-footer style="text-align: center;background-color: #000000;;color: #fff;">
        <footer class="footer">
            <div class="w">
                <div class="mod_help">
                    <dl>
                        <dt>服务指南</dt>
                        <dd>
                            <a href="">交易流程</a>
                        </dd>
                        <dd>
                            <a href="">会员介绍</a>
                        </dd>
                        <dd>
                            <a href="">常见问题</a>
                        </dd>
                        <dd>
                            <a href="">联系客服</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>商务</dt>
                        <dd>
                            <a href="">社群</a>
                        </dd>
                        <dd>
                            <a href="">产品推广</a>
                        </dd>
                        <dd>
                            <a href="">企业合作</a>
                        </dd>
                        <dd>
                            <a href="">线下活动</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>关于我们</dt>
                        <dd>
                            <a href="">价值观</a>
                        </dd>
                        <dd>
                            <a href="">公众号</a>
                        </dd>
                        <dd>
                            <a href="">小程序</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt>关注我们</dt>
                        <dd>
                            <img src="" alt="">
                        </dd>
                    </dl>
                </div>
                <div class="mod_copyright">
                    <div class="links">
                        <a href="#">关于我们</a> | <a href="#">联系我们</a> | <a href="#">联系客服</a> | <a href="#">商家入驻</a> | <a href="#">营销中心</a>| <a href="#">手机故易</a> | <a href="#">友情链接</a> | <a href="#">销售联盟</a> | <a href="#">故易社群</a> | <a href="#">故易公益</a> |
                        <a href="#">English Site</a> | <a href="#">Contact U</a>
                    </div>
                    <div class="copyright">
                        地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096 电话：000-000-0000 传真：000-00000000 邮箱: xxxxxx.com 京ICP备08001421号京公网安备00000000000
                    </div>
                </div>
            </div>
        </footer>
    </a-layout-footer>
</template>

<script>
export default{
    name:'Footer'
}
</script>

<style lang="less" scoped>
.footer {
    height: 315px;
    padding-top: 30px;
}
.footer a{
    color: rgb(150, 150, 150);
}
.footer a:hover {
    color: #1e80ff;
    text-decoration: none;
}
.w {
    width: 1226px;
    margin: 0 auto;
}
.mod_help {
    height: 185px;
    border-bottom: 1px solid #CCC;
    padding-left: 50px;
}

.mod_help dl {
    float: left;
    width: 250px;
}


.mod_help dl dt {
    font-size: 18px;
    margin-bottom: 10px;
}

.mod_help dl dd {
    font-size: 14px;
}

.mod_copyright {
    text-align: center;
    padding-top: 20px;
}
.links {
    margin-bottom: 15px;
}

.links a {
    margin: 0 3px;
    color: rgb(150, 150, 150);
}
</style>