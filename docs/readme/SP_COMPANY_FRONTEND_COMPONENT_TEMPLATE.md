# SP Company LTD - Frontend Component Template Structure

## 🎨 Single Community Component Template: `vehicle-management-community`

This template demonstrates the complete structure for any frontend community within the SP Company LTD ecosystem, following proven enterprise React architecture patterns.

```
communities/vehicle-management-community/
├── components/                           # Community UI components
│   ├── forms/                           # Form components
│   │   ├── VehicleForm/                 # Vehicle form component
│   │   │   ├── VehicleForm.tsx          # Main form component
│   │   │   ├── VehicleForm.module.css   # Component styles
│   │   │   ├── VehicleForm.stories.tsx  # Storybook stories
│   │   │   ├── VehicleForm.test.tsx     # Component tests
│   │   │   └── index.ts                 # Component exports
│   │   ├── VehicleSearchForm/
│   │   │   ├── VehicleSearchForm.tsx
│   │   │   ├── SearchFilters.tsx        # Sub-component
│   │   │   ├── SearchInput.tsx          # Sub-component
│   │   │   ├── VehicleSearchForm.module.css
│   │   │   ├── VehicleSearchForm.stories.tsx
│   │   │   ├── VehicleSearchForm.test.tsx
│   │   │   └── index.ts
│   │   ├── PricingForm/
│   │   └── SpecificationForm/
│   ├── cards/                           # Card components
│   │   ├── VehicleCard/
│   │   │   ├── VehicleCard.tsx
│   │   │   ├── CardHeader.tsx           # Sub-component
│   │   │   ├── CardBody.tsx             # Sub-component
│   │   │   ├── CardFooter.tsx           # Sub-component
│   │   │   ├── VehicleCard.module.css
│   │   │   ├── VehicleCard.stories.tsx
│   │   │   ├── VehicleCard.test.tsx
│   │   │   └── index.ts
│   │   ├── VehiclePreview/
│   │   ├── PricingCard/
│   │   └── SpecsCard/
│   ├── lists/                           # List components
│   │   ├── VehicleGrid/
│   │   ├── VehicleTable/
│   │   ├── FeaturedVehicles/
│   │   └── RecentVehicles/
│   ├── modals/                          # Modal components
│   │   ├── VehicleDetailModal/
│   │   ├── ImageGalleryModal/
│   │   └── CompareModal/
│   ├── widgets/                         # Widget components
│   │   ├── VehicleStats/
│   │   ├── InventoryWidget/
│   │   └── PricingWidget/
│   └── layouts/                         # Layout components
│       ├── VehicleLayout/
│       └── InventoryLayout/
│
├── pages/                               # Community pages
│   ├── VehicleListPage/
│   │   ├── VehicleListPage.tsx          # Main page component
│   │   ├── VehicleListPage.module.css   # Page styles
│   │   ├── VehicleListPage.stories.tsx  # Page stories
│   │   ├── VehicleListPage.test.tsx     # Page tests
│   │   └── index.ts                     # Page exports
│   ├── VehicleDetailPage/
│   │   ├── VehicleDetailPage.tsx
│   │   ├── DetailsSection.tsx           # Page section
│   │   ├── GallerySection.tsx           # Page section
│   │   ├── SpecsSection.tsx             # Page section
│   │   ├── VehicleDetailPage.module.css
│   │   ├── VehicleDetailPage.stories.tsx
│   │   ├── VehicleDetailPage.test.tsx
│   │   └── index.ts
│   ├── VehicleCreatePage/
│   ├── VehicleEditPage/
│   ├── VehicleSearchPage/
│   └── VehicleDashboard/
│
├── hooks/                               # Custom React hooks
│   ├── useVehicles/
│   │   ├── useVehicles.ts               # Main hook
│   │   ├── useVehicles.test.ts          # Hook tests
│   │   └── index.ts                     # Hook exports
│   ├── useVehicleSearch/
│   │   ├── useVehicleSearch.ts
│   │   ├── useVehicleSearch.test.ts
│   │   └── index.ts
│   ├── useVehicleFilters/
│   ├── useInventory/
│   ├── usePricing/
│   └── useImageUpload/
│
├── services/                            # API integration services
│   ├── vehicleService/
│   │   ├── vehicleService.ts            # Main service
│   │   ├── vehicleAPI.ts                # API client
│   │   ├── vehicleTypes.ts              # Service types
│   │   ├── vehicleService.test.ts       # Service tests
│   │   └── index.ts                     # Service exports
│   ├── inventoryService/
│   │   ├── inventoryService.ts
│   │   ├── inventoryAPI.ts
│   │   ├── inventoryTypes.ts
│   │   ├── inventoryService.test.ts
│   │   └── index.ts
│   ├── pricingService/
│   ├── specificationService/
│   ├── imageService/
│   └── searchService/
│
├── stores/                              # State management stores
│   ├── vehicleStore/
│   │   ├── vehicleStore.ts              # Zustand store
│   │   ├── vehicleSlice.ts              # Store slice
│   │   ├── vehicleActions.ts            # Store actions
│   │   ├── vehicleSelectors.ts          # Store selectors
│   │   ├── vehicleStore.test.ts         # Store tests
│   │   └── index.ts                     # Store exports
│   ├── inventoryStore/
│   │   ├── inventoryStore.ts
│   │   ├── inventorySlice.ts
│   │   ├── inventoryActions.ts
│   │   ├── inventorySelectors.ts
│   │   ├── inventoryStore.test.ts
│   │   └── index.ts
│   ├── searchStore/
│   ├── filterStore/
│   └── comparisonStore/
│
├── types/                               # TypeScript type definitions
│   ├── vehicle.types.ts                 # Vehicle entity types
│   ├── inventory.types.ts               # Inventory types
│   ├── pricing.types.ts                 # Pricing types
│   ├── specifications.types.ts          # Specifications types
│   ├── search.types.ts                  # Search types
│   ├── api.types.ts                     # API response types
│   ├── form.types.ts                    # Form types
│   ├── ui.types.ts                      # UI component types
│   └── index.ts                         # Type exports
│
├── utils/                               # Community utility functions
│   ├── validation/
│   │   ├── vehicleValidation.ts         # Vehicle validation rules
│   │   ├── pricingValidation.ts         # Pricing validation
│   │   ├── imageValidation.ts           # Image validation
│   │   ├── validationSchemas.ts         # Zod schemas
│   │   ├── validation.test.ts           # Validation tests
│   │   └── index.ts                     # Validation exports
│   ├── formatting/
│   │   ├── vehicleFormatters.ts         # Data formatters
│   │   ├── currencyFormatters.ts        # Currency formatting
│   │   ├── dateFormatters.ts            # Date formatting
│   │   ├── formatters.test.ts           # Formatter tests
│   │   └── index.ts                     # Formatter exports
│   ├── calculations/
│   │   ├── pricingCalculations.ts       # Pricing calculations
│   │   ├── depreciationCalculations.ts  # Depreciation logic
│   │   ├── calculations.test.ts         # Calculation tests
│   │   └── index.ts                     # Calculation exports
│   ├── transformers/
│   │   ├── vehicleTransformers.ts       # Data transformers
│   │   ├── apiTransformers.ts           # API data transformers
│   │   ├── transformers.test.ts         # Transformer tests
│   │   └── index.ts                     # Transformer exports
│   └── helpers/
│       ├── imageHelpers.ts              # Image utilities
│       ├── searchHelpers.ts             # Search utilities
│       ├── comparisonHelpers.ts         # Comparison utilities
│       ├── helpers.test.ts              # Helper tests
│       └── index.ts                     # Helper exports
│
├── constants/                           # Community constants
│   ├── endpoints.ts                     # API endpoints
│   ├── messages.ts                      # UI messages and labels
│   ├── validation.ts                    # Validation constants
│   ├── permissions.ts                   # Permission constants
│   ├── config.ts                        # Community configuration
│   ├── routes.ts                        # Route constants
│   ├── defaults.ts                      # Default values
│   └── index.ts                         # Constants exports
│
├── styles/                              # Community styles
│   ├── globals.css                      # Global community styles
│   ├── components.css                   # Component-specific styles
│   ├── pages.css                        # Page-specific styles
│   ├── variables.css                    # CSS custom properties
│   ├── utilities.css                    # Utility classes
│   ├── animations.css                   # Animation definitions
│   ├── responsive.css                   # Responsive breakpoints
│   └── themes/
│       ├── light.css                    # Light theme
│       ├── dark.css                     # Dark theme
│       └── high-contrast.css            # Accessibility theme
│
├── assets/                              # Community assets
│   ├── images/
│   │   ├── placeholders/                # Placeholder images
│   │   ├── icons/                       # Community icons
│   │   ├── backgrounds/                 # Background images
│   │   └── illustrations/               # Illustrations
│   ├── fonts/                           # Community-specific fonts
│   └── videos/                          # Video assets
│
├── locales/                             # Internationalization
│   ├── en/
│   │   ├── common.json                  # Common translations
│   │   ├── components.json              # Component translations
│   │   ├── pages.json                   # Page translations
│   │   ├── errors.json                  # Error messages
│   │   └── validation.json              # Validation messages
│   ├── es/                              # Spanish translations
│   ├── fr/                              # French translations
│   └── de/                              # German translations
│
├── tests/                               # Community tests
│   ├── components/
│   │   ├── forms/
│   │   │   ├── VehicleForm.test.tsx
│   │   │   └── VehicleSearchForm.test.tsx
│   │   ├── cards/
│   │   │   ├── VehicleCard.test.tsx
│   │   │   └── VehiclePreview.test.tsx
│   │   ├── lists/
│   │   ├── modals/
│   │   └── widgets/
│   ├── pages/
│   │   ├── VehicleListPage.test.tsx
│   │   ├── VehicleDetailPage.test.tsx
│   │   └── VehicleDashboard.test.tsx
│   ├── hooks/
│   │   ├── useVehicles.test.ts
│   │   ├── useVehicleSearch.test.ts
│   │   └── useInventory.test.ts
│   ├── services/
│   │   ├── vehicleService.test.ts
│   │   ├── inventoryService.test.ts
│   │   └── pricingService.test.ts
│   ├── stores/
│   │   ├── vehicleStore.test.ts
│   │   ├── inventoryStore.test.ts
│   │   └── searchStore.test.ts
│   ├── utils/
│   │   ├── validation.test.ts
│   │   ├── formatting.test.ts
│   │   └── calculations.test.ts
│   ├── integration/
│   │   ├── VehicleManagement.test.tsx   # Integration tests
│   │   ├── SearchIntegration.test.tsx
│   │   └── FormIntegration.test.tsx
│   ├── e2e/
│   │   ├── vehicleWorkflow.spec.ts      # E2E tests
│   │   ├── searchWorkflow.spec.ts
│   │   └── inventoryWorkflow.spec.ts
│   ├── fixtures/
│   │   ├── vehicleFixtures.ts           # Test data fixtures
│   │   ├── userFixtures.ts
│   │   └── apiFixtures.ts
│   ├── mocks/
│   │   ├── vehicleServiceMock.ts        # Service mocks
│   │   ├── inventoryServiceMock.ts
│   │   └── apiMocks.ts
│   ├── setup/
│   │   ├── testSetup.ts                 # Test configuration
│   │   ├── mockSetup.ts                 # Mock setup
│   │   └── renderUtils.tsx              # Test utilities
│   └── __snapshots__/                   # Jest snapshots
│
├── stories/                             # Storybook stories
│   ├── components/
│   │   ├── forms/
│   │   │   ├── VehicleForm.stories.tsx
│   │   │   └── VehicleSearchForm.stories.tsx
│   │   ├── cards/
│   │   │   ├── VehicleCard.stories.tsx
│   │   │   └── VehiclePreview.stories.tsx
│   │   ├── lists/
│   │   ├── modals/
│   │   └── widgets/
│   ├── pages/
│   │   ├── VehicleListPage.stories.tsx
│   │   ├── VehicleDetailPage.stories.tsx
│   │   └── VehicleDashboard.stories.tsx
│   ├── templates/
│   │   ├── VehicleTemplate.stories.tsx
│   │   └── InventoryTemplate.stories.tsx
│   └── documentation/
│       ├── Introduction.stories.mdx
│       ├── GettingStarted.stories.mdx
│       └── ComponentGuide.stories.mdx
│
├── docs/                                # Community documentation
│   ├── README.md                        # Community overview
│   ├── ARCHITECTURE.md                  # Architecture documentation
│   ├── API.md                          # API integration guide
│   ├── COMPONENTS.md                    # Component documentation
│   ├── TESTING.md                      # Testing guidelines
│   ├── DEPLOYMENT.md                   # Deployment guide
│   ├── CONTRIBUTING.md                 # Contribution guidelines
│   └── CHANGELOG.md                    # Change log
│
├── config/                              # Configuration files
│   ├── webpack.config.js                # Webpack configuration
│   ├── vite.config.ts                   # Vite configuration
│   ├── jest.config.js                   # Jest test configuration
│   ├── storybook.config.js              # Storybook configuration
│   ├── eslint.config.js                 # ESLint configuration
│   ├── prettier.config.js               # Prettier configuration
│   └── tailwind.config.js               # Tailwind CSS configuration
│
├── .env.example                         # Environment variables template
├── .env.local                           # Local environment variables
├── .gitignore                           # Git ignore rules
├── package.json                         # Package dependencies and scripts
├── tsconfig.json                        # TypeScript configuration
├── README.md                            # Community documentation
└── CHANGELOG.md                         # Community changelog
```

