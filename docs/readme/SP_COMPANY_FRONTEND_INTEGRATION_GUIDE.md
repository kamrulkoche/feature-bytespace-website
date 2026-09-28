# SP Company LTD - Frontend Integration Guide

## 🔗 Backend API Integration Documentation

This guide provides comprehensive instructions for integrating the SP Company LTD frontend applications with the backend microservices architecture.

---

## 🏗️ Integration Architecture Overview

### **Frontend ↔ Backend Community Mapping**

| Frontend Community       | Backend Microservices                           | Integration Type     |
| ------------------------ | ----------------------------------------------- | -------------------- |
| **User Management**      | user-service, auth-service, account-service     | REST + WebSocket     |
| **Vehicle Management**   | vehicle-inventory, vehicle-details, pricing     | REST + Real-time     |
| **Search & Discovery**   | search-engine, cache-service, recommendations   | REST + Elasticsearch |
| **Auction Management**   | auction-service, bidding-service, notifications | WebSocket + REST     |
| **Payment & Financial**  | payment-gateway, transaction, billing           | REST + Webhooks      |
| **Shipping & Logistics** | shipping-service, tracking-service, logistics   | REST + WebSocket     |
| **Notification**         | notification-service, email, sms, push          | WebSocket + REST     |
| **Content Management**   | content-service, media-service, testimonials    | REST + File Upload   |
| **Analytics & Insights** | analytics-service, reporting, data-pipeline     | REST + WebSocket     |
| **Communication**        | chat-service, support-service, chatbot          | WebSocket + REST     |
| **Infrastructure**       | health-monitoring, logging, config-management   | REST + WebSocket     |

---

## 🌐 API Client Configuration

### **Base API Client Setup**

```typescript
// shared/services/api/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../../stores/authStore';
import { APIError, APIResponse } from '../../types/api.types';

class APIClient {
  private client: AxiosInstance;
  private refreshingToken = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId();

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => this.handleSuccessResponse(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  private async handleErrorResponse(error: any): Promise<never> {
    const { response, config } = error;

    if (response?.status === 401 && !config._retry) {
      return this.handleTokenRefresh(error);
    }

    return Promise.reject(this.createAPIError(error));
  }

  private async handleTokenRefresh(error: any): Promise<any> {
    const { config } = error;
    const refreshToken = useAuthStore.getState().refreshToken;

    if (!refreshToken) {
      useAuthStore.getState().logout();
      return Promise.reject(this.createAPIError(error));
    }

    if (this.refreshingToken) {
      return new Promise((resolve) => {
        this.refreshSubscribers.push((token: string) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(this.client.request(config));
        });
      });
    }

    this.refreshingToken = true;
    config._retry = true;

    try {
      const response = await this.client.post('/auth/refresh', {
        refresh_token: refreshToken,
      });

      const { access_token } = response.data;
      useAuthStore.getState().setToken(access_token);

      this.refreshSubscribers.forEach((callback) => callback(access_token));
      this.refreshSubscribers = [];

      config.headers.Authorization = `Bearer ${access_token}`;
      return this.client.request(config);
    } catch (refreshError) {
      useAuthStore.getState().logout();
      return Promise.reject(this.createAPIError(refreshError));
    } finally {
      this.refreshingToken = false;
    }
  }

  private handleSuccessResponse(response: AxiosResponse): AxiosResponse {
    // Log successful requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  }

  private createAPIError(error: any): APIError {
    const apiError: APIError = {
      message: error.response?.data?.message || error.message || 'Unknown error',
      status: error.response?.status || 0,
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      details: error.response?.data?.details || null,
      timestamp: new Date().toISOString(),
      requestId: error.config?.headers?.[''X-Request-ID'] || null,
    };

    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, apiError);
    }

    return apiError;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public API methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.delete(url, config);
    return response.data;
  }

  // File upload method
  async upload<T = any>(
    url: string,
    file: File | FormData,
    onUploadProgress?: (progress: number) => void
  ): Promise<APIResponse<T>> {
    const formData = file instanceof FormData ? file : new FormData();
    if (file instanceof File) {
      formData.append('file', file);
    }

    const response = await this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onUploadProgress(Math.round(progress));
        }
      },
    });

    return response.data;
  }
}

export const apiClient = new APIClient();
```

