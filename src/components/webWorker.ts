/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
export default function webWorker(): string {
  const onmessage = function onmessage(msg: any) {
    console.log('Message received from main script', msg);
    var workerResult = 'Result: ' + msg.data;
    console.log('Posting message back to main script', workerResult);
    self.postMessage(workerResult);
  };
  return `self.onmessage = ${onmessage.toString()}`;
}
