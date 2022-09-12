/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ModeleDetailComponent from '@/entities/modele/modele-details.vue';
import ModeleClass from '@/entities/modele/modele-details.component';
import ModeleService from '@/entities/modele/modele.service';
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
  describe('Modele Management Detail Component', () => {
    let wrapper: Wrapper<ModeleClass>;
    let comp: ModeleClass;
    let modeleServiceStub: SinonStubbedInstance<ModeleService>;

    beforeEach(() => {
      modeleServiceStub = sinon.createStubInstance<ModeleService>(ModeleService);

      wrapper = shallowMount<ModeleClass>(ModeleDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { modeleService: () => modeleServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundModele = { id: 123 };
        modeleServiceStub.find.resolves(foundModele);

        // WHEN
        comp.retrieveModele(123);
        await comp.$nextTick();

        // THEN
        expect(comp.modele).toBe(foundModele);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundModele = { id: 123 };
        modeleServiceStub.find.resolves(foundModele);

        // WHEN
        comp.beforeRouteEnter({ params: { modeleId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.modele).toBe(foundModele);
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