## 📝 Key Files Deep Dive

### Component Structure Example

```typescript
// components/cards/VehicleCard/VehicleCard.tsx
import React from 'react';
import { Vehicle } from '../../../types';
import { useVehicleCard } from './useVehicleCard';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import styles from './VehicleCard.module.css';

interface VehicleCardProps {
  vehicle: Vehicle;
  onView?: (vehicleId: string) => void;
  onFavorite?: (vehicleId: string) => void;
  onCompare?: (vehicleId: string) => void;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onView,
  onFavorite,
  onCompare,
  variant = 'default',
  className
}) => {
  const {
    isFavorite,
    isComparing,
    handleView,
    handleFavorite,
    handleCompare
  } = useVehicleCard(vehicle.id, { onView, onFavorite, onCompare });

  return (
    <article
      className={`${styles.vehicleCard} ${styles[variant]} ${className || ''}`}
      data-testid="vehicle-card"
    >
      <CardHeader
        vehicle={vehicle}
        isFavorite={isFavorite}
        onFavorite={handleFavorite}
      />
      <CardBody
        vehicle={vehicle}
        variant={variant}
        onClick={handleView}
      />
      <CardFooter
        vehicle={vehicle}
        isComparing={isComparing}
        onCompare={handleCompare}
        onView={handleView}
      />
    </article>
  );
};

VehicleCard.displayName = 'VehicleCard';

export default VehicleCard;
```

