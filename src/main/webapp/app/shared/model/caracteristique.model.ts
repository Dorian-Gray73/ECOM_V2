import { IImage } from '@/shared/model/image.model';
import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';
import { IProduit } from '@/shared/model/produit.model';

export interface ICaracteristique {
  id?: number;
  couleur?: string | null;
  quantite?: number | null;
  lienImage?: string | null;
  images?: IImage[] | null;
  ligneTransaction?: ILigneTransaction | null;
  produit?: IProduit | null;
}

export class Caracteristique implements ICaracteristique {
  constructor(
    public id?: number,
    public couleur?: string | null,
    public quantite?: number | null,
    public lienImage?: string | null,
    public images?: IImage[] | null,
    public ligneTransaction?: ILigneTransaction | null,
    public produit?: IProduit | null
  ) {}
}
