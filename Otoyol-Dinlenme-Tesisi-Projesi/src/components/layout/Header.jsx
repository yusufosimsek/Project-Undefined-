
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';

const Header = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="flex justify-between items-center mb-8 pb-4 border-b border-border">
      <div className="flex items-center gap-2">
         <UtensilsCrossed className="h-8 w-8 text-primary" />
         <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
           Yol Üstü Lezzet Durağı
         </h1>
      </div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button onClick={onCartClick} variant="outline" size="icon" className="relative rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <ShoppingCart className="h-5 w-5 text-primary" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {cartItemCount}
            </span>
          )}
        </Button>
      </motion.div>
    </header>
  );
};

export default Header;