### Hook Structure Example

```typescript
// hooks/useVehicles/useVehicles.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import { Vehicle, VehicleFilters, CreateVehicleData } from '../../types';
import { useVehicleStore } from '../../stores';

interface UseVehiclesOptions {
  filters?: VehicleFilters;
  enabled?: boolean;
  refetchInterval?: number;
}

export const useVehicles = (options: UseVehiclesOptions = {}) => {
  const queryClient = useQueryClient();
  const { setSelectedVehicle, clearSelectedVehicle } = useVehicleStore();

  // Fetch vehicles query
  const vehiclesQuery = useQuery({
    queryKey: ['vehicles', options.filters],
    queryFn: () => vehicleService.getVehicles(options.filters),
    enabled: options.enabled !== false,
    refetchInterval: options.refetchInterval,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create vehicle mutation
  const createVehicleMutation = useMutation({
    mutationFn: (data: CreateVehicleData) => vehicleService.createVehicle(data),
    onSuccess: (newVehicle) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      setSelectedVehicle(newVehicle);
    },
  });

  // Update vehicle mutation
  const updateVehicleMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Vehicle> }) =>
      vehicleService.updateVehicle(id, data),
    onSuccess: (updatedVehicle) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.setQueryData(['vehicle', updatedVehicle.id], updatedVehicle);
    },
  });

  // Delete vehicle mutation
  const deleteVehicleMutation = useMutation({
    mutationFn: (id: string) => vehicleService.deleteVehicle(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.removeQueries({ queryKey: ['vehicle', deletedId] });
      clearSelectedVehicle();
    },
  });

  return {
    // Query data
    vehicles: vehiclesQuery.data?.data || [],
    totalCount: vehiclesQuery.data?.total || 0,
    isLoading: vehiclesQuery.isLoading,
    isError: vehiclesQuery.isError,
    error: vehiclesQuery.error,
    refetch: vehiclesQuery.refetch,

    // Mutations
    createVehicle: createVehicleMutation.mutateAsync,
    updateVehicle: updateVehicleMutation.mutateAsync,
    deleteVehicle: deleteVehicleMutation.mutateAsync,

    // Mutation states
    isCreating: createVehicleMutation.isPending,
    isUpdating: updateVehicleMutation.isPending,
    isDeleting: deleteVehicleMutation.isPending,

    // Mutation errors
    createError: createVehicleMutation.error,
    updateError: updateVehicleMutation.error,
    deleteError: deleteVehicleMutation.error,
  };
};

export default useVehicles;
```

