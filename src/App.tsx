import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Dropdown } from './components/Dropdown'
import { Graph } from './components/Graph'

const App = () => {
  const [metric, setMetric] = useState<string>('LCP')
  const [device, setDevice] = useState<string>('Mobile')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        
        const simulatedData = Array.from({ length: 7 }, (_, i) => ({
          date: `200${i + 1}`,
          Email: Math.random() * 1000,
          'Union Ads': Math.random() * 1000,
          'Video Ads': Math.random() * 1000,
          Direct: Math.random() * 1000,
          'Search Engine': Math.random() * 1000
        }))

        
        
        setData(simulatedData) 
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to fetch data. Please try again later.')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [metric, device])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-6 sm:px-0"
        >
          <h1 className="text-3xl font-semibold text-center mb-8">Performance Report</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <Dropdown
              options={['LCP', 'CLS']}
              selected={metric}
              onSelect={setMetric}
              label="Metric"
            />
            <Dropdown
              options={['Mobile', 'Desktop']}
              selected={device}
              onSelect={setDevice}
              label="Device"
            />
          </div>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-12"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </motion.div>
          )}
          {!loading && !error && data && (
            <div className="max-w-5xl mx-auto">
              <Graph data={data} metric={metric} device={device} />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default App
