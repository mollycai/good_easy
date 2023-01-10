const loading = {
    methods: {
        // 抽离出取消动图/加载状态的代码
        removeLoading() {
            let self = document.getElementById('Loading');
            if (self != null) {
                let parent = self.parentElement;
                parent.removeChild(self);
                document.body.style.overflowY = 'scroll';
            }
        }
    },
}
export default loading;