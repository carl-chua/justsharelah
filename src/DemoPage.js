import React from 'react';
import { useSelector } from "react-redux";
import { demoListener, demoPost, demoFetch } from './API/DemoAPI';

export default function DemoPage() {
    const[testData, setTestData] = React.useState([]);
  
    function testPost() {
        demoPost();
    }

    function testFetch() {
        demoFetch(setTestData);
    }

    React.useEffect(() => {
        const unsubscribe = demoListener(setTestData);

        return unsubscribe;
    },[])

    const demoHeader = useSelector((state) => state.demoHeader);
    
    return (
        <div className="Demo">
            <div>{demoHeader ? demoHeader : null}</div>
            <button onClick={testPost}>post test</button>
            <button onClick={testFetch}>fetch test</button>
            {testData ? testData.map(data => 
            <div>
                {data ?
                <p> DOC ID:{data[0]} data:{JSON.stringify(data[1])}</p>
                :
                null
                }
            </div>)
            : 
            null
            }
      </div>  
    );
}