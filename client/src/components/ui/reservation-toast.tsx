import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ReservationToastProps {
  isVisible: boolean;
  onClose: () => void;
}

export function ReservationToast({ isVisible, onClose }: ReservationToastProps) {
  const { language } = useLanguage();
  
  const messages = {
    ar: "شكرًا لإستخدامك تطبيق Line UP. نراك قريبًا!",
    en: "Thank you for using Line UP. See you soon!"
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <div 
            className={`
              bg-green-500 dark:bg-green-600 text-white rounded-lg p-4 shadow-lg
              ${language === 'ar' ? 'text-right' : 'text-left'}
            `}
          >
            <p className="text-sm font-medium">
              {messages[language]}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}