import { ICaracteristique } from '@/shared/model/caracteristique.model';
import { IProduit } from '@/shared/model/produit.model';

export interface IImage {
  id?: number;
  lienImage?: string | null;
  caracteristique?: ICaracteristique | null;
  produit?: IProduit | null;
}

export class Image implements IImage {
  constructor(
    public id?: number,
    public lienImage?: string | null,
    public caracteristique?: ICaracteristique | null,
    public produit?: IProduit | null
  ) {}
}
