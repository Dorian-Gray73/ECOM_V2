import { IProduit } from '@/shared/model/produit.model';

export interface IModele {
  id?: number;
  modele?: string | null;
  produit?: IProduit | null;
}

export class Modele implements IModele {
  constructor(public id?: number, public modele?: string | null, public produit?: IProduit | null) {}
}
