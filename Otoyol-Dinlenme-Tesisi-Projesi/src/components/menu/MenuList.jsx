
import React from 'react';
import MenuItemCard from './MenuItemCard';

// Mock data for food items - Moved here or could be fetched from an API
const menuItemsData = [
  { id: 'item1', name: 'Izgara Köfte', price: 150, description: 'Yanında pilav ve salata ile servis edilir.', category: 'Ana Yemek' },
  { id: 'item2', name: 'Mercimek Çorbası', price: 50, description: 'Taze sıkılmış limon ile.', category: 'Çorba' },
  { id: 'item3', name: 'Karışık Salata', price: 75, description: 'Mevsim yeşillikleri, domates, salatalık.', category: 'Salata' },
  { id: 'item4', name: 'Künefe', price: 90, description: 'Sıcak ve şerbetli.', category: 'Tatlı' },
  { id: 'item5', name: 'Ayran', price: 25, description: 'Soğuk servis edilir.', category: 'İçecek' },
  { id: 'item6', name: 'Tavuk Sote', price: 130, description: 'Mantar ve biber ile sotelenmiş tavuk.', category: 'Ana Yemek' },
];


const MenuList = ({ onAddToCart }) => {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {menuItemsData.map((item, index) => (
        <MenuItemCard
          key={item.id}
          item={item}
          index={index}
          onAddToCart={onAddToCart}
        />
      ))}
    </main>
  );
};

export default MenuList;
