import React from "react";
import GameCard from "@/components/client/GameCard";
import QuickActions from "@/components/client/QuickActions";

const ClientHome: React.FC = () => {
  const games = [
    {
      name: "TIME BAZAR",
      status: "Betting is Closed for Today",
      numbers: "557-71-399",
      color: "red",
    },
    {
      name: "KALYAN",
      status: "Betting is Closed for Today",
      numbers: "678-13-238",
      color: "red",
    },
    {
      name: "MILAN DAY",
      status: "Betting is Closed for Today",
      numbers: "378-86-150",
      color: "red",
    },
    {
      name: "MILAN NIGHT",
      status: "Betting is Running For Close",
      numbers: "136-1-***",
      color: "green",
    },
  ];

  return (
    <div
      style={{
        padding: "12px",
        background: "#fff",
        minHeight: "calc(100vh - 130px)",
      }}
    >
      <QuickActions />

      {/* Game Cards */}
      {games.map((game, index) => (
        <GameCard key={index} game={game} />
      ))}
    </div>
  );
};

export default ClientHome;
