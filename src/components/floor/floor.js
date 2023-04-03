import React, {useEffect, useState, useRef} from 'react';
import Pole from '../pole/pole';
import { Container, FloorLevel, FloorButton } from './floor.style';
import {useDispatch, useSelector } from 'react-redux';
import {setClosestElevator, setElevators, setPositions, setQueue } from '../../store/services/buildingReducer';
import sound from '../../resources/sounds/bell_elevator.mp3';
import _ from 'lodash';
import { toast } from 'react-toastify';
import  converter from 'number-to-words';
import { useResizeDetector } from 'react-resize-detector';

const Floor = ({poles, floorIndex, buttonFloor, buttonsRef, buildingHeight}) => {

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [hasReachedFloor, setHasReachedFloor] = useState(false);
    const [selectedPol, setSelectedPol] = useState({
        currentPol:null,
        startTime: null
    });

    const elevators = useSelector(state => state.building.elevators);
    const positions = useSelector(state => state.building.positions);
    const queue = useSelector(state => state.building.queue);

    const elevatorsRef = useRef(elevators);
    const audioRef = useRef();
    const queueRef = useRef(queue);
    const positionsRef = useRef(positions);

    const dispatch = useDispatch();

    const {height: poleHeight, ref: poleSizeRef } = useResizeDetector();

    useEffect(() => {
        elevatorsRef.current = elevators;
        queueRef.current = queue;
        positionsRef.current = positions;
    }, [elevators, queue, positions]);

    const handleQueue = () => {
        setTimeout(() => {
            const queueCopy = _.cloneDeep(queueRef.current);
            const lastCallingFloor = queueCopy[queueCopy.length - 1];
            queueCopy.pop();
            if(lastCallingFloor) {
                buttonsRef[lastCallingFloor].button.current.click();
                dispatch(setQueue(queueCopy));
            }
        }, 750);
    }
    
    const handleButtonClicked = () => {
        const elevatorOnFloor = elevators.find((elevator) => elevator.currentFloor === floorIndex);

        const closestElevator = getClosestElevator();
        
        if (elevatorOnFloor && elevatorOnFloor.isMoving) {
            return toast.error('An elevator is on the way');
        }
        if (elevatorOnFloor && !elevatorOnFloor.isMoving) {
            return toast.error('There is an elevator on the floor');
        }
        
        if (!closestElevator) {
            toast.info('All elevators are currently in use, please wait a moment for one to become available');
            return dispatch(setQueue([floorIndex, ...queue]));
        }
        
        const updatedElevators = elevators.map(elevator =>
            elevator.id === closestElevator.id
              ? ({ ...elevator, currentFloor: floorIndex, isMoving: true, startTime: Date.now(), hasReachedFloor: false })
              : elevator
        );
        
        const updatedPositions = positionsRef.current.map(position =>
            position.id === closestElevator.id
              ? ({ ...position, verticalPosition: floorIndex * (poleHeight / ( 0.008 * buildingHeight)) })
              : position
          );

        setIsButtonClicked(!isButtonClicked);
        setSelectedPol({currentPol: closestElevator.currentPol,startTime: Date.now()});

        dispatch(setPositions(updatedPositions));
        dispatch(setClosestElevator(closestElevator));
        dispatch(setElevators(updatedElevators));

        resetelevatorAfterTime(closestElevator);
        createSoundAndUpdateColor(closestElevator);        
    }
    
    const createSoundAndUpdateColor = (closestElevator) => {   
        setTimeout(() => {
            const audio = audioRef.current;
            audio.play();

            const updatedElevators = elevatorsRef.current.map((elevator) => 
                (elevator.id === closestElevator.id) 
                ? ({...elevator, hasReachedFloor: true,})
                : elevator
            );

            dispatch(setElevators(updatedElevators));
            setHasReachedFloor(true);
        }, 4000);
    }

    const resetelevatorAfterTime = (closestElevator) => {
        setTimeout(() => {
            const updatedElevators = elevatorsRef.current.map((elevator) => 
                (elevator.id === closestElevator.id && elevator.isMoving) 
                    ?({...elevator,isMoving: false,hasReachedFloor: false,startTime: null})
                    : elevator
            );
            dispatch(setElevators(updatedElevators));
            setIsButtonClicked(false);
            setSelectedPol({currentPol:null,startTime: null});
            setHasReachedFloor(false);
            handleQueue();
        }, 6000);
    }

    const getClosestElevator = () => {
        const notMovingElevators = elevators.filter((elevator) => !elevator.isMoving);

        const closestElevator = notMovingElevators.length ? notMovingElevators.reduce((prev, curr) => {
            return (Math.abs(curr.currentFloor - floorIndex) < Math.abs(prev.currentFloor - floorIndex)  ? curr : prev);
        }) : null;
        return closestElevator;
    }

    return (
        <Container ref={poleSizeRef} polsLength={poles?.length}>
            <FloorLevel>{ floorIndex === 0 ? 'Ground Floor' :  converter.toOrdinal(floorIndex)}</FloorLevel>
            {
                poles?.map((pole) => {
                    return <Pole key={pole.id} selectedPol={selectedPol} floorIndex={floorIndex} pole={pole}></Pole>
                })
            }
            <FloorButton ref={buttonFloor?.button} hasReachedFloor={hasReachedFloor} isClicked={isButtonClicked} onClick={handleButtonClicked}>
                {hasReachedFloor ? 'Arrived' : isButtonClicked ? 'Waiting' : 'Call'  }
            </FloorButton>
            <audio ref={audioRef} src={sound}/>
        </Container>
    );
};

export default Floor;