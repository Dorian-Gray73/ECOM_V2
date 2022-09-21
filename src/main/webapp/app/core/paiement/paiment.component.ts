import { Component, Inject, Vue } from 'vue-property-decorator';

@Component({
  filters: {
    formatCardNumber(value) {
      return value ? value.match(/.{1,4}/g).join(' ') : '';
    },
  },
})
export default class Paiement extends Vue {
  public cardNumber = '';
  public cardName = '';
  public cardMonth = '';
  public cardYear = '';
  public cardCvv = '';

  public minCardMonth = new Date().getMonth();
  public minCardYear = new Date().getFullYear();

  public validerPaiement() {
    this.$router.push({ name: 'Confirmation' });
  }

  public formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  }
}
