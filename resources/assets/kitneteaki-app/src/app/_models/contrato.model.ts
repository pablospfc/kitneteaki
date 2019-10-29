export class Contrato {
  id: number;
  id_contrato?: number;
  id_status: number;
  id_locatario: number;
  id_locador: number;
  id_imovel: number;
  id_tipo_contrato: number;
  valor: number;
  primeiro_vencimento: Date;
  dia_vencimento: string;
  data_inicio: Date;
  data_fim: Date;
  inicio_estadia: Date;
  fim_estadia: Date;
  vigencia: number;
  taxa_servico: number;
  dias: number;
  total: number;
  sinal: number;
  referencia: string;
  observacoes: string;
  renovou: boolean;
  chave: string;

}