---

## 🔥 GraphQL Integration for Dynamic Queries

### **GraphQL Integration Architecture**

SP Company LTD backend now includes GraphQL services alongside REST APIs for dynamic user queries:

| Community                | REST API | GraphQL API | Use Case                            |
| ------------------------ | -------- | ----------- | ----------------------------------- |
| **User Management**      | ✅       | ✅          | Dynamic user profiles, preferences  |
| **Vehicle Management**   | ✅       | ✅          | Complex vehicle searches, inventory |
| **Search & Discovery**   | ✅       | ✅          | Dynamic filters, recommendations    |
| **Auction Management**   | ✅       | ✅          | Real-time auction data, bidding     |
| **Payment & Financial**  | ✅       | ✅          | Financial dashboards, analytics     |
| **Analytics & Insights** | ✅       | ✅          | Business intelligence, reporting    |
| **Other Communities**    | ✅       | -           | Standard CRUD operations            |

### **GraphQL Client Integration with RTK Query**

```typescript
// services/graphqlService/graphqlClient.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';

const graphqlClient = new GraphQLClient('/graphql', {
  headers: () => ({
    Authorization: `Bearer ${getAuthToken()}`,
  }),
});

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: graphqlRequestBaseQuery({ client: graphqlClient }),
  tagTypes: ['Vehicle', 'User', 'Auction', 'Payment'],
  endpoints: (builder) => ({
    // Complex Vehicle Search with GraphQL
    searchVehicles: builder.query<SearchResult, VehicleSearchInput>({
      query: (searchInput) => ({
        document: gql`
          query SearchVehicles($search: VehicleSearchInput!) {
            vehicles(search: $search) {
              edges {
                node {
                  id
                  make
                  model
                  year
                  price
                  mileage
                  condition
                  location {
                    city
                    distance
                  }
                  images(limit: 3)
                  specifications {
                    engine
                    transmission
                    fuelType
                  }
                }
              }
              pageInfo {
                hasNextPage
                totalCount
              }
            }
          }
        `,
        variables: { search: searchInput },
      }),
      providesTags: ['Vehicle'],
    }),

    // Real-time Auction Updates
    subscribeToAuction: builder.subscription<
      AuctionUpdate,
      { auctionId: string }
    >({
      query: ({ auctionId }) => ({
        document: gql`
          subscription AuctionUpdates($auctionId: ID!) {
            auctionUpdates(auctionId: $auctionId) {
              id
              currentBid {
                amount
                bidder {
                  username
                }
              }
              timeRemaining
              bidCount
            }
          }
        `,
        variables: { auctionId },
      }),
    }),

    // Analytics Dashboard Query
    getAnalyticsDashboard: builder.query<AnalyticsDashboard, DateRange>({
      query: (dateRange) => ({
        document: gql`
          query AnalyticsDashboard($dateRange: DateRange!) {
            marketInsights {
              topSellingMakes(limit: 5) {
                make
                salesCount
                averagePrice
              }
            }
            salesMetrics(dateRange: $dateRange) {
              totalSales
              totalRevenue
              monthlyBreakdown {
                month
                sales
                revenue
              }
            }
          }
        `,
        variables: { dateRange },
      }),
      providesTags: ['Analytics'],
    }),
  }),
});

export const {
  useSearchVehiclesQuery,
  useSubscribeToAuctionSubscription,
  useGetAnalyticsDashboardQuery,
} = graphqlApi;
```

### **GraphQL Hooks for Dynamic Queries**

