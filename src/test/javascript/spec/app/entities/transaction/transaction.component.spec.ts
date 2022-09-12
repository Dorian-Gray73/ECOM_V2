/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import TransactionComponent from '@/entities/transaction/transaction.vue';
import TransactionClass from '@/entities/transaction/transaction.component';
import TransactionService from '@/entities/transaction/transaction.service';
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
  describe('Transaction Management Component', () => {
    let wrapper: Wrapper<TransactionClass>;
    let comp: TransactionClass;
    let transactionServiceStub: SinonStubbedInstance<TransactionService>;

    beforeEach(() => {
      transactionServiceStub = sinon.createStubInstance<TransactionService>(TransactionService);
      transactionServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TransactionClass>(TransactionComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          transactionService: () => transactionServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      transactionServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTransactions();
      await comp.$nextTick();

      // THEN
      expect(transactionServiceStub.retrieve.called).toBeTruthy();
      expect(comp.transactions[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      transactionServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(transactionServiceStub.retrieve.callCount).toEqual(1);

      comp.removeTransaction();
      await comp.$nextTick();

      // THEN
      expect(transactionServiceStub.delete.called).toBeTruthy();
      expect(transactionServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
