/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import LigneTransactionUpdateComponent from '@/entities/ligne-transaction/ligne-transaction-update.vue';
import LigneTransactionClass from '@/entities/ligne-transaction/ligne-transaction-update.component';
import LigneTransactionService from '@/entities/ligne-transaction/ligne-transaction.service';

import TransactionService from '@/entities/transaction/transaction.service';

import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';
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
  describe('LigneTransaction Management Update Component', () => {
    let wrapper: Wrapper<LigneTransactionClass>;
    let comp: LigneTransactionClass;
    let ligneTransactionServiceStub: SinonStubbedInstance<LigneTransactionService>;

    beforeEach(() => {
      ligneTransactionServiceStub = sinon.createStubInstance<LigneTransactionService>(LigneTransactionService);

      wrapper = shallowMount<LigneTransactionClass>(LigneTransactionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          ligneTransactionService: () => ligneTransactionServiceStub,
          alertService: () => new AlertService(),

          transactionService: () =>
            sinon.createStubInstance<TransactionService>(TransactionService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          caracteristiqueService: () =>
            sinon.createStubInstance<CaracteristiqueService>(CaracteristiqueService, {
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
        comp.ligneTransaction = entity;
        ligneTransactionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneTransactionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.ligneTransaction = entity;
        ligneTransactionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(ligneTransactionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLigneTransaction = { id: 123 };
        ligneTransactionServiceStub.find.resolves(foundLigneTransaction);
        ligneTransactionServiceStub.retrieve.resolves([foundLigneTransaction]);

        // WHEN
        comp.beforeRouteEnter({ params: { ligneTransactionId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.ligneTransaction).toBe(foundLigneTransaction);
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
