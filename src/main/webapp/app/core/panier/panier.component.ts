import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Panier extends Vue {
  created() {
    console.log(this.$store.getters.panier);
  }
  public deleteProduit(produit): void {
    return this.$store.commit('deleteProduit', produit);
  }
}
