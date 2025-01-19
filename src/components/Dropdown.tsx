import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DropdownProps {
  options: string[]
  selected: string
  onSelect: (option: string) => void
  label: string
}

export const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="inline-flex justify-between items-center w-[200px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          <ChevronDown className={`ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1">
              {options.map((option) => (
                <motion.a
                  key={option}
                  href="#"
                  className={`${
                    selected === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-sm hover:bg-gray-100`}
                  onClick={(e) => {
                    e.preventDefault()
                    onSelect(option)
                    setIsOpen(false)
                  }}
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                >
                  {option}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

