import React from 'react';
import {ModalContainer, ModalChildren} from './modal.style';

const Modal = ({children, isClicked}) => {

    return (
        <ModalContainer isModal={isClicked}>
            <ModalChildren onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalChildren>
        </ModalContainer>
    );
};

export default Modal;



