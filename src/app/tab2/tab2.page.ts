import { Component } from '@angular/core';
import { CarrinhoComponent } from '../carrinho/carrinho.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CarrinhoComponent],
})
export class Tab2Page {
  constructor() {}
}
