
import { z } from 'zod';

const stylesSchema = z.record(z.string(), z.any()).optional();

export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: z.ZodObject<z.ZodRawShape>;
}

export const ecommerceSchemas: Record<string, ComponentSchema> = {
  ProductCard: {
    category: 'ecommerce',
    keywords: ['product', 'card', 'shop', 'buy'],
    description: 'Product card with image, name, price',
    props: z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      originalPrice: z.number().optional(),
      image: z.string(),
      rating: z.number().optional(),
      reviewCount: z.number().optional(),
      badge: z.string().optional(),
      inStock: z.boolean().optional(),
      onAddToCart: z.string().optional(),
      onQuickView: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ProductGrid: {
    category: 'ecommerce',
    keywords: ['product', 'grid', 'list', 'catalog'],
    description: 'Grid layout for products',
    props: z.object({
      products: z.array(z.any()),
      columns: z.number().optional(),
      gap: z.number().optional(),
      loading: z.boolean().optional(),
      emptyMessage: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ProductList: {
    category: 'ecommerce',
    keywords: ['product', 'list', 'catalog'],
    description: 'List view for products',
    props: z.object({
      products: z.array(z.any()),
      layout: z.enum(['compact', 'detailed']).optional(),
      showPagination: z.boolean().optional(),
      itemsPerPage: z.number().optional(),
      style: stylesSchema,
    }),
  },

  ProductDetail: {
    category: 'ecommerce',
    keywords: ['product', 'detail', 'view', 'page'],
    description: 'Detailed product information',
    props: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      originalPrice: z.number().optional(),
      images: z.array(z.string()),
      rating: z.number().optional(),
      reviewCount: z.number().optional(),
      sku: z.string().optional(),
      brand: z.string().optional(),
      category: z.string().optional(),
      inStock: z.boolean().optional(),
      stockCount: z.number().optional(),
      features: z.array(z.string()).optional(),
      specifications: z.record(z.string(), z.string()).optional(),
      style: stylesSchema,
    }),
  },

  ProductGallery: {
    category: 'ecommerce',
    keywords: ['product', 'gallery', 'images', 'carousel'],
    description: 'Product image gallery with thumbnails',
    props: z.object({
      images: z.array(z.object({
        src: z.string(),
        alt: z.string().optional(),
        thumbnail: z.string().optional(),
      })),
      showThumbnails: z.boolean().optional(),
      enableZoom: z.boolean().optional(),
      autoPlay: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  ProductImage: {
    category: 'ecommerce',
    keywords: ['product', 'image', 'photo'],
    description: 'Product image display',
    props: z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
      fallback: z.string().optional(),
      badge: z.string().optional(),
      onError: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ProductPrice: {
    category: 'ecommerce',
    keywords: ['product', 'price', 'cost'],
    description: 'Product price display',
    props: z.object({
      price: z.number(),
      originalPrice: z.number().optional(),
      currency: z.string().optional(),
      showDiscount: z.boolean().optional(),
      discountLabel: z.string().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      style: stylesSchema,
  }),
  },

  ProductRating: {
    category: 'ecommerce',
    keywords: ['product', 'rating', 'review', 'stars'],
    description: 'Product rating display',
    props: z.object({
      rating: z.number(),
      maxRating: z.number().optional(),
      reviewCount: z.number().optional(),
      showCount: z.boolean().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      interactive: z.boolean().optional(),
      onRatingChange: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ProductReviews: {
    category: 'ecommerce',
    keywords: ['product', 'reviews', 'feedback', 'testimonial'],
    description: 'Product reviews section',
    props: z.object({
      productId: z.string(),
      reviews: z.array(z.object({
        id: z.string(),
        author: z.string(),
        rating: z.number(),
        date: z.string(),
        content: z.string(),
        helpful: z.number().optional(),
        verified: z.boolean().optional(),
      })),
      averageRating: z.number().optional(),
      totalReviews: z.number().optional(),
      showWriteReview: z.boolean().optional(),
      sortBy: z.enum(['newest', 'highest', 'lowest', 'helpful']).optional(),
      style: stylesSchema,
    }),
  },

  ProductVariants: {
    category: 'ecommerce',
    keywords: ['product', 'variants', 'options', 'selection'],
    description: 'Product variant selector',
    props: z.object({
      variants: z.array(z.object({
        id: z.string(),
        name: z.string(),
        value: z.string(),
        available: z.boolean().optional(),
        price: z.number().optional(),
        image: z.string().optional(),
      })),
      selectedVariant: z.string().optional(),
      onVariantChange: z.string().optional(),
      style: stylesSchema,
  }),
  },

  ProductOptions: {
    category: 'ecommerce',
    keywords: ['product', 'options', 'ecommerce'],
    description: 'Product Options component',
    props: z.object({
      options: z.array(z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(['color', 'size', 'dropdown', 'radio']),
      values: z.array(z.object({
        id: z.string(),
        label: z.string(),
        value: z.string(),
        available: z.boolean().optional(),
        colorCode: z.string().optional(),
      })),
      })),
      selectedOptions: z.record(z.string(), z.string()).optional(),
      onOptionChange: z.string().optional(),
      style: stylesSchema,
  }),
  },

  ProductBadge: {
    category: 'ecommerce',
    keywords: ['product', 'badge', 'ecommerce'],
    description: 'Product Badge component',
    props: z.object({
      type: z.enum(['sale', 'new', 'bestseller', 'limited', 'outOfStock', 'custom']),
      text: z.string().optional(),
      color: z.string().optional(),
      position: z.enum(['top-left', 'top-right', 'bottom-left', 'bottom-right']).optional(),
      style: stylesSchema,
  }),
  },

  // Cart Action Components
  AddToCart: {
    category: 'ecommerce',
    keywords: ['add', 'to', 'cart', 'ecommerce'],
    description: 'Add To Cart component',
    props: z.object({
      productId: z.string(),
      quantity: z.number().optional(),
      showQuantitySelector: z.boolean().optional(),
      maxQuantity: z.number().optional(),
      disabled: z.boolean().optional(),
      loading: z.boolean().optional(),
      variant: z.enum(['button', 'icon', 'full']).optional(),
      onAdd: z.string().optional(),
      style: stylesSchema,
  }),
  },

  BuyNow: {
    category: 'ecommerce',
    keywords: ['buy', 'now', 'ecommerce'],
    description: 'Buy Now component',
    props: z.object({
      productId: z.string(),
      quantity: z.number().optional(),
      disabled: z.boolean().optional(),
      loading: z.boolean().optional(),
      onClick: z.string().optional(),
      style: stylesSchema,
  }),
  },

  Wishlist: {
    category: 'ecommerce',
    keywords: ['wishlist', 'ecommerce'],
    description: 'Wishlist component',
    props: z.object({
      items: z.array(z.any()),
      emptyMessage: z.string().optional(),
      showRemoveAll: z.boolean().optional(),
      onRemove: z.string().optional(),
      onMoveToCart: z.string().optional(),
      style: stylesSchema,
  }),
  },

  WishlistButton: {
    category: 'ecommerce',
    keywords: ['wishlist', 'button', 'ecommerce'],
    description: 'Wishlist Button component',
    props: z.object({
      productId: z.string(),
      isWishlisted: z.boolean().optional(),
      onToggle: z.string().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      style: stylesSchema,
  }),
  },

  Compare: {
    category: 'ecommerce',
    keywords: ['compare', 'ecommerce'],
    description: 'Compare component',
    props: z.object({
      products: z.array(z.any()),
      attributes: z.array(z.string()).optional(),
      maxProducts: z.number().optional(),
      onRemove: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CompareTable: {
    category: 'ecommerce',
    keywords: ['compare', 'table', 'ecommerce'],
    description: 'Compare Table component',
    props: z.object({
      products: z.array(z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      attributes: z.record(z.string(), z.any()),
      })),
      attributeLabels: z.record(z.string(), z.string()).optional(),
      highlightDifferences: z.boolean().optional(),
      style: stylesSchema,
  }),
  },

  // Cart Components
  Cart: {
    category: 'ecommerce',
    keywords: ['cart', 'ecommerce'],
    description: 'Cart component',
    props: z.object({
      items: z.array(z.any()),
      subtotal: z.number(),
      tax: z.number().optional(),
      shipping: z.number().optional(),
      total: z.number(),
      currency: z.string().optional(),
      emptyMessage: z.string().optional(),
      onCheckout: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CartItem: {
    category: 'ecommerce',
    keywords: ['cart', 'item', 'ecommerce'],
    description: 'Cart Item component',
    props: z.object({
      id: z.string(),
      productId: z.string(),
      name: z.string(),
      image: z.string(),
      price: z.number(),
      quantity: z.number(),
      variant: z.string().optional(),
      maxQuantity: z.number().optional(),
      onQuantityChange: z.string().optional(),
      onRemove: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CartSummary: {
    category: 'ecommerce',
    keywords: ['cart', 'summary', 'ecommerce'],
    description: 'Cart Summary component',
    props: z.object({
      subtotal: z.number(),
      tax: z.number().optional(),
      shipping: z.number().optional(),
      discount: z.number().optional(),
      total: z.number(),
      currency: z.string().optional(),
      itemCount: z.number().optional(),
      showBreakdown: z.boolean().optional(),
      style: stylesSchema,
  }),
  },

  CartDrawer: {
    category: 'ecommerce',
    keywords: ['cart', 'drawer', 'ecommerce'],
    description: 'Cart Drawer component',
    props: z.object({
      isOpen: z.boolean(),
      items: z.array(z.any()),
      total: z.number(),
      currency: z.string().optional(),
      position: z.enum(['left', 'right']).optional(),
      onClose: z.string().optional(),
      onCheckout: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CartIcon: {
    category: 'ecommerce',
    keywords: ['cart', 'icon', 'ecommerce'],
    description: 'Cart Icon component',
    props: z.object({
      itemCount: z.number(),
      showBadge: z.boolean().optional(),
      onClick: z.string().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      style: stylesSchema,
  }),
  },

  // Checkout Components
  Checkout: {
    category: 'ecommerce',
    keywords: ['checkout', 'ecommerce'],
    description: 'Checkout component',
    props: z.object({
      steps: z.array(z.string()),
      currentStep: z.number(),
      cart: z.any(),
      customer: z.any().optional(),
      onComplete: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CheckoutForm: {
    category: 'ecommerce',
    keywords: ['checkout', 'form', 'ecommerce'],
    description: 'Checkout Form component',
    props: z.object({
      sections: z.array(z.enum(['shipping', 'billing', 'payment', 'review'])),
      defaultValues: z.record(z.string(), z.any()).optional(),
      onSubmit: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CheckoutSteps: {
    category: 'ecommerce',
    keywords: ['checkout', 'steps', 'ecommerce'],
    description: 'Checkout Steps component',
    props: z.object({
      steps: z.array(z.object({
      id: z.string(),
      label: z.string(),
      description: z.string().optional(),
      })),
      currentStep: z.number(),
      completedSteps: z.array(z.number()).optional(),
      onStepClick: z.string().optional(),
      style: stylesSchema,
  }),
  },

  ShippingForm: {
    category: 'ecommerce',
    keywords: ['shipping', 'form', 'ecommerce'],
    description: 'Shipping Form component',
    props: z.object({
      defaultValues: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      address1: z.string().optional(),
      address2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
      phone: z.string().optional(),
      }).optional(),
      countries: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
      onSubmit: z.string().optional(),
      style: stylesSchema,
  }),
  },

  BillingForm: {
    category: 'ecommerce',
    keywords: ['billing', 'form', 'ecommerce'],
    description: 'Billing Form component',
    props: z.object({
      defaultValues: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      address1: z.string().optional(),
      address2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
      email: z.string().optional(),
      }).optional(),
      sameAsShipping: z.boolean().optional(),
      onSubmit: z.string().optional(),
      style: stylesSchema,
  }),
  },

  PaymentForm: {
    category: 'ecommerce',
    keywords: ['payment', 'form', 'ecommerce'],
    description: 'Payment Form component',
    props: z.object({
      methods: z.array(z.enum(['card', 'paypal', 'applepay', 'googlepay', 'bank'])),
      selectedMethod: z.string().optional(),
      onMethodChange: z.string().optional(),
      onSubmit: z.string().optional(),
      style: stylesSchema,
  }),
  },

  PaymentMethods: {
    category: 'ecommerce',
    keywords: ['payment', 'methods', 'ecommerce'],
    description: 'Payment Methods component',
    props: z.object({
      methods: z.array(z.object({
      id: z.string(),
      type: z.string(),
      label: z.string(),
      icon: z.string().optional(),
      disabled: z.boolean().optional(),
      })),
      selectedMethod: z.string().optional(),
      onSelect: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CreditCardForm: {
    category: 'ecommerce',
    keywords: ['credit', 'card', 'form', 'ecommerce'],
    description: 'Credit Card Form component',
    props: z.object({
      showCardPreview: z.boolean().optional(),
      acceptedCards: z.array(z.enum(['visa', 'mastercard', 'amex', 'discover'])).optional(),
      onSubmit: z.string().optional(),
      style: stylesSchema,
  }),
  },

  // Order Components
  OrderSummary: {
    category: 'ecommerce',
    keywords: ['order', 'summary', 'ecommerce'],
    description: 'Order Summary component',
    props: z.object({
      items: z.array(z.object({
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
      image: z.string().optional(),
      })),
      subtotal: z.number(),
      tax: z.number().optional(),
      shipping: z.number().optional(),
      discount: z.number().optional(),
      total: z.number(),
      currency: z.string().optional(),
      style: stylesSchema,
  }),
  },

  OrderConfirmation: {
    category: 'ecommerce',
    keywords: ['order', 'confirmation', 'ecommerce'],
    description: 'Order Confirmation component',
    props: z.object({
      orderId: z.string(),
      orderDate: z.string(),
      items: z.array(z.any()),
      total: z.number(),
      shippingAddress: z.any(),
      billingAddress: z.any().optional(),
      paymentMethod: z.string().optional(),
      estimatedDelivery: z.string().optional(),
      trackingNumber: z.string().optional(),
      style: stylesSchema,
  }),
  },

  OrderHistory: {
    category: 'ecommerce',
    keywords: ['order', 'history', 'ecommerce'],
    description: 'Order History component',
    props: z.object({
      orders: z.array(z.object({
      id: z.string(),
      date: z.string(),
      total: z.number(),
      status: z.string(),
      itemCount: z.number(),
      })),
      showPagination: z.boolean().optional(),
      onOrderClick: z.string().optional(),
      style: stylesSchema,
  }),
  },

  OrderItem: {
    category: 'ecommerce',
    keywords: ['order', 'item', 'ecommerce'],
    description: 'Order Item component',
    props: z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      quantity: z.number(),
      price: z.number(),
      variant: z.string().optional(),
      status: z.string().optional(),
      style: stylesSchema,
  }),
  },

  OrderStatus: {
    category: 'ecommerce',
    keywords: ['order', 'status', 'ecommerce'],
    description: 'Order Status component',
    props: z.object({
      status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
      updatedAt: z.string().optional(),
      showIcon: z.boolean().optional(),
      style: stylesSchema,
  }),
  },

  OrderTracking: {
    category: 'ecommerce',
    keywords: ['order', 'tracking', 'ecommerce'],
    description: 'Order Tracking component',
    props: z.object({
      orderId: z.string(),
      trackingNumber: z.string().optional(),
      carrier: z.string().optional(),
      status: z.string(),
      events: z.array(z.object({
      date: z.string(),
      location: z.string().optional(),
      description: z.string(),
      status: z.string(),
      })),
      estimatedDelivery: z.string().optional(),
      style: stylesSchema,
  }),
  },

  Invoice: {
    category: 'ecommerce',
    keywords: ['invoice', 'ecommerce'],
    description: 'Invoice component',
    props: z.object({
      invoiceNumber: z.string(),
      orderId: z.string(),
      date: z.string(),
      dueDate: z.string().optional(),
      items: z.array(z.object({
      description: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      total: z.number(),
      })),
      subtotal: z.number(),
      tax: z.number().optional(),
      total: z.number(),
      currency: z.string().optional(),
      billingAddress: z.any(),
      companyInfo: z.any().optional(),
      style: stylesSchema,
  }),
  },

  Receipt: {
    category: 'ecommerce',
    keywords: ['receipt', 'ecommerce'],
    description: 'Receipt component',
    props: z.object({
      receiptNumber: z.string(),
      date: z.string(),
      items: z.array(z.object({
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
      })),
      subtotal: z.number(),
      tax: z.number().optional(),
      total: z.number(),
      paymentMethod: z.string(),
      currency: z.string().optional(),
      style: stylesSchema,
  }),
  },

  // Coupon & Discount Components
  Coupon: {
    category: 'ecommerce',
    keywords: ['coupon', 'ecommerce'],
    description: 'Coupon component',
    props: z.object({
      code: z.string(),
      description: z.string(),
      discountType: z.enum(['percentage', 'fixed']),
      discountValue: z.number(),
      expiryDate: z.string().optional(),
      minPurchase: z.number().optional(),
      isApplied: z.boolean().optional(),
      style: stylesSchema,
  }),
  },

  CouponInput: {
    category: 'ecommerce',
    keywords: ['coupon', 'input', 'ecommerce'],
    description: 'Coupon Input component',
    props: z.object({
      placeholder: z.string().optional(),
      appliedCoupon: z.string().optional(),
      error: z.string().optional(),
      loading: z.boolean().optional(),
      onApply: z.string().optional(),
      onRemove: z.string().optional(),
      style: stylesSchema,
  }),
  },

  Discount: {
    category: 'ecommerce',
    keywords: ['discount', 'ecommerce'],
    description: 'Discount component',
    props: z.object({
      type: z.enum(['percentage', 'fixed', 'bogo', 'shipping']),
      value: z.number(),
      label: z.string(),
      originalPrice: z.number().optional(),
      discountedPrice: z.number().optional(),
      style: stylesSchema,
  }),
  },

  PromoCode: {
    category: 'ecommerce',
    keywords: ['promo', 'code', 'ecommerce'],
    description: 'Promo Code component',
    props: z.object({
      code: z.string(),
      description: z.string(),
      validUntil: z.string().optional(),
      terms: z.string().optional(),
      onCopy: z.string().optional(),
      style: stylesSchema,
  }),
  },

  // Navigation & Filtering Components
  CategoryNav: {
    category: 'ecommerce',
    keywords: ['category', 'nav', 'ecommerce'],
    description: 'Category Nav component',
    props: z.object({
      categories: z.array(z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      icon: z.string().optional(),
      count: z.number().optional(),
      children: z.array(z.any()).optional(),
      })),
      activeCategory: z.string().optional(),
      layout: z.enum(['horizontal', 'vertical']).optional(),
      showIcons: z.boolean().optional(),
      onCategoryClick: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CategoryCard: {
    category: 'ecommerce',
    keywords: ['category', 'card', 'ecommerce'],
    description: 'Category Card component',
    props: z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      description: z.string().optional(),
      productCount: z.number().optional(),
      slug: z.string().optional(),
      onClick: z.string().optional(),
      style: stylesSchema,
  }),
  },

  CategoryGrid: {
    category: 'ecommerce',
    keywords: ['category', 'grid', 'ecommerce'],
    description: 'Category Grid component',
    props: z.object({
      categories: z.array(z.any()),
      columns: z.number().optional(),
      gap: z.number().optional(),
      style: stylesSchema,
  }),
  },

  FilterPanel: {
    category: 'ecommerce',
    keywords: ['filter', 'panel', 'ecommerce'],
    description: 'Filter Panel component',
    props: z.object({
      filters: z.array(z.object({
      id: z.string(),
      label: z.string(),
      type: z.enum(['checkbox', 'radio', 'range', 'color', 'rating']),
      options: z.array(z.any()).optional(),
      min: z.number().optional(),
      max: z.number().optional(),
      })),
      activeFilters: z.record(z.string(), z.any()).optional(),
      showClearAll: z.boolean().optional(),
      onFilterChange: z.string().optional(),
      onClearAll: z.string().optional(),
      style: stylesSchema,
  }),
  },

  FilterGroup: {
    category: 'ecommerce',
    keywords: ['filter', 'group', 'ecommerce'],
    description: 'Filter Group component',
    props: z.object({
      id: z.string(),
      label: z.string(),
      type: z.enum(['checkbox', 'radio', 'range', 'color', 'rating']),
      options: z.array(z.object({
      label: z.string(),
      value: z.string(),
      count: z.number().optional(),
      })).optional(),
      min: z.number().optional(),
      max: z.number().optional(),
      value: z.any().optional(),
      expanded: z.boolean().optional(),
      onChange: z.string().optional(),
      style: stylesSchema,
  }),
  },

  SortDropdown: {
    category: 'ecommerce',
    keywords: ['sort', 'dropdown', 'ecommerce'],
    description: 'Sort Dropdown component',
    props: z.object({
      options: z.array(z.object({
      label: z.string(),
      value: z.string(),
      })),
      selectedValue: z.string().optional(),
      label: z.string().optional(),
      onChange: z.string().optional(),
      style: stylesSchema,
  }),
  },

  PriceRange: {
    category: 'ecommerce',
    keywords: ['price', 'range', 'ecommerce'],
    description: 'Price Range component',
    props: z.object({
      min: z.number(),
      max: z.number(),
      currentMin: z.number().optional(),
      currentMax: z.number().optional(),
      step: z.number().optional(),
      currency: z.string().optional(),
      onChange: z.string().optional(),
      style: stylesSchema,
  }),
  },
};