
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import CartItem from './CartItem';

const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  cartTotal,
  vehicleType,
  onUpdateQuantity,
  onRemoveFromCart,
  onProceedToCheckout,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 border-l border-border flex flex-col"
        >
          <div className="p-6 flex justify-between items-center border-b border-border bg-gradient-to-r from-purple-50 to-orange-50 dark:from-gray-900 dark:to-purple-900">
            <h2 className="text-xl font-semibold text-primary">Sepetiniz</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground mt-10">Sepetiniz boş.</p>
            ) : (
              cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveFromCart={onRemoveFromCart}
                />
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-border mt-auto bg-gradient-to-r from-purple-50 to-orange-50 dark:from-gray-900 dark:to-purple-900">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Toplam:</span>
                <span className="text-xl font-bold text-accent">{cartTotal.toFixed(2)} TL</span>
              </div>
               {vehicleType && (
                 <p className="text-sm text-center mb-4 text-muted-foreground">
                   Sipariş Tipi: {vehicleType === 'bus' ? 'Otobüs Yolcusu' : 'Bireysel Araç'}
                 </p>
               )}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                 <Button onClick={onProceedToCheckout} size="lg" className="w-full bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white shadow-lg">
                   Ön Ödeme Yap & Siparişi Ver
                 </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
