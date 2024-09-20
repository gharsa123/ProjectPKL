import React from "react";

interface CardProps {
  title: string;
  count: number;
  onClick: () => void;
  color: string;
}

const Card: React.FC<CardProps> = ({ title, count, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`p-8 rounded-lg shadow-lg h-full w-full flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${color}`}
    >
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-4xl mt-2 text-white">{count}</p>
    </button>
  );
};

export default Card;
