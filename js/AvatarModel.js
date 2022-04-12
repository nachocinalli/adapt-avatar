import Adapt from 'core/js/adapt';
import ComponentModel from 'core/js/models/componentModel';

export default class AvatarModel extends ComponentModel {
  init() {
    super.init();

    this.listenTo(Adapt, {
      'app:dataReady': this._onDataReady
    });
  }

  _onDataReady() {
    const av = Adapt.offlineStorage.get('av');
    if (av === undefined) {
      this.setState(Array(this.get('_items').length).fill(''));
    } else {
      this.setState(av?.split(','));
    }
  }

  checkCompletionStatus() {
    const itemsStateComplete = this.get('_items').every(
      (item) => item._selected !== ''
    );
    console.log('itemsStateComplete', itemsStateComplete);
    if (!itemsStateComplete) return;
    this.setCompletionStatus();
  }

  setState(state) {
    const items = this.get('_items') || [];
    items.forEach((item, index) => {
      item._index = index;
      item._selected = state[index];
    });

    this.set({
      _state: state,
      _items: items
    });

    if (state) {
      Adapt.offlineStorage.set('av', state.join());
    }
  }
}
