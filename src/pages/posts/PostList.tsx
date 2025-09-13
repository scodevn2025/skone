import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import type { Page } from '../../App';

interface PostListProps {
  onNavigate: (page: Page) => void;
}

const PostList: React.FC<PostListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const posts = [
    {
      id: 1,
      title: 'iPhone 15 Series ra mắt với nhiều tính năng mới',
      excerpt: 'Apple vừa chính thức ra mắt dòng iPhone 15 với chip A17 Pro mạnh mẽ...',
      category: 'Tin tức công nghệ',
      status: 'published',
      author: 'Admin',
      publishDate: '2024-01-15',
      views: 1250,
      featured: true,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      title: 'Top 5 laptop gaming tốt nhất năm 2024',
      excerpt: 'Khám phá những chiếc laptop gaming mạnh mẽ nhất hiện tại...',
      category: 'Review',
      status: 'published',
      author: 'Editor',
      publishDate: '2024-01-14',
      views: 890,
      featured: false,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 3,
      title: 'Hướng dẫn chọn mua điện thoại phù hợp với túi tiền',
      excerpt: 'Những lời khuyên hữu ích khi chọn mua điện thoại...',
      category: 'Hướng dẫn',
      status: 'draft',
      author: 'Admin',
      publishDate: '2024-01-13',
      views: 0,
      featured: false,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const categories = ['all', 'Tin tức công nghệ', 'Review', 'Hướng dẫn', 'Khuyến mãi'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Đã xuất bản</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Nháp</span>;
      case 'scheduled':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Đã lên lịch</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Ẩn</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý bài viết</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý toàn bộ bài viết và nội dung
          </p>
        </div>
        <button
          onClick={() => onNavigate('posts/add')}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Viết bài mới</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

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

      {/* Posts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Bài viết</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Danh mục</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Tác giả</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Ngày đăng</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Lượt xem</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Trạng thái</th>
                <th className="text-right py-4 px-6 font-medium text-gray-900 dark:text-white">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {post.title}
                          </h3>
                          {post.featured && (
                            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded text-xs">
                              Nổi bật
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900 dark:text-white">{post.category}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{post.author}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{post.publishDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{post.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNavigate('posts/edit')}
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
              Hiển thị 1-{filteredPosts.length} trong số {posts.length} bài viết
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

export default PostList;