import React from 'react';
import PropTypes from 'prop-types';

function DropZone(props) {
    const content = props.children;
    const style = {
      position: 'relative',
      left: props.rect.left,
      top: props.rect.top,
      width: props.rect.width,
      height: props.rect.height
    };
    
    return (
      <div className={props.tag} style={style}>
        {content}
      </div>
    );
}

DropZone.propTypes = {
  tag: PropTypes.string.isRequired
}

export default DropZone;