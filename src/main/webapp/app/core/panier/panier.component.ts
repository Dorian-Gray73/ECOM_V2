import { Component, Vue, Watch } from 'vue-property-decorator';
import { computed } from 'vue';

@Component
export default class Panier extends Vue {
  public livraison = 4.99;
  public componentKey = 0;

  public forceRerender() {
    this.componentKey += 1;
  }

  /* created() {
     console.log(this.$store.getters.panier);
   }*/

  panier = computed(() => this.$store.getters.panier);

  quantite = computed(() => this.$store.getters.quantite);

  // Supprimer un produit du panier
  public deleteProduit(produit): void {
    this.$store.commit('deleteProduit', produit);
    this.forceRerender();
  }

  public getPrixTotal() {
    let prixTotal = 0;
    this.$store.getters.panier.forEach(produit => {
      prixTotal = produit.prix * this.quantite[produit.id];
    });

    return prixTotal;
  }

  public getPrixTotalLivraison() {
    return this.getPrixTotal() + this.livraison;
  }

  public commander() {
    this.$router.push({ name: 'Connexion' });
  }
}
