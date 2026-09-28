# SP Company LTD - Frontend Development Guide

## 👋 Welcome to SP Company LTD Frontend Development

This comprehensive guide will help you get started with developing the SP Company LTD automotive platform frontend using our community-based architecture.

---

## 🚀 Quick Start

### **Prerequisites**

```bash
# Required tools
Node.js >= 18.0.0
pnpm >= 8.0.0
Git >= 2.30.0

# Recommended VS Code extensions
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- Prettier
- ESLint
```

### **Project Setup**

```bash
# Clone repository
git clone https://bitbucket.org/hedayaglobalsolutions/sp-company-ltd.git
cd sp-company-ltd/frontend

# Install dependencies
pnpm install

# Start development servers
pnpm run dev:all          # Start all applications
pnpm run dev:web          # Start web app only
pnpm run dev:mobile       # Start mobile app only
pnpm run dev:admin        # Start admin panel only
pnpm run dev:storybook    # Start component documentation
```

---

## 🏗️ Project Architecture

### **Monorepo Structure**

```
frontend/
├── apps/                     # Applications
│   ├── web-app/             # Next.js web application
│   ├── mobile-app/          # React Native mobile app
│   ├── admin-panel/         # Admin dashboard
│   └── storybook/           # Component documentation
├── communities/             # Feature-based communities (11)
├── shared/                  # Shared components and utilities
└── tools/                   # Development tools
```

### **Community-Based Architecture**

Each community is a self-contained module with:

- **Components** - UI components specific to the community
- **Pages** - Application pages and screens
- **Hooks** - Custom React hooks for business logic
- **Services** - API integration services
- **Stores** - State management (Zustand)
- **Types** - TypeScript type definitions
- **Utils** - Utility functions and helpers
- **Tests** - Test suites for the community

---

## 💻 Development Workflow

### **1. Creating a New Community**

```bash
# Generate new community structure
pnpm run generate:community --name="vehicle-auction"

# Generated structure
communities/vehicle-auction-community/
├── components/
├── pages/
├── hooks/
├── services/
├── stores/
├── types/
├── utils/
├── tests/
└── package.json
```

### **2. Creating Components**

```bash
# Generate component with template
pnpm run generate:component \
  --community="vehicle-management" \
  --name="VehicleCard" \
  --type="card"

# Generated files
components/cards/VehicleCard/
├── VehicleCard.tsx
├── VehicleCard.module.css
├── VehicleCard.stories.tsx
├── VehicleCard.test.tsx
└── index.ts
```

### **3. Component Development Pattern**

```typescript
// components/cards/VehicleCard/VehicleCard.tsx
import React from 'react';
import { Vehicle } from '../../../types';
import { useVehicleCard } from './useVehicleCard';
import styles from './VehicleCard.module.css';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (vehicle: Vehicle) => void;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  variant = 'default',
  className
}) => {
  const { isFavorite, handleFavorite, handleSelect } = useVehicleCard(vehicle, onSelect);

  return (
    <article
      className={`${styles.vehicleCard} ${styles[variant]} ${className || ''}`}
      data-testid="vehicle-card"
    >
      <div className={styles.imageContainer}>
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          className={styles.image}
        />
        <button
          className={styles.favoriteBtn}
          onClick={handleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className={styles.price}>${vehicle.price.toLocaleString()}</p>
        <p className={styles.mileage}>{vehicle.mileage.toLocaleString()} miles</p>
      </div>

      <button
        className={styles.selectBtn}
        onClick={handleSelect}
      >
        View Details
      </button>
    </article>
  );
};

export default VehicleCard;
```

### **4. Hook Development Pattern**

```typescript
// components/cards/VehicleCard/useVehicleCard.ts
import { useState, useCallback } from 'react';
import { Vehicle } from '../../../types';
import { useVehicleStore } from '../../../stores';
import { vehicleService } from '../../../services';

export const useVehicleCard = (
  vehicle: Vehicle,
  onSelect?: (vehicle: Vehicle) => void
) => {
  const { favorites, addToFavorites, removeFromFavorites } = useVehicleStore();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = favorites.includes(vehicle.id);

  const handleFavorite = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isFavorite) {
        await vehicleService.removeFromFavorites(vehicle.id);
        removeFromFavorites(vehicle.id);
      } else {
        await vehicleService.addToFavorites(vehicle.id);
        addToFavorites(vehicle.id);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isFavorite, vehicle.id, addToFavorites, removeFromFavorites]);

  const handleSelect = useCallback(() => {
    onSelect?.(vehicle);
  }, [onSelect, vehicle]);

  return {
    isFavorite,
    isLoading,
    handleFavorite,
    handleSelect,
  };
};
```

