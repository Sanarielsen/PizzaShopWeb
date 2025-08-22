import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";
import { ResponsiveContainer, Pie, PieChart, Cell } from 'recharts'
import colors from 'tailwindcss/colors'

const COLORS = [
  colors.sky['500'],
  colors.amber['500'],
  colors.violet['500'],
  colors.emerald['500'],
  colors.rose['500']
]

export function PopularProductsChart() {

  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts
  })
  return (
    <Card className="col-span-3">
      <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Produtos populares</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </div>
      </CardHeader>
      <CardContent>
        {popularProducts && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie 
                data={popularProducts} 
                dataKey="amount"
                nameKey="product"
                cx="50%" cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  // @ts-expect-error
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  // @ts-expect-error
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {// @ts-expect-error
                        popularProducts[index].product.length > 12
                          // @ts-expect-error
                          ? popularProducts[index].product.substring(0, 12).concat('...')
                          // @ts-expect-error
                          : popularProducts[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}
              >
                {popularProducts.map((_, index) => {
                  return (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover:opacity-80"></Cell>
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}