### Service Structure Example

```typescript
// services/vehicleService/vehicleService.ts
import { apiClient } from '../../../shared/services/api';
import {
  Vehicle,
  VehicleFilters,
  CreateVehicleData,
  ApiResponse,
} from '../../types';
import { VEHICLE_ENDPOINTS } from '../../constants';
import { vehicleTransformers } from '../../utils/transformers';

export class VehicleService {
  async getVehicles(filters?: VehicleFilters): Promise<ApiResponse<Vehicle[]>> {
    const params = vehicleTransformers.filtersToQueryParams(filters);
    const response = await apiClient.get(VEHICLE_ENDPOINTS.LIST, { params });
    return {
      data: response.data.vehicles.map(vehicleTransformers.fromAPI),
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  }

  async getVehicle(id: string): Promise<Vehicle> {
    const response = await apiClient.get(`${VEHICLE_ENDPOINTS.DETAIL}/${id}`);
    return vehicleTransformers.fromAPI(response.data);
  }

  async createVehicle(data: CreateVehicleData): Promise<Vehicle> {
    const transformedData = vehicleTransformers.toAPI(data);
    const response = await apiClient.post(
      VEHICLE_ENDPOINTS.CREATE,
      transformedData
    );
    return vehicleTransformers.fromAPI(response.data);
  }

  async updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const transformedData = vehicleTransformers.toAPI(data);
    const response = await apiClient.put(
      `${VEHICLE_ENDPOINTS.UPDATE}/${id}`,
      transformedData
    );
    return vehicleTransformers.fromAPI(response.data);
  }

  async deleteVehicle(id: string): Promise<void> {
    await apiClient.delete(`${VEHICLE_ENDPOINTS.DELETE}/${id}`);
  }

  async searchVehicles(
    query: string,
    filters?: VehicleFilters
  ): Promise<ApiResponse<Vehicle[]>> {
    const params = {
      q: query,
      ...vehicleTransformers.filtersToQueryParams(filters),
    };
    const response = await apiClient.get(VEHICLE_ENDPOINTS.SEARCH, { params });
    return {
      data: response.data.vehicles.map(vehicleTransformers.fromAPI),
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  }
}

export const vehicleService = new VehicleService();
export default vehicleService;
```

