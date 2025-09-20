import React, { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
}

const OL: React.FC<OnboardingLayoutProps> = ({ children }) => {
  return <div>OnboardingLayout</div>;
};

export default OL;