```typescript
// hooks/useGraphQLVehicleSearch/useGraphQLVehicleSearch.ts
import { useState, useMemo } from 'react';
import { useSearchVehiclesQuery } from '../../services/graphqlService';
import type { VehicleSearchInput, VehicleFilter } from '../../types';

export const useGraphQLVehicleSearch = () => {
  const [searchInput, setSearchInput] = useState<VehicleSearchInput>({
    keywords: '',
    location: null,
    filters: {},
    sort: { field: 'PRICE', direction: 'ASC' },
    pagination: { limit: 20, offset: 0 },
  });

  const { data, isLoading, isFetching, error, refetch } =
    useSearchVehiclesQuery(searchInput, {
      skip: !searchInput.keywords && !searchInput.location,
      // Refetch when search input changes
      refetchOnFocus: false,
      refetchOnReconnect: true,
    });

  const vehicles = useMemo(
    () => data?.vehicles?.edges?.map((edge) => edge.node) || [],
    [data]
  );

  const hasNextPage = data?.vehicles?.pageInfo?.hasNextPage || false;
  const totalCount = data?.vehicles?.pageInfo?.totalCount || 0;

  const updateSearch = (newSearch: Partial<VehicleSearchInput>) => {
    setSearchInput((prev) => ({
      ...prev,
      ...newSearch,
      // Reset pagination when filters change
      pagination: newSearch.filters
        ? { limit: 20, offset: 0 }
        : prev.pagination,
    }));
  };

  const loadMore = () => {
    if (hasNextPage) {
      setSearchInput((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          offset: prev.pagination.offset + prev.pagination.limit,
        },
      }));
    }
  };

  return {
    vehicles,
    isLoading,
    isFetching,
    error,
    hasNextPage,
    totalCount,
    searchInput,
    updateSearch,
    loadMore,
    refetch,
  };
};
```

### **Real-time GraphQL Subscriptions**

```typescript
// hooks/useLiveAuctionSubscription/useLiveAuctionSubscription.ts
import { useEffect, useState } from 'react';
import { useSubscribeToAuctionSubscription } from '../../services/graphqlService';
import type { AuctionUpdate } from '../../types';

export const useLiveAuctionSubscription = (auctionId: string) => {
  const [auctionData, setAuctionData] = useState<AuctionUpdate | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting');

  const { data, error, isLoading } = useSubscribeToAuctionSubscription(
    { auctionId },
    {
      skip: !auctionId,
      pollingInterval: 0, // Use WebSocket instead of polling
      onCompleted: () => setConnectionStatus('connected'),
      onError: () => setConnectionStatus('disconnected'),
    }
  );

  useEffect(() => {
    if (data?.auctionUpdates) {
      setAuctionData(data.auctionUpdates);
    }
  }, [data]);

  return {
    auctionData,
    connectionStatus,
    isLoading,
    error,
  };
};
```

---

## 🚗 Community Integration Examples

### **1. User Management Community Integration**

```typescript
// services/userService/userService.ts
import { apiClient } from '../../../shared/services/api';
import {
  User,
  CreateUserData,
  UpdateUserData,
  LoginCredentials,
} from '../../types';

export class UserService {
  private readonly BASE_PATH = '/api/v1/users';

  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; tokens: { access: string; refresh: string } }> {
    return await apiClient.post('/auth/login', credentials);
  }

  async register(userData: CreateUserData): Promise<User> {
    return await apiClient.post('/auth/register', userData);
  }

  async getCurrentUser(): Promise<User> {
    return await apiClient.get(`${this.BASE_PATH}/me`);
  }

  async updateProfile(userId: string, data: UpdateUserData): Promise<User> {
    return await apiClient.put(`${this.BASE_PATH}/${userId}`, data);
  }

  async uploadAvatar(
    userId: string,
    file: File
  ): Promise<{ avatar_url: string }> {
    return await apiClient.upload(`${this.BASE_PATH}/${userId}/avatar`, file);
  }

  async changePassword(
    userId: string,
    data: { currentPassword: string; newPassword: string }
  ): Promise<void> {
    return await apiClient.post(
      `${this.BASE_PATH}/${userId}/change-password`,
      data
    );
  }

  async resetPassword(email: string): Promise<void> {
    return await apiClient.post('/auth/reset-password', { email });
  }

  async verifyEmail(token: string): Promise<void> {
    return await apiClient.post('/auth/verify-email', { token });
  }
}

export const userService = new UserService();
```

