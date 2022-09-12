<template>
  <div>
    <h2 id="page-heading" data-cy="LigneTransactionHeading">
      <span v-text="$t('ecomV2App.ligneTransaction.home.title')" id="ligne-transaction-heading">Ligne Transactions</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('ecomV2App.ligneTransaction.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'LigneTransactionCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-ligne-transaction"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('ecomV2App.ligneTransaction.home.createLabel')"> Create a new Ligne Transaction </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && ligneTransactions && ligneTransactions.length === 0">
      <span v-text="$t('ecomV2App.ligneTransaction.home.notFound')">No ligneTransactions found</span>
    </div>
    <div class="table-responsive" v-if="ligneTransactions && ligneTransactions.length > 0">
      <table class="table table-striped" aria-describedby="ligneTransactions">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.ligneTransaction.quantite')">Quantite</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.ligneTransaction.prixUnitaire')">Prix Unitaire</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.ligneTransaction.transaction')">Transaction</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ligneTransaction in ligneTransactions" :key="ligneTransaction.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'LigneTransactionView', params: { ligneTransactionId: ligneTransaction.id } }">{{
                ligneTransaction.id
              }}</router-link>
            </td>
            <td>{{ ligneTransaction.quantite }}</td>
            <td>{{ ligneTransaction.prixUnitaire }}</td>
            <td>
              <div v-if="ligneTransaction.transaction">
                <router-link :to="{ name: 'TransactionView', params: { transactionId: ligneTransaction.transaction.id } }">{{
                  ligneTransaction.transaction.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'LigneTransactionView', params: { ligneTransactionId: ligneTransaction.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'LigneTransactionEdit', params: { ligneTransactionId: ligneTransaction.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(ligneTransaction)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="ecomV2App.ligneTransaction.delete.question"
          data-cy="ligneTransactionDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-ligneTransaction-heading" v-text="$t('ecomV2App.ligneTransaction.delete.question', { id: removeId })">
          Are you sure you want to delete this Ligne Transaction?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-ligneTransaction"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeLigneTransaction()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./ligne-transaction.component.ts"></script>
