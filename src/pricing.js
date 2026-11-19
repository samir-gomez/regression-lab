// Lógica de checkout de una tienda en línea (valores en COP).
export const ENVIO_GRATIS_DESDE = 100000;
export const COSTO_ENVIO = 12000;

const CUPONES = { BIENVENIDA: 0.1, VIP: 0.2 };

export function calcularEnvio(subtotal) {
  if (subtotal <= 0) throw new RangeError("El subtotal debe ser positivo");
  return subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_ENVIO;
}

export function aplicarCupon(subtotal, cupon) {
  const porcentaje = CUPONES[String(cupon ?? "").toUpperCase()] ?? 0;
  return Math.round(subtotal * (1 - porcentaje));
}

export function totalAPagar(subtotal, cupon) {
  const conDescuento = aplicarCupon(subtotal, cupon);
  return conDescuento + calcularEnvio(conDescuento);
}
