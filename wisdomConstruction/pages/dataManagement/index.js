;(function(global) {
    const tree = layui.tree;
    const table = layui.table;
    // 左侧树形结构
    const filesTree = tree.render({
        elem: '#files',
        data: [
            {
                title: '安全资料1标段',
                spread: true,
                children: [
                    {
                        title: '三级教育',
                        field: 'education',
                    },
                    {
                        title: '晨会资料',
                        field: 'data',
                    },
                    {
                        title: '安全培训',
                        field: 'train',
                    },
                    {
                        title: '安全交底',
                        field: 'disclose',
                    },
                ]
            }
        ],
        click(obj) {
            console.log(obj)
        },
    })
})(window)