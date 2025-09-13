import React, { useState } from 'react';
import { Plus, Edit, Trash2, Folder, FolderOpen } from 'lucide-react';

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Điện thoại',
      slug: 'dien-thoai',
      description: 'Điện thoại thông minh các loại',
      productsCount: 45,
      status: 'active',
      parent: null
    },
    {
      id: 2,
      name: 'iPhone',
      slug: 'iphone',
      description: 'Điện thoại iPhone Apple',
      productsCount: 23,
      status: 'active',
      parent: 1
    },
    {
      id: 3,
      name: 'Samsung',
      slug: 'samsung',
      description: 'Điện thoại Samsung Galaxy',
      productsCount: 22,
      status: 'active',
      parent: 1
    },
    {
      id: 4,
      name: 'Laptop',
      slug: 'laptop',
      description: 'Máy tính xách tay',
      productsCount: 28,
      status: 'active',
      parent: null
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent: ''
  });

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', parent: '' });
    setShowModal(true);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parent: category.parent?.toString() || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData, parent: formData.parent ? parseInt(formData.parent) : null }
          : cat
      ));
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...formData,
        parent: formData.parent ? parseInt(formData.parent) : null,
        productsCount: 0,
        status: 'active'
      };
      setCategories(prev => [...prev, newCategory]);
    }
    
    setShowModal(false);
    setFormData({ name: '', slug: '', description: '', parent: '' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa danh mục này?')) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
    }
  };

  const parentCategories = categories.filter(cat => cat.parent === null);
  const childCategories = categories.filter(cat => cat.parent !== null);

  const getCategoryWithChildren = (parentId: number) => {
    return childCategories.filter(cat => cat.parent === parentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Danh mục sản phẩm</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý danh mục và phân loại sản phẩm
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm danh mục</span>
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Tên danh mục</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Slug</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Mô tả</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Sản phẩm</th>
                <th className="text-right py-4 px-6 font-medium text-gray-900 dark:text-white">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {parentCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <FolderOpen className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                      {category.slug}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                      {category.description}
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                        {category.productsCount}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-1 text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Child Categories */}
                  {getCategoryWithChildren(category.id).map((child) => (
                    <tr key={child.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 bg-gray-25 dark:bg-gray-800/50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3 ml-8">
                          <Folder className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            {child.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        {child.slug}
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        {child.description}
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                          {child.productsCount}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(child)}
                            className="p-1 text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(child.id)}
                            className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tên danh mục *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Danh mục cha
                  </label>
                  <select
                    value={formData.parent}
                    onChange={(e) => setFormData({...formData, parent: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Không có</option>
                    {parentCategories.map(cat => (
                      <option key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    {editingCategory ? 'Cập nhật' : 'Thêm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategories;