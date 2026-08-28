import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type MetricCardProps = {
    title: string;
    value: string | number;
    change: string;
    icon: React.ReactNode;
};

export const MetricCard = ({ title, value, change, icon }: MetricCardProps) => (
    <Card className="bg-slate-50/80 hover:bg-slate-100/90 transition-all duration-200 border border-slate-200 shadow-sm rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs uppercase tracking-wider font-bold text-slate-600 truncate pr-2" title={title}>
                {title}
            </CardTitle>
            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-xs text-rose-600">
                {icon}
            </div>
        </CardHeader>
        <CardContent className="pt-1">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
            <p className="text-xs font-medium text-slate-500 mt-1">{change}</p>
        </CardContent>
    </Card>
);
