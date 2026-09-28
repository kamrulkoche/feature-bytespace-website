# SP Company LTD - Frontend Directory Structure

## 🎨 Complete Frontend Project Organization

This document outlines the comprehensive directory structure for the SP Company LTD frontend applications, following a community-based architecture that mirrors the backend microservices.

---

## 📁 Root Frontend Structure

```
sp-company-ltd/frontend/
├── README.md                                 # Frontend documentation overview
├── package.json                             # Root workspace configuration
├── pnpm-workspace.yaml                      # pnpm workspace configuration
├── turbo.json                               # Turbo build configuration
├── tsconfig.json                            # Global TypeScript configuration
├── tailwind.config.js                      # Tailwind CSS configuration
├── next.config.js                          # Next.js configuration
├── .eslintrc.json                          # ESLint configuration
├── .prettierrc                             # Prettier configuration
├── .env.example                            # Environment variables template
├── .env.local                              # Local environment variables
├── .gitignore                              # Git ignore rules
│
├── apps/                                    # 📱 Main applications
│   ├── web-app/                            # Next.js Web Application
│   ├── mobile-app/                         # Flutter Mobile App
│   ├── admin-panel/                        # Admin Dashboard
│   └── storybook/                          # Component documentation
│
├── communities/                             # 🏘️ Community-based modules
│   ├── user-management-community/
│   ├── vehicle-management-community/
│   ├── search-discovery-community/
│   ├── auction-management-community/
│   ├── payment-financial-community/
│   ├── shipping-logistics-community/
│   ├── notification-community/
│   ├── content-management-community/
│   ├── analytics-insights-community/
│   ├── communication-community/
│   └── infrastructure-community/
│
├── shared/                                  # 🔧 Shared resources
│   ├── components/                         # Common UI components
│   ├── hooks/                              # Shared React hooks
│   ├── utils/                              # Utility functions
│   ├── types/                              # Global TypeScript types
│   ├── services/                           # Common API services
│   ├── stores/                             # Global Redux store configuration
│   ├── constants/                          # Application constants
│   ├── config/                             # Configuration files
│   └── assets/                             # Shared assets
│
├── public/                                  # 🖼️ Static assets
│   ├── images/
│   │   ├── vehicles/                       # Vehicle images
│   │   ├── avatars/                        # User avatars
│   │   ├── icons/                          # App icons
│   │   └── banners/                        # Marketing banners
│   ├── videos/                             # Video assets
│   ├── documents/                          # PDF and documents
│   ├── favicon.ico                         # Favicon
│   ├── manifest.json                       # PWA manifest
│   ├── robots.txt                          # SEO robots
│   └── sitemap.xml                         # SEO sitemap
│
├── docs/                                   # 📚 Frontend documentation
│   ├── architecture/                       # Architecture documentation
│   │   ├── communities.md                  # Community architecture
│   │   ├── state-management.md             # State management guide
│   │   ├── routing.md                      # Routing strategy
│   │   └── performance.md                  # Performance optimization
│   ├── components/                         # Component documentation
│   │   ├── design-system.md               # Design system guide
│   │   ├── component-library.md           # Component library
│   │   └── styling-guide.md               # Styling guidelines
│   ├── api-integration/                    # API integration guides
│   │   ├── authentication.md              # Authentication flow
│   │   ├── real-time.md                   # WebSocket integration
│   │   └── error-handling.md              # Error handling
│   ├── deployment/                         # Deployment documentation
│   │   ├── web-deployment.md              # Web app deployment
│   │   ├── mobile-deployment.md           # Mobile app deployment
│   │   └── ci-cd.md                       # CI/CD pipeline
│   └── testing/                            # Testing documentation
│       ├── unit-testing.md                # Unit testing guide
│       ├── integration-testing.md         # Integration testing
│       └── e2e-testing.md                 # End-to-end testing
│
├── tools/                                  # 🛠️ Development tools
│   ├── scripts/                           # Build and utility scripts
│   │   ├── build.js                       # Custom build script
│   │   ├── generate-component.js          # Component generator
│   │   ├── analyze-bundle.js              # Bundle analyzer
│   │   └── deploy.js                      # Deployment script
│   ├── generators/                        # Code generators
│   │   ├── community-generator/           # Community scaffold
│   │   ├── component-generator/           # Component scaffold
│   │   └── page-generator/                # Page scaffold
│   ├── testing/                           # Testing utilities
│   │   ├── setup.ts                       # Test setup
│   │   ├── mocks/                         # API mocks
│   │   └── fixtures/                      # Test fixtures
│   ├── webpack/                           # Webpack configurations
│   └── vite/                              # Vite configurations
│
├── .github/                                # GitHub configurations
│   ├── workflows/                         # GitHub Actions
│   └── ISSUE_TEMPLATE.md                  # Issue templates
│
├── .vscode/                               # VS Code configurations
│   ├── settings.json                      # VS Code settings
│   ├── extensions.json                    # Recommended extensions
│   └── launch.json                        # Debug configurations
│
└── coverage/                              # Test coverage reports
    ├── lcov-report/                       # LCOV coverage
    └── jest/                              # Jest coverage
```

