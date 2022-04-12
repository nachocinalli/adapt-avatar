import ComponentView from 'core/js/views/componentView';

class AvatarView extends ComponentView {
  preRender() {
    this.onChange = this.onChange.bind(this);
    this.model.on('change:_state', this.onStateChanged.bind(this));
  }

  postRender() {
    this.setReadyStatus();
    this.onStateChanged(this.model, this.model.get('_state'));
  }

  onChange(state) {
    this.model.setState(state);
  }

  onStateChanged(model, state) {
    if (!state) return;

    const htmlContainer = document.querySelector('html');
    this.removeClassesByPrefix(htmlContainer, 'av-');

    if (this.model.get('_splitCSSclasses')) {
      model.get('_state').forEach((className, index) => {

        if (className !== '') {
          htmlContainer.classList.add(`av-${index + 1}-${className}`);
        }
      });
    } else {
      htmlContainer.classList.add(`av-${model.get('_state').join('')}`);
    }
    this.model.checkCompletionStatus();
  }

  removeClassesByPrefix(el, prefix) {
    for (let i = el.classList.length - 1; i >= 0; i--) {
      if (el.classList[i].startsWith(prefix)) {
        el.classList.remove(el.classList[i]);
      }
    }
  }
}

AvatarView.template = 'avatar.jsx';

export default AvatarView;
