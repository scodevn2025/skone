import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/products/ProductList';
import ProductForm from './pages/products/ProductForm';
import ProductCategories from './pages/categories/ProductCategories';
import PostList from './pages/posts/PostList';
import PostForm from './pages/posts/PostForm';
import PostCategories from './pages/categories/PostCategories';
import OrderList from './pages/orders/OrderList';
import OrderDetail from './pages/orders/OrderDetail';
import MenuManager from './pages/menus/MenuManager';
import AdminUsers from './pages/admin/AdminUsers';
import MediaManager from './pages/media/MediaManager';
import HomeEditor from './pages/home/HomeEditor';
import FieldPositions from './pages/fields/FieldPositions';
import FieldFormats from './pages/fields/FieldFormats';

export type Page = 
  | 'dashboard'
  | 'products'
  | 'products/add'
  | 'products/edit'
  | 'product-categories'
  | 'posts'
  | 'posts/add'
  | 'posts/edit'
  | 'post-categories'
  | 'orders'
  | 'orders/detail'
  | 'menus'
  | 'admin'
  | 'media'
  | 'home'
  | 'field-positions'
  | 'field-formats';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductList onNavigate={setCurrentPage} />;
      case 'products/add':
      case 'products/edit':
        return <ProductForm onNavigate={setCurrentPage} />;
      case 'product-categories':
        return <ProductCategories />;
      case 'posts':
        return <PostList onNavigate={setCurrentPage} />;
      case 'posts/add':
      case 'posts/edit':
        return <PostForm onNavigate={setCurrentPage} />;
      case 'post-categories':
        return <PostCategories />;
      case 'orders':
        return <OrderList onNavigate={setCurrentPage} />;
      case 'orders/detail':
        return <OrderDetail onNavigate={setCurrentPage} />;
      case 'menus':
        return <MenuManager />;
      case 'admin':
        return <AdminUsers />;
      case 'media':
        return <MediaManager />;
      case 'home':
        return <HomeEditor />;
      case 'field-positions':
        return <FieldPositions />;
      case 'field-formats':
        return <FieldFormats />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={setSidebarOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        
        <main className="p-6">
          <Breadcrumb currentPage={currentPage} />
          <div className="mt-6">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;