# Yandex Maps API area calculation plugin.

`util.calculateArea` module allows to calculate the area of polygons, rectangles and circles.
Note that plugin works only with geodesic geometries.

## Usage

1. Put module source code ([util.calculateArea.min.js](https://github.com/yandex/mapsapi-area/blob/master/build/util.calculateArea.min.js)) on your CDN.

2. Load both [Yandex Maps JS API 2.1](http://api.yandex.com/maps/doc/jsapi/) and module source code by adding following code into &lt;head&gt; section of your page
    ```html
    <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <!-- Change my.cdn.tld to your CDN host name -->
    <script src="http://my.cdn.tld/util.calculateArea.min.js" type="text/javascript"></script>
    ```

3. Wait for both API and module loaded
    ```js
    ymaps.ready(['util.calculateArea']).then(function () {
        var myPolygon = new ymaps.Polygon(someCoordinates);
        // You can calculate area of any type of ymaps.GeoObject.
        var area = ymaps.util.calculateArea(myPolygon);

        // Or you can calculate area of GeoJson feature.
        var areaFromJson = ymaps.util.calculateArea({
                type: 'Feature',
                geometry: {
                    type: 'Rectangle',
                    coordinates: someRectangleCoordinates
                }
            });
    });
    ```
    
Note: module definition uses standard Yandex Maps API namespace 'ymaps'.
If you are using custom namespace, you need to fork and rebuild module for your needs.

## util.calculateArea(geoObject)
geoObject descibed using one of following formats:
<ul>
    <li>ymaps.GeoObject</li>
    <li>ymaps.Polygon</li>
    <li>ymaps.Rectangle</li>
    <li>ymaps.Circle</li>
    <li>GeoJson Polygon</li>
    <li>GeoJson Rectangle</li>
    <li>GeoJson Circle</li>
</ul>

Returns geoObject area in square meters.

## For contributors

If you want to make a pull-request, run tests and check code style first.

    ```js
    npm install
    npm run-script lint
    npm test
    ```
