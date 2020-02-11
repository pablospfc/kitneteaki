export class Parcela {
  id: number;
  id_status: number;
  id_tipo_pagamento: number;
  id_contrato: number;
  data_vencimento: Date;
  data_pagamento: Date;
  valor: number;
  valor_pago: number;
  parcela: string;
  competencia: string;
  periodo_inicial: Date;
  periodo_final: Date;

}
