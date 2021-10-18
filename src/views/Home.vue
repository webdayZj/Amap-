<template>
  <div class="Home">
    <div class="map" id="map"></div>
    <div class="test">测试</div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      // 甘肃省各区坐标
      provinceList: [
        {
          name: "永登县",
          quantity: "1200套",
          lat: 103.280421,
          lot: 36.726362,
        },
        {
          name: "红古区",
          quantity: "412套",
          lat: 102.869455,
          lot: 36.35477,
        },
        {
          name: "西固区",
          quantity: "328套",
          lat: 103.601952,
          lot: 36.115923,
        },
        {
          name: "安宁区",
          quantity: "1102套",
          lat: 103.701172,
          lot: 36.100702,
        },
        {
          name: "七里河",
          quantity: "847套",
          lat: 103.8652,
          lot: 35.929111,
        },
        {
          name: "皋兰县",
          quantity: "586套",
          lat: 104.013904,
          lot: 36.158023,
        },
        {
          name: "榆中县",
          quantity: "440套",
          lat: 104.119108,
          lot: 35.849099,
        },
      ],
      // 定义安宁区 任意坐标
      regionList: [
        {
          title: "碧桂园玖珑湾",
          price: "5600元/㎡",
          Housetype: "二室(1)，三室(6)，四室(3)",
          addres: "海石湾镇平安路与电信路的交汇处",
          CommunityImg: require("../assets/map/玖珑湾.jpg"),
          coordinate: [102.86808, 36.350592],
          lat: 102.86808,
          lot: 36.350808,
        },
        {
          title: "红古国芳广场",
          price: "4200元/㎡",
          Housetype: "二室(1)，三室(2)",
          addres: "海石湾花庄路与龙源路西北角国芳广场 ",
          CommunityImg: require("../assets/map/红古国芳广场.jpg"),
          coordinate: [102.859422, 36.357539],
          lat: 102.859422,
          lot: 36.357539,
        },
        {
          title: "天健凤凰城",
          price: "2900元/㎡",
          Housetype: "一室(1)，二室(7)，三室(1)",
          addres: "北山公路,近中和路 ",
          CommunityImg: require("../assets/map/天健凤凰城.jpg"),
          coordinate: [102.871038, 36.356352],
          lat: 102.871038,
          lot: 36.356352,
        },
        {
          title: "乾元金海国际",
          price: "6500元/㎡",
          Housetype: "一室(3)，二室(4)，三室(2)",
          addres: "经十三路与纬五支路交汇处",
          CommunityImg: require("../assets/map/乾元金海国际.jpg"),
          coordinate: [103.699925, 36.509973],
          lat: 103.699925,
          lot: 36.509973,
        },
        {
          title: "红古国芳广场商铺",
          price: "12900元/㎡",
          Housetype: "",
          addres: "花庄路与龙源路交叉路口往西约210米",
          CommunityImg: require("../assets/map/红古国芳广场商铺.png"),
          coordinate: [102.86169, 36.357096],
          lat: 102.86169,
          lot: 36.357096,
        },
      ],
      map_icon: require("../assets/map/map_logo.png"),
    };
  },
  computed: {},
  watch: {},
  created() {
    // window.clearMarker = this.clearMarker;
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {},
  methods: {
    init() {
      let self = this;
      let markers = []; // 第一层覆盖物的集合

      let map = new AMap.Map("map", {
        center: [103.841099, 36.062898],
        icon: self.map_icon, // 添加 Icon 图标 URL
        mapStyle: "amap://styles/darkblue", //设置地图的显示样式
        resizeEnable: true,
        zoom: 10,
      });
      // 点标记显示内容，HTML要素字符串
      for (let index = 0; index < this.provinceList.length; index++) {
        const element = this.provinceList[index];
        var markerContent = ` <div class="inwindows" id='cleramap'>
           <div class="title">${element.name}</div> <div class="number">${element.quantity}</div>
        </div>`;
        var marker = new AMap.Marker({
          map,
          position: [element.lat, element.lot],
          // 将 html 传给 content
          content: markerContent,
          // 以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-13, -30),
        });
        // 将 markers 添加到地图
        markers.push(marker);
        // 点击删除第一层标注
        marker.on("click", function() {
          map.remove(markers); //删除第一层标准
          map.setZoom(15); //第二层小区信息中心点系数
          map.setCenter([element.lat, element.lot]);
          console.log(map);
          // 点标记显示内容，HTML要素字符串  小区信息弹窗
          for (let index = 0; index < self.regionList.length; index++) {
            const item = self.regionList[index];
            let Con = `<div class="region">
                      <div class="left">
                       <img src="${item.CommunityImg}" alt="" />
                      </div>
                     <div class="right">
                       <div class="right_title">${item.title} </div>
                       <div class="type">${item.Housetype}</div>
                       <div class="addres">${item.addres}</div>
                       <div class="price">${item.price}</div>
                     </div>
                    </div>`;
            var villagemarker = new AMap.Marker({
              map,
              position: [item.lat, item.lot],
              // 将 html 传给 content
              content: Con,
              // 以 icon 的 [center bottom] 为原点
              // offset: new AMap.Pixel(-13, -30),
              icon: self.map_icon,
              topWhenClick: true, //点击的层级显示最上面
            });
            // 将 markers 添加到地图
            markers.push(villagemarker);
            villagemarker.on("click", function() {});
          }
        });
      }
    },
  },
};
</script>

<style lang="less">
.Home {
  width: 100%;
  height: 100%;
  padding-top: 100px;
  .map {
    width: 80%;
    height: 80%;
    margin: 0 auto;
  }
}
.inwindows {
  width: 96px;
  height: 56px;
  // line-height: 30px;
  background-color: #2770ff;
  border: 3px solid #fff;
  border-radius: 40%;
  text-align: center;
  color: #fff;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: -22px; //
    left: 32px;
    width: 0;
    height: 0;
    border: 12px solid; //
    border-color: #2e78ff transparent transparent transparent;
  }
  .title {
    position: absolute;
    top: 6px;
    left: 16px;
    font-weight: bold;
    font-size: 18px;
  }
  .number {
    position: absolute;
    top: 29px;
    left: 26px;
    font-size: 12px;
  }
}

.region {
  width: 320px;
  height: 132px;
  background-color: #fff;
  display: flex;
  padding: 10px 0 0 10px;
  .left {
    width: 120px;
    height: 120px;
    margin-right: 6px;
    img {
      width: 120px;
      height: 120px;
      object-fit: contain;
      border-radius: 20px;
    }
  }
  .right {
    flex: 1;
    .right_title {
      font-weight: bold;
      font-size: 18px;
    }
    .type {
      font-size: 14px;
      color: #ccc;
      margin: 3px 0;
    }
    .addres {
      font-size: 14px;
      color: #ccc;
      margin: 3px 0;
    }
    .price {
      color: red;
      font-weight: bold;
      font-size: 20px;
    }
  }
}
</style>
