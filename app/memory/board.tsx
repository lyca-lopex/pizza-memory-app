"use client";

import { useEffect, useReducer } from "react";

import { useGame } from "./use-game";
import { isGameOver } from "./utils";
import { MATCHING_CARDS } from "./constants";

function Card({
  item,
  onClick,
  revealed = false,
  found = false,
}: {
  item: string;
  onClick: () => void;
  revealed?: boolean;
  found?: boolean;
}) {
  const cardTransitionClasses = "transition duration-500";
  const cardContentTransitionClasses = "transition duration-300";
  const contentClasses = "bg-white w-full h-full backdrop-blur-md shadow-lg rounded-x1 border border-gray-300 absolute top-0 left-0 rounded";
  const flipUpClasses = "rotate-y-0 opacity-100";
  const flipDownClasses = "rotate-y-180 opacity-0";

  return (
    <button
      className={`w-32 aspect-square relative ${cardTransitionClasses} ${
        found ? "opacity-0" : ""
      }`}
      onClick={() => {
        if (!found && !revealed) {
          onClick();
        }
      }}
      aria-label="Memory Card"
    >
      <div
        className={`${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipDownClasses : flipUpClasses
        }`}
        style={{
          backgroundImage: "url('/card-back.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "white",
        }}
      />

      <div
        className={`flex items-center justify-center ${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipUpClasses : flipDownClasses
        }`}
      >
        {item.includes(".avif") ? (
          <img
            src={`/${item}`}
            alt="Memory Card"
            className={`w-full h-full object-cover ${cardContentTransitionClasses} ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <p
            className={`text-xl font-bold text-black text-center ${cardContentTransitionClasses} ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          >
            {item}
          </p>
        )}
      </div>
    </button>
  );
}

export function Board() {
  const { state, handler } = useGame();

  return (
    <div
      className="flex w-full items-center justify-center gap-6 flex-col text-purple-50 bg-gradient-to-br from-gray-900 to-gray-700"
      aria-label="Memory Board"
    >
      {/* Game Info Section - Always Stays in the Same Position */}
      <div className="flex flex-col items-center">
        <p className="text-red-600">Find all the matching pair of cards.</p>
        <div className="flex justify-between w-full max-w-md">
          <p className="text-red-600">
            Cards Found: {Number(state.found.length) * MATCHING_CARDS}
          </p>
          <p className="text-red-600">Moves: {state.moves}</p>
        </div>
        <button
          className="self-center px-4 mt-2 font-bold border rounded border-white text-white text-slate-800"
          onClick={() => handler.reset()}
        >
          Reset Game
        </button>
      </div>

      <div className="flex w-11/12 md:w-3/4 max-w-3x1 items-center justify-center gap-2 flex-wrap min-h-[300px]">
        {isGameOver(state.found) ? (
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            <img
              src="/card-front/pizza_margherita.avif"
              alt="Rolling Pizza"
              className="absolute left-[-100px] w-32 h-32 animate-roll"
            />
            <p className="font-bold text-white text-3xl animate-fade-in">
              🎉 End of Game! 🎉
            </p>
          </div>
        ) : (
          state.cards.map((item, i) => (
            <Card
              item={item}
              key={`key-item-${item}-${i}`}
              onClick={() => handler.revealCard(i)}
              found={state.found.includes(item)}
              revealed={state.revealedIndexes.includes(i)}
            />
          ))
        )}
      </div>
    </div>
  );
}
