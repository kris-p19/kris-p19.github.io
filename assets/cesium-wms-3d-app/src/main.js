import { startDraw, startMeasure, setupCoordinateDisplay, clearAllDrawings } from './tool.js';
// ตั้งค่า Access Token ของ Cesium Ion
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNzdmMDIwOS0zZTViLTRhMTItOWYyOS01OWYyMmM4MTBjNTgiLCJpZCI6MzExMzA0LCJpYXQiOjE3NDk2NDY1MzB9.OkebqwZnlttjqT-wNs_8OrVK2KEZ1GLmHLGml-JQpZY';

// สร้าง ImageryProviders สำหรับ Basemap
const osmLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: ['a', 'b', 'c'],
    credit: '© OpenStreetMap contributors'
});
const googleLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    credit: '© Google Satellite'
});
const esri = new Cesium.UrlTemplateImageryProvider({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    credit: '© Esri'
});
const cartoPositron = new Cesium.UrlTemplateImageryProvider({
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    credit: '© CartoDB'
});
const googleLayer2 = new Cesium.UrlTemplateImageryProvider({
    url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    credit: '© Google Satellite'
});

export const viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: googleLayer,             // ใช้ Google Maps tile
    baseLayerPicker: false,                    // ปิด picker เพื่อป้องกัน user เปลี่ยน base layer
    terrainProvider: new Cesium.EllipsoidTerrainProvider(),  // พื้นผิวเรียบ ไม่มี terrain จริง
});

// ตัวแปรเก็บ basemap ปัจจุบัน
let currentBaseMapLayer = viewer.imageryLayers.get(0);

// ฟังก์ชันสลับ Basemap
function switchBaseMap(type) {
    if (currentBaseMapLayer) {
        viewer.imageryLayers.remove(currentBaseMapLayer, true);
    }
    switch (type) {
        case 'osm':
            currentBaseMapLayer = viewer.imageryLayers.addImageryProvider(osmLayer, 0);
            break;
        case 'google':
            currentBaseMapLayer = viewer.imageryLayers.addImageryProvider(googleLayer, 0);
            break;
        case 'esri':
            currentBaseMapLayer = viewer.imageryLayers.addImageryProvider(esri, 0);
            break;
        case 'carto':
            currentBaseMapLayer = viewer.imageryLayers.addImageryProvider(cartoPositron, 0);
            break;
        case 'google2':
            currentBaseMapLayer = viewer.imageryLayers.addImageryProvider(googleLayer2, 0);
            break;
        default:
            currentBaseMapLayer = viewer.imageryLayers.addImageryProvider(googleLayer, 0);
            break;
    }
}

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

// Event listener สำหรับ Basemap dropdown
document.addEventListener('DOMContentLoaded', function () {
    const select = document.getElementById("basemapSelect");

    // สลับ basemap ตามค่าเริ่มต้นที่เลือกใน <select>
    switchBaseMap(select.value);

    // ตั้ง event listener
    select.addEventListener("change", function () {
        switchBaseMap(this.value);
    });
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

// ปรับ camera เริ่มต้น (บินไปตำแหน่งประเทศไทย กำหนดได้ตามต้องการ)
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(100.519900, 11.027475, 10000000),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90.0),
        roll: 0.0
    }
});
// ปรับภาพให้เร็วขึ้น (ลดความละเอียดลงเล็กน้อย)
// viewer.resolutionScale = 0.75;
viewer.scene.fxaa = false;
viewer.scene.postProcessStages.fxaa.enabled = false;
viewer.scene.highDynamicRange = false;

viewer.resolutionScale = window.devicePixelRatio; // ใช้ความละเอียดสูงสุดของหน้าจอ
viewer.scene.globe.maximumScreenSpaceError = 1;   // ลดค่า error ทำให้โหลด tile ละเอียดมากขึ้น
viewer.scene.globe.tileCacheSize = 1000;          // เพิ่ม cache เพื่อเก็บ tile มากขึ้น

// ผูกปุ่มกับฟังก์ชันเครื่องมือ
document.getElementById("drawPoint").addEventListener("click", () => startDraw(viewer, "point"));
document.getElementById("drawLine").addEventListener("click", () => startDraw(viewer, "line"));
document.getElementById("drawPolygon").addEventListener("click", () => startDraw(viewer, "polygon"));
document.getElementById("measure").addEventListener("click", () => startMeasure(viewer));
document.getElementById("clearDrawings").addEventListener("click", () => { clearAllDrawings(viewer); });

// แสดงค่าพิกัดเมื่อเลื่อนเมาส์
setupCoordinateDisplay(viewer, document.getElementById("coords"));

document.getElementById("rotateLeft").addEventListener("click", () => {
    rotateCamera(viewer, -45); // หมุนซ้าย 45 องศา
});

document.getElementById("rotateRight").addEventListener("click", () => {
    rotateCamera(viewer, 45); // หมุนขวา 45 องศา
});

document.getElementById("resetView").addEventListener("click", () => {
    viewer.camera.flyTo({
        destination: viewer.camera.positionWC,
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0.0
        },
        duration: 1.0
    });
});

const buttons = document.querySelectorAll('#toolbar button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // เอาคลาส active ออกจากทุกปุ่มก่อน
        buttons.forEach(btn => btn.classList.remove('active'));

        // ใส่คลาส active ให้ปุ่มที่ถูกกด
        button.classList.add('active');
    });
});

/**
 * ฟังก์ชันหมุนกล้องไปตาม heading ที่ต้องการ
 */
function rotateCamera(viewer, degrees) {
    const camera = viewer.camera;
    const heading = camera.heading + Cesium.Math.toRadians(degrees);
    const pitch = camera.pitch;
    const roll = camera.roll;

    viewer.camera.flyTo({
        destination: camera.positionWC,
        orientation: { heading, pitch, roll },
        duration: 0.8
    });
}