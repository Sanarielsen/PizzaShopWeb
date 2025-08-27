import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";

import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts'
import colors from 'tailwindcss/colors'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date, 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics','daily-revenue-in-period', dateRange],
    queryFn: () => getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to
    })
  }) 

  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita periodo</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3 w-[400px]">
          <Label>Periodo</Label>

          <DatePicker
            name="startDate" 
            currentDate={dateRange?.from} 
            onChangeDate={(date) => {
              setDateRange(prev => ({
                from: date,
                to: prev?.to,
              }))
            }}
          />

          <DatePicker
            name="finalDate" 
            currentDate={dateRange?.from} 
            onChangeDate={(date) => {
              setDateRange(prev => ({
                from: prev?.from,
                to: date,
              }))
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        { dailyRevenueInPeriod && (  
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                dy={16} 
              />
              <YAxis 
                stroke="#888" 
                axisLine={false} 
                tickLine={false} 
                width={80} 
                tickFormatter={(value: number) => value.toLocaleString('pt-BR', {
                  style: 'currency', currency: 'BRL'
                })} />

              <Line 
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors['violet']['500']}
              />

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