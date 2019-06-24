import React from 'react';
import PropTypes from 'prop-types';

function DropZone({tag, rect, children}) {
    const content = children;    
    return (
      <div className={tag} style={rect}>
        {content}
      </div>
    );
}

DropZone.propTypes = {
  tag: PropTypes.string.isRequired
}

export default DropZone;