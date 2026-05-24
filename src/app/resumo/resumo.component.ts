import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CantinaService, Produto } from '../services/cantina-service';
import { closeCircleOutline, receiptOutline } from 'ionicons/icons';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class ResumoComponent implements OnInit, OnDestroy {
  carrinho: Produto[] = [];
  private subscription?: Subscription;

  constructor(
    private cantinaService: CantinaService,
    private toastController: ToastController
  ) {
    addIcons({ closeCircleOutline, receiptOutline });
  }

  ngOnInit(): void {
    this.subscription = this.cantinaService.carrinho$.subscribe((carrinho) => {
      this.carrinho = carrinho;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get quantidadeItens(): number {
    return this.carrinho.length;
  }

  get totalPreco(): number {
    return this.cantinaService.calcularTotalPreco();
  }

  async removerTodosItensCarrinho(): Promise<void> {
    this.cantinaService.removerTodos();

    const toast = await this.toastController.create({
      message: 'Carrinho esvaziado',
      duration: 1500,
      position: 'bottom',
      color: 'medium',
    });
    await toast.present();
  }
}
