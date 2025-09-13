import React, { useState } from 'react';
import { Plus, Edit, Trash2, Move, Grid, MapPin } from 'lucide-react';

const FieldPositions: React.FC = () => {
  const [positions, setPositions] = useState([
    {
      id: 1,
      name: 'Header Top',
      code: 'header_top',
      description: 'Vị trí trên cùng của header',
      type: 'global',
      status: 'active',
      fieldsCount: 3
    },
    {
      id: 2,
      name: 'Sidebar Left',
      code: 'sidebar_left',
      description: 'Thanh bên trái của trang',
      type: 'page',
      status: 'active',
      fieldsCount: 5
    },
    {
      id: 3,
      name: 'Content Before',
      code: 'content_before',
      description: 'Trước nội dung chính',
      type: 'content',
      status: 'active',
      fieldsCount: 2
    },
    {
      id: 4,
      name: 'Footer Bottom',
      code: 'footer_bottom',
      description: 'Cuối trang footer',
      type: 'global',
      status: 'inactive',
      fieldsCount: 1
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPosition, setEditingPosition] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: 'page',
    status: 'active'
  });

  const positionTypes = [
    { value: 'global', label: 'Toàn cục', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
    { value: 'page', label: 'Trang', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    { value: 'content', label: 'Nội dung', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    { value: 'widget', label: 'Widget', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' }
  ];

  const handleAdd = () => {
    setEditingPosition(null);
    setFormData({ name: '', code: '', description: '', type: 'page', status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (position: any) => {
    setEditingPosition(position);
    setFormData({
      name: position.name,
      code: position.code,
      description: position.description,
      type: position.type,
      status: position.status
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPosition) {
      setPositions(prev => prev.map(pos => 
        pos.id === editingPosition.id ? { ...pos, ...formData } : pos
      ));
    } else {
      const newPosition = {
        id: Math.max(...positions.map(p => p.id)) + 1,
        ...formData,
        fieldsCount: 0
      };
      setPositions(prev => [...prev, newPosition]);
    }
    
    setShowModal(false);
    setFormData({ name: '', code: '', description: '', type: 'page', status: 'active' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa vị trí này?')) {
      setPositions(prev => prev.filter(pos => pos.id !== id));
    }
  };

  const generateCode = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .trim();
  };

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      code: generateCode(value)
    }));
  };

  const getTypeConfig = (type: string) => {
    return positionTypes.find(t => t.value === type) || positionTypes[0];
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
        Hoạt động
      </span>
    ) : (
      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
        Tạm dừng
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vị trí Field</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý các vị trí hiển thị field trong giao diện
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm vị trí</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {positionTypes.map(type => {
          const count = positions.filter(p => p.type === type.value).length;
          return (
            <div key={type.value} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${type.color.replace('text-', 'text-').replace('bg-', 'bg-').split(' ')[0]}`}>
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((position) => {
          const typeConfig = getTypeConfig(position.type);
          return (
            <div key={position.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Grid className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {position.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {position.code}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEdit(position)}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(position.id)}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {position.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${typeConfig.color}`}>
                    {typeConfig.label}
                  </span>
                  {getStatusBadge(position.status)}
                </div>
                <div className="flex items-center space-x-2">
                  <Move className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {position.fieldsCount} field
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
                {editingPosition ? 'Chỉnh sửa vị trí' : 'Thêm vị trí mới'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tên vị trí *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mã code *
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Sử dụng trong code: {`{field_position('${formData.code}')}`}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loại vị trí
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {positionTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm dừng</option>
                  </select>
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
                    {editingPosition ? 'Cập nhật' : 'Thêm'}
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

export default FieldPositions;