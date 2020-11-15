import { Component } from '@angular/core';
import { myHttp } from '../../_services/myHttp';
import { Calculo, ConfiguracaoDinamica, ValoresDivida } from './calculo';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
})
export class CalculoComponent {
  //VARIAVEIS
  tipoJurosArray: string[] = ["Composto", "Simples"];
  tipoJuros: string;
  quantidadeParcelas = 1;
  porcentagemJuros = 0;
  porcentagemComissao = 0;

  valorDivida = 1;
  dataVencimento: string;
  valorJuros: number;
  valorFinal: number;
  valorComissao: number;
  diasAtraso: number
  telefoneColaborador: string;
  valorFinalParcelas: Object;


  //ERRORS
  mensagem = "";

  constructor(private modalService: NgbModal, private http: myHttp) { }

  ngOnInit() {
    console.log(this.quantidadeParcelas);
  }

  calcularDivida(content) {
    const calculo = new Calculo();
    calculo.configuracaoDinamica = new ConfiguracaoDinamica();
    calculo.valoresDivida = new ValoresDivida();

    //Valores Dinâmicos
    calculo.configuracaoDinamica.quantidadeMaximaParcelas = this.quantidadeParcelas;
    calculo.configuracaoDinamica.tipoJuros = this.tipoJuros;
    calculo.configuracaoDinamica.porcentagemJuros = this.porcentagemJuros;
    calculo.configuracaoDinamica.porcentagemComissao = this.porcentagemComissao;

    //Valores divida
    calculo.valoresDivida.valorOriginal = this.valorDivida;
    calculo.valoresDivida.dataVencimento = this.dataVencimento;

    this.validaCampos();

    if (this.mensagem === "") {
      this.http.post("/api/Calculo/CalculaDivida", calculo).then((data) => {
        let valoresDivida = data["model"]["valoresDivida"];
        if (data["status"] === "success") {
          this.diasAtraso = valoresDivida.diasAtraso;
          this.valorJuros = valoresDivida.valorJuros;
          this.valorComissao = valoresDivida.valorComissao;
          this.valorFinal = valoresDivida.valorFinal;
          this.dataVencimento = valoresDivida.dataVencimento;
          this.valorFinalParcelas = valoresDivida.valorCadaParcela;
          this.telefoneColaborador = valoresDivida.telefoneColaborador;

          //CHAMA MODAL
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
        } else {
          this.mensagem = "Erro ao calcular dívida";
        }
      });
    }
  }

  validaCampos() {
    this.mensagem = "";
    if (this.quantidadeParcelas === null || typeof this.quantidadeParcelas === "undefined") {
      this.mensagem = "A quantidade das parcelas só aceita valores numéricos!";
      this.quantidadeParcelas = 1;
    } else if (this.quantidadeParcelas < 1) {
      this.mensagem = "A quantidade das parcelas só aceita valores maiores que 0!";
      this.quantidadeParcelas = 1;
    } else if (this.porcentagemComissao === null || typeof this.porcentagemComissao === "undefined") {
      this.mensagem = "A porcentagem de comissão só aceita valores numéricos!";
      this.porcentagemComissao = 0;
    } else if (this.porcentagemJuros === null || typeof this.porcentagemJuros === "undefined") {
      this.mensagem = "A porcentagem de juros só aceita valores numéricos!";
      this.porcentagemJuros = 0;
    } else if (this.valorDivida === null || typeof this.valorDivida === "undefined") {
      this.mensagem = "O valor da dívida só aceita valores numéricos!";
      this.valorDivida = 1;
    } else if (this.valorDivida < 1) {
      this.mensagem = "O valor da dívida só aceita valores maiores que 0!";
      this.valorDivida = 1;
    } else if (this.dataVencimento === null || typeof this.dataVencimento === "undefined") {
      this.mensagem = "Data de vencimento inválida!";
      this.valorDivida = 1;
    } else if (this.tipoJuros === null || typeof this.tipoJuros === "undefined" || this.tipoJuros === "") {
      this.mensagem = "Tipo de juros inválido!";
    }
  }
}


