'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Search, Filter, Eye, Edit, Trash2, Plus } from 'lucide-react';

interface User {
  id: string;
  email: string;
  role: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'naruceno' | 'u_izradi' | 'napravljeno' | 'placeno';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  success: boolean;
  orders: Order[];
  pagination: {
    current: number;
    total: number;
    count: number;
    totalOrders: number;
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalOrders: 0,
  });

  const router = useRouter();

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, searchTerm, statusFilter, currentPage]);

  const verifyAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      router.push('/login');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/orders?${params}`);
      const data: OrdersResponse = await response.json();

      if (data.success) {
        setOrders(data.orders);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hr-HR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hr-HR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      naruceno: 'bg-yellow-100 text-yellow-800',
      u_izradi: 'bg-purple-100 text-purple-800',
      napravljeno: 'bg-green-100 text-green-800',
      placeno: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      naruceno: 'Naručeno',
      u_izradi: 'U izradi',
      napravljeno: 'Napravljeno',
      placeno: 'Plaćeno',
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (loading && !user) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Učitavanje...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 font-playfair'>
                LaDelta Dashboard
              </h1>
              <p className='text-gray-600'>Dobrodošli, {user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className='flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors'
            >
              <LogOut className='w-5 h-5 mr-2' />
              Odjavi se
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-2xl font-bold text-gray-900'>
              {pagination.totalOrders}
            </div>
            <div className='text-gray-600'>Ukupno narudžbi</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-2xl font-bold text-yellow-600'>
              {orders.filter((o) => o.status === 'naruceno').length}
            </div>
            <div className='text-gray-600'>Naručeno</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-2xl font-bold text-purple-600'>
              {orders.filter((o) => o.status === 'u_izradi').length}
            </div>
            <div className='text-gray-600'>U izradi</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-2xl font-bold text-green-600'>
              {orders.filter((o) => o.status === 'napravljeno').length}
            </div>
            <div className='text-gray-600'>Napravljeno</div>
          </div>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='text-2xl font-bold text-gray-600'>
              {orders.filter((o) => o.status === 'placeno').length}
            </div>
            <div className='text-gray-600'>Plaćeno</div>
          </div>
        </div>

        {/* Filters */}
        <div className='bg-white rounded-lg shadow p-6 mb-8'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  type='text'
                  placeholder='Pretraži po imenu, emailu ili broju narudžbe...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
                />
              </div>
            </div>
            <div className='w-full md:w-48'>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
              >
                <option value='all'>Svi statusi</option>
                <option value='naruceno'>Naručeno</option>
                <option value='u_izradi'>U izradi</option>
                <option value='napravljeno'>Napravljeno</option>
                <option value='placeno'>Plaćeno</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>Narudžbe</h2>
          </div>

          {loading ? (
            <div className='p-8 text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto'></div>
              <p className='mt-4 text-gray-600'>Učitavanje narudžbi...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className='p-8 text-center text-gray-500'>
              Nema narudžbi za prikaz.
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Narudžba
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Kupac
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Dostava
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Iznos
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Naručeno
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {orders.map((order) => (
                    <tr key={order._id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            {order.orderNumber}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {order.items.length} stavka
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm font-medium text-gray-900'>
                            {order.customerName}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {order.customerEmail}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {order.customerPhone}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div>
                          <div className='text-sm text-gray-900'>
                            {formatDate(order.deliveryDate)}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {order.deliveryTime}
                          </div>
                          {order.deliveryAddress && (
                            <div className='text-sm text-gray-500'>
                              {order.deliveryAddress}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.total > 1 && (
            <div className='px-6 py-4 border-t border-gray-200 flex items-center justify-between'>
              <div className='text-sm text-gray-500'>
                Stranica {pagination.current} od {pagination.total}
              </div>
              <div className='flex space-x-2'>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className='px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Prethodna
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(pagination.total, currentPage + 1))
                  }
                  disabled={currentPage === pagination.total}
                  className='px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Sljedeća
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
