import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { motion } from 'framer-motion'

interface GraphProps {
  data: any
  metric: string
  device: string
}

export const Graph: React.FC<GraphProps> = ({ data, metric, device }) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      const resizeObserver = new ResizeObserver(() => {
        chart.resize();
      });
      resizeObserver.observe(chartRef.current);

      const formatData = (inputData: any) => {
        if (Array.isArray(inputData)) {
          return inputData.map(item => ({
            date: item.date || '',
            value: typeof item.value === 'number' ? item.value : 0
          }))
        } else if (typeof inputData === 'object') {
          return Object.entries(inputData).map(([date, value]) => ({
            date,
            value: typeof value === 'number' ? value : 0
          }))
        }
        return []
      }

      const formattedData = formatData(data)

      const option = {
        title: {
          text: metric,
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#ccc',
          borderWidth: 1,
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: formattedData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: metric === 'LCP' ? 'Seconds' : 'Score',
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        series: [
          {
            name: metric,
            type: 'line',
            data: formattedData.map(item => item.value),
            smooth: true,
            symbolSize: 6,
            lineStyle: {
              width: 2,
              color: '#2563eb'
            },
            itemStyle: {
              color: '#2563eb'
            }
          }
        ]
      }

      chart.setOption(option)


      return () => {
        chart.dispose()
        resizeObserver.disconnect();
      }
    }
  }, [data, metric, device])

  if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return <div className="text-center text-gray-500">No data available</div>
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

