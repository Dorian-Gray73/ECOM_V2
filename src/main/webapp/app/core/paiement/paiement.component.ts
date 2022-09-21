import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { ITransaction, Transaction } from '@/shared/model/transaction.model';
import LigneTransactionService from '@/entities/ligne-transaction/ligne-transaction.service';
import { ILigneTransaction } from '@/shared/model/ligne-transaction.model';
import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
import { IUtilisateur } from '@/shared/model/utilisateur.model';
import { EtatProduit } from '@/shared/model/enumerations/etat-produit.model';
import AlertService from '@/shared/alert/alert.service';
import TransactionService from '@/entities/transaction/transaction.service';

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

  @Provide('ligneTransactionService')
  private ligneTransactionService = () => new LigneTransactionService();
  @Provide('transactionService')
  private transactionService = () => new TransactionService();
  @Inject('alertService')
  private alertService: () => AlertService;
  @Provide('utilisateurService')
  private utilisateurService = () => new UtilisateurService();

  public transaction: ITransaction = new Transaction();
  public utilisateur = null;
  public utilisateurs: IUtilisateur[] = [];
  public etatProduitValues: string[] = Object.keys(EtatProduit);
  public isSaving = false;

  public validerPaiement() {
    // Récupération de l'utilisateur courant
    this.utilisateurService()
      .retrieveUtilisateurByUserId(this.$store.getters.account.id)
      .then(res => {
        this.isSaving = false;
        this.transaction.etat = EtatProduit.Achete;
        this.transaction.date = new Date();
        this.utilisateur = res.data;
        this.transaction.utilisateur = this.utilisateur;
        this.isSaving = true;

        //Création de la transaction
        this.transactionService()
          .create(this.transaction)
          .then(param => {
            this.transaction = param;
            this.isSaving = false;
            const message = 'Commande n°' + this.transaction.id + ' créée';
            (this.$root as any).$bvToast.toast(message.toString(), {
              toaster: 'b-toaster-top-center',
              title: 'Success',
              variant: 'success',
              solid: true,
              autoHideDelay: 5000,
            });

            // Sauvegarde des lignes

            console.log(this.$store.getters.panier);
            this.$store.getters.panier.forEach(p => {
              const lt = {
                transaction: null,
                quantite: null,
                prixUnitaire: null,
                caracteristique: null,
              };
              console.log(p);
              lt.transaction = this.transaction;
              lt.quantite = this.$store.getters.quantite[p.id];
              lt.prixUnitaire = p.produit.prix;
              lt.caracteristique = p;
              this.ligneTransactionService()
                .create(lt)
                .then(() => {
                  this.isSaving = false;
                })
                .catch(error => {
                  this.isSaving = false;
                  this.alertService().showHttpError(this, error.response);
                });
            });
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService().showHttpError(this, error.response);
          });
      })
      .catch(error => {
        this.isSaving = false;
        this.alertService().showHttpError(this, error.response);
      });

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
