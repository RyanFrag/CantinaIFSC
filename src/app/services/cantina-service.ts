import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Produto {
  nome: string;
  preco: number;
  categoria: string;
}

@Injectable({
  providedIn: 'root',
})
export class CantinaService {
  private listaProdutos: Produto[] = [
    { nome: 'Pastel', preco: 8, categoria: 'Salgado' },
    { nome: 'Suco', preco: 5, categoria: 'Bebida' },
    { nome: 'Refri', preco: 5, categoria: 'Bebida' },
    { nome: 'Sanduíche', preco: 12, categoria: 'Lanche' },
  ];

  private carrinhoSubject = new BehaviorSubject<Produto[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  listarProdutos(): Produto[] {
    return this.listaProdutos;
  }

  listarCarrinho(): Produto[] {
    return this.carrinhoSubject.getValue();
  }

  adicionarAoCarrinho(produto: Produto): void {
    const carrinho = [...this.carrinhoSubject.getValue(), produto];
    this.carrinhoSubject.next(carrinho);
  }

  removerDoCarrinho(produto: Produto): void {
    const carrinho = [...this.carrinhoSubject.getValue()];
    const index = carrinho.indexOf(produto);

    if (index > -1) {
      carrinho.splice(index, 1);
      this.carrinhoSubject.next(carrinho);
    }
  }

  quantidadeItensNoCarrinho(): number {
    return this.carrinhoSubject.getValue().length;
  }

  removerTodos(): void {
    this.carrinhoSubject.next([]);
  }

  calcularTotalPreco(): number {
    return this.carrinhoSubject
      .getValue()
      .reduce((total, produto) => total + produto.preco, 0);
  }
}