---

## 📱 Applications Structure

### Web Application (Next.js)

```
apps/web-app/
├── app/                                   # Next.js App Router
│   ├── (auth)/                           # Auth route group
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/                      # Dashboard route group
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── layout.tsx
│   ├── (public)/                         # Public route group
│   │   ├── vehicles/
│   │   ├── auctions/
│   │   └── layout.tsx
│   ├── api/                              # API routes
│   │   ├── auth/
│   │   ├── vehicles/
│   │   └── webhooks/
│   ├── globals.css                       # Global styles
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Home page
│   ├── loading.tsx                       # Loading UI
│   ├── error.tsx                         # Error UI
│   └── not-found.tsx                     # 404 page
├── components/                           # App-specific components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   ├── AuthProvider.tsx
│   │   └── ThemeProvider.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Modal.tsx
├── lib/                                  # App utilities
│   ├── auth.ts                          # Authentication logic
│   ├── db.ts                            # Database connection
│   └── utils.ts                         # Utility functions
├── middleware.ts                         # Next.js middleware
├── next.config.js                       # Next.js configuration
├── package.json                         # App dependencies
├── tailwind.config.js                   # Tailwind configuration
├── tsconfig.json                        # TypeScript configuration
└── .env.local                           # Environment variables
```

### Mobile Application (Flutter)

```
apps/mobile-app/
├── lib/                                  # Flutter source code
│   ├── main.dart                         # App entry point
│   ├── app.dart                          # App configuration
│   ├── widgets/                          # Flutter widgets
│   │   ├── common/                       # Common widgets
│   │   ├── forms/                        # Form widgets
│   │   └── navigation/                   # Navigation widgets
│   ├── screens/                          # App screens
│   │   ├── auth/                         # Authentication screens
│   │   ├── home/                         # Home screens
│   │   ├── vehicles/                     # Vehicle screens
│   │   └── profile/                      # Profile screens
│   ├── navigation/                       # Navigation configuration
│   │   ├── app_router.dart              # App routing
│   │   ├── auth_guard.dart              # Authentication guard
│   │   └── bottom_navigation.dart       # Bottom navigation
│   ├── services/                         # API and local services
│   │   ├── api_service.dart             # API client
│   │   ├── auth_service.dart            # Authentication service
│   │   └── storage_service.dart         # Local storage
│   ├── models/                           # Data models
│   │   ├── user.dart                    # User model
│   │   ├── vehicle.dart                 # Vehicle model
│   │   └── auction.dart                 # Auction model
│   ├── providers/                        # State management providers
│   │   ├── auth_provider.dart           # Authentication state
│   │   ├── vehicle_provider.dart        # Vehicle state
│   │   └── theme_provider.dart          # Theme state
│   ├── utils/                            # Utility functions
│   │   ├── constants.dart               # App constants
│   │   ├── helpers.dart                 # Helper functions
│   │   └── validators.dart              # Input validators
│   └── themes/                          # App themes
│       ├── light_theme.dart             # Light theme
│       ├── dark_theme.dart              # Dark theme
│       └── theme_data.dart              # Theme configuration
├── assets/                               # App assets
│   ├── images/                          # Images
│   ├── fonts/                           # Custom fonts
│   ├── icons/                           # App icons
│   └── json/                            # JSON assets
├── android/                              # Android configuration
│   ├── app/                             # Android app config
│   │   ├── build.gradle                 # Build configuration
│   │   └── src/main/AndroidManifest.xml # Android manifest
│   └── build.gradle                     # Project build config
├── ios/                                  # iOS configuration
│   ├── Runner/                          # iOS app config
│   │   ├── Info.plist                   # iOS info plist
│   │   └── Runner-Bridging-Header.h     # Bridging header
│   └── Runner.xcworkspace              # Xcode workspace
├── test/                                 # Flutter tests
│   ├── widget_test.dart                 # Widget tests
│   ├── unit_test.dart                   # Unit tests
│   └── integration_test/                # Integration tests
├── pubspec.yaml                          # Flutter dependencies
├── pubspec.lock                          # Dependency lock file
├── analysis_options.yaml                # Dart analysis options
└── README.md                             # Mobile app documentation
```