### **5. Service Development Pattern**

```typescript
// services/vehicleService/vehicleService.ts
import { apiClient } from '../../../shared/services/api';
import { Vehicle, VehicleFilters, CreateVehicleData } from '../../types';
import { VEHICLE_ENDPOINTS } from '../../constants';

export class VehicleService {
  async getVehicles(filters?: VehicleFilters): Promise<Vehicle[]> {
    const response = await apiClient.get(VEHICLE_ENDPOINTS.LIST, {
      params: filters,
    });
    return response.data;
  }

  async getVehicle(id: string): Promise<Vehicle> {
    const response = await apiClient.get(`${VEHICLE_ENDPOINTS.DETAIL}/${id}`);
    return response.data;
  }

  async createVehicle(data: CreateVehicleData): Promise<Vehicle> {
    const response = await apiClient.post(VEHICLE_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async addToFavorites(vehicleId: string): Promise<void> {
    await apiClient.post(`${VEHICLE_ENDPOINTS.FAVORITES}/${vehicleId}`);
  }

  async removeFromFavorites(vehicleId: string): Promise<void> {
    await apiClient.delete(`${VEHICLE_ENDPOINTS.FAVORITES}/${vehicleId}`);
  }
}

export const vehicleService = new VehicleService();
```

---

## 🎯 State Management

### **Redux Slice Development Pattern**

```typescript
// stores/vehicleStore/vehicleStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Vehicle, VehicleFilters } from '../../types';

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  favorites: string[];
  filters: VehicleFilters;
  isLoading: boolean;
  error: string | null;
}

interface VehicleActions {
  setVehicles: (vehicles: Vehicle[]) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  addToFavorites: (vehicleId: string) => void;
  removeFromFavorites: (vehicleId: string) => void;
  setFilters: (filters: VehicleFilters) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useVehicleStore = create<VehicleState & VehicleActions>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        vehicles: [],
        selectedVehicle: null,
        favorites: [],
        filters: {},
        isLoading: false,
        error: null,

        // Actions
        setVehicles: (vehicles) => set({ vehicles }),
        setSelectedVehicle: (selectedVehicle) => set({ selectedVehicle }),
        addToFavorites: (vehicleId) =>
          set((state) => ({
            favorites: [...state.favorites, vehicleId],
          })),
        removeFromFavorites: (vehicleId) =>
          set((state) => ({
            favorites: state.favorites.filter((id) => id !== vehicleId),
          })),
        setFilters: (filters) => set({ filters }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'vehicle-store',
        partialize: (state) => ({
          favorites: state.favorites,
          filters: state.filters,
        }),
      }
    )
  )
);
```

---

## 🧪 Testing Strategy

### **Component Testing**

```typescript
// components/cards/VehicleCard/VehicleCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VehicleCard } from './VehicleCard';
import { mockVehicle } from '../../../tests/fixtures';

describe('VehicleCard', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders vehicle information correctly', () => {
    render(<VehicleCard vehicle={mockVehicle} onSelect={mockOnSelect} />);

    expect(screen.getByText('2023 BMW X5')).toBeInTheDocument();
    expect(screen.getByText('$55,000')).toBeInTheDocument();
    expect(screen.getByText('15,000 miles')).toBeInTheDocument();
  });

  it('calls onSelect when view details is clicked', () => {
    render(<VehicleCard vehicle={mockVehicle} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText('View Details'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockVehicle);
  });

  it('toggles favorite status when favorite button is clicked', async () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const favoriteBtn = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteBtn);

    await waitFor(() => {
      expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
    });
  });
});
```

### **Hook Testing**

```typescript
// hooks/useVehicles/useVehicles.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useVehicles } from './useVehicles';
import { vehicleService } from '../../services';

jest.mock('../../services');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useVehicles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches vehicles successfully', async () => {
    const mockVehicles = [{ id: '1', make: 'BMW', model: 'X5' }];
    vehicleService.getVehicles.mockResolvedValue(mockVehicles);

    const { result } = renderHook(() => useVehicles(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockVehicles);
    });
  });
});
```

### **E2E Testing**

