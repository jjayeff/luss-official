import React from 'react';
import { Popup } from 'semantic-ui-react';

const PopupExample = ({ content, trigger, position, hoverable, on }) => (
  <Popup
    content={content}
    trigger={trigger}
    hoverable={hoverable}
    on={on}
    position={position ? position : 'top left'}
  />
);

export default PopupExample;
