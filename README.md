# a5-to-geojson

A lightweight utility library for converting A5 cells to GeoJSON features and geometries, along with additional tools for working with the [A5 geoindexing system](https://a5geo.org/).

## Features

- Convert A5 cells to GeoJSON Point and Polygon features or geometries.
- Convert coordinates to A5 cells and vice versa.
- Convert GeoJSON Polygon and LineString features to a FeatureCollection of A5 cell polygons.
- Calculate the bounding box (BBox) of an A5 cell.
- Get the resolution of an A5 cell.

## Installation

Install the library:

```bash
npm install a5-to-geojson
```

or

```bash
pnpm add a5-to-geojson
```

## Usage

Here is an example of how to use the library:

```javascript
import {
  coordToA5,
  a5ToCoord,
  a5ToPointFeature,
  a5ToPolygonFeature,
} from 'a5-to-geojson';

// Convert coordinates to an A5 cell
const coord = [-3.6886, 40.4201]; // Madrid [longitude, latitude]
const resolution = 9;
const a5Cell = coordToA5(coord, resolution);
console.log('A5 Cell:', a5Cell);

// Convert an A5 cell back to coordinates
const backToCoord = a5ToCoord(a5Cell);
console.log('Coordinates:', backToCoord);

// Convert an A5 cell to a GeoJSON Point feature
const pointFeature = a5ToPointFeature(a5Cell);
console.log('GeoJSON Point Feature:', pointFeature);

// Convert an A5 cell to a GeoJSON Polygon feature
const polygonFeature = a5ToPolygonFeature(a5Cell);
console.log('GeoJSON Polygon Feature:', polygonFeature);
```

### Hex support

Cell identifiers can also be used in hexadecimal form via the `a5-to-geojson/hex` entry point, which exposes the same functions with hex cells as input and output:

```javascript
import { coordToA5, a5ToPolygonFeature } from 'a5-to-geojson/hex';

const hexCell = coordToA5([-3.6886, 40.4201], 9);
console.log('A5 Cell (hex):', hexCell);

const polygon = a5ToPolygonFeature(hexCell);
console.log('GeoJSON Polygon Feature:', polygon);

// Convert between representations
import { a5CellToHex, hexToA5Cell } from 'a5-to-geojson/hex';
const bigintCell = hexToA5Cell(hexCell);
const backToHex = a5CellToHex(bigintCell);
```

## Documentation

See [DOCS](./docs/README.md)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Built on top of the [a5-js](https://www.npmjs.com/package/a5-js) library.
- GeoJSON utilities powered by [@turf/helpers](https://turfjs.org/).
- Made by [Alberto Rico](https://alrico.es)
