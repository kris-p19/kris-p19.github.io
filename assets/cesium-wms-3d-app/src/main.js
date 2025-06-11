const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    baseLayerPicker: false
});

const wmsLayer = viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapServiceImageryProvider({
        url: 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi',
        layers: 'MODIS_Terra_CorrectedReflectance_TrueColor',
        parameters: {
            service: 'WMS',
            version: '1.1.1',
            request: 'GetMap',
            styles: '',
            format: 'image/png',
            transparent: true
        },
        credit: 'NASA Global Imagery Browse Services'
    })
);

viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(100.5018, 13.7563, 1500000)
});