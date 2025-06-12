import { point, polygon } from '@turf/helpers';
import { getGeoJSONBBox, type BBox } from 'bbox-helper-functions';
import type { Feature, GeoJsonProperties, Point, Polygon } from 'geojson';
import {
  cellToBoundary,
  cellToLonLat,
  getResolution,
  lonLatToCell,
} from 'a5-js';

/**
 * Gets the A5 resolution of a given cell.
 * @param {bigint} cell - The A5 cell for which to retrieve the resolution.
 * @returns {number} The A5 resolution of the cell.
 */
export function getA5Resolution(cell: bigint): number {
  return getResolution(cell);
}

/**
 * Converts a geographic coordinate to an A5 cell at a specified resolution.
 * @param {[number, number]} coord - The geographic coordinate in [longitude, latitude] format.
 * @param {number} resolution - The desired A5 resolution.
 * @returns {bigint} The A5 cell corresponding to the input coordinate.
 */
export function coordToA5(coord: [number, number], resolution: number): bigint {
  // @ts-expect-error . LonLat type not exported by lib
  return lonLatToCell(coord, resolution);
}

/**
 * Converts an A5 cell to a geographic coordinate.
 * @param {bigint} cell - The A5 cell to convert.
 * @returns {[number, number]} The geographic coordinate in [longitude, latitude] format.
 */
export function a5ToCoord(cell: bigint): [number, number] {
  return cellToLonLat(cell) as [number, number];
}

/**
 * Converts an A5 cell to a GeoJSON Point feature.
 * @param {bigint} cell - The A5 cell to convert.
 * @param {GeoJsonProperties} [properties={}] - Optional properties to include in the feature.
 * @returns {Feature<Point>} A GeoJSON Point feature representing the A5 cell.
 */
export function a5ToPointFeature(
  cell: bigint,
  properties: GeoJsonProperties = {},
): Feature<Point> {
  return point(a5ToCoord(cell), properties);
}

/**
 * Converts an A5 cell to a GeoJSON Point geometry.
 * @param {bigint} cell - The A5 cell to convert.
 * @returns {Point} A GeoJSON Point geometry representing the A5 cell.
 */
export function a5ToPointGeometry(cell: bigint): Point {
  return a5ToPointFeature(cell).geometry;
}

/**
 * Converts an A5 cell to a GeoJSON Polygon feature.
 * @param {bigint} cell - The A5 cell to convert.
 * @param {GeoJsonProperties} [properties={}] - Optional properties to include in the feature.
 * @returns {Feature<Polygon>} A GeoJSON Polygon feature representing the A5 cell boundary.
 */
export function a5ToPolygonFeature(
  cell: bigint,
  properties: GeoJsonProperties = {},
): Feature<Polygon> {
  return polygon([cellToBoundary(cell)], properties);
}

/**
 * Converts an A5 cell to a GeoJSON Polygon geometry.
 * @param {bigint} cell - The A5 cell to convert.
 * @returns {Polygon} A GeoJSON Polygon geometry representing the A5 cell boundary.
 */
export function a5ToPolygonGeometry(cell: bigint): Polygon {
  return a5ToPolygonFeature(cell).geometry;
}

/**
 * Calculates the bounding box (BBox) of an A5 cell.
 * @param {bigint} cell - The A5 cell to calculate the BBox for.
 * @returns {BBox} The bounding box of the A5 cell in [minX, minY, maxX, maxY] format.
 */
export function getA5BBox(cell: bigint): BBox {
  return getGeoJSONBBox(a5ToPolygonFeature(cell));
}