### Admin Panel

```
apps/admin-panel/
├── pages/                                # Admin pages
│   ├── _app.tsx                         # App wrapper
│   ├── _document.tsx                    # Document structure
│   ├── index.tsx                        # Admin dashboard
│   ├── users/                           # User management
│   ├── vehicles/                        # Vehicle management
│   ├── auctions/                        # Auction management
│   └── settings/                        # System settings
├── components/                           # Admin components
│   ├── layout/
│   ├── tables/
│   ├── charts/
│   └── forms/
├── lib/                                  # Admin utilities
├── styles/                               # Admin styles
├── public/                               # Admin assets
├── next.config.js                       # Next.js configuration
├── package.json                         # Admin dependencies
└── tsconfig.json                        # TypeScript configuration
```

---

## 🏘️ Community Structure Template

Each of the 11 communities follows this standardized structure:

```
communities/[community-name]-community/
├── components/                           # Community UI components
│   ├── forms/                           # Form components
│   │   ├── [Entity]Form.tsx
│   │   ├── [Entity]EditForm.tsx
│   │   └── [Entity]SearchForm.tsx
│   ├── cards/                           # Card components
│   │   ├── [Entity]Card.tsx
│   │   ├── [Entity]Preview.tsx
│   │   └── [Entity]Summary.tsx
│   ├── lists/                           # List components
│   │   ├── [Entity]List.tsx
│   │   ├── [Entity]Grid.tsx
│   │   └── [Entity]Table.tsx
│   ├── modals/                          # Modal components
│   │   ├── [Entity]Modal.tsx
│   │   ├── Confirm[Action]Modal.tsx
│   │   └── [Entity]DetailModal.tsx
│   ├── widgets/                         # Widget components
│   │   ├── [Entity]Widget.tsx
│   │   ├── [Entity]Stats.tsx
│   │   └── [Entity]Chart.tsx
│   └── layouts/                         # Layout components
│       ├── [Community]Layout.tsx
│       └── [Community]Sidebar.tsx
│
├── pages/                                # Community pages
│   ├── [Entity]Page.tsx                 # Main entity page
│   ├── [Entity]DetailPage.tsx          # Detail page
│   ├── [Entity]CreatePage.tsx          # Create page
│   ├── [Entity]EditPage.tsx            # Edit page
│   ├── [Entity]ListPage.tsx            # List/grid page
│   └── [Community]DashboardPage.tsx    # Community dashboard
│
├── hooks/                                # Community-specific hooks
│   ├── use[Entity].ts                   # Entity management hook
│   ├── use[Entity]List.ts              # List management hook
│   ├── use[Entity]Form.ts              # Form management hook
│   ├── use[Community]WebSocket.ts      # WebSocket hook
│   └── use[Community]Permissions.ts    # Permissions hook
│
├── services/                             # API integration services
│   ├── [entity]Service.ts              # Main entity service
│   ├── [entity]API.ts                  # API endpoints
│   ├── [community]WebSocket.ts         # WebSocket service
│   └── [community]Cache.ts             # Caching service
│
├── stores/                               # Redux state management
│   ├── [entity]Slice.ts                # Redux Toolkit slice
│   ├── [community]ApiSlice.ts          # RTK Query API slice
│   ├── [community]UISlice.ts           # UI state slice
│   └── [community]FormSlice.ts         # Form state slice
│
├── types/                                # TypeScript definitions
│   ├── [entity].types.ts               # Entity type definitions
│   ├── api.types.ts                    # API type definitions
│   ├── form.types.ts                   # Form type definitions
│   ├── ui.types.ts                     # UI type definitions
│   └── index.ts                         # Type exports
│
├── utils/                                # Community utilities
│   ├── [entity]Utils.ts                # Entity utilities
│   ├── validation.ts                   # Form validation
│   ├── formatting.ts                   # Data formatting
│   ├── permissions.ts                  # Permission utilities
│   ├── transforms.ts                   # Data transforms
│   └── constants.ts                    # Community constants
│
├── constants/                            # Community constants
│   ├── endpoints.ts                    # API endpoints
│   ├── messages.ts                     # UI messages
│   ├── validation.ts                   # Validation rules
│   ├── permissions.ts                  # Permission constants
│   └── config.ts                       # Community configuration
│
├── styles/                               # Community styles
│   ├── components.css                  # Component styles
│   ├── pages.css                       # Page styles
│   ├── variables.css                   # CSS variables
│   └── animations.css                  # Animation styles
│
├── tests/                                # Community tests
│   ├── components/                     # Component tests
│   │   ├── [Component].test.tsx
│   │   └── __snapshots__/
│   ├── pages/                          # Page tests
│   │   ├── [Page].test.tsx
│   │   └── __snapshots__/
│   ├── hooks/                          # Hook tests
│   │   └── [Hook].test.ts
│   ├── services/                       # Service tests
│   │   └── [Service].test.ts
│   ├── utils/                          # Utility tests
│   │   └── [Utility].test.ts
│   ├── integration/                    # Integration tests
│   │   └── [Feature].test.tsx
│   ├── fixtures/                       # Test fixtures
│   │   └── [entity]Fixtures.ts
│   └── mocks/                          # Test mocks
│       └── [service]Mock.ts
│
├── stories/                              # Storybook stories
│   ├── components/
│   │   └── [Component].stories.tsx
│   ├── pages/
│   │   └── [Page].stories.tsx
│   └── templates/
│       └── [Template].stories.tsx
│
├── README.md                            # Community documentation
├── package.json                         # Community dependencies
├── tsconfig.json                        # TypeScript configuration
└── .env.example                         # Environment template
```

