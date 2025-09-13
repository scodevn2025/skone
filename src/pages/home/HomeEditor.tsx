import React, { useState } from 'react';
import { Save, Eye, Undo, Redo, Settings, Layout, Palette, Type } from 'lucide-react';

const HomeEditor: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isPreview, setIsPreview] = useState(false);

  const sections = [
    { id: 'hero', name: 'Hero Banner', icon: Layout },
    { id: 'features', name: 'Tính năng', icon: Settings },
    { id: 'products', name: 'Sản phẩm nổi bật', icon: Layout },
    { id: 'testimonials', name: 'Đánh giá', icon: Type },
    { id: 'cta', name: 'Call to Action', icon: Palette }
  ];

  const [heroData, setHeroData] = useState({
    title: 'Chào mừng đến với cửa hàng công nghệ',
    subtitle: 'Khám phá những sản phẩm công nghệ mới nhất với giá tốt nhất',
    buttonText: 'Mua ngay',
    buttonLink: '/products',
    backgroundImage: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
    overlayOpacity: 50
  });

  const [featuresData, setFeaturesData] = useState([
    {
      id: 1,
      icon: '🚚',
      title: 'Giao hàng miễn phí',
      description: 'Miễn phí giao hàng cho đơn từ 500k'
    },
    {
      id: 2,
      icon: '🔒',
      title: 'Thanh toán an toàn',
      description: 'Bảo mật thông tin 100%'
    },
    {
      id: 3,
      icon: '🏆',
      title: 'Chất lượng cao',
      description: 'Sản phẩm chính hãng, bảo hành tốt'
    }
  ]);

  const handleSave = () => {
    console.log('Saving homepage changes...');
    // API call to save changes
  };

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chỉnh sửa Hero Banner</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tiêu đề chính
                </label>
                <input
                  type="text"
                  value={heroData.title}
                  onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tiêu đề phụ
                </label>
                <textarea
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nút CTA
                  </label>
                  <input
                    type="text"
                    value={heroData.buttonText}
                    onChange={(e) => setHeroData({...heroData, buttonText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Link
                  </label>
                  <input
                    type="text"
                    value={heroData.buttonLink}
                    onChange={(e) => setHeroData({...heroData, buttonLink: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ảnh nền
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={heroData.backgroundImage}
                    onChange={(e) => setHeroData({...heroData, backgroundImage: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    Chọn ảnh
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Độ mờ overlay: {heroData.overlayOpacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={heroData.overlayOpacity}
                  onChange={(e) => setHeroData({...heroData, overlayOpacity: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chỉnh sửa Tính năng</h3>
            
            <div className="space-y-4">
              {featuresData.map((feature, index) => (
                <div key={feature.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Icon
                      </label>
                      <input
                        type="text"
                        value={feature.icon}
                        onChange={(e) => {
                          const newFeatures = [...featuresData];
                          newFeatures[index].icon = e.target.value;
                          setFeaturesData(newFeatures);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tiêu đề
                      </label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...featuresData];
                          newFeatures[index].title = e.target.value;
                          setFeaturesData(newFeatures);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mô tả
                    </label>
                    <textarea
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...featuresData];
                        newFeatures[index].description = e.target.value;
                        setFeaturesData(newFeatures);
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              Chọn một section để chỉnh sửa
            </p>
          </div>
        );
    }
  };

  const renderPreview = () => {
    if (activeSection === 'hero') {
      return (
        <div 
          className="relative h-96 rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${heroData.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: heroData.overlayOpacity / 100 }}
          ></div>
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white p-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{heroData.title}</h1>
              <p className="text-xl mb-6">{heroData.subtitle}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
                {heroData.buttonText}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === 'features') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresData.map((feature) => (
            <div key={feature.id} className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Preview sẽ hiển thị ở đây
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chỉnh sửa trang chủ</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tùy chỉnh giao diện và nội dung trang chủ
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Undo className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Redo className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsPreview(!isPreview)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              isPreview 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{isPreview ? 'Chỉnh sửa' : 'Preview'}</span>
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Sections</h3>
            <div className="space-y-1">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {isPreview ? (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Preview - {sections.find(s => s.id === activeSection)?.name}
                </h3>
                {renderPreview()}
              </div>
            ) : (
              <div className="p-6">
                {renderSectionEditor()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEditor;