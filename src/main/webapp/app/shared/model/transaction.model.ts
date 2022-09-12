import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';
import { IUtilisateur } from '@/shared/model/utilisateur.model';

import { EtatProduit } from '@/shared/model/enumerations/etat-produit.model';
export interface ITransaction {
  id?: number;
  etat?: EtatProduit | null;
  date?: Date | null;
  ligneTransactions?: ILigneTransaction[] | null;
  utilisateur?: IUtilisateur | null;
}

export class Transaction implements ITransaction {
  constructor(
    public id?: number,
    public etat?: EtatProduit | null,
    public date?: Date | null,
    public ligneTransactions?: ILigneTransaction[] | null,
    public utilisateur?: IUtilisateur | null
  ) {}
}
