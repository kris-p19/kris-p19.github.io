const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

const wmsLayer = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
    url : 'https://gis.dmcr.go.th/geoserver/dmcr-wms-public/wms',
    layers : 'area_coral',
    parameters : {
        transparent : true,
        format : 'image/png'
    }
}));

viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 3000)
});