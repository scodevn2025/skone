import React, { useState } from 'react';
import { 
  ArrowLeft, User, MapPin, CreditCard, Package, Truck, 
  Calendar, Phone, Mail, Edit, Save, X 
} from 'lucide-react';
import type { Page } from '../../App';

interface OrderDetailProps {
  onNavigate: (page: Page) => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ onNavigate }) => {
  const [orderStatus, setOrderStatus] = useState('processing');
  const [trackingCode, setTrackingCode] = useState('VN123456789');
  const [notes, setNotes] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);

  const order = {
    id: '#ORD-1235',
    customer: {
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0907654321'
    },
    items: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max 256GB',
        sku: 'IP15PM-256',
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100',
        price: 29990000,
        quantity: 1,
        total: 29990000
      }
    ],
    subtotal: 29990000,
    shipping: 50000,
    tax: 0,
    total: 30040000,
    paymentStatus: 'paid',
    paymentMethod: 'momo',
    orderDate: '2024-01-15T14:20:00',
    shippingAddress: {
      name: 'Trần Thị B',
      phone: '0907654321',
      address: 'Số 456 Đường XYZ',
      ward: 'Phường 12',
      district: 'Quận 3',
      city: 'TP. Hồ Chí Minh'
    },
    timeline: [
      { status: 'placed', label: 'Đặt hàng', date: '2024-01-15T14:20:00', completed: true },
      { status: 'confirmed', label: 'Xác nhận', date: '2024-01-15T15:30:00', completed: true },
      { status: 'processing', label: 'Đang xử lý', date: '2024-01-16T09:00:00', completed: true },
      { status: 'shipped', label: 'Đang giao', date: null, completed: false },
      { status: 'delivered', label: 'Đã giao', date: null, completed: false }
    ]
  };

  const statusOptions = [
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'processing', label: 'Đang xử lý' },
    { value: 'shipped', label: 'Đang giao' },
    { value: 'delivered', label: 'Đã giao' },
    { value: 'cancelled', label: 'Đã hủy' }
  ];

  const handleStatusUpdate = (newStatus: string) => {
    setOrderStatus(newStatus);
    setShowStatusModal(false);
    // Here you would typically make an API call to update the order status
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
    return <span className={`px-3 py-1 text-sm rounded-full ${config.color}`}>{config.label}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('orders')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chi tiết đơn hàng {order.id}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Đặt hàng lúc {formatDate(order.orderDate)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {getStatusBadge(orderStatus)}
          <button
            onClick={() => setShowStatusModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Cập nhật trạng thái</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Sản phẩm đã đặt
            </h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {item.sku}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Số lượng: {item.quantity}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(item.total)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Phí vận chuyển:</span>
                  <span>{formatCurrency(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Thuế:</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Theo dõi đơn hàng
            </h2>
            
            <div className="space-y-4">
              {order.timeline.map((step, index) => (
                <div key={step.status} className="flex items-center space-x-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2
                    ${step.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500'
                    }
                  `}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(step.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thông tin vận chuyển</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mã vận đơn
                </label>
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Thêm ghi chú về đơn hàng..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Lưu thông tin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Thông tin khách hàng
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{order.customer.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{order.customer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{order.customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Địa chỉ giao hàng
            </h3>
            
            <div className="text-gray-600 dark:text-gray-400 space-y-1">
              <p className="font-medium text-gray-900 dark:text-white">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.ward}, {order.shippingAddress.district}</p>
              <p>{order.shippingAddress.city}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Thanh toán
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Phương thức:</span>
                <span className="font-medium text-gray-900 dark:text-white">MoMo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Trạng thái:</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Đã thanh toán
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tổng tiền:</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Cập nhật trạng thái đơn hàng
                </h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {statusOptions.map(status => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusUpdate(status.value)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      orderStatus === status.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {status.label}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-4 pt-4 mt-6 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;