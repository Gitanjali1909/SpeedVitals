import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { motion } from 'framer-motion'

interface GraphProps {
  data: any
  metric: string
  device: string
}

export const Graph: React.FC<GraphProps> = ({ data, metric, device }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      
      const formatData = (inputData: any) => {
        console.log('Data to format:', inputData) 
        try {
          return inputData.map((item: { [x: string]: any; date: any; Email: any; Direct: any }) => ({
            date: item.date || '',
            Email: item.Email,
            'Union Ads': item['Union Ads'],
            'Video Ads': item['Video Ads'],
            Direct: item.Direct,
            'Search Engine': item['Search Engine']
          }))
        } catch (err) {
          console.error('Error formatting data:', err)
          setError('Failed to format data')
          return []
        }
      }

      const formattedData = formatData(data)

      if (formattedData.length === 0) {
        setError('No valid data to display')
        return
      }

      const option = {
        title: {
          text: `${metric} for ${device}`,
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params: any) {
            const dataPoint = params[0]
            return `${dataPoint.name}<br/>${dataPoint.seriesName}: ${dataPoint.value.toFixed(2)}`
          }
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: formattedData.map((item: { date: any }) => item.date),
          axisLabel: {
            rotate: 0, 
            interval: 0 
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: formattedData.map((item: { Email: any }) => item.Email),
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: '#3b82f6'
            },
            itemStyle: {
              color: '#3b82f6'
            }
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: formattedData.map((item: { [x: string]: any }) => item['Union Ads']),
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: '#10b981'
            },
            itemStyle: {
              color: '#10b981'
            }
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: formattedData.map((item: { [x: string]: any }) => item['Video Ads']),
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: '#fbbf24'
            },
            itemStyle: {
              color: '#fbbf24'
            }
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: formattedData.map((item: { Direct: any }) => item.Direct),
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: '#3b82f6'
            },
            itemStyle: {
              color: '#3b82f6'
            }
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: formattedData.map((item: { [x: string]: any }) => item['Search Engine']),
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: '#ef4444'
            },
            itemStyle: {
              color: '#ef4444'
            }
          }
        ]
      }

      try {
        chart.setOption(option)
      } catch (err) {
        console.error('Error setting chart option:', err)
        setError('Failed to render chart')
      }

      const handleResize = () => {
        chart.resize()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        chart.dispose()
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [data, metric, device])

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-center h-[400px]">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
    >
      <div ref={chartRef} className="w-full h-[400px]" />
    </motion.div>
  )
}
