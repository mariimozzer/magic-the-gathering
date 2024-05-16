import { Component, OnInit } from '@angular/core';
import { MtgsdkService } from '../../services/api.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class  CardsComponent implements OnInit {
  cards: any[] = [];

  constructor(private mtgService: MtgsdkService) {}

  ngOnInit() {
    // this.mtgService.queryCards({ supertypes: 'legendary', subtypes: 'goblin' }).then(cards => {
      this.mtgService.queryCards({ name: 'Archangel Avacyn' }).then(cards => {

      this.cards = cards;
    });
  }
}
