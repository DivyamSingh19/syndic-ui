import React ,{ReactNode }from 'react'

interface AuthLayoutProps {
  children: ReactNode;
}

const AL: React.FC<AuthLayoutProps> = ({children}) => {
  return <div>
    {children}
  </div>;
};

export default AL