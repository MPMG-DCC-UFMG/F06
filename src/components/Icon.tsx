import React from 'react';

type Props = {
  name: string;
  margin?: "right" | "left"
  className?: string,
  onClick?: () => void
}

function Icon({ name, margin, className, onClick }: Props) {
  return (<i className={
    `ri-${name} 
    ${margin === "right" ? "mr-2" : ""} 
    ${margin === "left" ? "ml-2" : ""} 
    ${className || ""}
    align-bottom`
  }
    onClick={onClick}
  />);
}

export default Icon;
