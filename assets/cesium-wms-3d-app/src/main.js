// ตั้งค่า Access Token ของ Cesium Ion
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNzdmMDIwOS0zZTViLTRhMTItOWYyOS01OWYyMmM4MTBjNTgiLCJpZCI6MzExMzA0LCJpYXQiOjE3NDk2NDY1MzB9.OkebqwZnlttjqT-wNs_8OrVK2KEZ1GLmHLGml-JQpZY';

// สร้าง Viewer พร้อมตั้งค่าที่เหมาะกับเครื่องสเปกต่ำ
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: false, // ไม่ใช้ terrain เพื่อลดโหลด
    baseLayerPicker: false,
    requestRenderMode: true,
    maximumRenderTimeChange: Infinity
});

// เพิ่ม Google Hybrid (ภาพถ่าย + label) เป็น base layer หลัก
const googleLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    maximumLevel: 20
});
let currentBaseLayer = viewer.imageryLayers.addImageryProvider(googleLayer);

// เพิ่ม WMS Layer จาก GeoServer อย่างปลอดภัย
const wmsProvider = new Cesium.WebMapServiceImageryProvider({
    url: 'https://tcs.dmcr.go.th/geoserver/dmcr_postgres/wms',
    layers: 'etc_coastal_status_2566_2',
    parameters: {
        service: 'WMS',
        transparent: true,
        format: 'image/png'
    }
});

// รอให้ WMS พร้อมก่อนแสดง
wmsProvider.readyPromise
    .then(() => {
        viewer.imageryLayers.addImageryProvider(wmsProvider);
    })
    .catch((error) => {
        console.error("WMS provider โหลดไม่สำเร็จ:", error);
    });

// ปรับให้ GeoJSON ไม่ซ้อน Terrain
viewer.scene.globe.depthTestAgainstTerrain = true;

// โหลด GeoJSON 2 ชั้น พร้อมจัดการข้อผิดพลาด
Promise.all([
    Cesium.GeoJsonDataSource.load('/assets/cesium-wms-3d-app/Coasalline.geojson', {
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.RED.withAlpha(0.5),
        strokeWidth: 2
    }),
    Cesium.GeoJsonDataSource.load('/assets/cesium-wms-3d-app/Transect.geojson', {
        stroke: Cesium.Color.BLUE,
        fill: Cesium.Color.BLUE.withAlpha(0.5),
        strokeWidth: 2
    })
]).then((dataSources) => {
    dataSources.forEach((dataSource) => viewer.dataSources.add(dataSource));
}).catch((error) => {
    console.error("เกิดข้อผิดพลาดในการโหลด GeoJSON:", error);
});

// ปรับภาพให้เร็วขึ้น (ลดความละเอียดลงเล็กน้อย)
viewer.resolutionScale = 0.75;
viewer.scene.fxaa = false;
viewer.scene.postProcessStages.fxaa.enabled = false;
viewer.scene.highDynamicRange = false;

// ตั้งกล้องให้มองเห็นประเทศไทยจากมุมสูง
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(100.523186, 13.736717, 2000000),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90.0),
        roll: 0.0
    }
});
