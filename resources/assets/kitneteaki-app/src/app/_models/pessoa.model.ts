export class Pessoa {
  id: number;
  id_estado_civil: number;
  id_tipo_pessoa: number;
  id_genero: number;
  id_categoria_pessoa: number;
  id_nacionalidade: number;
  nome: string;
  cpf_cnpj?: string;
  rg?: string;
  passaporte?: string;
  data_nascimento: Date;
  orgao_expedidor?: string;
  data_emissao?: Date;
  email: string;
  telefone_celular: string;
  whatsapp?: string;
  profissao: string;
}
