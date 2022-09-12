import { ICaracteristique } from '@/shared/model/caracteristique.model';
import { IImage } from '@/shared/model/image.model';
import { IModele } from '@/shared/model/modele.model';

export interface IProduit {
  id?: number;
  nom?: string | null;
  prix?: number | null;
  lienImage?: string | null;
  marque?: string | null;
  progressif?: boolean | null;
  caracteristiques?: ICaracteristique[] | null;
  images?: IImage[] | null;
  modeles?: IModele[] | null;
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public nom?: string | null,
    public prix?: number | null,
    public lienImage?: string | null,
    public marque?: string | null,
    public progressif?: boolean | null,
    public caracteristiques?: ICaracteristique[] | null,
    public images?: IImage[] | null,
    public modeles?: IModele[] | null
  ) {
    this.progressif = this.progressif ?? false;
  }
}
