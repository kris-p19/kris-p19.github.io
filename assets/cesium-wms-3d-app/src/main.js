// ตั้งค่า Access Token ของ Cesium Ion
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNzdmMDIwOS0zZTViLTRhMTItOWYyOS01OWYyMmM4MTBjNTgiLCJpZCI6MzExMzA0LCJpYXQiOjE3NDk2NDY1MzB9.OkebqwZnlttjqT-wNs_8OrVK2KEZ1GLmHLGml-JQpZY';

// สร้าง Viewer พร้อม Terrain และปิด baseLayerPicker
const viewer = new Cesium.Viewer("cesiumContainer", {
    //terrain: Cesium.Terrain.fromWorldTerrain(),
    terrain: false,
    baseLayerPicker: false,
    requestRenderMode: true, // render เมื่อมี interaction เท่านั้น
    maximumRenderTimeChange: Infinity // ไม่ต้อง re-render เองเลย
});

// เก็บ basemap layers ไว้เพื่อสลับ
const osmLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: ['a', 'b', 'c']
});
const googleLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
});

// เพิ่ม OSM เป็นค่าเริ่มต้น
let currentBaseLayer = viewer.imageryLayers.addImageryProvider(googleLayer);

// ฟังก์ชันสลับ basemap
// async function switchBaseMap(provider) {
//     // if (currentBaseLayer) {
//     await viewer.imageryLayers.remove(currentBaseLayer, false);
//     // }
//     currentBaseLayer = await viewer.imageryLayers.addImageryProvider(provider, 0);
// }

// จัดการปุ่ม
// document.getElementById('osmBtn').onclick = () => switchBaseMap(osmLayer);
// document.getElementById('googleBtn').onclick = () => switchBaseMap(googleLayer);

// เพิ่ม WMS Layer จาก GeoServer
viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapServiceImageryProvider({
        url: 'https://tcs.dmcr.go.th/geoserver/dmcr_postgres/wms',
        layers: 'etc_coastal_status_2566_2',
        parameters: {
            service: 'WMS',
            transparent: true,
            format: 'image/png'
        }
    })
);

// ปรับ Scene เพื่อให้ GeoJSON ชัดเจน
viewer.scene.globe.depthTestAgainstTerrain = true;

// โหลด GeoJSON และจัดการ Error
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
    // viewer.flyTo(dataSources[0]);
}).catch((error) => {
    console.error("เกิดข้อผิดพลาดในการโหลด GeoJSON:", error);
});

viewer.resolutionScale = 0.75; // ค่า 0.5 – 1.0 (1.0 = คมชัดสุด, แต่ช้า) | window.devicePixelRatio ใช้ scale ตามจอแสดงผลจริง
viewer.scene.fxaa = false;
viewer.scene.postProcessStages.fxaa.enabled = false;
viewer.scene.highDynamicRange = false;

// กำหนดศูนย์กลางกล้อง + ความสูง
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(11.330682, 100.634357, 2000000),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90.0),
        roll: 0.0
    }
});
