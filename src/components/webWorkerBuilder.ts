export default function webWorkerBuilder(webWorker: string): Worker {
    const blobURL = URL.createObjectURL(new Blob([
      "onmessage =" + webWorker
      ],
      {
        type: 'application/javascript'
      }
    ));
    return new Worker(blobURL);
  }