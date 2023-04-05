export type lProductoInterface = ProductoInterface[]

export interface ProductoInterface {
  codigo: number
  nombre: string
  referencia: string
  unidad: string
  vlr_unitario: number
  saldo_cant: number
}
