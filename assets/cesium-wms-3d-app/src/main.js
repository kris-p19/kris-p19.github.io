const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

const wmsLayer = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
    url : 'https://geo.dla.go.th/geoserver/dla/ows',
    layers : 'amp_tam',
    parameters : {
        transparent : true,
        format : 'image/png'
    }
}));

viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 3000)
});