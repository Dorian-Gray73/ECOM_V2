<template>
  <div>
    <h2 id="page-heading" data-cy="CaracteristiqueHeading">
      <span v-text="$t('ecomV2App.caracteristique.home.title')" id="caracteristique-heading">Caracteristiques</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('ecomV2App.caracteristique.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CaracteristiqueCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-caracteristique"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('ecomV2App.caracteristique.home.createLabel')"> Create a new Caracteristique </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && caracteristiques && caracteristiques.length === 0">
      <span v-text="$t('ecomV2App.caracteristique.home.notFound')">No caracteristiques found</span>
    </div>
    <div class="table-responsive" v-if="caracteristiques && caracteristiques.length > 0">
      <table class="table table-striped" aria-describedby="caracteristiques">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.caracteristique.couleur')">Couleur</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.caracteristique.quantite')">Quantite</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.caracteristique.version')">Version</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.caracteristique.produit')">Produit</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="caracteristique in caracteristiques" :key="caracteristique.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CaracteristiqueView', params: { caracteristiqueId: caracteristique.id } }">{{
                caracteristique.id
              }}</router-link>
            </td>
            <td>{{ caracteristique.couleur }}</td>
            <td>{{ caracteristique.quantite }}</td>
            <td>{{ caracteristique.version }}</td>
            <td>
              <div v-if="caracteristique.produit">
                <router-link :to="{ name: 'ProduitView', params: { produitId: caracteristique.produit.id } }">{{
                  caracteristique.produit.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'CaracteristiqueView', params: { caracteristiqueId: caracteristique.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'CaracteristiqueEdit', params: { caracteristiqueId: caracteristique.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(caracteristique)"
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
          id="ecomV2App.caracteristique.delete.question"
          data-cy="caracteristiqueDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-caracteristique-heading" v-text="$t('ecomV2App.caracteristique.delete.question', { id: removeId })">
          Are you sure you want to delete this Caracteristique?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-caracteristique"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCaracteristique()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./caracteristique.component.ts"></script>
