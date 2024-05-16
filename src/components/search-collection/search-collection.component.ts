import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MtgsdkService } from '../../services/api.service';

@Component({
  selector: 'app-search-collection',
  templateUrl: './search-collection.component.html',
  styleUrls: ['./search-collection.component.css']
})
export class SearchCollectionComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''), 
    block: new FormControl('', Validators.required)  
  });

  cards: any[] = [];

  constructor(private mtgService: MtgsdkService) {}

  ngOnInit(): void {
   
  }

  searchCards(): void {
    console.log("searchCards called"); 
    if (this.form.valid) {
      this.mtgService.queryCards(this.form.value).then(cards => {
        this.cards = []; 
        this.cards = cards;
      }).catch(error => {
        console.error('Erro ao buscar cartas:', error);
      });
    } else {
      alert('Por favor, selecione um bloco.');  
    }
  }

  trackCard(index: number, card: any): any {
    return card.id;
  }
  
}