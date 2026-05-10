declare module "analytics/order-status-distribution-chart" {
  import type { ComponentType } from "react";

  interface OrderStatusDistributionChartProps {
    data: Array<{
      label: string;
      value: number;
    }>;
  }

  const OrderStatusDistributionChart: ComponentType<OrderStatusDistributionChartProps>;

  export default OrderStatusDistributionChart;
}
