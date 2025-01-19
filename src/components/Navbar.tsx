import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export const Navbar = () => {
  const navItems = ['Home', 'Performance Test', 'About', 'Contact']

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16"> 
          
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold">SpeedVitals</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6"> 
            {navItems.map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