```typescript
// e2e/vehicle-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Vehicle Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/vehicles');
  });

  test('should display vehicle listings', async ({ page }) => {
    await expect(
      page.locator('[data-testid="vehicle-card"]').first()
    ).toBeVisible();
    await expect(page.locator('h3').first()).toContainText('BMW');
  });

  test('should filter vehicles by make', async ({ page }) => {
    await page.fill('[data-testid="search-input"]', 'BMW');
    await page.click('[data-testid="search-button"]');

    await expect(page.locator('[data-testid="vehicle-card"]')).toHaveCount(5);
    await expect(page.locator('h3').first()).toContainText('BMW');
  });

  test('should navigate to vehicle details', async ({ page }) => {
    await page.click('[data-testid="vehicle-card"]:first-child');
    await expect(page.locator('h1')).toContainText('Vehicle Details');
  });
});
```

---

## 🎨 Styling Guidelines

### **Tailwind CSS Usage**

```typescript
// Example component with Tailwind classes
const VehicleCard = ({ vehicle, variant = 'default' }) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105';
  const variantClasses = {
    default: 'w-full max-w-sm',
    compact: 'w-64 h-80',
    featured: 'w-full max-w-md border-2 border-blue-500'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="relative">
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
          ❤️
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-2xl font-bold text-blue-600 mb-1">
          ${vehicle.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          {vehicle.mileage.toLocaleString()} miles
        </p>
      </div>

      <div className="px-4 pb-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};
```

### **CSS Modules for Complex Styling**

```css
/* VehicleCard.module.css */
.vehicleCard {
  @apply bg-white rounded-lg shadow-md overflow-hidden transition-transform;
}

.vehicleCard:hover {
  @apply scale-105;
}

.imageContainer {
  @apply relative;
}

.image {
  @apply w-full h-48 object-cover;
}

.favoriteBtn {
  @apply absolute top-2 right-2 p-2 bg-white rounded-full shadow-md;
  @apply hover:bg-gray-50 transition-colors;
}

.content {
  @apply p-4;
}

.title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.price {
  @apply text-2xl font-bold text-blue-600 mb-1;
}

.mileage {
  @apply text-sm text-gray-600;
}

.selectBtn {
  @apply w-full bg-blue-600 text-white py-2 rounded-md;
  @apply hover:bg-blue-700 transition-colors mx-4 mb-4;
}

/* Responsive variants */
@media (max-width: 640px) {
  .vehicleCard {
    @apply w-full;
  }

  .image {
    @apply h-40;
  }
}
```

---

## 🔗 API Integration

### **Service Configuration**

```typescript
// shared/services/api/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../../stores/authStore';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for auth token
    this.client.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh
          const refreshToken = useAuthStore.getState().refreshToken;
          if (refreshToken) {
            try {
              const response = await this.client.post('/auth/refresh', {
                refresh_token: refreshToken,
              });

              useAuthStore.getState().setToken(response.data.access_token);

              // Retry original request
              return this.client.request(error.config);
            } catch (refreshError) {
              useAuthStore.getState().logout();
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config);
    return response.data;
  }
}

export const apiClient = new APIClient();
```

### **React Query Integration**

```typescript
// hooks/useVehicles/useVehicles.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import { Vehicle, VehicleFilters } from '../../types';

export const useVehicles = (filters?: VehicleFilters) => {
  return useQuery({
    queryKey: ['vehicles', filters],
    queryFn: () => vehicleService.getVehicles(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehicleService.createVehicle,
    onSuccess: (newVehicle) => {
      // Invalidate and refetch vehicles list
      queryClient.invalidateQueries(['vehicles']);

      // Add the new vehicle to the cache
      queryClient.setQueryData(['vehicle', newVehicle.id], newVehicle);
    },
  });
};
```

---

## 📱 Mobile Development with Flutter

### **Flutter Application Setup**

```dart
// apps/mobile-app/lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'app.dart';
import 'store/app_state.dart';
import 'store/app_reducer.dart';
import 'services/api_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize services
  await ApiService.initialize();

  // Create Redux store
  final store = Store<AppState>(
    appReducer,
    initialState: AppState.initial(),
    middleware: [
      // Add middleware for async actions, logging, etc.
    ],
  );

  runApp(SPCompanyApp(store: store));
}

class SPCompanyApp extends StatelessWidget {
  final Store<AppState> store;

  const SPCompanyApp({Key? key, required this.store}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StoreProvider<AppState>(
      store: store,
      child: MaterialApp(
        title: 'SP Company LTD',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          useMaterial3: true,
        ),
        home: const AppNavigator(),
      ),
    );
  }
}
```

### **Flutter Widget Development**