### Store Structure Example

```typescript
// stores/vehicleStore/vehicleStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Vehicle, VehicleFilters } from '../../types';

interface VehicleState {
  // State
  selectedVehicle: Vehicle | null;
  comparisonVehicles: Vehicle[];
  favorites: string[];
  recentlyViewed: string[];
  filters: VehicleFilters;
  viewMode: 'grid' | 'list' | 'map';
  sortBy: string;
  sortOrder: 'asc' | 'desc';

  // Actions
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  addToComparison: (vehicle: Vehicle) => void;
  removeFromComparison: (vehicleId: string) => void;
  clearComparison: () => void;
  addToFavorites: (vehicleId: string) => void;
  removeFromFavorites: (vehicleId: string) => void;
  addToRecentlyViewed: (vehicleId: string) => void;
  setFilters: (filters: Partial<VehicleFilters>) => void;
  clearFilters: () => void;
  setViewMode: (mode: 'grid' | 'list' | 'map') => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  clearSelectedVehicle: () => void;
}

export const useVehicleStore = create<VehicleState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        selectedVehicle: null,
        comparisonVehicles: [],
        favorites: [],
        recentlyViewed: [],
        filters: {},
        viewMode: 'grid',
        sortBy: 'createdAt',
        sortOrder: 'desc',

        // Actions
        setSelectedVehicle: (vehicle) =>
          set({ selectedVehicle: vehicle }, false, 'setSelectedVehicle'),

        addToComparison: (vehicle) =>
          set(
            (state) => {
              const exists = state.comparisonVehicles.some(
                (v) => v.id === vehicle.id
              );
              if (!exists && state.comparisonVehicles.length < 4) {
                return {
                  comparisonVehicles: [...state.comparisonVehicles, vehicle],
                };
              }
              return state;
            },
            false,
            'addToComparison'
          ),

        removeFromComparison: (vehicleId) =>
          set(
            (state) => ({
              comparisonVehicles: state.comparisonVehicles.filter(
                (v) => v.id !== vehicleId
              ),
            }),
            false,
            'removeFromComparison'
          ),

        clearComparison: () =>
          set({ comparisonVehicles: [] }, false, 'clearComparison'),

        addToFavorites: (vehicleId) =>
          set(
            (state) => {
              if (!state.favorites.includes(vehicleId)) {
                return { favorites: [...state.favorites, vehicleId] };
              }
              return state;
            },
            false,
            'addToFavorites'
          ),

        removeFromFavorites: (vehicleId) =>
          set(
            (state) => ({
              favorites: state.favorites.filter((id) => id !== vehicleId),
            }),
            false,
            'removeFromFavorites'
          ),

        addToRecentlyViewed: (vehicleId) =>
          set(
            (state) => {
              const filtered = state.recentlyViewed.filter(
                (id) => id !== vehicleId
              );
              return {
                recentlyViewed: [vehicleId, ...filtered].slice(0, 10), // Keep last 10
              };
            },
            false,
            'addToRecentlyViewed'
          ),

        setFilters: (filters) =>
          set(
            (state) => ({
              filters: { ...state.filters, ...filters },
            }),
            false,
            'setFilters'
          ),

        clearFilters: () => set({ filters: {} }, false, 'clearFilters'),

        setViewMode: (mode) => set({ viewMode: mode }, false, 'setViewMode'),

        setSorting: (sortBy, sortOrder) =>
          set({ sortBy, sortOrder }, false, 'setSorting'),

        clearSelectedVehicle: () =>
          set({ selectedVehicle: null }, false, 'clearSelectedVehicle'),
      }),
      {
        name: 'vehicle-store',
        partialize: (state) => ({
          favorites: state.favorites,
          recentlyViewed: state.recentlyViewed,
          viewMode: state.viewMode,
          sortBy: state.sortBy,
          sortOrder: state.sortOrder,
        }),
      }
    )
  )
);

export default useVehicleStore;
```

