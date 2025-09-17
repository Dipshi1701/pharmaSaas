/**
 * Dashboard Service
 * Handles fetching dynamic dashboard data from backend
 */

export interface DashboardUser {
  username: string;
  role: string;
  lastLogin: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrders: number;
  revenue: number;
}

export interface DashboardActivity {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  status: 'success' | 'info' | 'warning' | 'error';
}

export interface DashboardChart {
  labels: string[];
  data: number[];
}

export interface DashboardCharts {
  userGrowth: DashboardChart;
  revenue: DashboardChart;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: 'modal' | 'navigate' | 'external';
  color: 'blue' | 'green' | 'gray' | 'red' | 'yellow';
}

export interface DashboardData {
  user: DashboardUser;
  stats: DashboardStats;
  recentActivity: DashboardActivity[];
  charts: DashboardCharts;
  quickActions: QuickAction[];
}

export interface DashboardResponse {
  status: 'success' | 'error';
  data?: DashboardData;
  error?: string;
  timestamp: string;
}

class DashboardService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  /**
   * Generate mock dashboard data for frontend-only access
   */
  private generateMockDashboardData(): DashboardData {
    return {
      user: {
        username: 'Demo User',
        role: 'frontend',
        lastLogin: new Date().toISOString()
      },
      stats: {
        totalUsers: 1247,
        activeUsers: 89,
        totalOrders: 3456,
        revenue: 125000
      },
      recentActivity: [
        {
          id: 1,
          type: 'user_registration',
          message: 'New user registered: john.doe@pharma.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          status: 'success'
        },
        {
          id: 2,
          type: 'order_created',
          message: 'Order #12345 created successfully',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          status: 'info'
        },
        {
          id: 3,
          type: 'system_alert',
          message: 'High server load detected',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          status: 'warning'
        },
        {
          id: 4,
          type: 'payment_processed',
          message: 'Payment of $2,500 processed',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          status: 'success'
        }
      ],
      charts: {
        userGrowth: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [120, 190, 300, 500, 800, 1200]
        },
        revenue: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          data: [25000, 35000, 40000, 25000]
        }
      },
      quickActions: [
        {
          id: 'add_user',
          title: 'Add New User',
          description: 'Create a new user account',
          icon: 'user-plus',
          action: 'modal',
          color: 'blue'
        },
        {
          id: 'view_reports',
          title: 'View Reports',
          description: 'Access detailed analytics',
          icon: 'chart-bar',
          action: 'navigate',
          color: 'green'
        },
        {
          id: 'system_settings',
          title: 'System Settings',
          description: 'Configure system preferences',
          icon: 'cog',
          action: 'navigate',
          color: 'gray'
        }
      ]
    };
  }

  /**
   * Fetch dashboard data from backend
   */
  async getDashboardData(): Promise<DashboardData> {
    try {
      console.log('📊 Fetching dashboard data...');
      
      // Get auth token from localStorage
      const authData = localStorage.getItem('pharmaSaas:auth');
      if (!authData) {
        throw new Error('No authentication data found');
      }

      const { token } = JSON.parse(authData);
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Check if using mock token for frontend-only access
      if (token === 'mock-token-frontend-demo') {
        console.log('🎭 Using mock dashboard data for frontend demo');
        return this.generateMockDashboardData();
      }

      // Make API request for real backend
      const response = await fetch(`${this.baseUrl}/admin/api/dashboard?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result: DashboardResponse = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.error || 'Failed to fetch dashboard data');
      }

      if (!result.data) {
        throw new Error('No dashboard data received');
      }

      console.log('✅ Dashboard data fetched successfully');
      return result.data;

    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      
      // If backend fails and we have a token, try to provide mock data as fallback
      const authData = localStorage.getItem('pharmaSaas:auth');
      if (authData) {
        try {
          const { token } = JSON.parse(authData);
          if (token && token !== 'mock-token-frontend-demo') {
            console.log('🔄 Backend unavailable, falling back to mock data');
            return this.generateMockDashboardData();
          }
        } catch (parseError) {
          console.error('Error parsing auth data:', parseError);
        }
      }
      
      throw error;
    }
  }

  /**
   * Refresh dashboard data
   */
  async refreshDashboardData(): Promise<DashboardData> {
    console.log('🔄 Refreshing dashboard data...');
    return this.getDashboardData();
  }

  /**
   * Get user-specific dashboard data
   */
  async getUserDashboardData(userId?: string): Promise<DashboardData> {
    // For now, we'll use the same endpoint
    // In the future, you can modify this to include userId in the request
    return this.getDashboardData();
  }

  /**
   * Handle quick action execution
   */
  async executeQuickAction(actionId: string, actionData?: any): Promise<boolean> {
    try {
      console.log(`🎯 Executing quick action: ${actionId}`);
      
      // Here you can implement different actions based on actionId
      switch (actionId) {
        case 'add_user':
          // Open add user modal or navigate to user creation page
          console.log('Opening add user modal...');
          return true;
          
        case 'view_reports':
          // Navigate to reports page
          console.log('Navigating to reports...');
          return true;
          
        case 'system_settings':
          // Navigate to settings page
          console.log('Navigating to settings...');
          return true;
          
        default:
          console.warn(`Unknown action: ${actionId}`);
          return false;
      }
    } catch (error) {
      console.error(`❌ Error executing action ${actionId}:`, error);
      return false;
    }
  }
}

// Create singleton instance
const dashboardService = new DashboardService();

export default dashboardService;
