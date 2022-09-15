import { Store } from 'vuex';

export default class PanierService {
  constructor(private store: Store<any>) {}

  public get panierProduits(): Array<any> {
    return this.store.getters.panier;
  }

  public get nbProduit(): number {
    return this.store.getters.nbProduit;
  }

  public addProduit(produit): void {
    return this.store.commit('addProduit', produit);
  }

  public deleteProduit(produit): void {
    return this.store.commit('deleteProduit', produit);
  }
}
