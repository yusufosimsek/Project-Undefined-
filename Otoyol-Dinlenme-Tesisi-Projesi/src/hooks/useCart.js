
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

const useCart = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
       toast({
        title: "Hata",
        description: "Sepet bilgileri kaydedilemedi.",
        variant: "destructive",
      });
    }
  }, [cart, toast]);

  const addToCart = useCallback((item) => {
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
      variant: 'default',
    });
  }, [toast]);

  const removeFromCart = useCallback((itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
     toast({
      title: "Ürün Silindi",
      description: `Ürün sepetinizden kaldırıldı.`,
      variant: 'destructive',
    });
  }, [toast]);

  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
     toast({
      title: "Sepet Temizlendi",
      description: "Sepetinizdeki tüm ürünler kaldırıldı.",
      variant: 'default',
    });
  }, [toast]);


  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  };
};

export default useCart;
