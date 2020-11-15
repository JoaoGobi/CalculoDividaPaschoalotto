using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalculoDividaPaschoalotto.Models
{
    public class Calculo
    {
        public ConfiguracaoDinamica configuracaoDinamica { get; set; }
        public ValoresDivida valoresDivida { get; set; }

        public decimal calculaJurosSimplesComissao(Calculo calculo)
        {
            decimal jurosSimples = calculo.valoresDivida.valorOriginal * ((calculo.configuracaoDinamica.porcentagemJuros/100) * calculo.valoresDivida.diasAtraso);
            return jurosSimples;
        }

        public decimal calculaJurosCompostoComissao(Calculo calculo)
        {
            decimal retornoJuros = 0;
            for (var i = 0; i < calculo.configuracaoDinamica.quantidadeMaximaParcelas; i++)
            {
                decimal valorJuros = calculaJurosSimplesComissao(calculo);
                calculo.valoresDivida.valorOriginal = calculo.valoresDivida.valorOriginal + valorJuros;
                retornoJuros  += valorJuros;
                
            }
            calculo.valoresDivida.valorOriginal = calculo.valoresDivida.valorOriginal - retornoJuros;
            return retornoJuros;
        }
    }

    public class ConfiguracaoDinamica
    {
        public int quantidadeMaximaParcelas { get; set; }
        public string tipoJuros { get; set; }
        public decimal porcentagemJuros { get; set; }
        public decimal porcentagemComissao { get; set; }
    }

    public class ValoresDivida
    {
        public decimal valorOriginal { get; set; }
        public decimal valorJuros { get; set; }
        public decimal valorFinal { get; set; }
        public decimal valorComissao { get; set; }
        public string dataVencimento { get; set; }
        public int diasAtraso { get; set; }
        public string telefoneColaborador { get; set; }
        public List<ValorCadaParcela> valorCadaParcela { get; set; }
    }

    public class ValorCadaParcela
    {
        public int numeroParcela { get; set; }
        public decimal valorParcela { get; set; }
        public string dataVencimento { get; set; }
    }
}
