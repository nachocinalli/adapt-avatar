import Adapt from 'core/js/adapt';
import ComponentModel from 'core/js/models/componentModel';
import offlineStorage from 'core/js/offlineStorage';
export default class AvatarModel extends ComponentModel {
  init() {
    super.init();

    this.listenTo(Adapt, {
      'app:dataReady': this._onDataReady
    });
  }

  _onDataReady() {
    const av = offlineStorage.get('av');
    this.setUpItems();
    if (av === undefined) return;

    const avatarState = av.split('|').map(Number);

    if (avatarState.length > 0) {
      const itemIndex = avatarState[0] || this.get('_initialSelectedItem');
      const poseIndex = avatarState[1] || 0;
      const item = this.get('_items')[itemIndex];
      item._selected = true;
      item._poseIndex = poseIndex;
      this.setSelectedItem(item);
    }
  }

  setUpItems() {
    const items = this.get('_items') || [];
    const _initialSelectedItem = this.get('_initialSelectedItem');
    items.forEach((item, index) => {
      item._index = index;
      item._selected = item._index === _initialSelectedItem;
      item._poseIndex = 0;
      item._pose.forEach((pose, index) => {
        pose._index = index;
        pose._itemIndex = item._index;
        pose._selected = pose._index === 0 && item._selected;
      });
    });
    this.set({ _items: items, _forceRender: true });

  }

  checkCompletionStatus() {
    const itemsStateComplete = this.get('_items').some(item => item._selected);

    if (!itemsStateComplete) return;
    this.setCompletionStatus();
  }

  getSelectedItem() {
    return this.get('_items').find(item => item._selected);
  }

  getPoseByIndex(itemIndex, poseIndex) {
    return this.get('_items')[itemIndex]._pose[poseIndex];
  }

  getPoseByName(itemIndex, poseName) {
    let pose = this.get('_items')[itemIndex]._pose.find(pose => pose.name === poseName);
    if (!pose) {
      console.log("Can't find pose with name: " + poseName);
      const selectedItem = this.getSelectedItem();
      pose = selectedItem._pose[selectedItem._poseIndex];
    }
    return pose;
  }

  setSelectedItem(item) {
    this.get('_items').forEach((_item, index) => {
      _item._selected = _item._index === item._index;

      if (_item._index === item._index) {
        _item._poseIndex = item._poseIndex;
        _item._pose.forEach((pose, index) => {
          pose._selected = item._poseIndex === pose._index;
        });
      }

    });

    this.set({ _items: this.get('_items'), _forceRender: !this.get('_forceRender') });
    this.saveAvatar();
    this.checkCompletionStatus();
    Adapt.trigger('avatar:changed', this);

  }

  saveAvatar() {
    const avatarSelected = this.getSelectedItem();
    const avatarState = avatarSelected._index + '|' + avatarSelected._poseIndex;
    const avatarStateClass = avatarSelected._index + '' + avatarSelected._poseIndex;
    offlineStorage.set('av', avatarState);
    const htmlContainer = document.querySelector('html');
    this.removeClassesByPrefix(htmlContainer, 'av-');
    htmlContainer.classList.add(`av-${avatarStateClass}`);

  }

  removeClassesByPrefix(el, prefix) {
    for (let i = el.classList.length - 1; i >= 0; i--) {
      if (el.classList[i].startsWith(prefix)) {
        el.classList.remove(el.classList[i]);
      }
    }
  }
}
