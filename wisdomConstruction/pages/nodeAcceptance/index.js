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
        
    })
})(window)