import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CantinaService, Produto } from '../services/cantina-service';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class CardapioComponent implements OnInit {
  listaProdutosLocal: Produto[] = [];

  constructor(
    private cantinaService: CantinaService,
    private toastController: ToastController
  ) {
    addIcons({ addCircleOutline });
  }

  ngOnInit(): void {
    this.listaProdutosLocal = this.cantinaService.listarProdutos();
  }

  async adicionarProduto(produto: Produto): Promise<void> {
    this.cantinaService.adicionarAoCarrinho(produto);

    const toast = await this.toastController.create({
      message: `${produto.nome} adicionado ao carrinho`,
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
