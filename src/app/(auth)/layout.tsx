interface Props {
    children: React.ReactNode;
  }
  
  const AuthLayout: React.FC<Props> = ({ children }) => {
    return <div className="flex flex-col gap-y-4">{children}</div>;
  };
  
  export default AuthLayout;
  