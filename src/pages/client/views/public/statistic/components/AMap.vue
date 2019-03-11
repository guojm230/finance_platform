<template>
    <section>
        <div style="text-align: center;margin-bottom: 15px">
            <el-button v-show="this.code !== 410000"
                       @click="prevMap"
                       size="medium"
                       style="margin-right: 15px"
            >
                上一级
            </el-button>
            <el-radio-group
                    v-model="activeType.name"
                    size="medium"
                    @change="onChange"
            >
                <el-radio-button v-for="type in types"
                                 :key="type.value"
                                 :label="type.name"
                                 :value="type.value"
                ></el-radio-button>
            </el-radio-group>
        </div>

        <el-row class="map-area">
            <el-col :span="16">
                <div style="height: 600px;min-width: 700px" v-if="activeType.value === 1">
                    <transition name="fade">
                        <div id="map" v-show="showMap" style="width: 600px;height: 700px">

                        </div>
                    </transition>
                </div>
                <div v-if="activeType.value === 2" style="min-width: 700px;height: 600px;margin: 50px auto">
                    <div id="pie" style="width: 700px;height: 600px;margin:auto" >

                    </div>
                </div>
                <div v-if="activeType.value === 3" style="min-width: 700px;height: 600px;margin: auto">
                    <div id="pie2" style="width: 700px;height: 600px;margin:auto" >

                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <el-table
                    :data="data"
                    :show-summary="true"
                    size="small"
                >
                    <el-table-column type="index" label="排名"></el-table-column>
                    <el-table-column :label="activeType.name" prop="name"></el-table-column>
                    <el-table-column :label="item.name" :prop="item.value"></el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <div style="margin-top: 20px" v-if="activeType.value === 1">
            <div id="bar" style="width: 800px;height: 500px">

            </div>
        </div>
    </section>
</template>

