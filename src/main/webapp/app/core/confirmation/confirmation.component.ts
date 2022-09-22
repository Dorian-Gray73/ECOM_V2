import { Component, Vue } from 'vue-property-decorator';
import { computed } from 'vue';

@Component({
  // Vider le panier
  beforeRouteLeave(to, from, next) {
    this.$store.commit('resetPanier');
    next();
  },
})
export default class Confirmation extends Vue {
  /* created() {
    console.log(this.$store.getters.panier);
  }*/

  // Data
  panier = computed(() => this.$store.getters.panier);
  quantite = computed(() => this.$store.getters.quantite);
  public livraison = 4.99;

  public getPrixTotal() {
    let prixTotal = 0;
    this.$store.getters.panier.forEach(cara => {
      prixTotal += cara.produit.prix * this.quantite[cara.id];
    });

    return prixTotal;
  }

  public getPrixTotalLivraison() {
    return this.getPrixTotal() + this.livraison;
  }
}
