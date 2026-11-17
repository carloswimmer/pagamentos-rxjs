import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, delay, map, Observable, of, tap, throwError } from 'rxjs';

export type StatusPagamento = 'pendente' | 'processando' | 'pago' | 'erro';

export interface IFuncionario {
  id: number;
  nome: string;
  selecionado: boolean;
  status: StatusPagamento;
}

export interface IPagamentoResponse {
  mensagem: string;
  funcionario: Partial<IFuncionario>;
}

@Injectable({
  providedIn: 'root',
})
export class PagamentosApi {
  getFuncionarios(): Observable<IFuncionario[]> {
    const tempoAleatorio = Math.floor(Math.random() * 4000) + 1000;
    console.log(tempoAleatorio);

    if (tempoAleatorio > 4000) {
      return of([
        {
          id: 0,
          nome: 'Ana Clara',
        },
        {
          id: 1,
          nome: 'Luiz Carlos',
        },
        {
          id: 2,
          nome: 'Rodrigo Silva',
        },
        {
          id: 3,
          nome: 'Ricardo Alves',
        },
      ]).pipe(
        delay(tempoAleatorio),
        map((funcionarios) =>
          funcionarios.map((funcionario) => ({
            ...funcionario,
            selecionado: true,
            status: 'pendente',
          })),
        ),
      );
    } else {
      const simulacaoHttpError = new HttpErrorResponse({
        error: {
          mensagem: 'Ocorreu um erro sistêmico ao recuperar funcionários.',
          codigoInterno: 'ERR_FUNC_500',
        },
        status: 500,
        statusText: 'Internal Server Error',
        url: 'https://pagamentos-api.com/funcionarios',
      });

      return of(true).pipe(
        delay(2000),
        concatMap(() => throwError(() => simulacaoHttpError)),
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 500) {
            return throwError(() => errorResponse.error.mensagem);
          }

          return throwError(() => 'Ocorreu um erro ao carregar lista de funcionários.');
        }),
      );
    }
  }

  pagarFuncionario(funcionario: IFuncionario): Observable<IPagamentoResponse> {
    const tempoAleatorio = Math.floor(Math.random() * 4000) + 1000;

    const responseSucesso: IPagamentoResponse = {
      mensagem: '✅ Funcionário pago com sucesso!',
      funcionario: {
        id: funcionario.id,
        nome: funcionario.nome,
      },
    };

    return of(responseSucesso).pipe(
      delay(tempoAleatorio),
      map((pagamentoResponse) => {
        const { id, nome } = pagamentoResponse.funcionario;

        if (id === 2) {
          throw {
            mensagem: `❌ Erro ao processar pagamento de ${nome}`,
            funcionario: {
              id,
              nome,
            },
          };
        }

        return responseSucesso;
      }),
    );
  }
}
