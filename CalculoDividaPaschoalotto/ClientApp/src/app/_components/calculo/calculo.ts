export class Calculo {
  configuracaoDinamica: ConfiguracaoDinamica;
  valoresDivida: ValoresDivida;
}

export class ConfiguracaoDinamica {
  quantidadeMaximaParcelas: number;
  tipoJuros: string;
  porcentagemJuros: number;
  porcentagemComissao: number;
}

export class ValoresDivida {
  valorOriginal: number;
  valorJuros: number;
  valorFinal: number;
  dataVencimento: string;
  diasAtraso: number;
  telefoneOrientador: string;
}

