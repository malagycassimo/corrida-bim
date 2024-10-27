import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type MetricCardProps = {
    title: string;
    value: string | number;
    change: string;
    icon: React.ReactNode;
};

export const MetricCard = ({ title, value, change, icon }: MetricCardProps) => (
    <Card className="bg-gray-100 text-black">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-gray-700">{change}</p>
        </CardContent>
    </Card>
);
