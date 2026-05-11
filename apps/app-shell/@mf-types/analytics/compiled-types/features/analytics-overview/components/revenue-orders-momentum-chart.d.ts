interface RevenueOrdersMomentumChartProps {
    data: Array<{
        label: string;
        revenue: number;
        orders: number;
    }>;
}
export declare function RevenueOrdersMomentumChart({ data }: RevenueOrdersMomentumChartProps): import("react/jsx-runtime").JSX.Element;
export {};
