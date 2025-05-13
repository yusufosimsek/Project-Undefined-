
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bus, Car } from 'lucide-react';

const VehicleSelection = ({ onSelectVehicle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-lg border border-border text-center"
    >
      <h2 className="text-xl font-semibold mb-4 text-primary">Merhaba! Nasıl Geldiniz?</h2>
      <p className="text-muted-foreground mb-6">Size özel menü ve hizmetler için lütfen seçiminizi yapın.</p>
      <div className="flex justify-center gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => onSelectVehicle('bus')} size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md">
            <Bus className="mr-2 h-5 w-5" /> Otobüs ile Geldim
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => onSelectVehicle('car')} size="lg" className="bg-gradient-to-r from-green-500 to-lime-500 text-white shadow-md">
            <Car className="mr-2 h-5 w-5" /> Bireysel Araç ile Geldim
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VehicleSelection;
