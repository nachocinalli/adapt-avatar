import ComponentView from 'core/js/views/componentView';

class AvatarView extends ComponentView {
  preRender() {
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  postRender() {
    this.$('.avatar__item__image-container').imageready(() => {
      this.setReadyStatus();
      this.model.checkCompletionStatus();
    });
  }

  onSelectItem(item) {
    this.model.setSelectedItem(item);
  }
}

AvatarView.template = 'avatar.jsx';

export default AvatarView;
