import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import ResponseViewer from './ResponseViewer';
import webWorker from './webWorker';
import webWorkerBuilder from './webWorkerBuilder';

const exampleCondition = {
  oneOff: [
    {
      allOf: [
        {
          value: 'yes',
          name: 'input',
        },
      ],
    },
  ],
};

export type WebWorkerContainerType = typeof exampleCondition;

const webWorkerString = webWorker();
const worker = webWorkerBuilder(webWorkerString);


export default function WebWorkerContainer() {
  const [input, setInput] = useState<string>();
  const [responses, setResponses]  = useState<string[]>([]);
  
  useEffect(() => {
    worker.onmessage = function(e) 
    {
      console.log("message back: ", e.data, `Result: ${input}`, `Result: ${input}` === e.data);
      setResponses([
        ...responses,
        `Result: ${input}`,
      ])
    }
  }, [input, responses]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("change", event)
    worker.postMessage(event.currentTarget.value);
    setInput(event.currentTarget.value);
  };
  
  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)'}}>
      <input onChange={onChange} />
      <ResponseViewer responses={responses} />
    </div>
  );
}
