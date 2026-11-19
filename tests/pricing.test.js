import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calcularEnvio, aplicarCupon, totalAPagar } from "../src/pricing.js";

describe("calcularEnvio (suite de regresión)", () => {
  test("cobra envío por debajo del umbral", () => {
    assert.equal(calcularEnvio(99999), 12000);
  });
  test("envío gratis exactamente en el umbral (caso límite)", () => {
    assert.equal(calcularEnvio(100000), 0);
  });
  test("envío gratis por encima del umbral", () => {
    assert.equal(calcularEnvio(250000), 0);
  });
  test("rechaza subtotales no positivos", () => {
    assert.throws(() => calcularEnvio(0), RangeError);
  });
});

describe("aplicarCupon", () => {
  test("BIENVENIDA aplica 10%", () => {
    assert.equal(aplicarCupon(100000, "BIENVENIDA"), 90000);
  });
  test("VIP aplica 20% sin importar mayúsculas", () => {
    assert.equal(aplicarCupon(100000, "vip"), 80000);
  });
  test("cupón inválido o ausente no descuenta", () => {
    assert.equal(aplicarCupon(50000, "FALSO"), 50000);
    assert.equal(aplicarCupon(50000), 50000);
  });
});

describe("totalAPagar", () => {
  test("suma envío cuando el total con descuento queda bajo el umbral", () => {
    assert.equal(totalAPagar(100000, "BIENVENIDA"), 102000);
  });
  test("sin cupón y sobre el umbral: envío gratis", () => {
    assert.equal(totalAPagar(100000), 100000);
  });
});
