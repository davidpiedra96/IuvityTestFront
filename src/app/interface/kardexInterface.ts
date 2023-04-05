
export type lKardex = KardexInterface[]

export interface KardexInterface {
  indice: number
  codigo_producto: number
  fecha: string
  descripcion: string
  vlr_unitario?: number
  entrada_cant?: number
  entrada_valor?: number
  salida_cant?: number
  salida_valor?: number
  saldo_cant?: number
  saldo_valor?: number
  codigo_factura_venta?: number
  codigo_factura_compra?: number
}

export interface RequestConsultarKardexProducto{
  mes: number,
  anio: number,
  codigo_producto: number
}

export interface RequestIngresarCompraProducto {
  codigo_producto: string
  fecha: string
  descripcion: string
  entrada_cant: string
  entrada_valor: string
  codigo_proveedor: string
}

export interface RequestDevolucionCompra {
  codigo_producto: string
  fecha: string
  descripcion: string
  entrada_cant: string
  valor_compra: string
  codigo_factura_compra: string
}

export interface RequestVentaProducto {
  codigo_producto: string
  fecha: string
  descripcion: string
  salida_cant: string
  codigo_cliente: string
  tipo_tarjeta: string
  numero_tarjeta: string
  nombre_titular: string
}

export interface RequestDevolucionVenta {
  codigo_producto: string
  fecha: string
  descripcion: string
  salida_cant: string
  codigo_factura_venta: string
}

export interface RequestIngresarStock {
  nombre: string
  referencia: string
  unidad: string
  codigo_proveedor: string
  fecha_factura: string
  valor_total: string
  cantidad: string
  descripcion: string
}

