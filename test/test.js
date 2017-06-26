var expect = chai.expect;

describe('util.calculateArea', function() {
    var coordinates = [[55.76, 37.64]],
        polygonSideLength = 600,
        polygonArea = Math.pow(polygonSideLength, 2);

    before(function (done) {
        ymaps.ready(['util.calculateArea']).then(function () {
            coordinates.push(getCoordinates(coordinates[0], [1, 0], polygonSideLength));
            coordinates.push(getCoordinates(coordinates[1], [0, 1], polygonSideLength));
            coordinates.push(getCoordinates(coordinates[2], [-1, 0], polygonSideLength));
            coordinates.push(getCoordinates(coordinates[3], [0, -1], polygonSideLength));
            coordinates.push(coordinates[0]);
            done();
        })
    });

    it('should calculate ymaps.Polygon area', function() {
        var polygon = new ymaps.Polygon([coordinates]),
        area = ymaps.util.calculateArea(polygon);
        expect(getRelativeErrorPercent(area, polygonArea)).to.be.below(0.5);
    });

    it('should calculate ymaps.Rectangle area', function() {
        var rectangle = new ymaps.Rectangle([coordinates[0], coordinates[2]]),
            area = ymaps.util.calculateArea(rectangle);
        expect(getRelativeErrorPercent(area, polygonArea)).to.be.below(0.5);
    });

    it('should calculate polygon feature area', function () {
        var polygon = {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [coordinates]
                }
            },
            area = ymaps.util.calculateArea(polygon);
        expect(getRelativeErrorPercent(area, polygonArea)).to.be.below(0.5);
    });

    it('should calculate rectangle feature area', function () {
        var polygon = {
                type: 'Feature',
                geometry: {
                    type: 'Rectangle',
                    coordinates: [coordinates[0], coordinates[2]]
                }
            },
            area = ymaps.util.calculateArea(polygon);
        expect(getRelativeErrorPercent(area, polygonArea)).to.be.below(0.5);
    });

    it('should return 0 for lineString', function () {
        var area = ymaps.util.calculateArea({
                type: 'Feature',
                geometry: {
                    coordinates: coordinates,
                    type: 'LineString'
                }
            });
        expect(area).to.be.eql(0);
    });

    it('should return geojson circle area', function () {
        var area = ymaps.util.calculateArea({
                type: 'Feature',
                geometry: {
                    coordinates: coordinates[0],
                    type: 'Circle',
                    radius: 200
                }
            });
        expect(area).to.be.eql(Math.PI * Math.pow(200, 2));
    });

    it('should return circle area', function () {
        var area = ymaps.util.calculateArea(new ymaps.Circle([coordinates[0], 200]));
        expect(area).to.be.eql(Math.PI * Math.pow(200, 2));
    });

    function getCoordinates(basePoint, direction, polygonSideLength) {
        return ymaps.coordSystem.geo.solveDirectProblem(basePoint, direction, polygonSideLength).endPoint;
    }

    function getRelativeErrorPercent(result, standard) {
        return Math.abs((result - standard) / standard) * 100;
    }
});