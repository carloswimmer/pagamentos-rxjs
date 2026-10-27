import { Component, computed, inject, signal } from '@angular/core';
import { IFuncionario, PagamentosApi } from './pagamentos-api';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-folha-pagamentos',
  imports: [],
  templateUrl: './folha-pagamentos.html',
  styleUrl: './folha-pagamentos.css',
})
export class FolhaPagamentos {
  private readonly _pagamentosApi = inject(PagamentosApi)

  // funcionarios = signal<IFuncionario[]>([]);

  consoleLogs = signal<string[]>(['Sistema pronto para iniciar.']);
  processando = signal(false);

  funcionariosResource = rxResource({
    stream: () => this._pagamentosApi.getFuncionarios()
  })

  funcionarios = computed(() => {
    if (this.funcionariosResource.hasValue()) {
      return this.funcionariosResource.value()
    }

    return []
  })

  funcionariosSelecionados = computed(() => {
    const resource = this.funcionariosResource

    if (resource.hasValue()) {
      return resource.value()?.filter(funcionario => funcionario.selecionado)
    }

    return []
  });

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
