import { motion } from 'framer-motion';

interface GameCardProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  guideText: string;
}

export default function GameCard({ title, description, url, imageUrl, guideText }: GameCardProps) {
  return (
    <motion.a
      href={url}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ scale: 1.05, rotateY: 12 }}
      transition={{ duration: 0.4 }}
      style={{ perspective: '1000px' }}
      target='_blank'
      rel='noopener noreferrer'
    >
      <article className='bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10'>
        <motion.div className='relative'>
          <motion.img
            src={imageUrl}
            alt={title}
            className='w-full h-48 object-cover'
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
        </motion.div>
        <div className='p-6'>
          <h3 className='text-xl font-semibold mb-2 text-white'>{title}</h3>
          <p className='text-gray-400'>{guideText}</p>
        </div>
      </article>
    </motion.a>
  );
}
