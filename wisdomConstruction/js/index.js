var myChart1 = echarts.init(document.getElementById('people-cont'));
var option1 = {
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

myChart1.setOption(option1);
myChart1.resize({
	height: 240,
	width: 300
});

var galleryThumbs = new Swiper('.gallery-thumbs', {
	spaceBetween: 10,
	slidesPerView: 4,
	//    loop: true,
	freeMode: true,
	loopedSlides: 5, //looped slides should be the same
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
});
var galleryTop = new Swiper('.gallery-top', {
	spaceBetween: 10,
	//    loop:true,
	loopedSlides: 5, //looped slides should be the same
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	thumbs: {
		swiper: galleryThumbs,
	},
});

//时间轴插件
var mySwiper = new Swiper(".product-features .swiper-container", {
	slidesPerView: 10, //默认是显示4个
	initialSlide: 999, //默认从第几个显示，999是为了让右边没有
	spaceBetween: 0, //间距
	speed: 1000, //速度
	prevButton: ".swiper-button-prev", //左右按钮
	nextButton: ".swiper-button-next"
})

var myChart2 = echarts.init(document.getElementById('equipment-cont'));

// 指定图表的配置项和数据
var option2 = {
	color: ['#3398DB'],
	tooltip: {
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		data: ['塔机', '升降机', '卸料平台', '安全帽', '扬尘噪音'],
		axisTick: {
			alignWithLabel: true
		},
		axisLine: {
			lineStyle: {
				color: '#fff',
				width: 2, //这里是为了突出显示加上的
			}
		}
	}],
	yAxis: [{
		type: 'value',
		axisLine: {
			lineStyle: {
				color: '#fff',
				width: 2, //这里是为了突出显示加上的
			}
		}
	}],
	series: [{
		//		name: '直接访问',
		type: 'bar',
		barWidth: '60%',
		data: [10, 52, 200, 334, 390]
	}],
};

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);
myChart2.resize({
	height: 240,
	width: 300
});

var myChart3 = echarts.init(document.getElementById('greenConstruction-cont'));
var option3 = {
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
		left: 'right',
		data: ['安全管理', '施工用电', '高处作业', '文明施工'],
		textStyle: { //图例文字的样式
			color: '#fff',
			fontSize: 16
		},
	},
	series: [{
//		name: '访问来源',
		type: 'pie',
		radius: '55%',
		center: ['50%', '60%'],
		data: [{
				value: 154,
				name: '安全管理',
				itemStyle: {
					color: '#D3085E'
				}
			},
			{
				value: 25,
				name: '施工用电',
				itemStyle: {
					color: '#8ec060'
				}
			},
			{
				value: 110,
				name: '高处作业',
				itemStyle: {
					color: '#4E6EF2'
				}
			},
			{
				value: 110,
				name: '文明施工',
				itemStyle: {
					color: '#4EDEDD'
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

myChart3.setOption(option3);
myChart3.resize({
	height: 240,
	width: 300
});