### **2. Vehicle Management Community Integration**

```typescript
// services/vehicleService/vehicleService.ts
import { apiClient } from '../../../shared/services/api';
import {
  Vehicle,
  VehicleFilters,
  CreateVehicleData,
  VehicleImage,
} from '../../types';

export class VehicleService {
  private readonly BASE_PATH = '/api/v1/vehicles';

  async getVehicles(
    filters?: VehicleFilters
  ): Promise<{
    vehicles: Vehicle[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params = this.buildFilterParams(filters);
    return await apiClient.get(`${this.BASE_PATH}`, { params });
  }

  async getVehicle(id: string): Promise<Vehicle> {
    return await apiClient.get(`${this.BASE_PATH}/${id}`);
  }

  async createVehicle(data: CreateVehicleData): Promise<Vehicle> {
    return await apiClient.post(this.BASE_PATH, data);
  }

  async updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    return await apiClient.put(`${this.BASE_PATH}/${id}`, data);
  }

  async deleteVehicle(id: string): Promise<void> {
    return await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  async uploadVehicleImages(
    vehicleId: string,
    files: File[]
  ): Promise<VehicleImage[]> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    return await apiClient.upload(
      `${this.BASE_PATH}/${vehicleId}/images`,
      formData
    );
  }

  async deleteVehicleImage(vehicleId: string, imageId: string): Promise<void> {
    return await apiClient.delete(
      `${this.BASE_PATH}/${vehicleId}/images/${imageId}`
    );
  }

  async getFeaturedVehicles(): Promise<Vehicle[]> {
    return await apiClient.get(`${this.BASE_PATH}/featured`);
  }

  async addToFavorites(vehicleId: string): Promise<void> {
    return await apiClient.post(`${this.BASE_PATH}/${vehicleId}/favorite`);
  }

  async removeFromFavorites(vehicleId: string): Promise<void> {
    return await apiClient.delete(`${this.BASE_PATH}/${vehicleId}/favorite`);
  }

  private buildFilterParams(filters?: VehicleFilters): Record<string, any> {
    if (!filters) return {};

    const params: Record<string, any> = {};

    if (filters.make) params.make = filters.make;
    if (filters.model) params.model = filters.model;
    if (filters.yearFrom) params.year_from = filters.yearFrom;
    if (filters.yearTo) params.year_to = filters.yearTo;
    if (filters.priceFrom) params.price_from = filters.priceFrom;
    if (filters.priceTo) params.price_to = filters.priceTo;
    if (filters.mileageFrom) params.mileage_from = filters.mileageFrom;
    if (filters.mileageTo) params.mileage_to = filters.mileageTo;
    if (filters.location) params.location = filters.location;
    if (filters.radius) params.radius = filters.radius;
    if (filters.sortBy) params.sort_by = filters.sortBy;
    if (filters.sortOrder) params.sort_order = filters.sortOrder;
    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;

    return params;
  }
}

export const vehicleService = new VehicleService();
```

### **3. Auction Management Community Integration**

