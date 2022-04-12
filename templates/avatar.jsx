import React, { useState, useEffect } from 'react';
import { html, classes, compile, templates } from 'core/js/reactHelpers';

export default function Avatar(props) {
  const { _graphic, _items, onChange } = props;
  const [state, setState] = useState([]);
  const [description, setDescription] = useState([]);
  const handleChange = (pos, choice) => {
    const newState = [...state];
    newState[pos] = choice.value;
    setState(newState);

    onChange(newState);

    const newDescription = [...description];
    newDescription[pos] = choice.description ? choice.description : '';
    setDescription(newDescription);

  };
  useEffect(() => {
    if (_items.length === 0) return;

    if (description.length < _items.length) {
      setDescription(Array(_items.length).fill(''));
    }
    const _state = _items.map((item) => item._selected);
    setState(_state);
    //
  }, [_items]);

  return (
    <div className="component__inner text__inner">
      <templates.header {...props} />
      <div className={classes(['component__widget', 'avatar__widget'])}>
        <div className="avatar__preview">
          <div className="avatar__preview-inner" style={_graphic && _graphic.src ? { backgroundImage: `url(${_graphic.src})` } : { backgroundImage: 'none' }}></div>
        </div>
        <div className="avatar__items">
          {_items.map(({ title, _choices, _classes, _index }) => (
            <div
              className={classes(['avatar__item', _classes])}
              key={_index}
              data-index={_index}
            >
              <div className="avatar__item-title">
                <h4>{html(compile(title))}</h4>
              </div>
              <div className="avatar__item-choices">
                {_choices.map((choice, _i) => (
                  <div className="avatar__item-choices-choice" key={_i}>
                    <input
                      onChange={(e) => handleChange(_index, choice)}
                      type="radio"
                      name={`g-${_index}`}
                      value={choice.value}
                      id={`input-${_index}-${_i}`}
                      checked={state[_index] === choice.value}
                    />
                    <label htmlFor={`input-${_index}-${_i}`}>
                        {html(compile(choice.text))}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="avatar__item-description">
          {description.map((item, index) => (
            <div key={index}>{html(compile(item || ''))}</div>
          ))}
        </div>

      </div>
    </div>
  );
}
