// 获取图片长宽的方法
export const getImageSize = imageUrl => {
    // 采用promise异步加载图片
    return new Promise((reslove, reject) => {
        // 创建实例对象
        var img = new Image();
        // 图片地址
        img.src = imageUrl;
        img.onload = () => {
            // 当图片加载成功则调用resolve即可
            reslove({
                width: img.width,
                height: img.height
            })
            reject('图片加载失败！');
        }
    })
}