```typescript
// services/auctionService/auctionService.ts
import { apiClient } from '../../../shared/services/api';
import { Auction, Bid, CreateAuctionData, PlaceBidData } from '../../types';

export class AuctionService {
  private readonly BASE_PATH = '/api/v1/auctions';

  async getAuctions(
    status?: 'upcoming' | 'live' | 'ended'
  ): Promise<Auction[]> {
    const params = status ? { status } : {};
    return await apiClient.get(this.BASE_PATH, { params });
  }

  async getAuction(id: string): Promise<Auction> {
    return await apiClient.get(`${this.BASE_PATH}/${id}`);
  }

  async createAuction(data: CreateAuctionData): Promise<Auction> {
    return await apiClient.post(this.BASE_PATH, data);
  }

  async placeBid(auctionId: string, bidData: PlaceBidData): Promise<Bid> {
    return await apiClient.post(`${this.BASE_PATH}/${auctionId}/bids`, bidData);
  }

  async getBidHistory(auctionId: string): Promise<Bid[]> {
    return await apiClient.get(`${this.BASE_PATH}/${auctionId}/bids`);
  }

  async setupAutoBid(
    auctionId: string,
    data: { maxAmount: number; increment: number }
  ): Promise<void> {
    return await apiClient.post(
      `${this.BASE_PATH}/${auctionId}/auto-bid`,
      data
    );
  }

  async cancelAutoBid(auctionId: string): Promise<void> {
    return await apiClient.delete(`${this.BASE_PATH}/${auctionId}/auto-bid`);
  }

  async joinAuction(
    auctionId: string
  ): Promise<{ success: boolean; websocket_url: string }> {
    return await apiClient.post(`${this.BASE_PATH}/${auctionId}/join`);
  }

  async leaveAuction(auctionId: string): Promise<void> {
    return await apiClient.post(`${this.BASE_PATH}/${auctionId}/leave`);
  }

  async getMyBids(): Promise<Bid[]> {
    return await apiClient.get('/api/v1/my-bids');
  }

  async getWonAuctions(): Promise<Auction[]> {
    return await apiClient.get('/api/v1/my-wins');
  }
}

export const auctionService = new AuctionService();
```

---

## 🔌 WebSocket Integration

### **WebSocket Manager**

```typescript
// shared/services/websocket/websocketManager.ts
interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig;
  private reconnectAttempts = 0;
  private maxReconnectAttempts: number;
  private reconnectInterval: number;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private reconnectTimer: NodeJS.Timeout | null = null;

  constructor(config: WebSocketConfig) {
    this.config = config;
    this.maxReconnectAttempts = config.reconnectAttempts || 5;
    this.reconnectInterval = config.reconnectInterval || 3000;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const token = useAuthStore.getState().token;
        const wsUrl = `${this.config.url}?token=${token}`;

        this.ws = new WebSocket(wsUrl, this.config.protocols);

        this.ws.onopen = (event) => {
          console.log('✅ WebSocket connected:', this.config.url);
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('❌ Failed to parse WebSocket message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = (event) => {
          console.log('🔌 WebSocket closed:', event.code, event.reason);
          this.handleDisconnection();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(message: WebSocketMessage) {
    const listeners = this.listeners.get(message.type);
    if (listeners) {
      listeners.forEach((callback) => callback(message.data));
    }

    // Global message handler
    const globalListeners = this.listeners.get('*');
    if (globalListeners) {
      globalListeners.forEach((callback) => callback(message));
    }
  }

  private handleDisconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      );

      this.reconnectTimer = setTimeout(() => {
        this.connect().catch((error) => {
          console.error('❌ Reconnection failed:', error);
        });
      }, this.reconnectInterval);
    } else {
      console.error('❌ Max reconnection attempts reached');
    }
  }

  send(type: string, data: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type,
        data,
        timestamp: new Date().toISOString(),
      };
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('⚠️ WebSocket is not connected');
    }
  }

  subscribe(messageType: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(messageType)) {
      this.listeners.set(messageType, new Set());
    }
    this.listeners.get(messageType)!.add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(messageType);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(messageType);
        }
      }
    };
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.listeners.clear();
    this.reconnectAttempts = 0;
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
```

### **Auction WebSocket Hook**

