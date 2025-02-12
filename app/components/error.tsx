type Props = {
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
        <p>❌ Error: {message}</p>
      </div>
);

export default ErrorMessage