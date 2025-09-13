import React, { useState } from 'react';
import { Plus, Edit, Trash2, Menu, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';

const MenuManager: React.FC = () => {
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: 'Menu Header',
      location: 'header',
      items: [
        {
          id: 1,
          title: 'Trang chủ',
          url: '/',
          type: 'custom',
          order: 1,
          parent: null,
          children: []
        },
        {
          id: 2,
          title: 'Sản phẩm',
          url: '/products',
          type: 'category',
          order: 2,
          parent: null,
          children: [
            { id: 21, title: 'Điện thoại', url: '/products/dien-thoai', type: 'category', order: 1, parent: 2 },
            { id: 22, title: 'Laptop', url: '/products/laptop', type: 'category', order: 2, parent: 2 },
            { id: 23, title: 'Phụ kiện', url: '/products/phu-kien', type: 'category', order: 3, parent: 2 }
          ]
        },
        {
          id: 3,
          title: 'Tin tức',
          url: '/news',
          type: 'page',
          order: 3,
          parent: null,
          children: []
        },
        {
          id: 4,
          title: 'Liên hệ',
          url: '/contact',
          type: 'page',
          order: 4,
          parent: null,
          children: []
        }
      ]
    },
    {
      id: 2,
      name: 'Menu Footer',
      location: 'footer',
      items: [
        {
          id: 5,
          title: 'Về chúng tôi',
          url: '/about',
          type: 'page',
          order: 1,
          parent: null,
          children: []
        },
        {
          id: 6,
          title: 'Chính sách',
          url: '#',
          type: 'custom',
          order: 2,
          parent: null,
          children: [
            { id: 61, title: 'Chính sách bảo mật', url: '/privacy', type: 'page', order: 1, parent: 6 },
            { id: 62, title: 'Điều khoản sử dụng', url: '/terms', type: 'page', order: 2, parent: 6 }
          ]
        }
      ]
    }
  ]);

  const [selectedMenu, setSelectedMenu] = useState(1);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([2, 6]);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'custom',
    parent: ''
  });

  const itemTypes = [
    { value: 'custom', label: 'Link tùy chỉnh' },
    { value: 'page', label: 'Trang' },
    { value: 'category', label: 'Danh mục sản phẩm' },
    { value: 'post', label: 'Bài viết' }
  ];

  const currentMenu = menus.find(menu => menu.id === selectedMenu);
  const parentItems = currentMenu?.items.filter(item => !item.parent) || [];

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({ title: '', url: '', type: 'custom', parent: '' });
    setShowItemModal(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      url: item.url,
      type: item.type,
      parent: item.parent?.toString() || ''
    });
    setShowItemModal(true);
  };

  const handleSubmitItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      id: editingItem?.id || Math.max(...(currentMenu?.items.map(i => i.id) || [0])) + 1,
      ...formData,
      parent: formData.parent ? parseInt(formData.parent) : null,
      order: editingItem?.order || ((currentMenu?.items.length || 0) + 1),
      children: editingItem?.children || []
    };

    setMenus(prev => prev.map(menu => {
      if (menu.id === selectedMenu) {
        return {
          ...menu,
          items: editingItem 
            ? menu.items.map(item => item.id === editingItem.id ? newItem : item)
            : [...menu.items, newItem]
        };
      }
      return menu;
    }));
    
    setShowItemModal(false);
    setFormData({ title: '', url: '', type: 'custom', parent: '' });
  };

  const handleDeleteItem = (itemId: number) => {
    if (confirm('Bạn có chắc muốn xóa mục menu này?')) {
      setMenus(prev => prev.map(menu => {
        if (menu.id === selectedMenu) {
          return {
            ...menu,
            items: menu.items.filter(item => item.id !== itemId && item.parent !== itemId)
          };
        }
        return menu;
      }));
    }
  };

  const toggleExpanded = (itemId: number) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getItemChildren = (parentId: number) => {
    return currentMenu?.items.filter(item => item.parent === parentId) || [];
  };

  const renderMenuItem = (item: any, level = 0) => {
    const hasChildren = getItemChildren(item.id).length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const children = getItemChildren(item.id);

    return (
      <div key={item.id}>
        <div 
          className={`flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 ${
            level > 0 ? 'ml-8' : ''
          }`}
        >
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.id)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              {isExpanded ? 
                <ChevronDown className="w-4 h-4 text-gray-600" /> : 
                <ChevronRight className="w-4 h-4 text-gray-600" />
              }
            </button>
          )}
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
              <span className="px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                {itemTypes.find(type => type.value === item.type)?.label}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.url}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEditItem(item)}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {children.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Menu</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tạo và quản lý menu điều hướng cho website
          </p>
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm mục menu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Chọn menu</h3>
            <div className="space-y-2">
              {menus.map(menu => (
                <button
                  key={menu.id}
                  onClick={() => setSelectedMenu(menu.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center space-x-2 transition-colors ${
                    selectedMenu === menu.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Menu className="w-4 h-4" />
                  <div>
                    <p className="font-medium">{menu.name}</p>
                    <p className="text-xs opacity-75">{menu.location}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {currentMenu?.name} - Cấu trúc menu
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Kéo thả để sắp xếp lại
              </span>
            </div>
            
            {currentMenu && currentMenu.items.length > 0 ? (
              <div className="space-y-3">
                {parentItems.map(item => renderMenuItem(item))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Menu className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Chưa có mục menu nào</p>
                <p className="text-sm">Nhấp "Thêm mục menu" để bắt đầu</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
                {editingItem ? 'Chỉnh sửa mục menu' : 'Thêm mục menu mới'}
              </h3>
              
              <form onSubmit={handleSubmitItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL *
                  </label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="/example hoặc https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loại
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {itemTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Menu cha
                  </label>
                  <select
                    value={formData.parent}
                    onChange={(e) => setFormData({...formData, parent: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Không có (menu chính)</option>
                    {parentItems.map(item => (
                      <option key={item.id} value={item.id.toString()}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowItemModal(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    {editingItem ? 'Cập nhật' : 'Thêm'}
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

export default MenuManager;