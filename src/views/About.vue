<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Button type="primary" @click="changeOption">修改参数</Button>
    <Button type="primary" @click="changeOption2">修改参数方式二</Button>
		<chart-block ref="chartblock" id="chartblock" :option="option" style="width:100%; height:400px;"></chart-block>
  </div>
</template>
<script>
export default {
	data() {
		return {
			visible:false,
			title:'测试',
			option:{
				tooltip: {},
				xAxis: {
					data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}]
			},
			data:[5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20,5, 20, 36, 10],
			value:''
		}
	},
	methods:{
		changeOption(){
			var r = Math.floor(Math.random()*12);
			var d = this.data.slice(r,r+6);
			this.option.series[0].data = d;
    },
    changeOption2(){
			var r = Math.floor(Math.random()*12);
      var d = this.data.slice(r,r+6);
      var opt = {
				tooltip: {},
				xAxis: {
					data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: d
				}]
      };
      this.$refs.chartblock.setOption(opt);
		}
	}
}
</script>
