import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const popularStocks = [
  { ticker: 'AAPL', name: 'Apple' },
  { ticker: 'NVDA', name: 'NVIDIA' },
  { ticker: 'TSLA', name: 'Tesla' },
  { ticker: 'MSFT', name: 'Microsoft' },
  { ticker: 'GOOGL', name: 'Alphabet' },
  { ticker: 'RELIANCE.NS', name: 'Reliance' },
  { ticker: 'AMZN', name: 'Amazon' },
  { ticker: 'META', name: 'Meta Platforms' },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  // Duplicate the array to create a seamless infinite loop
  const marqueeStocks = [...popularStocks, ...popularStocks, ...popularStocks];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center overflow-hidden">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center gap-16"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-4">
            Stock Train
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Predict market movements with machine learning-powered forecasting and financial analytics.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full max-w-[100vw] overflow-hidden py-8 mask-edges">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {marqueeStocks.map((stock, idx) => (
              <div
                key={`${stock.ticker}-${idx}`}
                onClick={() => navigate(`/dashboard?ticker=${stock.ticker}`)}
                className="w-48 h-28 p-4 rounded-xl glass-card hover:border-primary/50 flex flex-col justify-center items-center cursor-pointer transition-all hover:scale-105"
              >
                <span className="text-xl font-bold text-foreground mb-1">{stock.ticker}</span>
                <span className="text-xs text-muted-foreground text-center line-clamp-1">{stock.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Landing;
