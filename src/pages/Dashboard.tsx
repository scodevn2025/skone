import React from 'react';
import { 
  Package, ShoppingCart, FileText, Users, TrendingUp, 
  DollarSign, Eye, Star, ArrowUp, ArrowDown 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Đơn hàng hôm nay',
      value: '87',
      change: '+23%',
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Doanh thu tháng',
      value: '₫45.2M',
      change: '-5%',
      changeType: 'decrease',
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    {
      title: 'Khách hàng mới',
      value: '156',
      change: '+8%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-purple-500'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Nguyễn Văn A', amount: '₫1,250,000', status: 'Đã giao', date: '2024-01-15' },
    { id: '#1235', customer: 'Trần Thị B', amount: '₫850,000', status: 'Đang xử lý', date: '2024-01-15' },
    { id: '#1236', customer: 'Lê Văn C', amount: '₫2,100,000', status: 'Đã xác nhận', date: '2024-01-14' },
    { id: '#1237', customer: 'Phạm Thị D', amount: '₫670,000', status: 'Đã hủy', date: '2024-01-14' }
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro Max', sales: 156, revenue: '₫390M', trend: 'up' },
    { name: 'Samsung Galaxy S24', sales: 134, revenue: '₫268M', trend: 'up' },
    { name: 'MacBook Air M3', sales: 89, revenue: '₫267M', trend: 'down' },
    { name: 'iPad Pro 12.9', sales: 76, revenue: '₫152M', trend: 'up' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Đã xác nhận': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Đã hủy': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Chào mừng trở lại! 👋</h1>
        <p className="opacity-90">Đây là tổng quan về hệ thống của bạn hôm nay</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? 
                    <ArrowUp className="w-4 h-4" /> : 
                    <ArrowDown className="w-4 h-4" />
                  }
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Đơn hàng gần đây
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Xem tất cả
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{order.amount}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sản phẩm bán chạy
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {product.sales} đã bán
                    </p>
                  </div>
                  <div className="text-right flex items-center space-x-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.revenue}
                      </p>
                    </div>
                    {product.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="font-medium text-blue-600">Thêm sản phẩm</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
            <FileText className="w-8 h-8 text-green-600" />
            <span className="font-medium text-green-600">Viết bài</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors">
            <Eye className="w-8 h-8 text-yellow-600" />
            <span className="font-medium text-yellow-600">Xem báo cáo</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
            <Users className="w-8 h-8 text-purple-600" />
            <span className="font-medium text-purple-600">Quản lý user</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;