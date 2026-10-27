import { Component, computed, inject, signal } from '@angular/core';
import { from, tap, concatMap, map, catchError, of, defaultIfEmpty, endWith, finalize, delay, mergeMap, filter, switchMap } from 'rxjs';
import { IFuncionario, IPagamentoResponse, PagamentosApi } from './pagamentos-api';

@Component({
  selector: 'app-folha-pagamentos',
  imports: [],
  templateUrl: './folha-pagamentos.html',
  styleUrl: './folha-pagamentos.css',
})
export class FolhaPagamentos {
  private readonly _pagamentosApi = inject(PagamentosApi)

  ngOnInit() {
    this._pagamentosApi.getFuncionarios().pipe(
      map(funcionarios => funcionarios[0]),
      filter(funcionario => funcionario !== undefined),
      switchMap(funcionario => this._pagamentosApi.pagarFuncionario(funcionario)),
    )
      .subscribe({
        next: (response) => console.log(response.mensagem, response.funcionario.nome),
        error: (err: IPagamentoResponse) => console.error(err.mensagem, err.funcionario.nome)
      });
  }

  funcionarios = signal<IFuncionario[]>([]);

  consoleLogs = signal<string[]>(['Sistema pronto para iniciar.']);
  processando = signal(false);

  funcionariosSelecionados = computed(() =>
    this.funcionarios().filter(f => f.selecionado)
  );

  toggleSelecao(id: number) {

  }

  iniciarPagamentos() {

  }

  private atualizarStatus(id: number, novoStatus: IFuncionario['status']) {

  }

  private addLog(msg: string) {

  }

  private resetarStatus() {

  }
}
