import { IImage } from '@/shared/model/image.model';
import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';
import { IProduit } from '@/shared/model/produit.model';

export interface ICaracteristique {
  id?: number;
  couleur?: string | null;
  quantite?: number | null;
  images?: IImage[] | null;
  ligneTransactions?: ILigneTransaction[] | null;
  produit?: IProduit | null;
}

export class Caracteristique implements ICaracteristique {
  constructor(
    public id?: number,
    public couleur?: string | null,
    public quantite?: number | null,
    public images?: IImage[] | null,
    public ligneTransactions?: ILigneTransaction[] | null,
    public produit?: IProduit | null
  ) {}
}