```typescript
// hooks/useLiveAuction/useLiveAuction.ts
import { useState, useEffect, useCallback } from 'react';
import { WebSocketManager } from '../../../shared/services/websocket';
import { Auction, Bid } from '../../types';

interface UseLiveAuctionReturn {
  auction: Auction | null;
  bids: Bid[];
  participants: number;
  isConnected: boolean;
  placeBid: (amount: number) => Promise<void>;
  error: string | null;
}

export const useLiveAuction = (auctionId: string): UseLiveAuctionReturn => {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [participants, setParticipants] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wsManager, setWsManager] = useState<WebSocketManager | null>(null);

  useEffect(() => {
    if (!auctionId) return;

    const manager = new WebSocketManager({
      url: `${process.env.NEXT_PUBLIC_WS_URL}/auctions/${auctionId}`,
      reconnectAttempts: 5,
      reconnectInterval: 3000,
    });

    setWsManager(manager);

    const connectWebSocket = async () => {
      try {
        await manager.connect();
        setIsConnected(true);
        setError(null);
      } catch (err) {
        setError('Failed to connect to auction');
        setIsConnected(false);
      }
    };

    connectWebSocket();

    // Subscribe to auction events
    const unsubscribeAuction = manager.subscribe(
      'auction_update',
      (data: Auction) => {
        setAuction(data);
      }
    );

    const unsubscribeBid = manager.subscribe('new_bid', (data: Bid) => {
      setBids((prevBids) => [data, ...prevBids]);
    });

    const unsubscribeParticipants = manager.subscribe(
      'participants_update',
      (data: { count: number }) => {
        setParticipants(data.count);
      }
    );

    const unsubscribeError = manager.subscribe(
      'error',
      (data: { message: string }) => {
        setError(data.message);
      }
    );

    return () => {
      unsubscribeAuction();
      unsubscribeBid();
      unsubscribeParticipants();
      unsubscribeError();
      manager.disconnect();
    };
  }, [auctionId]);

  const placeBid = useCallback(
    async (amount: number) => {
      if (!wsManager || !wsManager.isConnected) {
        throw new Error('Not connected to auction');
      }

      wsManager.send('place_bid', {
        auction_id: auctionId,
        amount,
        timestamp: new Date().toISOString(),
      });
    },
    [wsManager, auctionId]
  );

  return {
    auction,
    bids,
    participants,
    isConnected,
    placeBid,
    error,
  };
};
```

---

## 📊 React Query Integration

### **Query Configuration**

```typescript
// shared/config/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false,
    },
  },
});
```

### **Query Hooks Pattern**

```typescript
// hooks/useVehicles/useVehicles.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { vehicleService } from '../../services';
import { Vehicle, VehicleFilters } from '../../types';

// Fetch vehicles with filters
export const useVehicles = (filters?: VehicleFilters) => {
  return useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => vehicleService.getVehicles(filters),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Infinite scroll for vehicles
export const useInfiniteVehicles = (filters?: VehicleFilters) => {
  return useInfiniteQuery({
    queryKey: ['vehicles', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      vehicleService.getVehicles({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, total, limit } = lastPage;
      const hasMore = page * limit < total;
      return hasMore ? page + 1 : undefined;
    },
  });
};

// Single vehicle
export const useVehicle = (id: string) => {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleService.getVehicle(id),
    enabled: !!id,
  });
};

// Create vehicle mutation
export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehicleService.createVehicle,
    onSuccess: (newVehicle) => {
      // Invalidate vehicles list
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });

      // Add to cache
      queryClient.setQueryData(['vehicle', newVehicle.id], newVehicle);

      // Update infinite query cache
      queryClient.setQueryData(['vehicles', 'infinite'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                vehicles: [newVehicle, ...page.vehicles],
                total: page.total + 1,
              };
            }
            return page;
          }),
        };
      });
    },
    onError: (error) => {
      console.error('Failed to create vehicle:', error);
    },
  });
};

// Update vehicle mutation
export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Vehicle> }) =>
      vehicleService.updateVehicle(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['vehicle', id] });

      // Snapshot previous value
      const previousVehicle = queryClient.getQueryData(['vehicle', id]);

      // Optimistically update
      if (previousVehicle) {
        queryClient.setQueryData(['vehicle', id], {
          ...previousVehicle,
          ...data,
        });
      }

      return { previousVehicle };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousVehicle) {
        queryClient.setQueryData(
          ['vehicle', variables.id],
          context.previousVehicle
        );
      }
    },
    onSuccess: (updatedVehicle) => {
      // Update all relevant caches
      queryClient.setQueryData(['vehicle', updatedVehicle.id], updatedVehicle);
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
};
```

---

## 🔒 Authentication Integration

### **Auth Store with Token Management**

