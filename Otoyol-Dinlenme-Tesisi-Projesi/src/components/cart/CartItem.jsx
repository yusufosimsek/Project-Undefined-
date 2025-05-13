
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemoveFromCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-border shadow-sm"
    >
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.price} TL x {item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
         <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
         <span>{item.quantity}</span>
         <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
         <Button variant="ghost" size="icon" onClick={() => onRemoveFromCart(item.id)} className="text-destructive hover:text-destructive/80">
           <Trash2 className="h-4 w-4" />
         </Button>
      </div>
    </motion.div>
  );
};

export default CartItem;
