import React, { useState } from 'react';
import { Search, Filter, Eye, Truck, DollarSign, Calendar, User } from 'lucide-react';
import type { Page } from '../../App';

interface OrderListProps {
  onNavigate: (page: Page) => void;
}

const OrderList: React.FC<OrderListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders = [
    {
      id: '#ORD-1234',
      customer: {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        phone: '0901234567'
      },
      items: 3,
      total: 15750000,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'vnpay',
      orderDate: '2024-01-15T10:30:00',
      deliveryDate: '2024-01-17T14:00:00',
      shippingAddress: 'Số 123 Đường ABC, Quận 1, TP.HCM'
    },
    {
      id: '#ORD-1235',
      customer: {
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        phone: '0907654321'
      },
      items: 1,
      total: 29990000,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'momo',
      orderDate: '2024-01-15T14:20:00',
      deliveryDate: null,
      shippingAddress: 'Số 456 Đường XYZ, Quận 3, TP.HCM'
    },
    {
      id: '#ORD-1236',
      customer: {
        name: 'Lê Văn C',
        email: 'levanc@email.com',
        phone: '0903456789'
      },
      items: 2,
      total: 42500000,
      status: 'confirmed',
      paymentStatus: 'pending',
      paymentMethod: 'cod',
      orderDate: '2024-01-14T16:45:00',
      deliveryDate: null,
      shippingAddress: 'Số 789 Đường DEF, Quận 7, TP.HCM'
    },
    {
      id: '#ORD-1237',
      customer: {
        name: 'Phạm Thị D',
        email: 'phamthid@email.com',
        phone: '0909876543'
      },
      items: 1,
      total: 12990000,
      status: 'cancelled',
      paymentStatus: 'refunded',
      paymentMethod: 'bank_transfer',
      orderDate: '2024-01-14T09:15:00',
      deliveryDate: null,
      shippingAddress: 'Số 321 Đường GHI, Quận 5, TP.HCM'
    }
  ];

  const statuses = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'processing', label: 'Đang xử lý' },
    { value: 'shipped', label: 'Đang giao' },
    { value: 'delivered', label: 'Đã giao' },
    { value: 'cancelled', label: 'Đã hủy' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Chờ xử lý' },
      confirmed: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', label: 'Đã xác nhận' },
      processing: { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', label: 'Đang xử lý' },
      shipped: { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', label: 'Đang giao' },
      delivered: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Đã giao' },
      cancelled: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'Đã hủy' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <span className={`px-2 py-1 text-xs rounded-full ${config.color}`}>{config.label}</span>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const config = {
      paid: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Đã thanh toán' },
      pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Chờ thanh toán' },
      failed: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'Thất bại' },
      refunded: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300', label: 'Đã hoàn tiền' }
    };

    const statusConfig = config[status as keyof typeof config] || config.pending;
    return <span className={`px-2 py-1 text-xs rounded-full ${statusConfig.color}`}>{statusConfig.label}</span>;
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods = {
      cod: 'COD',
      vnpay: 'VNPay',
      momo: 'MoMo',
      bank_transfer: 'Chuyển khoản'
    };
    return methods[method as keyof typeof methods] || method;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý đơn hàng</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Theo dõi và xử lý tất cả đơn hàng
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tổng doanh thu</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo mã đơn, tên khách hàng, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Đơn hàng</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Khách hàng</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Sản phẩm</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Tổng tiền</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Thanh toán</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Trạng thái</th>
                <th className="text-right py-4 px-6 font-medium text-gray-900 dark:text-white">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(order.orderDate)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <p className="font-medium text-gray-900 dark:text-white">{order.customer.name}</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer.email}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                      {order.items} sản phẩm
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getPaymentMethodLabel(order.paymentMethod)}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    {getPaymentStatusBadge(order.paymentStatus)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {getStatusBadge(order.status)}
                      {order.deliveryDate && (
                        <div className="flex items-center space-x-1">
                          <Truck className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(order.deliveryDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => onNavigate('orders/detail')}
                        className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hiển thị 1-{filteredOrders.length} trong số {orders.length} đơn hàng
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                Trước
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;