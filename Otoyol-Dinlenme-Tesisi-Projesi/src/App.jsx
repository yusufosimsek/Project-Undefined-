
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, UtensilsCrossed, Bus, Car, X, Trash2 } from 'lucide-react'; // Added X and Trash2

// Mock data for food items
const menuItemsData = [
  { id: 'item1', name: 'Izgara Köfte', price: 150, description: 'Yanında pilav ve salata ile servis edilir.', category: 'Ana Yemek' },
  { id: 'item2', name: 'Mercimek Çorbası', price: 50, description: 'Taze sıkılmış limon ile.', category: 'Çorba' },
  { id: 'item3', name: 'Karışık Salata', price: 75, description: 'Mevsim yeşillikleri, domates, salatalık.', category: 'Salata' },
  { id: 'item4', name: 'Künefe', price: 90, description: 'Sıcak ve şerbetli.', category: 'Tatlı' },
  { id: 'item5', name: 'Ayran', price: 25, description: 'Soğuk servis edilir.', category: 'İçecek' },
  { id: 'item6', name: 'Tavuk Sote', price: 130, description: 'Mantar ve biber ile sotelenmiş tavuk.', category: 'Ana Yemek' },
];

function App() {
  const { toast } = useToast();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState(null); // 'bus' or 'car'

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    toast({
      title: "Sepete Eklendi!",
      description: `${item.name} sepetinize başarıyla eklendi.`,
      variant: 'default', // Using default variant for success
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
     toast({
      title: "Ürün Silindi",
      description: `Ürün sepetinizden kaldırıldı.`,
      variant: 'destructive',
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const proceedToCheckout = () => {
     if (!vehicleType) {
        toast({
          title: "Araç Tipi Seçin",
          description: "Lütfen sipariş vermek için otobüs veya bireysel araç seçimi yapın.",
          variant: "destructive",
        });
        return;
      }
      if (cart.length === 0) {
         toast({
          title: "Sepetiniz Boş",
          description: "Lütfen ödeme yapmadan önce sepete ürün ekleyin.",
          variant: "destructive",
        });
        return;
      }
      // Later: Integrate Stripe here
      toast({
        title: "Sipariş Hazırlanıyor...",
        description: `Toplam tutar: ${cartTotal} TL. Ödeme adımına yönlendiriliyorsunuz. (${vehicleType === 'bus' ? 'Otobüs' : 'Bireysel Araç'})`,
      });
      // Clear cart after hypothetical successful payment
      // setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 text-foreground p-4 md:p-8 relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
           <UtensilsCrossed className="h-8 w-8 text-primary" />
           <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
             Yol Üstü Lezzet Durağı
           </h1>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button onClick={() => setIsCartOpen(true)} variant="outline" size="icon" className="relative rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <ShoppingCart className="h-5 w-5 text-primary" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Button>
        </motion.div>
      </header>

      {/* Vehicle Selection */}
       {!vehicleType && (
         <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-lg border border-border text-center"
         >
           <h2 className="text-xl font-semibold mb-4 text-primary">Merhaba! Nasıl Geldiniz?</h2>
           <p className="text-muted-foreground mb-6">Size özel menü ve hizmetler için lütfen seçiminizi yapın.</p>
           <div className="flex justify-center gap-4">
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Button onClick={() => setVehicleType('bus')} size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md">
                 <Bus className="mr-2 h-5 w-5" /> Otobüs ile Geldim
               </Button>
             </motion.div>
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Button onClick={() => setVehicleType('car')} size="lg" className="bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-md">
                 <Car className="mr-2 h-5 w-5" /> Bireysel Araç ile Geldim
               </Button>
             </motion.div>
           </div>
         </motion.div>
       )}

      {/* Menu Items */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItemsData.map((item, index) => (
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
                {/* Placeholder for Image */}
                <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-md mb-4 flex items-center justify-center text-muted-foreground">
                   <img  class="w-full h-full object-cover rounded-md" alt={item.name} src="https://images.unsplash.com/photo-1590383276111-0392dfd402ac" />
                 </div>
                <p className="text-sm mb-2">{item.description}</p>
                <p className="text-lg font-bold text-accent">{item.price} TL</p>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                   <Button onClick={() => addToCart(item)} className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground">
                     <ShoppingCart className="mr-2 h-4 w-4" /> Sepete Ekle
                   </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </main>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 border-l border-border flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-border bg-gradient-to-r from-purple-50 to-orange-50 dark:from-gray-900 dark:to-purple-900">
              <h2 className="text-xl font-semibold text-primary">Sepetiniz</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground mt-10">Sepetiniz boş.</p>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={item.id}
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
                       <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                       <span>{item.quantity}</span>
                       <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                       <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80">
                         <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                  </motion.div>
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
                   <Button onClick={proceedToCheckout} size="lg" className="w-full bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white shadow-lg">
                     Ön Ödeme Yap & Siparişi Ver
                   </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default App;
