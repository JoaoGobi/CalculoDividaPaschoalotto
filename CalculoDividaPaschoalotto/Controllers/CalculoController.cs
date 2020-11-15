using CalculoDividaPaschoalotto.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalculoDividaPaschoalotto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculoController : ControllerBase
    {
        [HttpPost, Route("CalculaDivida")]
        public Calculo CalculaDivida(Calculo calculo)
        {
            if (calculo != null)
            {
                calculo.valoresDivida.diasAtraso = (DateTime.Now - Convert.ToDateTime(calculo.valoresDivida.dataVencimento)).Days;
                if (calculo.configuracaoDinamica.tipoJuros == "Simples")
                {
                    calculo.valoresDivida.valorJuros = new Calculo().calculaJurosSimplesComissao(calculo);
                }
                else
                {
                    calculo.valoresDivida.valorJuros = new Calculo().calculaJurosCompostoComissao(calculo);
                }
                calculo.valoresDivida.valorFinal = calculo.valoresDivida.valorOriginal + calculo.valoresDivida.valorJuros;
                calculo.valoresDivida.valorComissao = (calculo.valoresDivida.valorFinal) * (calculo.configuracaoDinamica.porcentagemComissao / 100);
                calculo.valoresDivida.telefoneColaborador = "(19) 8854-4854";

                //CALCULANDO VALOR DAS PARCELAS
                calculo.valoresDivida.valorCadaParcela = new List<ValorCadaParcela>();

                var valorCadaParcela = calculo.valoresDivida.valorFinal / calculo.configuracaoDinamica.quantidadeMaximaParcelas;

                for(var i = 0; i < calculo.configuracaoDinamica.quantidadeMaximaParcelas; i++)
                {
                    var x = new ValorCadaParcela();

                    x.numeroParcela = i + 1;
                    x.valorParcela = valorCadaParcela;
                    x.dataVencimento = DateTime.Now.AddDays(1).AddMonths(i).ToString("dd/MM/yyyy");

                    calculo.valoresDivida.valorCadaParcela.Add(x);
                }
            }
            return calculo;
        }
    }
}
