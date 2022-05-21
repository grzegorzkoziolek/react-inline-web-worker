export default function ResponseViewer({ responses }: { responses: string[] }) {
  return (
    <>
      {responses.map((response) => {
        return (
          <p key={(response)}>
              {response}
          </p>
        );
      })}
    </>
  );
}
