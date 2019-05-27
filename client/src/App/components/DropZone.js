import React from 'react';
import PropTypes from 'prop-types';

class DropZone extends React.Component {
  render() {
    const content = this.props.children;
    const style = {
      left: this.props.rect.left,
      top: this.props.rect.top,
      width: this.props.rect.width,
      height: this.props.rect.height
    };

    return(
      <div className={this.props.tag} style={style}>
        {content}
      </div>
    );
  }  
}

DropZone.propTypes = {
  tag: PropTypes.string.isRequired
}

export default DropZone;