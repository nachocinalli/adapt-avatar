import Adapt from 'core/js/adapt';
import AvatarView from './AvatarView';
import AvatarModel from './AvatarModel';

export default Adapt.register('avatar', {
  model: AvatarModel,
  view: AvatarView
});
