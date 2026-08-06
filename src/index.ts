import { point, polygon } from '@turf/helpers';
import {
  cellToBoundary,
  cellToLonLat,
  getResolution,
  lonLatToCell,
} from 'a5-js';
import { type BBox, getGeoJSONBBox } from 'bbox-helper-functions';
import type { Feature, GeoJsonProperties, Point, Polygon } from 'geojson';

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
  return lonLatToCell(coord as Parameters<typeof lonLatToCell>[0], resolution);
}

/**
 * Converts an A5 cell to a geographic coordinate.
 * @param cell - The A5 cell to convert.
 * @returns The geographic coordinate in [longitude, latitude] format.
 */
export function a5ToCoord(cell: bigint): [number, number] {
  return cellToLonLat(cell) as [number, number];
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
