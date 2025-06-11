const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    baseLayerPicker: false
  });

// เพิ่ม WMS Layer
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