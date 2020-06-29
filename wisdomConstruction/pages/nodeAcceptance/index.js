;(function(global) {
    const layDate = layui.laydate;
    const layer = layui.layer;
    const table = layui.table;
    layDate.render({
        elem: '#start',
        type: 'date',
    });
    layDate.render({
        elem: '#end',
        type: 'date',
    });
    $('#btn').click(() => {
        const startValue = $('#start').val();
        const ednValue = $('#edd').val();
        if (!startValue && !ednValue) {
            layer.msg('请选择查询时间');
            return;
        }
        table.render({
            elem: '#table',
            skin: 'nob',
            even: true,
            cols: [
                [
                    {field: 'title', title: '节点名称', width: '20%', align: 'center'},
                    {field: 'content', title: '节点内容', width: '20%', align: 'center'},
                    {field: 'line', title: '验收进度', width: '20%', align: 'center'},
                    {field: 'time', title: '验收时间', width: '20%', align: 'center'},
                    {field: 'user', title: '验收人', width: '20%', align: 'center'},
                ]
            ],
            data: [
                {title: '吊钩验收', content: '吊钩安装运行是否正常', line: '20%', time: '2020-06-28 15:30:00', user: 'admin'},
                {title: '吊钩验收2', content: '吊钩安装运行是否正常测试', line: '25%', time: '2020-06-28 16:30:00', user: 'admin'},
                {title: '吊钩验收3', content: '吊钩安装运行是否正常测试', line: '26%', time: '2020-06-29 17:30:00', user: 'admin'},
                {title: '吊钩验收4', content: '吊钩安装运行是否正常测试', line: '27%', time: '2020-06-29 15:30:00', user: 'admin'},
                {title: '吊钩验收5', content: '吊钩安装运行是否正常测试', line: '28%', time: '2020-06-29 15:30:00', user: 'admin'},
            ]
        })
    })
})(window)