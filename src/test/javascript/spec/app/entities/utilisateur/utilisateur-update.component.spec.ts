/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import UtilisateurUpdateComponent from '@/entities/utilisateur/utilisateur-update.vue';
import UtilisateurClass from '@/entities/utilisateur/utilisateur-update.component';
import UtilisateurService from '@/entities/utilisateur/utilisateur.service';

import TransactionService from '@/entities/transaction/transaction.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Utilisateur Management Update Component', () => {
    let wrapper: Wrapper<UtilisateurClass>;
    let comp: UtilisateurClass;
    let utilisateurServiceStub: SinonStubbedInstance<UtilisateurService>;

    beforeEach(() => {
      utilisateurServiceStub = sinon.createStubInstance<UtilisateurService>(UtilisateurService);

      wrapper = shallowMount<UtilisateurClass>(UtilisateurUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          utilisateurService: () => utilisateurServiceStub,
          alertService: () => new AlertService(),

          transactionService: () =>
            sinon.createStubInstance<TransactionService>(TransactionService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.utilisateur = entity;
        utilisateurServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(utilisateurServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.utilisateur = entity;
        utilisateurServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(utilisateurServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundUtilisateur = { id: 123 };
        utilisateurServiceStub.find.resolves(foundUtilisateur);
        utilisateurServiceStub.retrieve.resolves([foundUtilisateur]);

        // WHEN
        comp.beforeRouteEnter({ params: { utilisateurId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.utilisateur).toBe(foundUtilisateur);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
