;(function(global) {
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)',
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
                        shadowColor: '#fff',
                    },
                    label: {
                        color: '#fff'  
                    },
                },
                itemStyle: {
                    color: '#ffbb23'
                }
            }
        ]
    };
    const myChart = echarts.init(document.querySelector('#tab-content'));
    myChart.setOption(option);
    $('#title').click(() => {
        $('#menu').toggle();
        if ($('.layui-icon').hasClass('layui-icon-down')) {
            $('.layui-icon').removeClass('layui-icon-down').addClass('layui-icon-up') 
        } else {
            $('.layui-icon').removeClass('layui-icon-up').addClass('layui-icon-down') 
        }
    });
    $('#menu').click((e) => {
        $(e.target).parent().find('.active').removeClass('active');
        $(e.target).addClass('active');
        if ($(e.target).text() == '入侵警告识别') {
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)',
                },
                series: [
                    {
                        name: '安全帽识别',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        data: [
                            {value: 2, name: '生活区门岗'},
                            {value: 1, name: '入侵警告'},
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: '#fff',
                            },
                            label: {
                                color: '#fff'  
                            },
                        },
                    }
                ]
            };
            myChart.setOption(option, true);
        }
        if ($(e.target).text() == '安全帽识别') {
            myChart.setOption(option, true);
        }
    });
    function timeForMat (count, skip = 0) {
         // 拼接时间
         const time = [];
         for(let i = 0; i < count; i++) {
            let time2 = new Date()
            time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * i))
            let Y2 = time2.getFullYear()
               let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
            let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
            let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
            time.unshift(timer2);
         }
         const newTimer = time.filter((value, index) => {
             if(skip) {
                return (index + 1) % skip == 0
             }
             return true;
         });
           return newTimer
    }
    document.querySelector('#bottom-content').style.width=(document.querySelector('.intelligence-application').clientWidth - 182)+'px';
    const bottomChart = echarts.init(document.querySelector('#bottom-content'));
    const data = timeForMat(7);
    const bottomOption = {
        legend: {
            data:['生活区门岗'],
            textStyle: {
                color: '#fff',
            }
        },
        xAxis: {
            type: 'category',
            data: data,
            boundaryGap: false,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1,
            name: '数量',
            nameTextStyle: {
                color: '#fff',
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLine: {
                onZero: true,
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [{
            name: '生活区门岗',
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            areaStyle: {
                color: '#fff'
            }
        }]
    };
    bottomChart.setOption(bottomOption);
    $('#bottom-select').change(() => {
        const data = [7, 30, 90];
        const skip = [0, 3, 9]
        const value = $("#bottom-select option:selected").val();
        const myData = timeForMat(data[value - 1], skip[value -1]);
        const bottomOption = {
            legend: {
                data:['生活区门岗'],
                textStyle: {
                    color: '#fff',
                }
            },
            xAxis: {
                type: 'category',
                data: myData,
                boundaryGap: false,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 1,
                name: '数量',
                nameTextStyle: {
                    color: '#fff',
                },
                axisLine: {
                    onZero: true,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            series: [{
                name: '生活区门岗',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                type: 'line',
                areaStyle: {
                    color: '#fff'
                }
            }]
        };
        bottomChart.setOption(bottomOption, true);
    })
})(window)