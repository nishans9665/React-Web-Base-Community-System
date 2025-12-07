import { Users, FileText, DollarSign, TrendingUp } from "lucide-react";

const stats = [
    { label: "Total Users", value: "1,234", change: "+12%", icon: Users, color: "text-blue-500" },
    { label: "Total Posts", value: "856", change: "+25%", icon: FileText, color: "text-purple-500" },
    { label: "Revenue (Credits)", value: "$12.5k", change: "+8%", icon: DollarSign, color: "text-green-500" },
    { label: "Engagement", value: "89%", change: "+2%", icon: TrendingUp, color: "text-orange-500" },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-gray-400 mt-2">Welcome back, Administrator.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="p-6 rounded-2xl bg-[#111] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">{stat.change}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-[#111] border border-white/10 h-80 flex items-center justify-center">
                    <p className="text-gray-500">Chart Placeholder (Activity)</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#111] border border-white/10 h-80 flex items-center justify-center">
                    <p className="text-gray-500">Chart Placeholder (Revenue)</p>
                </div>
            </div>
        </div>
    );
}
