import { motion } from 'framer-motion';

interface Props {
  translations: {
    title: string;
    subtitle: string;
  };
}

export default function Hero({ translations }: Props) {
  const { title, subtitle } = translations;

  return (
    <div className='text-center'>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400'
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className='text-xl md:text-2xl text-gray-300 mb-8'
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
