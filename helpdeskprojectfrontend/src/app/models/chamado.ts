export interface ChamadoDTO {
  id?: number;
  titulo: string;
  observacoes: string;
  prioridade: number; // 0,1,2
  status: number;     // 0,1,2
  tecnico: number;    // id do técnico
  cliente: number;    // id do cliente
  // campos opcionais para exibição:
  nomeTecnico?: string;
  nomeCliente?: string;
  dataCriacao?: string;
}
