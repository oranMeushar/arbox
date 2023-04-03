import React from 'react';
import './App.css';
import * as uuid from 'uuid';
import Building from './components/building/building';
import { useDispatch } from 'react-redux';
import { setBuilding, setElevators, setPositions } from './store/services/buildingReducer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/form/form';

const App = () => {

  const dispatch = useDispatch();

  const POLES = 5;

  const handleSubmit = (e, floors, elevators) => {
    e.preventDefault();

    const initData = (polesList) => {
      const data = {};
      for (let i = 0; i < floors; i++) {
        data[i] = {
          id: uuid.v4(),
          poles: polesList.splice(0, POLES),
          level:'Floor ' + (i + 1),
          floorIndex: i,
        };
      }
      return data;
    };
  
    const generateElevators = () => {
      const elevatorsList = [];
      for (let i = 0; i < elevators; i++) {
        elevatorsList.push({
          id: uuid.v4(),
          currentFloor: 0,
          currentPol:i,
          isMoving: false,
          startTime: null,
          hasReachedFloor: false,
        });
      }
      return elevatorsList;
    };
  
    const generatePolesPerFloor = () => {
      const polesList = [];
      for(let i = 0; i < floors; i++) {
        for (let j = 0; j < POLES; j++) {
          polesList.push({
            id:uuid.v4(),
            currentFloor: i,
            currentPol:j,
            startTime: null,
          });
        }
      }
      return polesList;
    };

    const elevatorsList = generateElevators();
    const initialPositions = [20, 34, 48, 62, 76];

    const positions = elevatorsList.map((elevator, idx) =>{
      return {
        id:elevator.id,
        verticalPosition: 0,
        horizontalPosition: initialPositions[idx],
      }
    });

    const polesList = generatePolesPerFloor();
    dispatch(setBuilding(initData(polesList)));
    dispatch(setElevators(elevatorsList));
    dispatch(setPositions(positions));
  }

  return (
    <div className="App">
      <ToastContainer/>
      <Form onsubmit={handleSubmit}/>
      <Building/>
    </div>
  );
}

export default App;
