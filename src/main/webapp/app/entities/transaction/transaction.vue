<template>
  <div>
    <h2 id="page-heading" data-cy="TransactionHeading">
      <span v-text="$t('ecomV2App.transaction.home.title')" id="transaction-heading">Transactions</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('ecomV2App.transaction.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'TransactionCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-transaction"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('ecomV2App.transaction.home.createLabel')"> Create a new Transaction </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && transactions && transactions.length === 0">
      <span v-text="$t('ecomV2App.transaction.home.notFound')">No transactions found</span>
    </div>
    <div class="table-responsive" v-if="transactions && transactions.length > 0">
      <table class="table table-striped" aria-describedby="transactions">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.transaction.etat')">Etat</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.transaction.date')">Date</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.transaction.utilisateur')">Utilisateur</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TransactionView', params: { transactionId: transaction.id } }">{{ transaction.id }}</router-link>
            </td>
            <td v-text="$t('ecomV2App.EtatProduit.' + transaction.etat)">{{ transaction.etat }}</td>
            <td>{{ transaction.date }}</td>
            <td>
              <div v-if="transaction.utilisateur">
                <router-link :to="{ name: 'UtilisateurView', params: { utilisateurId: transaction.utilisateur.id } }">{{
                  transaction.utilisateur.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TransactionView', params: { transactionId: transaction.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TransactionEdit', params: { transactionId: transaction.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(transaction)"
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
        ><span id="ecomV2App.transaction.delete.question" data-cy="transactionDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-transaction-heading" v-text="$t('ecomV2App.transaction.delete.question', { id: removeId })">
          Are you sure you want to delete this Transaction?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-transaction"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeTransaction()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./transaction.component.ts"></script>
