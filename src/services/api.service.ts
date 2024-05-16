import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class MtgsdkService {
  private baseUrl = 'https://api.magicthegathering.io/v1';

  async findCard(cardId: number): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/cards/${cardId}`);
    return response.data.card;
  }

  async findSet(setId: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/sets/${setId}`);
    return response.data.set;
  }

  async queryCards(params: any): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/cards`, { params });
    return response.data.cards;
  }

  async querySets(params: any): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/sets`, { params });
    return response.data.sets;
  }


}
