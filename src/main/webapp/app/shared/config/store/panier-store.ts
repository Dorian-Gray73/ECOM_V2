import { Module } from 'vuex';

export interface PanierStateStorable {
  panier: Array<any>;
  quantite: Array<number>;
  nbProduit: number;
}

export const defaultPanierState: PanierStateStorable = {
  panier: [],
  quantite: [],
  nbProduit: 0,
};

export const panierStore: Module<PanierStateStorable, any> = {
  state: { ...defaultPanierState },
  getters: {
    panier: state => state.panier,
    quantite: state => state.quantite,
    nbProduit: state => state.nbProduit,
  },

  mutations: {
    setPanier(state, panier) {
      this.state.panier = panier;
    },
    setQuantite(state, quantite) {
      this.state.quantite = quantite;
    },
    addProduit(state, produit) {
      let indexProduit = 0;
      let produitExist = false;

      // Vérif si le produit est déjà dans le panier une fois
      state.panier.forEach(produitPanier => {
        if (produitPanier != produit && produitExist == false) {
          indexProduit++;
        } else {
          produitExist = true;
        }
      });

      // Si il n'est pas dans le panier on l'ajoute une première fois sinon on change la quantité
      if (produitExist == false) {
        state.panier.push(produit);
        state.quantite[produit.id] = 1;
      } else {
        state.quantite[produit.id] = state.quantite[produit.id] + 1;
      }
      state.nbProduit++;
      localStorage.setItem('panier', JSON.stringify(state.panier));
      localStorage.setItem('panier', JSON.stringify(state.quantite));
    },
    deleteProduit(state, produit) {
      let indexProduit = 0;
      let produitExist = false;

      // Vérif si le produit est déjà dans le panier une fois
      state.panier.forEach(produitPanier => {
        if (produitPanier != produit && produitExist == false) {
          indexProduit++;
        } else {
          produitExist = true;
        }
      });

      console.log(produitExist);
      console.log(produit);
      if (state.quantite[produit.id] > 1) {
        state.quantite[produit.id]--;
      } else {
        state.panier.splice(state.quantite[produit.id], 1);
        state.panier.splice(state.panier[indexProduit], 1);
      }

      console.log(state.quantite);
      console.log(state.panier);
      state.nbProduit--;
    },
  },
};
