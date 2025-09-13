import React, { useState } from 'react';
import { Plus, Edit, Trash2, Code, Type, Image, Calendar, ToggleLeft } from 'lucide-react';

const FieldFormats: React.FC = () => {
  const [formats, setFormats] = useState([
    {
      id: 1,
      name: 'Text Input',
      code: 'text',
      description: 'Trường nhập văn bản đơn giản',
      type: 'input',
      icon: 'Type',
      config: {
        placeholder: 'Nhập văn bản...',
        maxLength: 255,
        required: false
      },
      status: 'active',
      usageCount: 12
    },
    {
      id: 2,
      name: 'Rich Text Editor',
      code: 'richtext',
      description: 'Trình soạn thảo văn bản có định dạng',
      type: 'editor',
      icon: 'Edit',
      config: {
        toolbar: ['bold', 'italic', 'link', 'image'],
        height: 300
      },
      status: 'active',
      usageCount: 8
    },
    {
      id: 3,
      name: 'Image Upload',
      code: 'image',
      description: 'Tải lên và quản lý hình ảnh',
      type: 'media',
      icon: 'Image',
      config: {
        maxSize: '5MB',
        allowedTypes: ['jpg', 'png', 'gif'],
        multiple: false
      },
      status: 'active',
      usageCount: 15
    },
    {
      id: 4,
      name: 'Date Picker',
      code: 'date',
      description: 'Chọn ngày tháng',
      type: 'date',
      icon: 'Calendar',
      config: {
        format: 'DD/MM/YYYY',
        minDate: null,
        maxDate: null
      },
      status: 'active',
      usageCount: 6
    },
    {
      id: 5,
      name: 'Toggle Switch',
      code: 'toggle',
      description: 'Công tắc bật/tắt',
      type: 'boolean',
      icon: 'ToggleLeft',
      config: {
        defaultValue: false,
        labels: { on: 'Bật', off: 'Tắt' }
      },
      status: 'active',
      usageCount: 9
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingFormat, setEditingFormat] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: 'input',
    icon: 'Type',
    status: 'active'
  });

  const fieldTypes = [
    { value: 'input', label: 'Input Field', icon: Type },
    { value: 'editor', label: 'Text Editor', icon: Edit },
    { value: 'media', label: 'Media Upload', icon: Image },
    { value: 'date', label: 'Date/Time', icon: Calendar },
    { value: 'boolean', label: 'Boolean', icon: ToggleLeft },
    { value: 'select', label: 'Select/Dropdown', icon: Code }
  ];

  const iconOptions = ['Type', 'Edit', 'Image', 'Calendar', 'ToggleLeft', 'Code'];

  const handleAdd = () => {
    setEditingFormat(null);
    setFormData({ name: '', code: '', description: '', type: 'input', icon: 'Type', status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (format: any) => {
    setEditingFormat(format);
    setFormData({
      name: format.name,
      code: format.code,
      description: format.description,
      type: format.type,
      icon: format.icon,
      status: format.status
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFormat) {
      setFormats(prev => prev.map(format => 
        format.id === editingFormat.id 
          ? { ...format, ...formData }
          : format
      ));
    } else {
      const newFormat = {
        id: Math.max(...formats.map(f => f.id)) + 1,
        ...formData,
        config: {},
        usageCount: 0
      };
      setFormats(prev => [...prev, newFormat]);
    }
    
    setShowModal(false);
    setFormData({ name: '', code: '', description: '', type: 'input', icon: 'Type', status: 'active' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa định dạng field này?')) {
      setFormats(prev => prev.filter(format => format.id !== id));
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
    return fieldTypes.find(t => t.value === type) || fieldTypes[0];
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

  const renderIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Type, Edit, Image, Calendar, ToggleLeft, Code
    };
    const IconComponent = iconMap[iconName] || Type;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Định dạng Field</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý các loại field và định dạng hiển thị
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm định dạng</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formats.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tổng định dạng</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Type className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formats.filter(f => f.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Đang sử dụng</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Edit className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formats.reduce((sum, f) => sum + f.usageCount, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lượt sử dụng</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Image className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(formats.map(f => f.type)).size}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Loại field</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formats.map((format) => {
          const typeConfig = getTypeConfig(format.type);
          return (
            <div key={format.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    {renderIcon(format.icon)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {format.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format.code}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEdit(format)}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(format.id)}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {format.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Loại:</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {typeConfig.label}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Trạng thái:</span>
                  {getStatusBadge(format.status)}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sử dụng:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {format.usageCount} lần
                  </span>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Preview:</p>
                {format.type === 'input' && (
                  <input
                    type="text"
                    placeholder="Sample text input"
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    disabled
                  />
                )}
                {format.type === 'editor' && (
                  <div className="w-full h-16 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 flex items-center justify-center text-xs text-gray-500">
                    Rich Text Editor
                  </div>
                )}
                {format.type === 'media' && (
                  <div className="w-full h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded flex items-center justify-center text-xs text-gray-500">
                    Upload Image
                  </div>
                )}
                {format.type === 'date' && (
                  <input
                    type="date"
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                    disabled
                  />
                )}
                {format.type === 'boolean' && (
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Toggle option</span>
                  </div>
                )}
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
                {editingFormat ? 'Chỉnh sửa định dạng' : 'Thêm định dạng mới'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tên định dạng *
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Loại field
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {fieldTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>
                        {icon}
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
                    {editingFormat ? 'Cập nhật' : 'Thêm'}
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

export default FieldFormats;