```typescript
// stores/authStore/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  login: (user: User, tokens: { access: string; refresh: string }) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setLoading: (isLoading) => set({ isLoading }),

      login: (user, tokens) =>
        set({
          user,
          token: tokens.access,
          refreshToken: tokens.refresh,
          isAuthenticated: true,
        }),

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });

        // Clear all cached data
        queryClient.clear();

        // Redirect to login
        window.location.href = '/login';
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### **Protected Route Component**

```typescript
// components/auth/ProtectedRoute/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../../stores/authStore';
import { userService } from '../../../services/userService';
import { LoadingSpinner } from '../../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  fallback = <LoadingSpinner />
}) => {
  const router = useRouter();
  const { isAuthenticated, user, token, setUser, logout } = useAuthStore();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      if (!token) {
        router.push('/login');
        return;
      }

      // If we have a token but no user, fetch user data
      if (token && !user) {
        try {
          const userData = await userService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          logout();
          return;
        }
      }

      // Check role permissions
      if (requiredRoles.length > 0 && user) {
        const hasRequiredRole = requiredRoles.some(role =>
          user.roles?.includes(role)
        );

        if (!hasRequiredRole) {
          router.push('/unauthorized');
          return;
        }
      }

      setIsValidating(false);
    };

    validateAuth();
  }, [token, user, requiredRoles, router, setUser, logout]);

  if (!isAuthenticated || isValidating) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
```

---

## 📡 Real-time Features Integration

### **Live Notifications Hook**

```typescript
// hooks/useNotifications/useNotifications.ts
import { useState, useEffect } from 'react';
import { WebSocketManager } from '../../../shared/services/websocket';
import { Notification } from '../../types';
import { useAuthStore } from '../../../stores/authStore';

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  isConnected: boolean;
}

export const useNotifications = (): UseNotificationsReturn => {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [wsManager, setWsManager] = useState<WebSocketManager | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    const manager = new WebSocketManager({
      url: `${process.env.NEXT_PUBLIC_WS_URL}/notifications`,
      reconnectAttempts: 5,
      reconnectInterval: 3000,
    });

    setWsManager(manager);

    const connectWebSocket = async () => {
      try {
        await manager.connect();
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect to notifications:', error);
        setIsConnected(false);
      }
    };

    connectWebSocket();

    // Subscribe to notification events
    const unsubscribe = manager.subscribe(
      'new_notification',
      (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);

        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/icons/notification.png',
          });
        }
      }
    );

    return () => {
      unsubscribe();
      manager.disconnect();
    };
  }, [user]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    if (wsManager?.isConnected) {
      wsManager.send('mark_read', { notification_id: id });
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );

    if (wsManager?.isConnected) {
      wsManager.send('mark_all_read', {});
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    isConnected,
  };
};
```

---

## 🔍 Search Integration with Elasticsearch

### **Search Service with Advanced Features**

```typescript
// services/searchService/searchService.ts
import { apiClient } from '../../../shared/services/api';
import {
  SearchResults,
  SearchFilters,
  SearchSuggestion,
  SavedSearch,
} from '../../types';

export class SearchService {
  private readonly BASE_PATH = '/api/v1/search';

  async searchVehicles(
    query: string,
    filters?: SearchFilters
  ): Promise<SearchResults> {
    const params = {
      q: query,
      ...this.buildSearchParams(filters),
    };
    return await apiClient.get(`${this.BASE_PATH}/vehicles`, { params });
  }

  async getSuggestions(query: string): Promise<SearchSuggestion[]> {
    return await apiClient.get(`${this.BASE_PATH}/suggestions`, {
      params: { q: query },
    });
  }

  async getPopularSearches(): Promise<string[]> {
    return await apiClient.get(`${this.BASE_PATH}/popular`);
  }

  async saveSearch(searchData: {
    query: string;
    filters?: SearchFilters;
    name?: string;
  }): Promise<SavedSearch> {
    return await apiClient.post(`${this.BASE_PATH}/saved`, searchData);
  }

  async getSavedSearches(): Promise<SavedSearch[]> {
    return await apiClient.get(`${this.BASE_PATH}/saved`);
  }

  async deleteSavedSearch(id: string): Promise<void> {
    return await apiClient.delete(`${this.BASE_PATH}/saved/${id}`);
  }

