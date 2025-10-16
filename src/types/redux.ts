// Redux state and action types

import type { User, Product } from './models';

// User slice types
export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface UserSlice {
  user: UserState;
  signIn: (user: User) => void;
  signOut: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setToken: (token: string) => void;
  updateUser: (user: Partial<User>) => void;
}

// Wishlist slice types
export interface WishlistState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface WishlistSlice {
  wishlist: WishlistState;
  setWishlist: (items: Product[]) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Cart slice types
export interface CartItem {
  product: Product;
  quantity: number;
  variant?: any;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  total: number;
  itemCount: number;
}

export interface CartSlice {
  cart: CartState;
  addToCart: (product: Product, quantity?: number, variant?: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  calculateTotal: () => void;
}

// Compare slice types
export interface CompareState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
  maxItems: number;
}

export interface CompareSlice {
  compare: CompareState;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Orders slice types
export interface OrderState {
  orders: any[];
  currentOrder: any | null;
  isLoading: boolean;
  error: string | null;
}

export interface OrderSlice {
  orders: OrderState;
  setOrders: (orders: any[]) => void;
  addOrder: (order: any) => void;
  updateOrder: (orderId: string, updates: any) => void;
  setCurrentOrder: (order: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Products slice types
export interface ProductsState {
  products: Product[];
  featuredProducts: Product[];
  bestSellingProducts: Product[];
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  pagination: ProductPagination;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  shop?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  status?: string;
}

export interface ProductPagination {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ProductsSlice {
  products: ProductsState;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  removeProduct: (productId: string) => void;
  setFeaturedProducts: (products: Product[]) => void;
  setBestSellingProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setPagination: (pagination: Partial<ProductPagination>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Categories slice types
export interface CategoriesState {
  categories: any[];
  parentCategories: any[];
  subCategories: any[];
  childCategories: any[];
  isLoading: boolean;
  error: string | null;
}

export interface CategoriesSlice {
  categories: CategoriesState;
  setCategories: (categories: any[]) => void;
  setParentCategories: (categories: any[]) => void;
  setSubCategories: (categories: any[]) => void;
  setChildCategories: (categories: any[]) => void;
  addCategory: (category: any) => void;
  updateCategory: (categoryId: string, updates: any) => void;
  removeCategory: (categoryId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Brands slice types
export interface BrandsState {
  brands: any[];
  isLoading: boolean;
  error: string | null;
}

export interface BrandsSlice {
  brands: BrandsState;
  setBrands: (brands: any[]) => void;
  addBrand: (brand: any) => void;
  updateBrand: (brandId: string, updates: any) => void;
  removeBrand: (brandId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Shops slice types
export interface ShopsState {
  shops: any[];
  currentShop: any | null;
  isLoading: boolean;
  error: string | null;
}

export interface ShopsSlice {
  shops: ShopsState;
  setShops: (shops: any[]) => void;
  setCurrentShop: (shop: any | null) => void;
  addShop: (shop: any) => void;
  updateShop: (shopId: string, updates: any) => void;
  removeShop: (shopId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Settings slice types
export interface SettingsState {
  mainSettings: any | null;
  homeSettings: any | null;
  brandingSettings: any | null;
  generalSettings: any | null;
  isLoading: boolean;
  error: string | null;
}

export interface SettingsSlice {
  settings: SettingsState;
  setMainSettings: (settings: any) => void;
  setHomeSettings: (settings: any) => void;
  setBrandingSettings: (settings: any) => void;
  setGeneralSettings: (settings: any) => void;
  updateMainSettings: (updates: any) => void;
  updateHomeSettings: (updates: any) => void;
  updateBrandingSettings: (updates: any) => void;
  updateGeneralSettings: (updates: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Root state type
export interface RootState {
  user: UserState;
  wishlist: WishlistState;
  cart: CartState;
  compare: CompareState;
  orders: OrderState;
  products: ProductsState;
  categories: CategoriesState;
  brands: BrandsState;
  shops: ShopsState;
  settings: SettingsState;
}

// Action types
export interface Action<T = any> {
  type: string;
  payload?: T;
}

// Async action types
export interface AsyncAction<T = any> extends Action<T> {
  meta?: {
    loading?: boolean;
    error?: string | null;
  };
}

// Thunk action types
export interface ThunkAction<R, S, E, A extends Action> {
  (dispatch: Dispatch<A>, getState: () => S, extraArgument: E): R;
}

// Dispatch type
export interface Dispatch<A extends Action = Action> {
  <T extends A>(action: T): T;
  <R, S, E>(asyncAction: ThunkAction<R, S, E, A>): R;
}

// Store type
export interface Store<S = RootState, A extends Action = Action> {
  dispatch: Dispatch<A>;
  getState(): S;
  subscribe(listener: () => void): () => void;
  replaceReducer(nextReducer: Reducer<S, A>): void;
}

// Reducer type
export interface Reducer<S = any, A extends Action = Action> {
  (state: S, action: A): S;
}

// User action types
export type UserAction =
  | { type: 'user/signIn'; payload: User }
  | { type: 'user/signOut' }
  | { type: 'user/setLoading'; payload: boolean }
  | { type: 'user/setError'; payload: string | null }
  | { type: 'user/setToken'; payload: string }
  | { type: 'user/updateUser'; payload: Partial<User> };

// Wishlist action types
export type WishlistAction =
  | { type: 'wishlist/setWishlist'; payload: Product[] }
  | { type: 'wishlist/addToWishlist'; payload: Product }
  | { type: 'wishlist/removeFromWishlist'; payload: string }
  | { type: 'wishlist/clearWishlist' }
  | { type: 'wishlist/setLoading'; payload: boolean }
  | { type: 'wishlist/setError'; payload: string | null };

// Cart action types
export type CartAction =
  | { type: 'cart/addToCart'; payload: { product: Product; quantity?: number; variant?: any } }
  | { type: 'cart/removeFromCart'; payload: string }
  | { type: 'cart/updateQuantity'; payload: { productId: string; quantity: number } }
  | { type: 'cart/clearCart' }
  | { type: 'cart/setLoading'; payload: boolean }
  | { type: 'cart/setError'; payload: string | null }
  | { type: 'cart/calculateTotal' };

// Compare action types
export type CompareAction =
  | { type: 'compare/addToCompare'; payload: Product }
  | { type: 'compare/removeFromCompare'; payload: string }
  | { type: 'compare/clearCompare' }
  | { type: 'compare/setLoading'; payload: boolean }
  | { type: 'compare/setError'; payload: string | null };

// Orders action types
export type OrdersAction =
  | { type: 'orders/setOrders'; payload: any[] }
  | { type: 'orders/addOrder'; payload: any }
  | { type: 'orders/updateOrder'; payload: { orderId: string; updates: any } }
  | { type: 'orders/setCurrentOrder'; payload: any | null }
  | { type: 'orders/setLoading'; payload: boolean }
  | { type: 'orders/setError'; payload: string | null };

// Products action types
export type ProductsAction =
  | { type: 'products/setProducts'; payload: Product[] }
  | { type: 'products/addProduct'; payload: Product }
  | { type: 'products/updateProduct'; payload: { productId: string; updates: Partial<Product> } }
  | { type: 'products/removeProduct'; payload: string }
  | { type: 'products/setFeaturedProducts'; payload: Product[] }
  | { type: 'products/setBestSellingProducts'; payload: Product[] }
  | { type: 'products/setFilters'; payload: Partial<ProductFilters> }
  | { type: 'products/setPagination'; payload: Partial<ProductPagination> }
  | { type: 'products/setLoading'; payload: boolean }
  | { type: 'products/setError'; payload: string | null };

// Categories action types
export type CategoriesAction =
  | { type: 'categories/setCategories'; payload: any[] }
  | { type: 'categories/setParentCategories'; payload: any[] }
  | { type: 'categories/setSubCategories'; payload: any[] }
  | { type: 'categories/setChildCategories'; payload: any[] }
  | { type: 'categories/addCategory'; payload: any }
  | { type: 'categories/updateCategory'; payload: { categoryId: string; updates: any } }
  | { type: 'categories/removeCategory'; payload: string }
  | { type: 'categories/setLoading'; payload: boolean }
  | { type: 'categories/setError'; payload: string | null };

// Brands action types
export type BrandsAction =
  | { type: 'brands/setBrands'; payload: any[] }
  | { type: 'brands/addBrand'; payload: any }
  | { type: 'brands/updateBrand'; payload: { brandId: string; updates: any } }
  | { type: 'brands/removeBrand'; payload: string }
  | { type: 'brands/setLoading'; payload: boolean }
  | { type: 'brands/setError'; payload: string | null };

// Shops action types
export type ShopsAction =
  | { type: 'shops/setShops'; payload: any[] }
  | { type: 'shops/setCurrentShop'; payload: any | null }
  | { type: 'shops/addShop'; payload: any }
  | { type: 'shops/updateShop'; payload: { shopId: string; updates: any } }
  | { type: 'shops/removeShop'; payload: string }
  | { type: 'shops/setLoading'; payload: boolean }
  | { type: 'shops/setError'; payload: string | null };

// Settings action types
export type SettingsAction =
  | { type: 'settings/setMainSettings'; payload: any }
  | { type: 'settings/setHomeSettings'; payload: any }
  | { type: 'settings/setBrandingSettings'; payload: any }
  | { type: 'settings/setGeneralSettings'; payload: any }
  | { type: 'settings/updateMainSettings'; payload: any }
  | { type: 'settings/updateHomeSettings'; payload: any }
  | { type: 'settings/updateBrandingSettings'; payload: any }
  | { type: 'settings/updateGeneralSettings'; payload: any }
  | { type: 'settings/setLoading'; payload: boolean }
  | { type: 'settings/setError'; payload: string | null };

// All actions union type
export type AllActions =
  | UserAction
  | WishlistAction
  | CartAction
  | CompareAction
  | OrdersAction
  | ProductsAction
  | CategoriesAction
  | BrandsAction
  | ShopsAction
  | SettingsAction;

// Typed hooks
export interface UseAppDispatch {
  (): Dispatch<AllActions>;
}

export interface UseAppSelector {
  <TSelected = unknown>(selector: (state: RootState) => TSelected): TSelected;
}
