// ตั้งค่า Access Token ของ Cesium Ion
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNzdmMDIwOS0zZTViLTRhMTItOWYyOS01OWYyMmM4MTBjNTgiLCJpZCI6MzExMzA0LCJpYXQiOjE3NDk2NDY1MzB9.OkebqwZnlttjqT-wNs_8OrVK2KEZ1GLmHLGml-JQpZY';

// สร้าง Viewer พร้อม Terrain และปิด baseLayerPicker
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    baseLayerPicker: false,
    imageryProvider: false // ปิด basemap เริ่มต้นของ Cesium
});

// เพิ่มแผนที่พื้นหลังจาก OpenStreetMap
const osmLayer = viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
        url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        subdomains: ['a', 'b', 'c']
    })
);

// เพิ่ม WMS Layer จาก GeoServer
const wmsLayer = viewer.imageryLayers.addImageryProvider(
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

// กำหนดศูนย์กลางกล้อง + ความสูง
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(100.326790, 13.043242, 600000),
    // orientation: {
    //     heading: Cesium.Math.toRadians(0),    // หันไปทิศเหนือ
    //     pitch: Cesium.Math.toRadians(-30),    // ก้มกล้องลง
    //     roll: 0
    // }
});