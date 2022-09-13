import { IImage } from '@/shared/model/image.model';
import { IProduit } from '@/shared/model/produit.model';
import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';

export interface ICaracteristique {
  id?: number;
  couleur?: string | null;
  couleurHexa?: string | null;
  quantite?: number | null;
  lienImage?: string | null;
  images?: IImage[] | null;
  produit?: IProduit | null;
  ligneTransaction?: ILigneTransaction | null;
}

export class Caracteristique implements ICaracteristique {
  constructor(
    public id?: number,
    public couleur?: string | null,
    public couleurHexa?: string | null,
    public quantite?: number | null,
    public lienImage?: string | null,
    public images?: IImage[] | null,
    public produit?: IProduit | null,
    public ligneTransaction?: ILigneTransaction | null
  ) {}
}
