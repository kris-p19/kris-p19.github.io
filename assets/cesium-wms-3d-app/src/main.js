Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNmYxNjI0ZS1mNzU4LTQzZTMtYjU1Ni04OGJiZjhmNWMxY2UiLCJpZCI6MzExMzA0LCJpYXQiOjE3NDk2NDUwMDd9.4sMNJxu7V9T1ZxF-1oclDemUKICc1T1aqRZvYId16gE';
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(), // ใช้แบบนี้แทน
  baseLayerPicker: false
});

const wmsLayer = viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapServiceImageryProvider({
      url: 'https://geo.dla.go.th/geoserver/dla/ows',
      layers: 'amp_tam',
      parameters: {
        service: 'WMS',
        format: 'image/png',
        transparent: true
      }
    })
);