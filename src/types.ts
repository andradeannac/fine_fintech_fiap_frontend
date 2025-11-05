
export type ID = number | string
export interface Usuario { id?: ID; nome: string; email: string; senha?: string }
export interface Recebimento { id?: ID; usuarioId: ID; data: string; descricao: string; valor: number }
export interface Gasto { id?: ID; usuarioId: ID; data: string; descricao: string; valor: number; categoria?: string }
export interface Paged<T> { content: T[] }
