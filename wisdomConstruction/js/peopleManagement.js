var myChart1 = echarts.init(document.getElementById('people-anliase-cont'));
var dataAxis = ['项目部', '项目经理', '安全员', '木工', '钢筋工', '泥工', '架子工', '油漆工', '铁匠'];
var data = [15, 15, 10, 18, 19, 23, 29, 33, 31];
var yMax = 50;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

var option1 = {
    title: {
//      text: '特性示例：渐变色 阴影 点击缩放',
//      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    xAxis: {
        data: dataAxis,
        axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                color: 'rgba(0,0,0,0.05)'
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                )
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: data
        }
    ]
};

// Enable data zoom when user click bar.
var zoomSize = 4;
myChart1.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart1.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});

myChart1.setOption(option1);
myChart1.resize({
	height: 280,
	width: 820
});

var myChart2 = echarts.init(document.getElementById('people-now-cont-right'));
var option2 = {
	title: {
		//      text: '人员统计',
		left: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)'
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['场内人数', '劳务人数', '管理人数'],
		textStyle: { //图例文字的样式
			color: '#fff',
			fontSize: 16
		},
	},
	series: [{
		name: '访问来源',
		type: 'pie',
		radius: '55%',
		center: ['50%', '60%'],
		data: [{
				value: 34,
				name: '管理人数',
				itemStyle: {
					color: '#D3085E'
				}
			},
			{
				value: 125,
				name: '场内人数',
				itemStyle: {
					color: '#8ec060'
				}
			},
			{
				value: 310,
				name: '劳务人数',
				itemStyle: {
					color: '#4E6EF2'
				}
			},

		],
		emphasis: {
			itemStyle: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
};

myChart2.setOption(option2);
myChart2.resize({
	height: 220,
	width: 300
});