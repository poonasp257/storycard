import React from 'react';

class DropZone extends React.Component {
  render() {
    const content = this.props.children;

    return(
      <div>
        {content}
      </div>
    );
  }  
}

export default DropZone;