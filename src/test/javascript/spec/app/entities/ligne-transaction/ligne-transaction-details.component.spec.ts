/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import LigneTransactionDetailComponent from '@/entities/ligne-transaction/ligne-transaction-details.vue';
import LigneTransactionClass from '@/entities/ligne-transaction/ligne-transaction-details.component';
import LigneTransactionService from '@/entities/ligne-transaction/ligne-transaction.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('LigneTransaction Management Detail Component', () => {
    let wrapper: Wrapper<LigneTransactionClass>;
    let comp: LigneTransactionClass;
    let ligneTransactionServiceStub: SinonStubbedInstance<LigneTransactionService>;

    beforeEach(() => {
      ligneTransactionServiceStub = sinon.createStubInstance<LigneTransactionService>(LigneTransactionService);

      wrapper = shallowMount<LigneTransactionClass>(LigneTransactionDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { ligneTransactionService: () => ligneTransactionServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundLigneTransaction = { id: 123 };
        ligneTransactionServiceStub.find.resolves(foundLigneTransaction);

        // WHEN
        comp.retrieveLigneTransaction(123);
        await comp.$nextTick();

        // THEN
        expect(comp.ligneTransaction).toBe(foundLigneTransaction);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLigneTransaction = { id: 123 };
        ligneTransactionServiceStub.find.resolves(foundLigneTransaction);

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
