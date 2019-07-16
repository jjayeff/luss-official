import React from 'react';
import { Modal } from 'semantic-ui-react';

const ModalExample = ({ trigger, header, content }) => (
  <Modal
    trigger={trigger}
    header={header}
    content={content}
    actions={['Cancle', { key: 'done', content: 'Done', positive: true }]}
  />
);

export default ModalExample;