---

## 🔧 Shared Resources Structure

### Shared Components

```
shared/components/
├── ui/                                   # Basic UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── TextInput.tsx
│   │   ├── NumberInput.tsx
│   │   ├── SearchInput.tsx
│   │   ├── Input.stories.tsx
│   │   ├── Input.test.tsx
│   │   └── index.ts
│   ├── Modal/
│   ├── Table/
│   ├── Form/
│   ├── Loading/
│   ├── Error/
│   └── Layout/
├── complex/                              # Complex components
│   ├── DataTable/
│   ├── Calendar/
│   ├── Chart/
│   ├── FileUpload/
│   ├── ImageGallery/
│   └── RichTextEditor/
├── feedback/                             # Feedback components
│   ├── Toast/
│   ├── Alert/
│   ├── Notification/
│   └── ProgressBar/
├── navigation/                           # Navigation components
│   ├── Breadcrumb/
│   ├── Pagination/
│   ├── Tabs/
│   └── Menu/
└── providers/                            # Context providers
    ├── ThemeProvider/
    ├── AuthProvider/
    ├── QueryProvider/
    └── NotificationProvider/
```

### Shared Hooks

```
shared/hooks/
├── api/                                  # API hooks
│   ├── useAPI.ts                        # Generic API hook
│   ├── useQuery.ts                      # Query hook wrapper
│   ├── useMutation.ts                   # Mutation hook wrapper
│   └── useWebSocket.ts                  # WebSocket hook
├── auth/                                 # Authentication hooks
│   ├── useAuth.ts                       # Authentication state
│   ├── usePermissions.ts                # Permission checking
│   └── useSession.ts                    # Session management
├── ui/                                   # UI hooks
│   ├── useModal.ts                      # Modal management
│   ├── useToast.ts                      # Toast notifications
│   ├── useTheme.ts                      # Theme management
│   └── useMediaQuery.ts                 # Responsive design
├── form/                                 # Form hooks
│   ├── useForm.ts                       # Form management
│   ├── useValidation.ts                 # Form validation
│   └── useFieldArray.ts                 # Dynamic fields
├── data/                                 # Data hooks
│   ├── useLocalStorage.ts               # Local storage
│   ├── useSessionStorage.ts             # Session storage
│   ├── useCache.ts                      # Caching
│   └── usePagination.ts                 # Pagination
└── utils/                                # Utility hooks
    ├── useDebounce.ts                   # Debouncing
    ├── useThrottle.ts                   # Throttling
    ├── useClickOutside.ts               # Outside click
    └── useKeyPress.ts                   # Keyboard handling
```

