import Vue from 'vue';
import Component from 'vue-class-component';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import Navbar from '@/core/navbar/navbar.vue';

import '@/shared/config/dayjs';

@Component({
  components: {
    navbar: Navbar,
    'jhi-footer': JhiFooter,
  },
})
export default class App extends Vue {}
