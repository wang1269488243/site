;(function(global) {
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '安全帽识别',
                type: 'pie',
                radius: ['50%', '70%'],
                data: [
                    {value: 0, name: '生活区门岗'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
            }
        ]
    };
    const myChart = echarts.init(document.querySelector('#tab-content'));
    myChart.setOption(option);
})(window)