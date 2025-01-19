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
        const response = await axios.get(`https://example-metrics.speedvitals.workers.dev/?metric=${metric}&device=${device}`)
        if (response.data && (Array.isArray(response.data) || typeof response.data === 'object')) {
          setData(response.data)
        } else {
          throw new Error('Invalid data format received from API')
        }
      } catch (err) {
        setError('Failed to fetch data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [metric, device])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 min-h-screen">
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
              className="text-center text-red-500"
            >
              {error}
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

