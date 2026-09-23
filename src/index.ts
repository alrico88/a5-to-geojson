import { featureCollection, point, polygon } from '@turf/helpers';
import {
  cellToBoundary,
  cellToLonLat,
  getResolution,
  lineStringToCells,
  lonLatToCell,
  polygonToCells,
  uncompact,
} from 'a5-js';
import { type BBox, getGeoJSONBBox } from 'bbox-helper-functions';
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
  LineString,
  Point,
  Polygon,
  Position,
} from 'geojson';

type A5Degrees = number & { __brand: 'Degrees' };
type A5LonLat = [longitude: A5Degrees, latitude: A5Degrees] & {
  __brand: 'LonLat';
};

function toA5LonLat([longitude, latitude]: Position): A5LonLat {
  return [longitude as A5Degrees, latitude as A5Degrees] as A5LonLat;
}

function toA5LineString(coordinates: LineString['coordinates']): A5LonLat[] {
  return coordinates.map(toA5LonLat);
}

function toA5Polygon(coordinates: Polygon['coordinates']): A5LonLat[][] {
  return coordinates.map((ring) => ring.map(toA5LonLat));
}

function toGeometry<G extends Geometry>(featureOrGeometry: Feature<G> | G): G {
  return featureOrGeometry.type === 'Feature'
    ? featureOrGeometry.geometry
    : featureOrGeometry;
}

function toPolygonFeatureCollection(
  cells: Iterable<bigint>,
  properties: GeoJsonProperties = {},
): FeatureCollection<Polygon> {
  return featureCollection(
    [...cells].map((cell) => a5ToPolygonFeature(cell, properties)),
  );
}

/**
 * Gets the A5 resolution of a given cell.
 * @param cell - The A5 cell for which to retrieve the resolution.
 * @returns The A5 resolution of the cell.
 */
export function getA5Resolution(cell: bigint): number {
  return getResolution(cell);
}

/**
 * Converts a geographic coordinate to an A5 cell at a specified resolution.
 * @param coord - The geographic coordinate in [longitude, latitude] format.
 * @param resolution - The desired A5 resolution.
 * @returns The A5 cell corresponding to the input coordinate.
 */
export function coordToA5(coord: [number, number], resolution: number): bigint {
  return lonLatToCell(toA5LonLat(coord), resolution);
}

/**
 * Converts an A5 cell to a geographic coordinate.
 * @param cell - The A5 cell to convert.
 * @returns The geographic coordinate in [longitude, latitude] format.
 */
export function a5ToCoord(cell: bigint): [number, number] {
  const [longitude, latitude] = cellToLonLat(cell);
  return [longitude, latitude];
}

/**
 * Converts an A5 cell to a GeoJSON Point feature.
 * @param cell - The A5 cell to convert.
 * @param properties - Optional properties to include in the feature.
 * @returns A GeoJSON Point feature representing the A5 cell.
 */
export function a5ToPointFeature(
  cell: bigint,
  properties: GeoJsonProperties = {},
): Feature<Point> {
  return point(a5ToCoord(cell), properties);
}

/**
 * Converts an A5 cell to a GeoJSON Point geometry.
 * @param cell - The A5 cell to convert.
 * @returns A GeoJSON Point geometry representing the A5 cell.
 */
export function a5ToPointGeometry(cell: bigint): Point {
  return a5ToPointFeature(cell).geometry;
}

/**
 * Converts an A5 cell to a GeoJSON Polygon feature.
 * @param cell - The A5 cell to convert.
 * @param properties - Optional properties to include in the feature.
 * @returns A GeoJSON Polygon feature representing the A5 cell boundary.
 */
export function a5ToPolygonFeature(
  cell: bigint,
  properties: GeoJsonProperties = {},
): Feature<Polygon> {
  return polygon([cellToBoundary(cell)], properties);
}

/**
 * Converts an A5 cell to a GeoJSON Polygon geometry.
 * @param cell - The A5 cell to convert.
 * @returns A GeoJSON Polygon geometry representing the A5 cell boundary.
 */
export function a5ToPolygonGeometry(cell: bigint): Polygon {
  return a5ToPolygonFeature(cell).geometry;
}

/**
 * Calculates the bounding box (BBox) of an A5 cell.
 * @param cell - The A5 cell to calculate the BBox for.
 * @returns The bounding box of the A5 cell in [minX, minY, maxX, maxY] format.
 */
export function getA5BBox(cell: bigint): BBox {
  return getGeoJSONBBox(a5ToPolygonFeature(cell));
}

/**
 * Converts a GeoJSON Polygon to a FeatureCollection of A5 cells rendered as polygons.
 * By default, includes cells whose centers fall inside it; `overlapping` also
 * includes cells that overlap the polygon boundary.
 * @param polygon - The GeoJSON Polygon feature or geometry to convert.
 * @param resolution - The desired A5 resolution.
 * @param properties - Optional properties to include in each feature.
 * @param options - Controls whether cells must contain the polygon or overlap it.
 * @returns A GeoJSON FeatureCollection of Polygon features.
 */
export function polygonToA5(
  polygon: Feature<Polygon> | Polygon,
  resolution: number,
  properties: GeoJsonProperties = {},
  options: { containment?: 'center' | 'overlapping' } = {},
): FeatureCollection<Polygon> {
  const geometry = toGeometry(polygon);
  return toPolygonFeatureCollection(
    uncompact(
      polygonToCells(toA5Polygon(geometry.coordinates), resolution, options),
      resolution,
    ),
    properties,
  );
}

/**
 * Converts a GeoJSON LineString to a FeatureCollection of the A5 cells
 * it passes through, rendered as polygons.
 * @param line - The GeoJSON LineString feature or geometry to convert.
 * @param resolution - The desired A5 resolution.
 * @param properties - Optional properties to include in each feature.
 * @returns A GeoJSON FeatureCollection of Polygon features.
 */
export function lineStringToA5(
  line: Feature<LineString> | LineString,
  resolution: number,
  properties: GeoJsonProperties = {},
): FeatureCollection<Polygon> {
  const geometry = toGeometry(line);
  return toPolygonFeatureCollection(
    lineStringToCells(toA5LineString(geometry.coordinates), resolution),
    properties,
  );
}
