import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import type { Page } from '../App';

interface BreadcrumbProps {
  currentPage: Page;
}

const pageTitles: Record<Page, { title: string; parent?: string }> = {
  'dashboard': { title: 'Dashboard' },
  'products': { title: 'Danh sách sản phẩm', parent: 'Sản phẩm' },
  'products/add': { title: 'Thêm sản phẩm mới', parent: 'Sản phẩm' },
  'products/edit': { title: 'Chỉnh sửa sản phẩm', parent: 'Sản phẩm' },
  'product-categories': { title: 'Danh mục sản phẩm' },
  'posts': { title: 'Danh sách bài viết', parent: 'Tin tức' },
  'posts/add': { title: 'Thêm bài viết mới', parent: 'Tin tức' },
  'posts/edit': { title: 'Chỉnh sửa bài viết', parent: 'Tin tức' },
  'post-categories': { title: 'Danh mục tin tức' },
  'orders': { title: 'Danh sách đơn hàng', parent: 'Đơn hàng' },
  'orders/detail': { title: 'Chi tiết đơn hàng', parent: 'Đơn hàng' },
  'menus': { title: 'Quản lý Menu' },
  'admin': { title: 'Quản lý Admin' },
  'media': { title: 'Quản lý ảnh' },
  'home': { title: 'Trang chủ' },
  'field-positions': { title: 'Vị trí Field' },
  'field-formats': { title: 'Định dạng Field' }
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage }) => {
  const pageInfo = pageTitles[currentPage];
  
  if (!pageInfo) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      <Home className="w-4 h-4" />
      <ChevronRight className="w-4 h-4" />
      
      {pageInfo.parent && (
        <>
          <span>{pageInfo.parent}</span>
          <ChevronRight className="w-4 h-4" />
        </>
      )}
      
      <span className="text-gray-900 dark:text-white font-medium">
        {pageInfo.title}
      </span>
    </nav>
  );
};

export default Breadcrumb;