import { ITransaction } from '@/shared/model/transaction.model';
import { IUser } from '@/shared/model/user.model';

import { Type } from '@/shared/model/enumerations/type.model';
export interface IUtilisateur {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  courriel?: string | null;
  adresse?: string | null;
  type?: Type | null;
  transactions?: ITransaction[] | null;
  internal_user?: IUser | null;
}

export class Utilisateur implements IUtilisateur {
  constructor(
    public id?: number,
    public nom?: string | null,
    public prenom?: string | null,
    public courriel?: string | null,
    public adresse?: string | null,
    public type?: Type | null,
    public transactions?: ITransaction[] | null,
    public internal_user?: IUser | null
  ) {}
}
