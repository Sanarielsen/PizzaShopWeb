import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
import colors from 'tailwindcss/colors'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 600 },
  { date: '12/12', revenue: 900 },
  { date: '13/12', revenue: 1000 },
  { date: '14/12', revenue: 800 },
  { date: '15/12', revenue: 1100 },
  { date: '16/12', revenue: 1000 },
]

export function RevenueChart() {
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics','daily-revenue-in-period'],
    queryFn: getDailyRevenueInPeriod
  }) 

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">Receita periodo</CardTitle>
            <CardDescription>Receita diária no período</CardDescription>
          </div>
      </CardHeader>
      <CardContent>
        { dailyRevenueInPeriod && (  
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis stroke="#888" axisLine={false} tickLine={false} width={80} tickFormatter={(value: number) => value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} />
              <Line type="linear" strokeWidth={2} dataKey="receipt" stroke={colors['violet']['500']}/>

              <CartesianGrid
                className="stroke-muted"
                vertical={false}
              />
            </LineChart>
          </ResponsiveContainer>          
        ) }

      </CardContent>
    </Card>
  )
}