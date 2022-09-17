import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  //Button retour en haut
  public scrollMeTo(refName) {
    const element = this.$refs[refName];
    let top = null;
    if (element instanceof HTMLElement) {
      top = element.offsetTop;
    }
    window.scrollTo(0, top);
  }
}
