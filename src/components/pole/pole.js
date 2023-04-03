import React, {useState, useEffect} from 'react';
import { Container } from './pole.style';
import moment from 'moment-timezone';

const Pole = ({pole, floorIndex, selectedPol}) => {

    const [pastSeconds, setPastSeconds] = useState(null);

    useEffect(() => {
        if (selectedPol.currentPol === pole.currentPol && floorIndex === pole.currentFloor) {
            setPastSeconds(Math.floor((Date.now() - selectedPol.startTime) / 1000));
        }
    },[selectedPol])

    useEffect(() => {
        const interval = setInterval(() => {
            setPastSeconds(Math.floor((Date.now() - selectedPol.startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [pastSeconds])

    const convertSeconds = () => {
        const duration = moment.duration(pastSeconds, 'seconds');
        return moment.utc(duration.asMilliseconds()).format('mm:ss');
    }

    return (
        <Container>
            {
                (floorIndex === pole.currentFloor && selectedPol.currentPol === pole.currentPol) 
                ? <div>{`${convertSeconds()}`}</div> 
                : null
            }
        </Container>
    );
};

export default Pole;