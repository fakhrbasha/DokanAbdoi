import { sum, map, filter, uniqBy } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, Address } from '@/types/models';

// ----------------------------------------------------------------------

interface CartItem extends Product {
  quantity: number;
  sku: string;
}

interface CheckoutState {
  activeStep: number;
  cart: CartItem[];
  subtotal: number;
  total: number;
  discount: number;
  shipping: number;
  billing: Address | null;
}

interface ProductState {
  checkout: CheckoutState;
}

interface GetCartPayload {
  cart: CartItem[];
  shipping: number;
}

const initialState: ProductState = {
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null
  }
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // CHECKOUT
    getCart(state, action: PayloadAction<GetCartPayload>) {
      const { cart, shipping } = action.payload;

      const subtotal = sum(cart.map((product) => (product.salePrice || product.price) * product.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shippingFee = cart.length === 0 ? 0 : shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shippingFee;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal + (parseInt(shippingFee.toString()) || 0);
    },

    addCart(state, action: PayloadAction<CartItem>) {
      const product = action.payload;
      const updatedProduct = {
        ...product
      };
      const isEmptyCart = state.checkout.cart.length === 0;
      
      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, updatedProduct];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.sku === updatedProduct.sku;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + product.quantity
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, updatedProduct], 'sku');
    },

    clearCart(state, action: PayloadAction<string>) {
      const updateCart = filter(state.checkout.cart, (item) => item.sku !== action.payload);
      state.checkout.cart = updateCart;
    },

    deleteCart(state, action: PayloadAction<string>) {
      const updateCart = filter(state.checkout.cart, (item) => item.sku !== action.payload);
      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.billing = null;
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const productSku = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.sku === productSku) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });
      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const productSku = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.sku === productSku) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });
      state.checkout.cart = updateCart;
    },

    createBilling(state, action: PayloadAction<Address>) {
      state.checkout.billing = action.payload;
    },

    setShippingFee(state, action: PayloadAction<number>) {
      state.checkout.shipping = action.payload;
    },

    applyDiscount(state, action: PayloadAction<number>) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  setShippingFee,
  clearCart,
  deleteCart,
  createBilling,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity
} = slice.actions;

// Types
export type { ProductState, CheckoutState, CartItem };

// ----------------------------------------------------------------------

