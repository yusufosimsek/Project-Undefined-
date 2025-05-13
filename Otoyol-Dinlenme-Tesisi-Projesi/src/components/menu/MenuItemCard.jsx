
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

const MenuItemCard = ({ item, index, onAddToCart }) => {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">{item.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{item.category}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-md mb-4 flex items-center justify-center text-muted-foreground">
             <img  class="w-full h-full object-cover rounded-md" alt={item.name} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
           </div>
          <p className="text-sm mb-2">{item.description}</p>
          <p className="text-lg font-bold text-accent">{item.price} TL</p>
        </CardContent>
        <CardFooter>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
             <Button onClick={() => onAddToCart(item)} className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground">
               <ShoppingCart className="mr-2 h-4 w-4" /> Sepete Ekle
             </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MenuItemCard;
