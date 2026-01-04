import React from "react";
import { 
  HiOutlineSquares2X2, 
  HiOutlineShoppingBag, 
  HiOutlineGlobeAlt,
  HiOutlineFire,
  HiOutlineChartPie,
  HiOutlineBolt
} from "react-icons/hi2"; 
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import useDashboardData from "../../hooks/useDashboardData";
import LoadingSpinner from "../../components/LoadingSpinner";

// --- Stat Card Component ---
const StatCard = ({ title, value, icon, color, subtitle }) => (
  <div className="bg-[#1e1e2d] p-6 rounded-3xl border border-slate-800 relative overflow-hidden group hover:border-indigo-500 transition-all duration-300">
    <div className="relative z-10 flex justify-between items-center">
      <div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black text-white mt-2">{value || 0}</h3>
        <p className="text-[10px] text-slate-500 mt-1">{subtitle}</p>
      </div>
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-white shadow-inner group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
    </div>
    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white opacity-[0.02] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
  </div>
);

const DashboardOverview = () => {
  const { stats, loading } = useDashboardData();

  // Dynamic Chart Data mapping
  const chartData = stats?.monthlyTrendData || [
    { month: 'Jan', posts: 0, sales: 0 },
    { month: 'Feb', posts: 0, sales: 0 },
    { month: 'Mar', posts: 0, sales: 0 },
  ];

  if (loading) return (
    <div className="h-[500px] flex items-center justify-center bg-[#151521]">
      <LoadingSpinner />
    </div>
  );

  return (
    <div className="p-6 bg-[#151521] min-h-screen text-slate-200 space-y-8 animate-fadeIn">
      
      {/* 1. Top Highlight Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-gradient-to-br from-[#1e1e2d] to-[#252545] p-8 rounded-[2.5rem] border border-slate-700 flex flex-col md:flex-row justify-between items-center shadow-2xl relative overflow-hidden">
           <div className="z-10 space-y-4">
              <div className="flex items-center gap-2 bg-indigo-500/20 w-fit px-4 py-1.5 rounded-full border border-indigo-500/30">
                 <HiOutlineFire className="text-orange-400 animate-pulse" />
                 <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Trending Top Model</span>
              </div>
              <h2 className="text-4xl font-black text-white italic tracking-tight">
                {stats?.topModel?.name || "No Active Model"}
              </h2>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                This model is currently the best performer in your system. Total purchases: <span className="text-white font-bold">{stats?.topModel?.purchased || 0} times</span>.
              </p>
              <div className="flex gap-4 pt-2">
                 <div className="px-4 py-2 bg-black/30 rounded-xl border border-white/5 text-[10px] font-bold text-slate-300 uppercase">
                   Framework: {stats?.topModel?.framework || "N/A"}
                 </div>
              </div>
           </div>
           <div className="relative mt-6 md:mt-0 z-10">
              <img 
                src={stats?.topModel?.image || "https://miro.medium.com/0*89gpw-VWspEgEsvv.jpg"} 
                className="w-44 h-44 object-cover rounded-[2.5rem] border-4 border-slate-700 shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-2" 
                alt="Top Model" 
              />
              <div className="absolute -top-3 -right-3 bg-indigo-600 text-[10px] font-black px-3 py-1 rounded-lg shadow-xl">TOP</div>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[80px] rounded-full"></div>
        </div>

        {/* Total Inventory Count */}
        <div className="bg-[#1e1e2d] p-8 rounded-[2.5rem] border border-slate-800 flex flex-col justify-center items-center text-center shadow-xl group">
           <div className="p-5 bg-emerald-500/10 rounded-full text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
              <HiOutlineGlobeAlt size={36} />
           </div>
           <h3 className="text-5xl font-black text-white">{stats?.totalGlobalModels || 0}</h3>
           <p className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.2em] mt-3">Total Global Inventory</p>
        </div>
      </div>

      {/* 2. Personal Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="My Model Count" 
          value={stats?.myModelsCount} 
          subtitle="Models created by you"
          color="bg-purple-500" 
          icon={<HiOutlineSquares2X2 size={26} />} 
        />
        <StatCard 
          title="Purchased Models" 
          value={stats?.myPurchasesCount} 
          subtitle="Your private collection"
          color="bg-blue-500" 
          icon={<HiOutlineShoppingBag size={26} />} 
        />
        <StatCard 
          title="My Model Sales" 
          value={stats?.mySales} 
          subtitle="Total times others bought your models"
          color="bg-orange-500" 
          icon={<HiOutlineChartPie size={26} />} 
        />
      </div>

      {/* 3. Activity Trend Chart */}
      <div className="bg-[#1e1e2d] p-8 rounded-[3rem] border border-slate-800 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
           <div>
              <h3 className="text-xl font-bold text-white italic flex items-center gap-2">
                <HiOutlineBolt className="text-yellow-400" /> Activity Analysis
              </h3>
              <p className="text-slate-500 text-xs mt-1">Monthly trend of uploads vs sales</p>
           </div>
           <div className="flex gap-6 bg-black/20 px-6 py-3 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2">
                 <span className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></span>
                 <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Sales Trend</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></span>
                 <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Upload Trend</span>
              </div>
           </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2b2b4b" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} 
                dy={15}
              />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip 
                cursor={{ stroke: '#475569', strokeWidth: 2 }}
                contentStyle={{backgroundColor: '#1e1e2d', border: '1px solid #334155', borderRadius: '16px'}}
                itemStyle={{fontWeight: 'bold', fontSize: '12px'}}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#6366f1" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
              <Area 
                type="monotone" 
                dataKey="posts" 
                stroke="#10b981" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorPosts)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;