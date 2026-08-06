import type { Feature, Polygon } from 'geojson';
import { describe, expect, test } from 'vitest';
import * as lib from '../src';
import * as hex from '../src/hex';

test('Library is exported', () => {
  expect(lib).toBeDefined();
});

describe('A5 cell polygon ring closure', () => {
  const testCell = lib.coordToA5([-3.694153, 40.410359], 8);

  test('a5ToPolygonFeature returns a closed ring', () => {
    const feature: Feature<Polygon> = lib.a5ToPolygonFeature(testCell);
    const coords = feature.geometry.coordinates[0];

    expect(coords[0]).toEqual(coords[coords.length - 1]); // El anillo debe estar cerrado
  });

  test('a5ToPolygonGeometry returns a closed ring', () => {
    const geometry: Polygon = lib.a5ToPolygonGeometry(testCell);
    const coords = geometry.coordinates[0];

    expect(coords[0]).toEqual(coords[coords.length - 1]); // El anillo debe estar cerrado
  });
});

describe('Hex variants', () => {
  const coord: [number, number] = [-3.694153, 40.410359];
  const cell = lib.coordToA5(coord, 8);
  const hexCell = hex.a5CellToHex(cell);

  test('a5CellToHex/hexToA5Cell round-trip', () => {
    expect(hex.hexToA5Cell(hexCell)).toEqual(cell);
  });

  test('getA5Resolution matches bigint version', () => {
    expect(hex.getA5Resolution(hexCell)).toBe(lib.getA5Resolution(cell));
  });

  test('coordToA5 returns a cell in hex form', () => {
    expect(hex.coordToA5(coord, 8)).toBe(hexCell);
  });

  test('a5ToCoord matches bigint version', () => {
    expect(hex.a5ToCoord(hexCell)).toEqual(lib.a5ToCoord(cell));
  });

  test('a5ToPointFeature matches bigint version', () => {
    expect(hex.a5ToPointFeature(hexCell)).toEqual(lib.a5ToPointFeature(cell));
  });

  test('a5ToPointGeometry matches bigint version', () => {
    expect(hex.a5ToPointGeometry(hexCell)).toEqual(lib.a5ToPointGeometry(cell));
  });

  test('a5ToPolygonFeature matches bigint version', () => {
    expect(hex.a5ToPolygonFeature(hexCell)).toEqual(
      lib.a5ToPolygonFeature(cell),
    );
  });

  test('a5ToPolygonGeometry matches bigint version', () => {
    expect(hex.a5ToPolygonGeometry(hexCell)).toEqual(
      lib.a5ToPolygonGeometry(cell),
    );
  });

  test('getA5BBox matches bigint version', () => {
    expect(hex.getA5BBox(hexCell)).toEqual(lib.getA5BBox(cell));
  });
});
