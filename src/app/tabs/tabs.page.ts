import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { restaurant, cart, receiptOutline } from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { CantinaService } from '../services/cantina-service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge],
})
export class TabsPage implements OnInit, OnDestroy {
  quantidadeCarrinho = 0;
  private subscription?: Subscription;

  constructor(private cantinaService: CantinaService) {
    addIcons({ restaurant, cart, receiptOutline });
  }

  ngOnInit(): void {
    this.subscription = this.cantinaService.carrinho$.subscribe((carrinho) => {
      this.quantidadeCarrinho = carrinho.length;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
