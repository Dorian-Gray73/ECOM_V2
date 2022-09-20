import { Component, Inject, Vue } from 'vue-property-decorator';

@Component
export default class Paiement extends Vue {
  public validerPaiement() {
    this.$router.push({ name: 'Confirmation' });
  }
}
