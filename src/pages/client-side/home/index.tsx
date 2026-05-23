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
      times: {
        openBidEnds: "01:00 PM",
        closeBidEnds: "02:00 PM",
        openResult: "01:10 PM",
        closeResult: "02:10 PM",
      },
    },
    {
      name: "KALYAN",
      status: "Betting is Closed for Today",
      numbers: "678-13-238",
      color: "red",
      times: {
        openBidEnds: "09:00 PM",
        closeBidEnds: "11:00 PM",
        openResult: "09:10 PM",
        closeResult: "11:10 PM",
      },
    },
    {
      name: "MILAN DAY",
      status: "Betting is Closed for Today",
      numbers: "378-86-150",
      color: "red",
      times: {
        openBidEnds: "03:00 PM",
        closeBidEnds: "05:00 PM",
        openResult: "03:10 PM",
        closeResult: "05:10 PM",
      },
    },
    {
      name: "MILAN NIGHT",
      status: "Betting is Running For Close",
      numbers: "136-1-***",
      color: "green",
      times: {
        openBidEnds: "08:00 PM",
        closeBidEnds: "10:00 PM",
        openResult: "08:10 PM",
        closeResult: "10:10 PM",
      },
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
    <>
      <div
        style={{
          padding: "12px",
          minHeight: "calc(100vh - 130px)",
        }}
      >
        <QuickActions />

        {/* Game Cards */}
        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </>
  );
};

export default ClientHome;