### Page Structure Example

```typescript
// pages/VehicleListPage/VehicleListPage.tsx
import React from 'react';
import { VehicleGrid, VehicleTable, VehicleMap } from '../../components/lists';
import { FilterPanel } from '../../components/filters';
import { SearchBar } from '../../../search-discovery-community/components/search';
import { VehicleLayout } from '../../components/layouts';
import { useVehicles, useVehicleFilters } from '../../hooks';
import { useVehicleStore } from '../../stores';
import styles from './VehicleListPage.module.css';

interface VehicleListPageProps {
  className?: string;
}

export const VehicleListPage: React.FC<VehicleListPageProps> = ({ className }) => {
  const { viewMode, filters } = useVehicleStore();
  const { vehicles, isLoading, error, totalCount } = useVehicles({ filters });
  const { updateFilters, clearFilters } = useVehicleFilters();

  const renderVehicleView = () => {
    switch (viewMode) {
      case 'grid':
        return <VehicleGrid vehicles={vehicles} isLoading={isLoading} />;
      case 'list':
        return <VehicleTable vehicles={vehicles} isLoading={isLoading} />;
      case 'map':
        return <VehicleMap vehicles={vehicles} isLoading={isLoading} />;
      default:
        return <VehicleGrid vehicles={vehicles} isLoading={isLoading} />;
    }
  };

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error loading vehicles</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <VehicleLayout className={`${styles.vehicleListPage} ${className || ''}`}>
      <div className={styles.header}>
        <SearchBar
          onSearch={updateFilters}
          placeholder="Search vehicles..."
          className={styles.searchBar}
        />
        <div className={styles.results}>
          {totalCount} vehicles found
        </div>
      </div>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <FilterPanel
            filters={filters}
            onFiltersChange={updateFilters}
            onClearFilters={clearFilters}
          />
        </aside>

        <main className={styles.main}>
          {renderVehicleView()}
        </main>
      </div>
    </VehicleLayout>
  );
};

export default VehicleListPage;
```

## 🎯 Key Patterns Applied

### 1. Component Architecture

- **Compound Components** - Flexible composition patterns
- **Render Props** - Logic sharing between components
- **Higher-Order Components** - Cross-cutting concerns
- **Custom Hooks** - Reusable stateful logic

### 2. TypeScript Integration

- **Strict Type Safety** - All components fully typed
- **Generic Components** - Reusable with type parameters
- **Discriminated Unions** - Type-safe variants
- **Type Guards** - Runtime type checking

### 3. Testing Strategy

- **Unit Tests** - Component isolation testing
- **Integration Tests** - Component interaction testing
- **Snapshot Tests** - UI regression prevention
- **E2E Tests** - Complete user workflow testing

### 4. Performance Optimization

- **React.memo** - Component memoization
- **useMemo & useCallback** - Value and function memoization
- **Code Splitting** - Lazy loading optimization
- **Bundle Analysis** - Performance monitoring

### 5. Accessibility Standards

- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Proper focus handling
- **Color Contrast** - WCAG compliance

This comprehensive template ensures consistency, scalability, and maintainability across all frontend communities while maintaining perfect integration with your backend microservices architecture!
