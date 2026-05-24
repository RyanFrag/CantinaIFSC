import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CantinaService, Produto } from '../services/cantina-service';
import { closeCircleOutline, cartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  listaCarrinho: Produto[] = [];
  private subscription?: Subscription;

  constructor(
    private cantinaService: CantinaService,
    private toastController: ToastController
  ) {
    addIcons({ closeCircleOutline, cartOutline });
  }

  ngOnInit(): void {
    this.subscription = this.cantinaService.carrinho$.subscribe((carrinho) => {
      this.listaCarrinho = carrinho;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async removerDoCarrinho(produto: Produto): Promise<void> {
    this.cantinaService.removerDoCarrinho(produto);

    const toast = await this.toastController.create({
      message: `${produto.nome} removido do carrinho`,
      duration: 1500,
      position: 'bottom',
      color: 'warning',
    });
    await toast.present();
  }
}