  async getSearchHistory(): Promise<string[]> {
    return await apiClient.get(`${this.BASE_PATH}/history`);
  }

  async clearSearchHistory(): Promise<void> {
    return await apiClient.delete(`${this.BASE_PATH}/history`);
  }

  private buildSearchParams(filters?: SearchFilters): Record<string, any> {
    if (!filters) return {};

    const params: Record<string, any> = {};

    if (filters.make?.length) params.makes = filters.make.join(',');
    if (filters.model?.length) params.models = filters.model.join(',');
    if (filters.priceRange) {
      params.price_min = filters.priceRange.min;
      params.price_max = filters.priceRange.max;
    }
    if (filters.yearRange) {
      params.year_min = filters.yearRange.min;
      params.year_max = filters.yearRange.max;
    }
    if (filters.mileageRange) {
      params.mileage_min = filters.mileageRange.min;
      params.mileage_max = filters.mileageRange.max;
    }
    if (filters.location) {
      params.location = filters.location;
      params.radius = filters.radius || 50;
    }
    if (filters.features?.length) params.features = filters.features.join(',');
    if (filters.bodyType?.length)
      params.body_types = filters.bodyType.join(',');
    if (filters.transmission) params.transmission = filters.transmission;
    if (filters.fuelType?.length)
      params.fuel_types = filters.fuelType.join(',');
    if (filters.sortBy) params.sort_by = filters.sortBy;
    if (filters.sortOrder) params.sort_order = filters.sortOrder;
    if (filters.page) params.page = filters.page;
    if (filters.limit) params.limit = filters.limit;

    return params;
  }
}

export const searchService = new SearchService();
```

---

## 📊 Error Handling Strategy

### **Global Error Handler**

```typescript
// shared/utils/errorHandler.ts
import { toast } from 'react-hot-toast';
import { APIError } from '../types/api.types';

export class ErrorHandler {
  static handle(error: any, context?: string): void {
    console.error(`Error in ${context}:`, error);

    if (error instanceof APIError || error?.status) {
      this.handleAPIError(error);
    } else if (error instanceof Error) {
      this.handleGenericError(error);
    } else {
      this.handleUnknownError(error);
    }
  }

  private static handleAPIError(error: APIError): void {
    const { status, message, code } = error;

    switch (status) {
      case 400:
        toast.error(message || 'Invalid request');
        break;
      case 401:
        toast.error('Please log in to continue');
        // Handled by API client (token refresh/logout)
        break;
      case 403:
        toast.error('You do not have permission to perform this action');
        break;
      case 404:
        toast.error('The requested resource was not found');
        break;
      case 409:
        toast.error('This action conflicts with the current state');
        break;
      case 422:
        toast.error(message || 'Validation error');
        break;
      case 429:
        toast.error('Too many requests. Please try again later');
        break;
      case 500:
        toast.error('Server error. Please try again');
        break;
      case 503:
        toast.error('Service temporarily unavailable');
        break;
      default:
        toast.error(message || 'An unexpected error occurred');
    }

    // Send to error tracking service
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error);
    }
  }

  private static handleGenericError(error: Error): void {
    toast.error(error.message || 'An unexpected error occurred');

    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error);
    }
  }

  private static handleUnknownError(error: any): void {
    toast.error('An unexpected error occurred');

    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(new Error(JSON.stringify(error)));
    }
  }
}

// Usage in components
export const useErrorHandler = () => {
  return (error: any, context?: string) => {
    ErrorHandler.handle(error, context);
  };
};
```

---

## 🎯 Environment Configuration

### **Environment Variables**

```bash
# .env.local
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8001

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=sp-company.auth0.com
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Payment Integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your-google-maps-key
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_ANALYTICS_ID=GA-your-id

# Feature Flags
NEXT_PUBLIC_ENABLE_LIVE_CHAT=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Development
NODE_ENV=development
```

This comprehensive integration guide provides everything needed to connect your frontend communities with the backend microservices, ensuring seamless data flow and real-time functionality across your SP Company LTD automotive platform! 🚗✨
