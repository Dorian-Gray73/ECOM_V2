import { Component, Vue, Watch } from 'vue-property-decorator';
import { computed } from 'vue';

@Component
export default class Panier extends Vue {
  public livraison = 4.99;
  public componentKey = 0;
  panier = computed(() => this.$store.getters.panier);

  quantite = computed(() => this.$store.getters.quantite);

  /*created() {
    console.log(this.$store.getters.quantite);
  }*/

  //Forcer l'affichage des produits à se mettre à jour
  public forceRerender() {
    this.componentKey += 1;
  }

  // Supprimer un produit du panier
  public deleteProduit(produit): void {
    this.$store.commit('deleteProduit', produit);
    this.forceRerender();
  }

  // Prix total des produits
  public getPrixTotal() {
    let prixTotal = 0;
    this.$store.getters.panier.forEach(cara => {
      prixTotal += cara.produit.prix * this.quantite[cara.id];
    });

    return prixTotal;
  }

  // Prix total avec livraison
  public getPrixTotalLivraison() {
    return this.getPrixTotal() + this.livraison;
  }

  public commander() {
    // Si on est déjà connecté on va directement au paiement
    if (this.$store.getters.authenticated) {
      this.$router.push({ name: 'Paiement' });
    } else {
      this.$router.push({ name: 'Connexion' });
    }
  }
}
