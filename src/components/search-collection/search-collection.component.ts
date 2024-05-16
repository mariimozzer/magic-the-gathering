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

  sets: any[] = [];
  cards: any[] = [];
  loading: boolean = false; 


  constructor(private mtgService: MtgsdkService) {}

  ngOnInit(): void {}

  searchSets(): void {
    if (this.form.valid) {
      this.loading = true;
      this.mtgService.querySets(this.form.value).then(sets => {
        this.sets = sets.map(set => ({
          ...set,
          releaseDate: this.formatDate(set.releaseDate)
}));
      this.loading = false;

      }).catch(error => {
        console.error('Erro ao buscar sets:', error);
        this.loading = false;
      });
    } else {
      alert('Por favor, selecione um bloco.');
    }
  }

  selectSet(setId: string): void {
    this.loading = true;
    this.mtgService.getCreaturesFromBooster(setId).then(cards => {
      this.cards = cards;
      this.loading = false;
      this.sets = []; 
    }).catch(error => {
      console.error('Erro ao buscar cartas:', error);
      this.loading = false;
    });
  }

  trackBySetId(index: number, set: any): any {
    return set.code;
  }

  trackByCardId(index: number, card: any): any {
    return card.id;
  }

  private formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
}