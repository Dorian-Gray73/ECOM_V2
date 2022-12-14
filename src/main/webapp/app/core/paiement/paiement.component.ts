import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { ITransaction, Transaction } from '@/shared/model/transaction.model';
import LigneTransactionService from '@/entities/ligne-transaction/ligne-transaction.service';
import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
import { IUtilisateur } from '@/shared/model/utilisateur.model';
import { EtatProduit } from '@/shared/model/enumerations/etat-produit.model';
import AlertService from '@/shared/alert/alert.service';
import TransactionService from '@/entities/transaction/transaction.service';
import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';

@Component({
  filters: {
    formatCardNumber(value) {
      return value ? value.match(/.{1,4}/g).join(' ') : '';
    },
  },
})
export default class Paiement extends Vue {
  // Appel Service
  @Provide('ligneTransactionService')
  private ligneTransactionService = () => new LigneTransactionService();
  @Provide('transactionService')
  private transactionService = () => new TransactionService();
  @Inject('alertService')
  private alertService: () => AlertService;
  @Provide('utilisateurService')
  private utilisateurService = () => new UtilisateurService();
  @Provide('caracteristiqueService')
  private caracteristiqueService = () => new CaracteristiqueService();

  // Data
  public cardNumber = '1234 4353 6367 7288';
  public cardName = 'Test';
  public cardMonth = '09';
  public cardYear = '2024';
  public cardCvv = '0000';
  public minCardMonth = new Date().getMonth();
  public minCardYear = new Date().getFullYear();
  public transaction: ITransaction = new Transaction();
  public utilisateur = null;
  public utilisateurs: IUtilisateur[] = [];
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
            this.$store.getters.panier.forEach(p => {
              // Mise à jour des quantites en bdd
              this.caracteristiqueService()
                .updateCaracteristiqueQuantite(p.id, this.$store.getters.quantite[p.id])
                .then(() => {
                  this.isSaving = false;
                  const lt = {
                    transaction: null,
                    quantite: null,
                    prixUnitaire: null,
                    caracteristique: null,
                  };
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
    // Prochaine fenêtre
    this.$router.push({ name: 'Confirmation' });
  }

  // Format de la carte code de https://stackoverflow.com/a/69599562
  public;

  formatCardNumber(value) {
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