<script>
  import echarts from 'echarts';
  import echarts_gl from 'echarts-gl'
  let map;
  let barChart;
  let pieChart;
  let pieChart2;

  const option = {
    visualMap: {
      // min: 0,
      // max: data[0].value,
      inRange: {
        // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        color: ['lightskyblue', 'yellow', 'orangered']
      },
      text: ['高', '底'],           // 文本，默认为数值文本
      calculable: false,
      right: 100,
      show: false
    },
    tooltip: {
      show: true,
      trigger: 'item',
      // showDelay: 0,
      transitionDuration: 0.2
    },
    series: [{
      type: 'map3D',
      map: '',
      top:'-50px',
      regionHeight: 7,
      itemStyle: {
        borderWidth: 1,
        borderColor: '#4f4f4f'
      },
      viewControl: {
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        distance: 158,
        alpha: 70
      },
      label: {
        show:true,
        distance:500,
        textStyle:{
          color:'#000000',
          fontWeight : 'normal',
          fontSize : 5,
          backgroundColor: 'rgba(0,23,11,0)'
        },
        emphasis: {
          show: true,
          textStyle:{color:"#f00"}
        }
      },
      shading: 'realistic',
      textFixed: {
        Alaska: [20, 50]
      }
    }]
  };

  const barOption = {
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'bar'
    }]
  };

  const pieOption = {
    series:[{
      type: 'sunburst',
      center:['50%','50%'],
      radius:[0,'80%'],
      data:[]
    }]
  };

  //马格南图
  const pieOption2 = {
    series:[{
      type: 'pie',
      center:['50%','50%'],
      radius:[0,'60%'],
      roseType: 'radius',
      data:[]
    }]
  };

  export default {
    name: "AMap",
    props:['types','item'],
    data:function(){
      return {
        code:410000,
        refresh: false,
        data:[],
        mapData:[],
        xAxisData:[],   //柱状图横坐标
        barData:[],
        pieData:[],
        activeType:{
          name: this.types[0].name,
          value: this.types[0].value
        },
        showMap:false
      }
    },
    methods: {
      loadData(){
        this.showMap = false;
        this.$http.get("public/statistic",{
          params:{
            type:this.activeType.value,
            pcode: this.activeType.value === 1 ? this.code : 0
          }
        }).then(res=>{
          let data = [];
          //郑州，将金水区置顶
          if (this.code === 410100 || this.code === 410000) {
            let jd = res.data.find(d=> d.code === 410105 || d.code === 410000);
            if (jd){
              data.push(jd);
            }
            data = data.concat(res.data.filter(d=>d.code !== 410105 || d.code !== 410100).sort((d1,d2)=>d2[this.item.value]-d1[this.item.value]))
          } else {
            data = res.data;
            data.sort((d1,d2)=>d2[this.item.value]-d1[this.item.value]);
          }
          this.data = data;

          if (this.activeType.value === 1){
            this.initChart();
          } else if (this.activeType.value === 2){
            this.initPieChart();
          } else if (this.activeType.value === 3){
            this.initPieChart2();
          }
        })
      },
      initChart() {
        if (map){
          map.clear();
        }
        this.initMapData();
        this.initChartData();
        this.$http.get("static/geo/"+this.code+".json").then(res => {
          let mapJson = res.data;
          if (this.code === 410000){
            mapJson.features.forEach(m=>{
              m.properties.name = m.properties.fullname;
            })
          }

          echarts.registerMap(this.code.toString(), mapJson);
          map = echarts.init(document.getElementById("map"));
          barChart = echarts.init(document.getElementById("bar"));
          option.series[0].data = this.mapData;
          option.series[0].map = this.code.toString();
          option.tooltip.formatter = (params) => {
            return params.name + '<br/>'+this.item.name+':'
                +this.item.toolPrefix + params.data.value + this.item.toolSuffix;
          };
          barOption.series[0].data = this.barData;
          barOption.xAxis.data = this.xAxisData;

          map.setOption(option);
          barChart.setOption(barOption);
          this.initEvent();
          this.showMap = true;
        })
      },
      initMapData(){
        this.mapData = this.data.map(d=>{
          return {
            pcode: d.parentCode,
            code: d.code,
            value: d[this.item.value],
            name: d.name
          };
        });
      },
      initPieChart(){
        if (pieChart){
          pieChart.dispose();
        }
        pieChart = echarts.init(document.getElementById("pie"));
        //总数
        const total = this.data.reduce((p,c)=>p+c[this.item.value],0);
        let otherVal = 0;
        let pData = [];

        for (let i = this.data.length - 1; i > 0; i--){
          const d = this.data[i];
          const val = d[this.item.value];
          if (otherVal/total < 0.05) {
            otherVal += val;
          } else {
            pData.push({name:d.name,value:val});
          }
        }
        pData.push({name:'其它',value:otherVal});

        pieOption.series[0].data = pData;
        pieChart.setOption(pieOption);
      },
      initPieChart2(){
        pieChart2 = echarts.init(document.getElementById("pie2"));

        pieOption2.series[0].data = this.data.map(d=>{
          return {
            name: d.name,
            value: d[this.item.value]
          }
        });

        pieChart2.setOption(pieOption2);
      },
      initChartData(){
        this.xAxisData = this.data.map(d => d.name);
        this.barData = this.data.map(d=>d[this.item.value]);
      },
      initEvent(){
        map.on('click',params=>{
          if (params.componentType === 'series') {
            const area = params.data;
            if (area.pcode === 410000){
              this.code = area.code;
              this.loadData();
            }
          }
        });
      },
      onChange(){
        this.types.forEach(t=>{
          if(t.name === this.activeType.name){
            this.activeType.value = t.value;
            return false;
          }
        });
        this.loadData();
      },
      prevMap(){
        this.code = 410000;
        this.loadData();
      }
    },
    watch:{
      types(){
        this.loadData();
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
