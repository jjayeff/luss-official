import React from 'react';
import { Popup } from 'semantic-ui-react';

const PopupExample = ({ content, trigger, position, hoverable }) => (
  <Popup
    content={content}
    trigger={trigger}
    hoverable={hoverable}
    position={position ? position : 'top left'}
  />
);

export default PopupExample;
