let handler, activeShape, activeShapePoints = [], floatingPoint;
const drawnEntities = []; // เก็บ entity ที่ถูกวาดไว้ทั้งหมด

export function startDraw(viewer, mode) {
    clearHandlers(viewer);
    activeShapePoints = [];

    handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

    handler.setInputAction(function (click) {
        const earthPosition = viewer.scene.pickPosition(click.position);
        if (!earthPosition) return;

        if (activeShapePoints.length === 0) {
            floatingPoint = viewer.entities.add({
                position: earthPosition,
                point: { pixelSize: 6, color: Cesium.Color.RED }
            });
            drawnEntities.push(floatingPoint);
            activeShapePoints.push(earthPosition);

            if (mode === 'line') {
                activeShape = viewer.entities.add({
                    polyline: {
                        positions: new Cesium.CallbackProperty(() => activeShapePoints, false),
                        width: 3,
                        material: Cesium.Color.YELLOW
                    }
                });
                drawnEntities.push(activeShape);
            } else if (mode === 'polygon') {
                activeShape = viewer.entities.add({
                    polygon: {
                        hierarchy: new Cesium.CallbackProperty(() => new Cesium.PolygonHierarchy(activeShapePoints), false),
                        material: Cesium.Color.CYAN.withAlpha(0.4)
                    }
                });
                drawnEntities.push(activeShape);
            }
        }

        activeShapePoints.push(earthPosition);

        if (mode === 'point') {
            const cartographic = Cesium.Cartographic.fromCartesian(earthPosition);
            const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
            const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);

            const entity = viewer.entities.add({
                position: earthPosition,
                point: { pixelSize: 10, color: Cesium.Color.BLUE },
                label: {
                    text: `Lat: ${lat}\nLon: ${lon}`,
                    font: '14px sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    pixelOffset: new Cesium.Cartesian2(0, -20)
                }
            });
            drawnEntities.push(entity);
            clearHandlers(viewer);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function () {
        if (mode === 'line' && activeShapePoints.length >= 2) {
            const entity = viewer.entities.add({
                polyline: {
                    positions: activeShapePoints,
                    width: 3,
                    material: Cesium.Color.RED
                }
            });
            drawnEntities.push(entity);
        } else if (mode === 'polygon' && activeShapePoints.length >= 3) {
            const entity = viewer.entities.add({
                polygon: {
                    hierarchy: activeShapePoints,
                    material: Cesium.Color.ORANGE.withAlpha(0.5)
                }
            });
            drawnEntities.push(entity);
        }
        clearHandlers(viewer);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

export function startMeasure(viewer) {
    clearHandlers(viewer);
    let positions = [];
    let totalLength = 0;
    handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

    handler.setInputAction(function (click) {
        const pos = viewer.scene.pickPosition(click.position);
        if (!pos) return;

        const point = viewer.entities.add({
            position: pos,
            point: { pixelSize: 8, color: Cesium.Color.GREEN }
        });
        drawnEntities.push(point);

        if (positions.length > 0) {
            const last = positions[positions.length - 1];
            const distance = Cesium.Cartesian3.distance(last, pos);
            totalLength += distance;

            const midLabel = viewer.entities.add({
                position: Cesium.Cartesian3.midpoint(last, pos, new Cesium.Cartesian3()),
                label: {
                    text: `${(distance / 1000).toFixed(2)} km`,
                    font: '14px sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -10)
                }
            });
            drawnEntities.push(midLabel);

            const line = viewer.entities.add({
                polyline: {
                    positions: [last, pos],
                    width: 2,
                    material: Cesium.Color.BLUE
                }
            });
            drawnEntities.push(line);
        }

        positions.push(pos);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(() => {
        alert(`📏 รวมระยะทาง: ${(totalLength / 1000).toFixed(2)} km`);
        clearHandlers(viewer);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

export function clearHandlers(viewer) {
    if (handler) handler.destroy();
    if (floatingPoint) viewer.entities.remove(floatingPoint);
    if (activeShape) viewer.entities.remove(activeShape);
    handler = floatingPoint = activeShape = undefined;
    activeShapePoints = [];
}

// ✅ ฟังก์ชันใหม่: ล้างทั้งหมด
export function clearAllDrawings(viewer) {
    drawnEntities.forEach(entity => viewer.entities.remove(entity));
    drawnEntities.length = 0; // clear array
    clearHandlers(viewer);
}

export function setupCoordinateDisplay(viewer, element) {
    viewer.screenSpaceEventHandler.setInputAction((movement) => {
        const cartesian = viewer.scene.pickPosition(movement.endPosition);
        if (cartesian) {
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
            const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
            element.innerText = `Lat: ${lat}°\nLon: ${lon}°`;
        } else {
            element.innerText = '';
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}