const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(), // ใช้แบบนี้แทน
  baseLayerPicker: false
});

const wmsLayer = viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapServiceImageryProvider({
      url: 'https://gis.dmcr.go.th/geoserver/dmcr-wms-public/wms',
      layers: 'area_coral',
      parameters: {
        service: 'WMS',
        format: 'image/png',
        transparent: true
      }
    })
);