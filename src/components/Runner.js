import React,{ useState, useEffect } from 'react';
import moment from 'moment';

const Runner = (props) => {

    // set initial speed of runner
    const [Speed,setSpeed] = useState(1);

    useEffect(() => {
        // find difference in days from todays date and set speed
        let then = moment(props.dueDate);
        const days = then.diff(moment(),'days');
        if (days > 2) setSpeed(1)
        if (days > 5) setSpeed(2);
        if (days > 15) setSpeed(3);
        if (days > 30) setSpeed(4);      
        },[setSpeed,props.dueDate]
    )


    // return stationary gif if completed

    if (props.completedDate != null) {
        return (
            <img alt="finished" src="./gif/s5.gif" />
        )
    }
    // return gif with speed if task underway
    return (
        <img alt="steady run" src={"./gif/s"+Speed+".gif"} />
    )

}   
 
export default Runner;