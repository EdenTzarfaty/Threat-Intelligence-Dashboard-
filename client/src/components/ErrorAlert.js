// Component for displaying error messages to the user
export const ErrorAlert = ({ message }) => {
  if (!message) return null;
  return (
    <div className="error" role="alert" aria-live="polite">
      <p>{message}</p>
    </div>
  );
};