```dart
// apps/mobile-app/lib/widgets/vehicle_card.dart
import 'package:flutter/material.dart';
import '../models/vehicle.dart';
import '../store/app_state.dart';
import '../store/actions/vehicle_actions.dart';
import 'package:flutter_redux/flutter_redux.dart';

class VehicleCard extends StatelessWidget {
  final Vehicle vehicle;
  final VoidCallback? onTap;

  const VehicleCard({
    Key? key,
    required this.vehicle,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, bool>(
      converter: (store) => store.state.vehicleState.favorites.contains(vehicle.id),
      builder: (context, isFavorite) {
        return Card(
          margin: const EdgeInsets.all(8.0),
          elevation: 3,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
          ),
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Stack(
                  children: [
                    ClipRRect(
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(8.0),
                      ),
                      child: Image.network(
                        vehicle.images.isNotEmpty ? vehicle.images[0] : '',
                        height: 200,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            height: 200,
                            color: Colors.grey[300],
                            child: const Icon(Icons.image_not_supported),
                          );
                        },
                      ),
                    ),
                    Positioned(
                      top: 8,
                      right: 8,
                      child: Container(
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                        ),
                        child: IconButton(
                          onPressed: () {
                            StoreProvider.of<AppState>(context).dispatch(
                              isFavorite
                                  ? RemoveFromFavoritesAction(vehicle.id)
                                  : AddToFavoritesAction(vehicle.id),
                            );
                          },
                          icon: Icon(
                            isFavorite ? Icons.favorite : Icons.favorite_border,
                            color: isFavorite ? Colors.red : Colors.grey,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${vehicle.year} ${vehicle.make} ${vehicle.model}',
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '\$${vehicle.price.toString().replaceAllMapped(
                          RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'),
                          (Match m) => '${m[1]},',
                        )}',
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF2563EB),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${vehicle.mileage.toString().replaceAllMapped(
                          RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'),
                          (Match m) => '${m[1]},',
                        )} miles',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
```

---

## 🔧 Development Tools

### **VS Code Configuration**

```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### **Useful Scripts**

```json
// package.json scripts
{
  "scripts": {
    "dev:all": "turbo run dev --parallel",
    "dev:web": "turbo run dev --filter=web-app",
    "dev:mobile": "turbo run dev --filter=mobile-app",
    "dev:admin": "turbo run dev --filter=admin-panel",
    "dev:storybook": "turbo run storybook --filter=storybook",

    "build:all": "turbo run build",
    "test:all": "turbo run test",
    "lint:all": "turbo run lint",
    "type-check:all": "turbo run type-check",

    "generate:component": "node tools/generators/component.js",
    "generate:community": "node tools/generators/community.js",
    "generate:page": "node tools/generators/page.js",

    "analyze:bundle": "turbo run analyze",
    "test:coverage": "turbo run test:coverage",
    "test:e2e": "turbo run test:e2e"
  }
}
```

---

## 🚀 Deployment Workflow

### **Local Development**

```bash
# Start development environment
pnpm run dev:all

# Run specific application
pnpm run dev:web        # Web app at http://localhost:3000
pnpm run dev:mobile     # Mobile app via Expo
pnpm run dev:admin      # Admin panel at http://localhost:3001
pnpm run dev:storybook  # Storybook at http://localhost:6006
```

### **Testing**

```bash
# Run all tests
pnpm run test:all

# Run specific test types
pnpm run test:unit       # Unit tests
pnpm run test:integration # Integration tests
pnpm run test:e2e        # End-to-end tests
pnpm run test:coverage   # Coverage report
```

### **Production Build**

```bash
# Build all applications
pnpm run build:all

# Build specific applications
pnpm run build:web      # Web application
pnpm run build:mobile   # Mobile application
pnpm run build:admin    # Admin panel
```

---

## 🎯 Best Practices

### **Code Organization**

- ✅ Keep components small and focused
- ✅ Use custom hooks for business logic
- ✅ Implement proper error boundaries
- ✅ Follow consistent naming conventions
- ✅ Write comprehensive tests
- ✅ Document components with Storybook

### **Performance**

- ✅ Use React.memo for expensive components
- ✅ Implement proper lazy loading
- ✅ Optimize images with Next.js Image
- ✅ Monitor bundle size
- ✅ Use React Query for server state

### **Accessibility**

- ✅ Use semantic HTML elements
- ✅ Provide proper ARIA labels
- ✅ Ensure keyboard navigation
- ✅ Maintain color contrast ratios
- ✅ Test with screen readers

### **Security**

- ✅ Sanitize user inputs
- ✅ Use HTTPS everywhere
- ✅ Implement proper authentication
- ✅ Validate all data client-side
- ✅ Keep dependencies updated

This development guide provides everything you need to start building amazing automotive platform features using our community-based architecture! 🚗✨
