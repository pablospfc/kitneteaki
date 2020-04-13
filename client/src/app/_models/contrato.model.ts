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
  data_inicio: string;
  data_fim: string;
  inicio_estadia: Date;
  fim_estadia: Date;
  vigencia: number;
  dias: number;
  valor_total: number;
  referencia: string;
  observacoes: string;
  renovou: boolean;
  chave: string;

}
