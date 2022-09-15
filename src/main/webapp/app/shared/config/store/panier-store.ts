import { Module } from 'vuex';

export interface PanierStateStorable {
  panier: Array<any>;
  nbProduit: number;
}

export const defaultPanierState: PanierStateStorable = {
  panier: [],
  nbProduit: 0,
};

export const panierStore: Module<PanierStateStorable, any> = {
  state: { ...defaultPanierState },
  getters: {
    panier: state => state.panier,
    nbProduit: state => state.nbProduit,
  },

  mutations: {
    addProduit(state, produit) {
      state.panier.push(produit);
      state.nbProduit++;
    },
    deleteProduit(state, produit) {
      state.panier.splice(state.panier.indexOf(produit), 1);
      state.nbProduit--;
    },
  },
};
