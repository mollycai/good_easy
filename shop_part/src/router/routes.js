/**
 * 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
 */

export default [{
    // 登录
    path: '/login',
    component: () =>
        import ('@/view/Login'),
    meta: {
        isHideFooter: true,
        title: '登录'
    }
}, {
    // 注册
    path: '/register',
    component: () =>
        import ('@/view/Register'),
    meta: {
        isHideFooter: true,
        title: '注册'
    }
}, {
    // 根路径，访问默认重定向回广场（首页）
    path: '/',
    component: () =>
        import ('@/view/Index'),
    redirect: 'square', // 访问默认重定向回广场
    children: [{
        // 广场
        name: 'first',
        path: 'square',
        meta: {
            title: '首页'
        },
        component: () =>
            import ('@/view/square/First'),
    }, {
        // 商品详情
        name: 'detail',
        path: 'detail/:id',
        meta: {
            title: '商品详情'
        },
        component: () =>
            import ('@/view/goods/GoodInfo'),
    }, {
        // 活动
        name: 'activity',
        path: 'activity',
        meta: {
            title: '活动'
        },
        component: () =>
            import ('@/view/activity/Activity'),
    }, {
        // 商品发布
        name: 'plog',
        path: 'plog',
        meta: {
            title: '商品发布'
        },
        component: () =>
            import ('@/view/plog/Plog'),
    }, {
        // 购物车
        name: 'shopcart',
        path: 'shopcart',
        meta: {
            title: '购物车'
        },
        component: () =>
            import ('@/view/shopcart/ShopCart'),
    }, {
        // 用户信息
        // name: 'userinfo',
        path: 'info',
        meta: {
            title: '个人信息'
        },
        redirect: 'info/myplog',
        component: () =>
            import ('@/view/info/UserMessage'),
        children: [{
            name: 'myplog',
            path: 'myplog',
            meta: {
                title: '我发布的'
            },
            component: () =>
                import ('@/view/info/transcards/MyPlog')
        }, {
            name: 'mysell',
            path: 'mysell',
            meta: {
                title: '我卖出的'
            },
            component: () =>
                import ('@/view/info/transcards/MySell')
        }, {
            name: 'mybuy',
            path: 'mybuy',
            meta: {
                title: '我买到的'
            },
            component: () =>
                import ('@/view/info/transcards/MyBuy')
        }, {
            name: 'aftersell',
            path: 'aftersell',
            meta: {
                title: '售后服务'
            },
            component: () =>
                import ('@/view/info/transcards/AfterSell')
        }]
    }, {
        // 用户详细信息
        name: 'detailinfo',
        path: 'info/profile',
        meta: {
            title: '个人信息'
        },
        component: () =>
            import ('@/view/info/DetailInfo'),
    }, {
        // 确认单
        name: 'comfirmshop',
        path: 'comfirmshop',
        meta: {
            title: '商品确认'
        },
        component: () =>
            import ('@/view/trade/ComfirmShopCart'),
        // 只能从购物车界面，才能跳到确认单界面
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart' || from.path === 'comfirmshop') {
                next();
            } else {
                next(from.path);
            }
        }
    }, {
        // 订单
        name: 'comfirmorder',
        path: 'comfirmorder/:orderId',
        meta: {
            title: '订单'
        },
        component: () =>
            import ('@/view/trade/ComfirmOrder'),
    }, {
        // 支付界面
        name: 'pay',
        path: 'pay',
        component: () =>
            import ('@/view/pay/Pay'),
        // 只能从订单、确认单界面跳到支付界面
        // beforeEnter: (to, from, next) => {
        //     console.log(1)
        //     if (from.path === '/comfirmshop' || from.path === '/comfirmorder/:orderId' || from.path === '/pay') {
        //         next()
        //     } else {
        //         next(from.path)
        //     }
        // }
    }]
}]