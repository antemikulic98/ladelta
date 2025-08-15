'use client';

import { motion } from 'framer-motion';
import { Eye, Zap, Palette, Sparkles } from 'lucide-react';

export default function CakeFeatures() {
  const features = [
    {
      icon: <Eye className='w-6 h-6' />,
      title: 'Fotorealistični 3D prikaz',
      description:
        'WebGL tehnologija za nevjerojatno realističan prikaz vaše torte',
    },
    {
      icon: <Zap className='w-6 h-6' />,
      title: 'Interaktivni efekti',
      description:
        'Lebdeći ukrasi, animirane svijeće i magični efekti čestičica',
    },
    {
      icon: <Palette className='w-6 h-6' />,
      title: 'Napredni materijali',
      description:
        'Fizički točni materijali s realističnim sjenčanjem i refleksijama',
    },
    {
      icon: <Sparkles className='w-6 h-6' />,
      title: 'Post-processing efekti',
      description: 'Bloom efekti, dubina polja i profesionalno osvjetljenje',
    },
  ];

  return (
    <div className='mt-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100'>
      <h4 className='text-lg font-bold text-gray-900 mb-4 text-center'>
        ✨ Napredna 3D vizualizacija
      </h4>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className='flex items-start gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300'
          >
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: '#7DCCBD', color: 'white' }}
            >
              {feature.icon}
            </div>
            <div>
              <h5 className='font-semibold text-gray-900 text-sm'>
                {feature.title}
              </h5>
              <p className='text-xs text-gray-600 mt-1'>
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
