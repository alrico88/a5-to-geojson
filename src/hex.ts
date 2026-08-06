import { hexToU64, u64ToHex } from 'a5-js';
import type { BBox } from 'bbox-helper-functions';
import type { Feature, GeoJsonProperties, Point, Polygon } from 'geojson';
import {
  a5ToCoord as a5ToCoordBigInt,
  a5ToPointFeature as a5ToPointFeatureBigInt,
  a5ToPointGeometry as a5ToPointGeometryBigInt,
  a5ToPolygonFeature as a5ToPolygonFeatureBigInt,
  a5ToPolygonGeometry as a5ToPolygonGeometryBigInt,
  coordToA5 as coordToA5BigInt,
  getA5BBox as getA5BBoxBigInt,
  getA5Resolution as getA5ResolutionBigInt,
} from './index';

/**
 * An A5 cell identifier expressed as a hexadecimal string.
 */
export type HexCell = string;

/**
 * Converts a hex A5 cell identifier to its bigint representation.
 * @param hex - The hex A5 cell identifier to convert.
 * @returns The A5 cell in bigint form.
 */
export function hexToA5Cell(hex: HexCell): bigint {
  return hexToU64(hex);
}

/**
 * Converts a bigint A5 cell to its hex representation.
 * @param cell - The A5 cell to convert.
 * @returns The A5 cell in hex form.
 */
export function a5CellToHex(cell: bigint): HexCell {
  return u64ToHex(cell);
}

/**
 * Gets the A5 resolution of a given cell.
 * @param cell - The A5 cell for which to retrieve the resolution, in hex form.
 * @returns The A5 resolution of the cell.
 */
export function getA5Resolution(cell: HexCell): number {
  return getA5ResolutionBigInt(hexToA5Cell(cell));
}

/**
 * Converts a geographic coordinate to an A5 cell at a specified resolution.
 * @param coord - The geographic coordinate in [longitude, latitude] format.
 * @param resolution - The desired A5 resolution.
 * @returns The A5 cell corresponding to the input coordinate, in hex form.
 */
export function coordToA5(
  coord: [number, number],
  resolution: number,
): HexCell {
  return a5CellToHex(coordToA5BigInt(coord, resolution));
}

/**
 * Converts an A5 cell to a geographic coordinate.
 * @param cell - The A5 cell to convert, in hex form.
 * @returns The geographic coordinate in [longitude, latitude] format.
 */
export function a5ToCoord(cell: HexCell): [number, number] {
  return a5ToCoordBigInt(hexToA5Cell(cell));
}

/**
 * Converts an A5 cell to a GeoJSON Point feature.
 * @param cell - The A5 cell to convert, in hex form.
 * @param properties - Optional properties to include in the feature.
 * @returns A GeoJSON Point feature representing the A5 cell.
 */
export function a5ToPointFeature(
  cell: HexCell,
  properties: GeoJsonProperties = {},
): Feature<Point> {
  return a5ToPointFeatureBigInt(hexToA5Cell(cell), properties);
}

/**
 * Converts an A5 cell to a GeoJSON Point geometry.
 * @param cell - The A5 cell to convert, in hex form.
 * @returns A GeoJSON Point geometry representing the A5 cell.
 */
export function a5ToPointGeometry(cell: HexCell): Point {
  return a5ToPointGeometryBigInt(hexToA5Cell(cell));
}

/**
 * Converts an A5 cell to a GeoJSON Polygon feature.
 * @param cell - The A5 cell to convert, in hex form.
 * @param properties - Optional properties to include in the feature.
 * @returns A GeoJSON Polygon feature representing the A5 cell boundary.
 */
export function a5ToPolygonFeature(
  cell: HexCell,
  properties: GeoJsonProperties = {},
): Feature<Polygon> {
  return a5ToPolygonFeatureBigInt(hexToA5Cell(cell), properties);
}

/**
 * Converts an A5 cell to a GeoJSON Polygon geometry.
 * @param cell - The A5 cell to convert, in hex form.
 * @returns A GeoJSON Polygon geometry representing the A5 cell boundary.
 */
export function a5ToPolygonGeometry(cell: HexCell): Polygon {
  return a5ToPolygonGeometryBigInt(hexToA5Cell(cell));
}

/**
 * Calculates the bounding box (BBox) of an A5 cell.
 * @param cell - The A5 cell to calculate the BBox for, in hex form.
 * @returns The bounding box of the A5 cell in [minX, minY, maxX, maxY] format.
 */
export function getA5BBox(cell: HexCell): BBox {
  return getA5BBoxBigInt(hexToA5Cell(cell));
}
