import { ITransaction } from '@/shared/model/transaction.model';
import { ICaracteristique } from '@/shared/model/caracteristique.model';

export interface ILigneTransaction {
  id?: number;
  quantite?: number | null;
  prixUnitaire?: number | null;
  transaction?: ITransaction | null;
  caracteristique?: ICaracteristique | null;
}

export class LigneTransaction implements ILigneTransaction {
  constructor(
    public id?: number,
    public quantite?: number | null,
    public prixUnitaire?: number | null,
    public transaction?: ITransaction | null,
    public caracteristique?: ICaracteristique | null
  ) {}
}
