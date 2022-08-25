import React, { useState, useEffect } from 'react';
import { html, classes, compile, templates } from 'core/js/reactHelpers';

export default function Avatar(props) {
  const { _items, onSelectItem } = props;
  const [_itemSelected, setItemSelected] = useState({});
  const [_hasPose, setHasPose] = useState(false);
  const handleSelectItem = (itemIndex) => {
    const item = _items.find(item => item._index === itemIndex);
    setItemSelected(null);
    onSelectItem(item);
  };
  const handleSelectItemPose = (index, itemIndex) => {
    const item = _items.find(item => item._index === itemIndex);
    item._selected = false;
    item._poseIndex = index;
    item._pose.forEach(pose => {
      pose._selected = item._poseIndex === pose._index;

    });
    onSelectItem(item);
  };
  useEffect(() => {
    const itemSelected = _items.find(item => item._selected);
    if (itemSelected) {
      setItemSelected(itemSelected);
      itemSelected._pose.filter(pose => !pose._isHidden).length > 1 ? setHasPose(true) : setHasPose(false);

    }
  }, [_items]);
  return (
    <div className="component__inner text__inner">
      <templates.header {...props} />
      <div className={classes(['component__widget', 'avatar__widget'])}>

        <div className="avatar__items">
          {_items.map(({ title, ariaLabel, _pose, _classes, _selected, _index }) => (
            <div
              className={classes(['avatar__item', _selected && 'is-selected', _classes])}
              key={_index}
              data-index={_index}
            >
              <div className="avatar__item-inner">
                <button aria-label={ariaLabel} onClick={() => handleSelectItem(_index)} disabled={_selected} className={_selected ? 'is-disabled' : ''}>
                  {_pose && _pose.length > 0 &&
                  <templates.image {..._pose[0]._graphic}
                    classNamePrefixes={['avatar__item']}
                    attributionClassNamePrefixes={['component', 'avatar']}/>
                  }
                  <div className="avatar__item-title">{html(compile(title))}</div>
                  {_selected && <div className="avatar__item-icon icon icon-tick"></div>}
                </button>

              </div>
            </div>
          ))}
        </div>
        <div className="avatar__preview">
          <div className="avatar__preview-inner">

            {_itemSelected && _itemSelected._pose && _itemSelected._pose.length > 0 &&
            <div className='avatar__preview-selected'><templates.image {..._itemSelected._pose[_itemSelected._poseIndex]._graphic}
              classNamePrefixes={['avatar__preview']}
              attributionClassNamePrefixes={['component', 'avatar']}
            />
            <div className='avatar__preview-description'> {_itemSelected?._description}</div>
            {_itemSelected && _hasPose &&
              <div className="avatar__item-poses">
                {_itemSelected._pose.map(({ title, ariaLabel, _graphic, _selected, _isHidden, _index, _itemIndex }) => (
                  <div className={classes(['avatar__item-pose', _selected && 'is-selected', _isHidden && 'is-hidden'])} key={_index}>

                    <button aria-label={ariaLabel} onClick={() => handleSelectItemPose(_index, _itemIndex)} disabled={_selected} className={_selected ? 'is-disabled' : ''}>
                      <templates.image {..._graphic}
                        classNamePrefixes={['avatar__item-pose']}
                        attributionClassNamePrefixes={['component', 'avatar']}
                      />

                      <div className="avatar__item-pose-text">{html(compile(title))}</div>
                      {_selected && <div className="avatar__item-pose-icon icon icon-tick"></div>}
                    </button>
                  </div>
                ))}
              </div>
            }

            </div>
            }
          </div>
        </div>

      </div>
    </div>
  );
}