### Shared Services

```
shared/services/
├── api/                                  # API services
│   ├── apiClient.ts                     # HTTP client
│   ├── endpoints.ts                     # API endpoints
│   ├── interceptors.ts                  # Request/response interceptors
│   └── types.ts                         # API type definitions
├── auth/                                 # Authentication services
│   ├── authService.ts                   # Authentication logic
│   ├── tokenService.ts                  # Token management
│   └── sessionService.ts                # Session management
├── storage/                              # Storage services
│   ├── localStorage.ts                  # Local storage wrapper
│   ├── sessionStorage.ts                # Session storage wrapper
│   ├── indexedDB.ts                     # IndexedDB wrapper
│   └── cacheService.ts                  # Cache management
├── notification/                         # Notification services
│   ├── pushNotification.ts              # Push notifications
│   ├── emailService.ts                  # Email integration
│   └── toastService.ts                  # Toast notifications
├── analytics/                            # Analytics services
│   ├── googleAnalytics.ts               # Google Analytics
│   ├── customEvents.ts                  # Custom event tracking
│   └── performanceMonitoring.ts         # Performance tracking
├── websocket/                            # WebSocket services
│   ├── webSocketManager.ts              # WebSocket management
│   ├── eventEmitter.ts                  # Event handling
│   └── connectionManager.ts             # Connection management
└── utils/                                # Utility services
    ├── errorHandler.ts                  # Error handling
    ├── logger.ts                        # Logging service
    ├── formatter.ts                     # Data formatting
    └── validator.ts                     # Data validation
```

---

## 📊 Documentation Structure

### Architecture Documentation

```
docs/architecture/
├── overview.md                          # Architecture overview
├── communities.md                       # Community structure
├── state-management.md                  # State management strategy
├── routing.md                           # Routing architecture
├── performance.md                       # Performance optimization
├── security.md                          # Security implementation
├── testing.md                           # Testing strategy
└── deployment.md                        # Deployment architecture
```

### Component Documentation

```
docs/components/
├── design-system.md                     # Design system guide
├── component-library.md                 # Component library overview
├── styling-guide.md                     # Styling guidelines
├── accessibility.md                     # Accessibility standards
├── responsive-design.md                 # Responsive design guide
└── component-api.md                     # Component API reference
```

---

This comprehensive directory structure provides the foundation for your SP Company LTD frontend platform, ensuring consistency and scalability across all 11 communities with proven enterprise patterns.
