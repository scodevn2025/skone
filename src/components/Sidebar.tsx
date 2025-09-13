import React, { useState, useEffect } from 'react';
import { 
  Home, Package, FolderOpen, FileText, ShoppingCart, 
  Folder, Menu, Users, Image, MapPin, Sliders, ChevronDown, ChevronRight
} from 'lucide-react';
import type { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  page?: Page;
  children?: {
    title: string;
    page: Page;
  }[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Trang chủ',
    icon: Home,
    page: 'dashboard'
  },
  {
    id: 'products',
    title: 'Sản phẩm',
    icon: Package,
    children: [
      { title: 'Danh sách', page: 'products' },
      { title: 'Thêm mới', page: 'products/add' }
    ]
  },
  {
    id: 'product-categories',
    title: 'Danh mục sản phẩm',
    icon: FolderOpen,
    page: 'product-categories'
  },
  {
    id: 'posts',
    title: 'Tin tức',
    icon: FileText,
    children: [
      { title: 'Danh sách', page: 'posts' },
      { title: 'Thêm mới', page: 'posts/add' }
    ]
  },
  {
    id: 'orders',
    title: 'Quản lý đơn hàng',
    icon: ShoppingCart,
    children: [
      { title: 'Danh sách đơn hàng', page: 'orders' },
      { title: 'Chi tiết đơn hàng', page: 'orders/detail' }
    ]
  },
  {
    id: 'post-categories',
    title: 'Danh mục Tin tức',
    icon: Folder,
    page: 'post-categories'
  },
  {
    id: 'menus',
    title: 'Menus',
    icon: Menu,
    page: 'menus'
  },
  {
    id: 'admin',
    title: 'Admin',
    icon: Users,
    page: 'admin'
  },
  {
    id: 'media',
    title: 'Quản lý ảnh',
    icon: Image,
    page: 'media'
  },
  {
    id: 'home',
    title: 'Trang chủ',
    icon: Home,
    page: 'home'
  },
  {
    id: 'field-positions',
    title: 'Vị trí field',
    icon: MapPin,
    page: 'field-positions'
  },
  {
    id: 'field-formats',
    title: 'Định dạng Field',
    icon: Sliders,
    page: 'field-formats'
  }
];

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-expanded');
    if (saved) {
      setExpandedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', JSON.stringify(expandedItems));
  }, [expandedItems]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else if (item.page) {
      onNavigate(item.page);
      setMobileMenuOpen(false);
    }
  };

  const isActive = (page: Page | undefined) => {
    if (!page) return false;
    if (page === currentPage) return true;
    if (page === 'products' && currentPage.startsWith('products')) return true;
    if (page === 'posts' && currentPage.startsWith('posts')) return true;
    if (page === 'orders' && currentPage.startsWith('orders')) return true;
    return false;
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          {(isOpen || mobileMenuOpen) && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">CMS & eCommerce</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isItemExpanded = expandedItems.includes(item.id);
          
          return (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                className={`
                  w-full flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200
                  ${isActive(item.page) 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                  ${!isOpen && !mobileMenuOpen ? 'justify-center' : 'justify-between'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {(isOpen || mobileMenuOpen) && (
                    <span className="truncate">{item.title}</span>
                  )}
                </div>
                {item.children && (isOpen || mobileMenuOpen) && (
                  <div className="flex-shrink-0">
                    {isItemExpanded ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </div>
                )}
              </button>

              {/* Submenu */}
              {item.children && (isOpen || mobileMenuOpen) && isItemExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.page}
                      onClick={() => {
                        onNavigate(child.page);
                        setMobileMenuOpen(false);
                      }}
                      className={`
                        w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200
                        ${isActive(child.page)
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }
                      `}
                    >
                      {child.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-16'}
        hidden lg:flex lg:flex-col
      `}>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className="relative flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            {sidebarContent}
          </aside>
        </div>
      </div>
    </>
  );
};

export default Sidebar;