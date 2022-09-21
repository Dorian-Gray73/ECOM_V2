import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from '@/core/navbar/navbar.vue';

import '@/shared/config/dayjs';
import Footer from '@/core/footer/footer.vue';
import { Inject, Provide } from 'vue-property-decorator';
import ProduitService from '@/entities/produit/produit.service';
import TransactionService from '@/entities/transaction/transaction.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  components: {
    navbar: Navbar,
    footerComponent: Footer,
  },
})
export default class App extends Vue {
  /*public isFetching = false;

  @Provide('transactionService')
  private transactionService = () => new TransactionService();
  @Inject('alertService')
  private alertService: () => AlertService;

  public mounted(): void {
    this.checkTransaction();
  }*/
  // Récupération de la commande en cours si il y en a une
  /* public checkTransaction(){
    this.isFetching = true;
    this.transactionService()
      .getTransactionEnCours()
      .then(
        res => {
          if(res.data != null){
            console.log(res.data)
            this.$store.commit('setTransaction', res.data);
          }
          console.log(this.$store.getters.transaction)
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }*/
}
