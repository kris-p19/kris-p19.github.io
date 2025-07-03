// ตั้งค่า Access Token ของ Cesium Ion
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNzdmMDIwOS0zZTViLTRhMTItOWYyOS01OWYyMmM4MTBjNTgiLCJpZCI6MzExMzA0LCJpYXQiOjE3NDk2NDY1MzB9.OkebqwZnlttjqT-wNs_8OrVK2KEZ1GLmHLGml-JQpZY';

// Object to keep track of which layers are on
const activeLayers = {};

function addWmsLayer(layerName) {
    return new Cesium.WebMapServiceImageryProvider({
        url: 'https://tcs.dmcr.go.th/geoserver/dmcr_postgres/wms',
        layers: `dmcr_postgres:${layerName}`,
        parameters: {
            service: 'WMS',
            transparent: true,
            format: 'image/png'
        }
    });
}

// เก็บ basemap layers ไว้เพื่อสลับ
const osmLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: ['a', 'b', 'c']
});
const googleLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
});

const viewer = new Cesium.Viewer("cesiumContainer", {
  imageryProvider: googleLayer,             // ใช้ Google Maps tile
  baseLayerPicker: false,                    // ปิด picker เพื่อป้องกัน user เปลี่ยน base layer
  terrainProvider: new Cesium.EllipsoidTerrainProvider(),  // พื้นผิวเรียบ ไม่มี terrain จริง
});

// เพิ่ม OSM เป็นค่าเริ่มต้น
let currentBaseLayer = viewer.imageryLayers.addImageryProvider(googleLayer);

// เพิ่ม WMS Layer จาก GeoServer
// viewer.imageryLayers.addImageryProvider(
//     new Cesium.WebMapServiceImageryProvider({
//         url: 'https://tcs.dmcr.go.th/geoserver/dmcr_postgres/wms',
//         layers: 'etc_coastal_status_2566_2',
//         parameters: {
//             service: 'WMS',
//             transparent: true,
//             format: 'image/png'
//         }
//     })
// );

// ปรับภาพให้เร็วขึ้น (ลดความละเอียดลงเล็กน้อย)
viewer.resolutionScale = 0.75;
viewer.scene.fxaa = false;
viewer.scene.postProcessStages.fxaa.enabled = false;
viewer.scene.highDynamicRange = false;
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(100.519900, 11.027475, 8000000),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),

        pitch: Cesium.Math.toRadians(-90.0),
        roll: 0.0
    }
});

document.querySelectorAll('#layerControls input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const layerName = this.value;

        if (this.checked) {
            // Add layer
            const provider = addWmsLayer(layerName);
            const imageryLayer = viewer.imageryLayers.addImageryProvider(provider);
            activeLayers[layerName] = imageryLayer;
        } else {
            // Remove layer
            if (activeLayers[layerName]) {
                viewer.imageryLayers.remove(activeLayers[layerName], true);
                delete activeLayers[layerName];
            }
        }
    });
});