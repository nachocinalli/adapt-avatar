import components from 'core/js/components';
import AvatarView from './AvatarView';
import AvatarModel from './AvatarModel';

export default components.register('avatar', {
  model: AvatarModel,
  view: AvatarView
});
