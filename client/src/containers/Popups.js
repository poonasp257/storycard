import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { closePopup } from 'modules/popup';

const Container = styled.div`
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 999;
`;

class Popups extends Component {
    render() { 
        const popups = this.props.openedPopups
            .map((popup) => {
                const { type, ...props } = popup;
                const Element = type;

                return <Element {...props} closePopup={this.props.closePopup}/>
            });

        return (
            <div>
                {popups.map((popup, id) => (
                    <Container key={id}>
                        {popup}
                    </Container>)
                )}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        openedPopups: state.popup.get('openedPopups')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closePopup: () => dispatch(closePopup())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popups);