import React, { useState } from 'react';
import { Upload, Search, Filter, Grid, List, Download, Trash2, Edit, Eye, FolderPlus, Folder } from 'lucide-react';

const MediaManager: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const folders = [
    { id: 'all', name: 'Tất cả', count: 24 },
    { id: 'products', name: 'Sản phẩm', count: 12 },
    { id: 'posts', name: 'Bài viết', count: 8 },
    { id: 'banners', name: 'Banner', count: 4 }
  ];

  const mediaItems = [
    {
      id: 1,
      name: 'iphone-15-pro-max.jpg',
      type: 'image',
      size: '2.4 MB',
      folder: 'products',
      uploadDate: '2024-01-15',
      url: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
      dimensions: '1920x1080'
    },
    {
      id: 2,
      name: 'macbook-pro-m3.jpg',
      type: 'image',
      size: '3.1 MB',
      folder: 'products',
      uploadDate: '2024-01-14',
      url: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      dimensions: '1920x1280'
    },
    {
      id: 3,
      name: 'tech-news-banner.jpg',
      type: 'image',
      size: '1.8 MB',
      folder: 'banners',
      uploadDate: '2024-01-13',
      url: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
      dimensions: '1200x600'
    },
    {
      id: 4,
      name: 'blog-post-header.jpg',
      type: 'image',
      size: '2.2 MB',
      folder: 'posts',
      uploadDate: '2024-01-12',
      url: 'https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=400',
      dimensions: '1600x900'
    },
    {
      id: 5,
      name: 'product-showcase.jpg',
      type: 'image',
      size: '2.7 MB',
      folder: 'products',
      uploadDate: '2024-01-11',
      url: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400',
      dimensions: '1920x1200'
    },
    {
      id: 6,
      name: 'homepage-banner.jpg',
      type: 'image',
      size: '3.5 MB',
      folder: 'banners',
      uploadDate: '2024-01-10',
      url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      dimensions: '2000x1000'
    }
  ];

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredItems.length 
        ? [] 
        : filteredItems.map(item => item.id)
    );
  };

  const handleDelete = (itemIds: number[]) => {
    if (confirm(`Bạn có chắc muốn xóa ${itemIds.length} file?`)) {
      console.log('Deleting items:', itemIds);
      setSelectedItems([]);
    }
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getFileIcon = (type: string) => {
    // For this example, all items are images
    return (
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-xs">IMG</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Media</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tải lên và quản lý hình ảnh, video và file
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => console.log('Create folder')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Tạo thư mục</span>
          </button>
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Tải lên</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Thư mục</h3>
            <div className="space-y-1">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                    selectedFolder === folder.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Folder className="w-4 h-4" />
                    <span>{folder.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {folder.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Toolbar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm file..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                {selectedItems.length > 0 && (
                  <>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedItems.length} đã chọn
                    </span>
                    <button
                      onClick={() => handleDelete(selectedItems)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg flex items-center space-x-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Xóa</span>
                    </button>
                  </>
                )}
                
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Media Grid/List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            {filteredItems.length > 0 && (
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredItems.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Chọn tất cả
                </label>
              </div>
            )}

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedItems.includes(item.id)
                        ? 'border-blue-500 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="absolute top-2 left-2 z-10 w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                    />
                    
                    <div className="aspect-square relative">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                            <Eye className="w-4 h-4 text-gray-700" />
                          </button>
                          <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                            <Download className="w-4 h-4 text-gray-700" />
                          </button>
                          <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                            <Edit className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-gray-50 dark:bg-gray-700">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg border transition-all ${
                      selectedItems.includes(item.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.dimensions} • {item.size} • {formatDate(item.uploadDate)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-green-600">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-yellow-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm ? 'Không tìm thấy file nào' : 'Chưa có file nào trong thư mục này'}
                </p>
                <button
                  onClick={handleUpload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Tải file đầu tiên
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
                Tải lên file mới
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Kéo thả file vào đây hoặc nhấp để chọn
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block"
                >
                  Chọn file
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Hỗ trợ: JPG, PNG, GIF, MP4 (tối đa 10MB)
                </p>
              </div>
              
              <div className="flex space-x-4 pt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    console.log('Upload files');
                    setShowUploadModal(false);
                  }}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Tải lên
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;