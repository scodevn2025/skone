import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Star } from 'lucide-react';
import type { Page } from '../../App';

interface ProductListProps {
  onNavigate: (page: Page) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'Điện thoại',
      price: '29,990,000',
      stock: 45,
      status: 'active',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8,
      sales: 156
    },
    {
      id: 2,
      name: 'MacBook Pro M3',
      category: 'Laptop',
      price: '52,990,000',
      stock: 12,
      status: 'active',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.9,
      sales: 89
    },
    {
      id: 3,
      name: 'AirPods Pro 2',
      category: 'Phụ kiện',
      price: '6,290,000',
      stock: 0,
      status: 'out_of_stock',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.7,
      sales: 234
    },
    {
      id: 4,
      name: 'iPad Air M2',
      category: 'Tablet',
      price: '16,990,000',
      stock: 28,
      status: 'active',
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.6,
      sales: 67
    }
  ];

  const categories = ['all', 'Điện thoại', 'Laptop', 'Tablet', 'Phụ kiện'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Hết hàng</span>;
    }
    if (status === 'active') {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Đang bán</span>;
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Ẩn</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý sản phẩm</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý toàn bộ sản phẩm trong hệ thống
          </p>
        </div>
        <button
          onClick={() => onNavigate('products/add')}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Tất cả danh mục' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Sản phẩm</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Danh mục</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Giá</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Kho</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Đánh giá</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Trạng thái</th>
                <th className="text-right py-4 px-6 font-medium text-gray-900 dark:text-white">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} đã bán</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900 dark:text-white">{product.category}</td>
                  <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">₫{product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900 dark:text-white">{product.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(product.status, product.stock)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate('products/edit')}
                        className="p-1 text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                        <Trash2 className="w-4 h-4" />
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
              Hiển thị 1-{filteredProducts.length} trong số {products.length} sản phẩm
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                Trước
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                1
              </button>
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

export default ProductList;