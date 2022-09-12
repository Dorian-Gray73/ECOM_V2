/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import LigneTransactionComponent from '@/entities/ligne-transaction/ligne-transaction.vue';
import LigneTransactionClass from '@/entities/ligne-transaction/ligne-transaction.component';
import LigneTransactionService from '@/entities/ligne-transaction/ligne-transaction.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('LigneTransaction Management Component', () => {
    let wrapper: Wrapper<LigneTransactionClass>;
    let comp: LigneTransactionClass;
    let ligneTransactionServiceStub: SinonStubbedInstance<LigneTransactionService>;

    beforeEach(() => {
      ligneTransactionServiceStub = sinon.createStubInstance<LigneTransactionService>(LigneTransactionService);
      ligneTransactionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<LigneTransactionClass>(LigneTransactionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          ligneTransactionService: () => ligneTransactionServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      ligneTransactionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllLigneTransactions();
      await comp.$nextTick();

      // THEN
      expect(ligneTransactionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.ligneTransactions[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      ligneTransactionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(ligneTransactionServiceStub.retrieve.callCount).toEqual(1);

      comp.removeLigneTransaction();
      await comp.$nextTick();

      // THEN
      expect(ligneTransactionServiceStub.delete.called).toBeTruthy();
      expect(ligneTransactionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
