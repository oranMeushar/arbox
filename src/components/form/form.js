import React, {useState} from 'react';
import Modal from '../modal/modal';
import { FormContainer, Title, SubmitButton } from './form.style';

const Form = ({onsubmit}) => {

    const [isModal, setIsModal] = useState(true);
    const [floors, setFloors] = useState(10);
    const [elevators, setElevators] = useState(5);

    const handleSubmit = (e, floors, elevators) =>{
        onsubmit(e, floors, elevators);
        setIsModal(false);
    }

    return (
        <Modal isClicked={isModal} setIsClicked={setIsModal}>
        <FormContainer onSubmit={(e) =>handleSubmit(e, floors, elevators)}>
            <Title>Create Your Building</Title>
            <label htmlFor='floors'>
                <p>Floors</p>
                <input type='number' id='floors' value={floors} onChange={(e) => setFloors(e.target.value)} min={2} max={25} required/>
            </label>
            <label htmlFor='elevators'>
                <p>Elevators</p>
                <input type='number' id='elevators' value={elevators} onChange={(e) => setElevators(e.target.value)} min={1} max={5} required/>
            </label>
            <SubmitButton onClick = {(e) =>handleSubmit(e, floors, elevators)}>Submit</SubmitButton>
        </FormContainer>
    </Modal>      
    );
};

export default Form;