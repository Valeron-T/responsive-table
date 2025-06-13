'use client';
export const TickerCard = ({ ticker, currentPrice, prevClose }) => {
  const isUp = currentPrice >= prevClose;
  const Arrow = () => (
    <span className={`ml-1 text-xs ${isUp ? "text-green-500" : "text-red-500"}`}>
      {isUp ? "▲" : "▼"}
    </span>
  );

  return (
    <div className="flex flex-col sm:min-w-36 md:min-w-24 p-3 rounded-lg border bg-gray-50 text-center">
      <h2 className="text-sm font-medium text-gray-700">{ticker}</h2>
      <div className="flex justify-center items-center text-sm font-semibold text-gray-900 mt-1">
        {currentPrice}
        {currentPrice !== prevClose && <Arrow />}
      </div>
    </div>
  );
};
