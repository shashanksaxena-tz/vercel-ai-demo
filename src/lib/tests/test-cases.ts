/**
 * Test Cases - 50+ UI configurations for testing the Generative UI Builder
 * Each test case includes a JSON tree that can be rendered with any registry
 */

import type { UITree, UIElement } from '@json-render/core';

export interface TestCase {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  tree: UITree;
}

// Helper to create UIElement with key
function el(key: string, type: string, props: Record<string, unknown>, children?: string[]): UIElement {
  return { key, type, props, children };
}

export const testCases: TestCase[] = [
  // ============================================
  // LAYOUT TEST CASES (1-10)
  // ============================================
  {
    id: 'layout-1',
    name: 'Simple Container',
    description: 'Basic container with centered content',
    category: 'layout',
    tags: ['container', 'centered', 'basic'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'lg', centered: true }, ['heading']),
        heading: el('heading', 'Heading', { level: '1', text: 'Welcome to the UI Builder' }),
      },
    },
  },
  {
    id: 'layout-2',
    name: 'Two Column Layout',
    description: 'Responsive two column grid',
    category: 'layout',
    tags: ['grid', 'columns', 'responsive'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl' }, ['grid']),
        grid: el('grid', 'Grid', { columns: 2, gap: 'lg' }, ['col1', 'col2']),
        col1: el('col1', 'Card', { title: 'First Column', description: 'Content for the first column' }),
        col2: el('col2', 'Card', { title: 'Second Column', description: 'Content for the second column' }),
      },
    },
  },
  {
    id: 'layout-3',
    name: 'Three Column Grid',
    description: 'Three column responsive grid layout',
    category: 'layout',
    tags: ['grid', 'columns', 'three-column'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl' }, ['grid']),
        grid: el('grid', 'Grid', { columns: 3, gap: 'md' }, ['card1', 'card2', 'card3']),
        card1: el('card1', 'Card', { title: 'Feature 1', description: 'Description of feature 1' }),
        card2: el('card2', 'Card', { title: 'Feature 2', description: 'Description of feature 2' }),
        card3: el('card3', 'Card', { title: 'Feature 3', description: 'Description of feature 3' }),
      },
    },
  },
  {
    id: 'layout-4',
    name: 'Responsive Grid',
    description: 'Grid that adapts to screen size',
    category: 'layout',
    tags: ['grid', 'responsive', 'adaptive'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: '2xl' }, ['heading', 'grid']),
        heading: el('heading', 'Heading', { level: '2', text: 'Responsive Gallery' }),
        grid: el('grid', 'Grid', { columns: 4, gap: 'md' }, ['item1', 'item2', 'item3', 'item4']),
        item1: el('item1', 'Card', { variant: 'elevated' }, ['img1']),
        item2: el('item2', 'Card', { variant: 'elevated' }, ['img2']),
        item3: el('item3', 'Card', { variant: 'elevated' }, ['img3']),
        item4: el('item4', 'Card', { variant: 'elevated' }, ['img4']),
        img1: el('img1', 'Text', { content: 'Image 1' }),
        img2: el('img2', 'Text', { content: 'Image 2' }),
        img3: el('img3', 'Text', { content: 'Image 3' }),
        img4: el('img4', 'Text', { content: 'Image 4' }),
      },
    },
  },
  {
    id: 'layout-5',
    name: 'Vertical Stack',
    description: 'Vertically stacked content',
    category: 'layout',
    tags: ['stack', 'vertical', 'spacing'],
    tree: {
      root: 'stack',
      elements: {
        stack: el('stack', 'Stack', { direction: 'vertical', spacing: 'lg' }, ['h1', 'p1', 'p2', 'btn']),
        h1: el('h1', 'Heading', { level: '1', text: 'Page Title' }),
        p1: el('p1', 'Text', { content: 'First paragraph of content goes here.' }),
        p2: el('p2', 'Text', { content: 'Second paragraph with more information.' }),
        btn: el('btn', 'Button', { label: 'Get Started', variant: 'solid' }),
      },
    },
  },
  {
    id: 'layout-6',
    name: 'Horizontal Stack',
    description: 'Horizontally aligned elements',
    category: 'layout',
    tags: ['stack', 'horizontal', 'row'],
    tree: {
      root: 'row',
      elements: {
        row: el('row', 'Row', { gap: 'md', align: 'center', justify: 'between' }, ['logo', 'nav', 'actions']),
        logo: el('logo', 'Text', { content: 'Logo', size: 'lg' }),
        nav: el('nav', 'Row', { gap: 'sm' }, ['link1', 'link2', 'link3']),
        link1: el('link1', 'Link', { text: 'Home', href: '#' }),
        link2: el('link2', 'Link', { text: 'About', href: '#' }),
        link3: el('link3', 'Link', { text: 'Contact', href: '#' }),
        actions: el('actions', 'Button', { label: 'Sign In', variant: 'outline' }),
      },
    },
  },
  {
    id: 'layout-7',
    name: 'Card Grid Layout',
    description: 'Grid of feature cards',
    category: 'layout',
    tags: ['cards', 'grid', 'features'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl' }, ['heading', 'grid']),
        heading: el('heading', 'Heading', { level: '2', text: 'Our Features', align: 'center' }),
        grid: el('grid', 'Grid', { columns: 3, gap: 'lg' }, ['f1', 'f2', 'f3', 'f4', 'f5', 'f6']),
        f1: el('f1', 'Card', { title: 'Fast', description: 'Lightning fast performance' }),
        f2: el('f2', 'Card', { title: 'Secure', description: 'Enterprise-grade security' }),
        f3: el('f3', 'Card', { title: 'Reliable', description: '99.9% uptime guarantee' }),
        f4: el('f4', 'Card', { title: 'Scalable', description: 'Grows with your business' }),
        f5: el('f5', 'Card', { title: 'Support', description: '24/7 customer support' }),
        f6: el('f6', 'Card', { title: 'Affordable', description: 'Competitive pricing' }),
      },
    },
  },
  {
    id: 'layout-8',
    name: 'Sidebar Layout',
    description: 'Content with sidebar',
    category: 'layout',
    tags: ['sidebar', 'layout', 'navigation'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: '2xl' }, ['row']),
        row: el('row', 'Row', { gap: 'lg' }, ['sidebar', 'main']),
        sidebar: el('sidebar', 'Column', { gap: 'md' }, ['nav1', 'nav2', 'nav3']),
        nav1: el('nav1', 'Button', { label: 'Dashboard', variant: 'ghost' }),
        nav2: el('nav2', 'Button', { label: 'Settings', variant: 'ghost' }),
        nav3: el('nav3', 'Button', { label: 'Profile', variant: 'ghost' }),
        main: el('main', 'Card', { title: 'Main Content', description: 'This is the main content area' }),
      },
    },
  },
  {
    id: 'layout-9',
    name: 'Header Layout',
    description: 'Standard header with navigation',
    category: 'layout',
    tags: ['header', 'navigation', 'navbar'],
    tree: {
      root: 'header',
      elements: {
        header: el('header', 'Row', { justify: 'between', align: 'center', gap: 'md' }, ['brand', 'nav', 'cta']),
        brand: el('brand', 'Heading', { level: '4', text: 'Brand' }),
        nav: el('nav', 'Row', { gap: 'sm' }, ['l1', 'l2', 'l3', 'l4']),
        l1: el('l1', 'Link', { text: 'Products', href: '#' }),
        l2: el('l2', 'Link', { text: 'Solutions', href: '#' }),
        l3: el('l3', 'Link', { text: 'Pricing', href: '#' }),
        l4: el('l4', 'Link', { text: 'About', href: '#' }),
        cta: el('cta', 'Button', { label: 'Get Started', variant: 'solid' }),
      },
    },
  },
  {
    id: 'layout-10',
    name: 'Full Page Layout',
    description: 'Complete page structure',
    category: 'layout',
    tags: ['page', 'full', 'structure'],
    tree: {
      root: 'page',
      elements: {
        page: el('page', 'Column', { gap: 'lg' }, ['header', 'main', 'footer']),
        header: el('header', 'Row', { justify: 'between', align: 'center' }, ['logo', 'nav']),
        logo: el('logo', 'Heading', { level: '4', text: 'MyApp' }),
        nav: el('nav', 'Row', { gap: 'md' }, ['link1', 'link2', 'btn']),
        link1: el('link1', 'Link', { text: 'Home', href: '#' }),
        link2: el('link2', 'Link', { text: 'About', href: '#' }),
        btn: el('btn', 'Button', { label: 'Sign Up', variant: 'solid' }),
        main: el('main', 'Container', { maxWidth: 'lg' }, ['content']),
        content: el('content', 'Card', { title: 'Welcome', description: 'Main page content here' }),
        footer: el('footer', 'Text', { content: '© 2024 MyApp. All rights reserved.', color: 'muted' }),
      },
    },
  },

  // ============================================
  // CARD TEST CASES (11-20)
  // ============================================
  {
    id: 'card-1',
    name: 'Basic Card',
    description: 'Simple card with title and description',
    category: 'cards',
    tags: ['card', 'basic', 'simple'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Card Title', description: 'This is a basic card with some description text.' }),
      },
    },
  },
  {
    id: 'card-2',
    name: 'Card with Actions',
    description: 'Card with action buttons',
    category: 'cards',
    tags: ['card', 'actions', 'buttons'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Actions Card' }, ['body', 'actions']),
        body: el('body', 'Text', { content: 'Card content with action buttons below.' }),
        actions: el('actions', 'Row', { gap: 'sm', justify: 'end' }, ['cancel', 'save']),
        cancel: el('cancel', 'Button', { label: 'Cancel', variant: 'outline' }),
        save: el('save', 'Button', { label: 'Save', variant: 'solid' }),
      },
    },
  },
  {
    id: 'card-3',
    name: 'Profile Card',
    description: 'User profile card with avatar',
    category: 'cards',
    tags: ['card', 'profile', 'avatar', 'user'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { variant: 'elevated' }, ['header', 'body']),
        header: el('header', 'Row', { gap: 'md', align: 'center' }, ['avatar', 'info']),
        avatar: el('avatar', 'Avatar', { name: 'John Doe', size: 'lg' }),
        info: el('info', 'Column', { gap: 'xs' }, ['name', 'role']),
        name: el('name', 'Heading', { level: '4', text: 'John Doe' }),
        role: el('role', 'Text', { content: 'Software Engineer', color: 'muted' }),
        body: el('body', 'Text', { content: 'Building amazing things with code.' }),
      },
    },
  },
  {
    id: 'card-4',
    name: 'Stats Card',
    description: 'Card displaying statistics',
    category: 'cards',
    tags: ['card', 'stats', 'metrics'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { variant: 'outlined' }, ['content']),
        content: el('content', 'Metric', { label: 'Total Revenue', value: '$45,231', change: '+12.5%', changeType: 'positive' }),
      },
    },
  },
  {
    id: 'card-5',
    name: 'Image Card',
    description: 'Card with image header',
    category: 'cards',
    tags: ['card', 'image', 'media'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { variant: 'elevated' }, ['img', 'body']),
        img: el('img', 'Text', { content: '[Image Placeholder]', align: 'center' }),
        body: el('body', 'Column', { gap: 'sm' }, ['title', 'desc']),
        title: el('title', 'Heading', { level: '4', text: 'Beautiful Sunset' }),
        desc: el('desc', 'Text', { content: 'A stunning view of the sunset over the ocean.' }),
      },
    },
  },
  {
    id: 'card-6',
    name: 'Hoverable Card',
    description: 'Interactive card with hover effect',
    category: 'cards',
    tags: ['card', 'hover', 'interactive'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { variant: 'elevated', hoverable: true }, ['content']),
        content: el('content', 'Column', { gap: 'sm' }, ['title', 'desc']),
        title: el('title', 'Heading', { level: '4', text: 'Hover Me' }),
        desc: el('desc', 'Text', { content: 'This card has a nice hover effect.' }),
      },
    },
  },
  {
    id: 'card-7',
    name: 'Gradient Card',
    description: 'Card with gradient styling',
    category: 'cards',
    tags: ['card', 'gradient', 'colorful'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { variant: 'filled' }, ['content']),
        content: el('content', 'Column', { gap: 'md', align: 'center' }, ['icon', 'title', 'desc']),
        icon: el('icon', 'Badge', { text: '★', variant: 'solid', color: 'warning' }),
        title: el('title', 'Heading', { level: '3', text: 'Premium Plan' }),
        desc: el('desc', 'Text', { content: 'Unlock all features and benefits.' }),
      },
    },
  },
  {
    id: 'card-8',
    name: 'Nested Cards',
    description: 'Cards within cards',
    category: 'cards',
    tags: ['card', 'nested', 'complex'],
    tree: {
      root: 'outer',
      elements: {
        outer: el('outer', 'Card', { title: 'Parent Card' }, ['grid']),
        grid: el('grid', 'Grid', { columns: 2, gap: 'md' }, ['inner1', 'inner2']),
        inner1: el('inner1', 'Card', { variant: 'outlined', title: 'Child 1', description: 'First nested card' }),
        inner2: el('inner2', 'Card', { variant: 'outlined', title: 'Child 2', description: 'Second nested card' }),
      },
    },
  },
  {
    id: 'card-9',
    name: 'Card List',
    description: 'List of cards',
    category: 'cards',
    tags: ['card', 'list', 'multiple'],
    tree: {
      root: 'stack',
      elements: {
        stack: el('stack', 'Stack', { direction: 'vertical', spacing: 'md' }, ['c1', 'c2', 'c3']),
        c1: el('c1', 'Card', { variant: 'outlined', title: 'Item 1', description: 'First item in the list' }),
        c2: el('c2', 'Card', { variant: 'outlined', title: 'Item 2', description: 'Second item in the list' }),
        c3: el('c3', 'Card', { variant: 'outlined', title: 'Item 3', description: 'Third item in the list' }),
      },
    },
  },
  {
    id: 'card-10',
    name: 'Product Card',
    description: 'E-commerce product card',
    category: 'cards',
    tags: ['card', 'product', 'ecommerce'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { variant: 'elevated' }, ['img', 'body', 'footer']),
        img: el('img', 'Text', { content: '[Product Image]', align: 'center', size: 'lg' }),
        body: el('body', 'Column', { gap: 'sm' }, ['name', 'price', 'rating']),
        name: el('name', 'Heading', { level: '4', text: 'Product Name' }),
        price: el('price', 'Text', { content: '$99.99', size: 'lg' }),
        rating: el('rating', 'Row', { gap: 'xs' }, ['stars', 'count']),
        stars: el('stars', 'Text', { content: '★★★★☆' }),
        count: el('count', 'Text', { content: '(42 reviews)', color: 'muted' }),
        footer: el('footer', 'Button', { label: 'Add to Cart', variant: 'solid', fullWidth: true }),
      },
    },
  },

  // ============================================
  // FORM TEST CASES (21-30)
  // ============================================
  {
    id: 'form-1',
    name: 'Login Form',
    description: 'Simple login form',
    category: 'forms',
    tags: ['form', 'login', 'auth'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Sign In' }, ['form']),
        form: el('form', 'Column', { gap: 'md' }, ['email', 'password', 'submit']),
        email: el('email', 'Input', { label: 'Email', type: 'email', placeholder: 'Enter your email' }),
        password: el('password', 'Input', { label: 'Password', type: 'password', placeholder: 'Enter your password' }),
        submit: el('submit', 'Button', { label: 'Sign In', variant: 'solid', fullWidth: true }),
      },
    },
  },
  {
    id: 'form-2',
    name: 'Registration Form',
    description: 'User registration form',
    category: 'forms',
    tags: ['form', 'register', 'signup'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Create Account' }, ['form']),
        form: el('form', 'Column', { gap: 'md' }, ['nameRow', 'email', 'password', 'confirm', 'submit']),
        nameRow: el('nameRow', 'Row', { gap: 'md' }, ['firstName', 'lastName']),
        firstName: el('firstName', 'Input', { label: 'First Name', placeholder: 'John' }),
        lastName: el('lastName', 'Input', { label: 'Last Name', placeholder: 'Doe' }),
        email: el('email', 'Input', { label: 'Email', type: 'email', placeholder: 'john@example.com' }),
        password: el('password', 'Input', { label: 'Password', type: 'password', placeholder: 'Create a password' }),
        confirm: el('confirm', 'Input', { label: 'Confirm Password', type: 'password', placeholder: 'Confirm password' }),
        submit: el('submit', 'Button', { label: 'Create Account', variant: 'solid', fullWidth: true }),
      },
    },
  },
  {
    id: 'form-3',
    name: 'Contact Form',
    description: 'Contact us form',
    category: 'forms',
    tags: ['form', 'contact', 'message'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Contact Us' }, ['form']),
        form: el('form', 'Column', { gap: 'md' }, ['name', 'email', 'subject', 'message', 'submit']),
        name: el('name', 'Input', { label: 'Name', placeholder: 'Your name' }),
        email: el('email', 'Input', { label: 'Email', type: 'email', placeholder: 'your@email.com' }),
        subject: el('subject', 'Input', { label: 'Subject', placeholder: 'What is this about?' }),
        message: el('message', 'TextArea', { label: 'Message', placeholder: 'Your message...', rows: 4 }),
        submit: el('submit', 'Button', { label: 'Send Message', variant: 'solid' }),
      },
    },
  },
  {
    id: 'form-4',
    name: 'Search Form',
    description: 'Search with filters',
    category: 'forms',
    tags: ['form', 'search', 'filter'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', {}, ['form']),
        form: el('form', 'Row', { gap: 'md', align: 'end' }, ['search', 'category', 'btn']),
        search: el('search', 'Input', { label: 'Search', placeholder: 'Search...' }),
        category: el('category', 'Select', { label: 'Category', placeholder: 'All categories', options: [{ value: 'all', label: 'All' }, { value: 'tech', label: 'Technology' }, { value: 'design', label: 'Design' }] }),
        btn: el('btn', 'Button', { label: 'Search', variant: 'solid' }),
      },
    },
  },
  {
    id: 'form-5',
    name: 'Settings Form',
    description: 'Application settings',
    category: 'forms',
    tags: ['form', 'settings', 'preferences'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Settings' }, ['form']),
        form: el('form', 'Column', { gap: 'lg' }, ['notifications', 'theme', 'language', 'actions']),
        notifications: el('notifications', 'Switch', { label: 'Enable Notifications' }),
        theme: el('theme', 'Select', { label: 'Theme', options: [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'system', label: 'System' }] }),
        language: el('language', 'Select', { label: 'Language', options: [{ value: 'en', label: 'English' }, { value: 'es', label: 'Spanish' }, { value: 'fr', label: 'French' }] }),
        actions: el('actions', 'Row', { gap: 'sm', justify: 'end' }, ['cancel', 'save']),
        cancel: el('cancel', 'Button', { label: 'Cancel', variant: 'outline' }),
        save: el('save', 'Button', { label: 'Save Changes', variant: 'solid' }),
      },
    },
  },
  {
    id: 'form-6',
    name: 'Checkout Form',
    description: 'Payment checkout form',
    category: 'forms',
    tags: ['form', 'checkout', 'payment'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Payment Details' }, ['form']),
        form: el('form', 'Column', { gap: 'md' }, ['cardNumber', 'row', 'submit']),
        cardNumber: el('cardNumber', 'Input', { label: 'Card Number', placeholder: '1234 5678 9012 3456' }),
        row: el('row', 'Row', { gap: 'md' }, ['expiry', 'cvc']),
        expiry: el('expiry', 'Input', { label: 'Expiry Date', placeholder: 'MM/YY' }),
        cvc: el('cvc', 'Input', { label: 'CVC', placeholder: '123' }),
        submit: el('submit', 'Button', { label: 'Pay Now', variant: 'solid', fullWidth: true }),
      },
    },
  },
  {
    id: 'form-7',
    name: 'Filter Form',
    description: 'Advanced filtering options',
    category: 'forms',
    tags: ['form', 'filter', 'advanced'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Filters' }, ['form']),
        form: el('form', 'Column', { gap: 'md' }, ['priceRange', 'category', 'inStock', 'apply']),
        priceRange: el('priceRange', 'Slider', { label: 'Price Range', min: 0, max: 1000 }),
        category: el('category', 'Select', { label: 'Category', options: [{ value: 'electronics', label: 'Electronics' }, { value: 'clothing', label: 'Clothing' }] }),
        inStock: el('inStock', 'Checkbox', { label: 'In Stock Only' }),
        apply: el('apply', 'Button', { label: 'Apply Filters', variant: 'solid', fullWidth: true }),
      },
    },
  },
  {
    id: 'form-8',
    name: 'Multi-step Form',
    description: 'Form with stepper progress',
    category: 'forms',
    tags: ['form', 'wizard', 'stepper'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', {}, ['stepper', 'form', 'actions']),
        stepper: el('stepper', 'Row', { justify: 'center', gap: 'lg' }, ['s1', 's2', 's3']),
        s1: el('s1', 'Badge', { text: '1', variant: 'solid', color: 'info' }),
        s2: el('s2', 'Badge', { text: '2', variant: 'outline' }),
        s3: el('s3', 'Badge', { text: '3', variant: 'outline' }),
        form: el('form', 'Column', { gap: 'md' }, ['name', 'email']),
        name: el('name', 'Input', { label: 'Full Name', placeholder: 'Enter your name' }),
        email: el('email', 'Input', { label: 'Email', type: 'email', placeholder: 'Enter your email' }),
        actions: el('actions', 'Row', { justify: 'between' }, ['back', 'next']),
        back: el('back', 'Button', { label: 'Back', variant: 'outline', disabled: true }),
        next: el('next', 'Button', { label: 'Next', variant: 'solid' }),
      },
    },
  },
  {
    id: 'form-9',
    name: 'Feedback Form',
    description: 'User feedback collection',
    category: 'forms',
    tags: ['form', 'feedback', 'rating'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Give Feedback' }, ['form']),
        form: el('form', 'Column', { gap: 'md' }, ['rating', 'feedback', 'submit']),
        rating: el('rating', 'Rating', { label: 'How would you rate us?', max: 5 }),
        feedback: el('feedback', 'TextArea', { label: 'Your Feedback', placeholder: 'Tell us what you think...', rows: 4 }),
        submit: el('submit', 'Button', { label: 'Submit Feedback', variant: 'solid' }),
      },
    },
  },
  {
    id: 'form-10',
    name: 'Profile Edit Form',
    description: 'Edit user profile',
    category: 'forms',
    tags: ['form', 'profile', 'edit'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Edit Profile' }, ['avatar', 'form']),
        avatar: el('avatar', 'Row', { justify: 'center' }, ['avatarImg']),
        avatarImg: el('avatarImg', 'Avatar', { name: 'John Doe', size: 'lg' }),
        form: el('form', 'Column', { gap: 'md' }, ['name', 'bio', 'website', 'actions']),
        name: el('name', 'Input', { label: 'Display Name', placeholder: 'Your name' }),
        bio: el('bio', 'TextArea', { label: 'Bio', placeholder: 'Tell us about yourself', rows: 3 }),
        website: el('website', 'Input', { label: 'Website', type: 'url', placeholder: 'https://example.com' }),
        actions: el('actions', 'Button', { label: 'Save Profile', variant: 'solid', fullWidth: true }),
      },
    },
  },

  // ============================================
  // DASHBOARD TEST CASES (31-40)
  // ============================================
  {
    id: 'dashboard-1',
    name: 'Stats Overview',
    description: 'Key metrics dashboard',
    category: 'dashboards',
    tags: ['dashboard', 'stats', 'metrics'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl' }, ['heading', 'grid']),
        heading: el('heading', 'Heading', { level: '2', text: 'Dashboard Overview' }),
        grid: el('grid', 'Grid', { columns: 4, gap: 'md' }, ['m1', 'm2', 'm3', 'm4']),
        m1: el('m1', 'Card', { variant: 'outlined' }, ['metric1']),
        m2: el('m2', 'Card', { variant: 'outlined' }, ['metric2']),
        m3: el('m3', 'Card', { variant: 'outlined' }, ['metric3']),
        m4: el('m4', 'Card', { variant: 'outlined' }, ['metric4']),
        metric1: el('metric1', 'Metric', { label: 'Total Users', value: '12,345', change: '+15%', changeType: 'positive' }),
        metric2: el('metric2', 'Metric', { label: 'Revenue', value: '$54,321', change: '+8%', changeType: 'positive' }),
        metric3: el('metric3', 'Metric', { label: 'Orders', value: '1,234', change: '-3%', changeType: 'negative' }),
        metric4: el('metric4', 'Metric', { label: 'Conversion', value: '3.2%', change: '+0.5%', changeType: 'positive' }),
      },
    },
  },
  {
    id: 'dashboard-2',
    name: 'Activity Feed',
    description: 'Recent activity timeline',
    category: 'dashboards',
    tags: ['dashboard', 'activity', 'timeline'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Recent Activity' }, ['timeline']),
        timeline: el('timeline', 'Column', { gap: 'md' }, ['a1', 'a2', 'a3']),
        a1: el('a1', 'Row', { gap: 'sm', align: 'start' }, ['dot1', 'text1']),
        a2: el('a2', 'Row', { gap: 'sm', align: 'start' }, ['dot2', 'text2']),
        a3: el('a3', 'Row', { gap: 'sm', align: 'start' }, ['dot3', 'text3']),
        dot1: el('dot1', 'Badge', { text: '●', color: 'success' }),
        dot2: el('dot2', 'Badge', { text: '●', color: 'info' }),
        dot3: el('dot3', 'Badge', { text: '●', color: 'warning' }),
        text1: el('text1', 'Text', { content: 'New user registered - 5 minutes ago' }),
        text2: el('text2', 'Text', { content: 'Order #1234 completed - 1 hour ago' }),
        text3: el('text3', 'Text', { content: 'System update scheduled - 2 hours ago' }),
      },
    },
  },
  {
    id: 'dashboard-3',
    name: 'Data Table',
    description: 'Tabular data display',
    category: 'dashboards',
    tags: ['dashboard', 'table', 'data'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Users' }, ['table']),
        table: el('table', 'Column', { gap: 'sm' }, ['header', 'row1', 'row2', 'row3']),
        header: el('header', 'Row', { gap: 'md' }, ['h1', 'h2', 'h3']),
        h1: el('h1', 'Text', { content: 'Name', size: 'sm' }),
        h2: el('h2', 'Text', { content: 'Email', size: 'sm' }),
        h3: el('h3', 'Text', { content: 'Role', size: 'sm' }),
        row1: el('row1', 'Row', { gap: 'md' }, ['r1c1', 'r1c2', 'r1c3']),
        row2: el('row2', 'Row', { gap: 'md' }, ['r2c1', 'r2c2', 'r2c3']),
        row3: el('row3', 'Row', { gap: 'md' }, ['r3c1', 'r3c2', 'r3c3']),
        r1c1: el('r1c1', 'Text', { content: 'John Doe' }),
        r1c2: el('r1c2', 'Text', { content: 'john@example.com' }),
        r1c3: el('r1c3', 'Badge', { text: 'Admin', color: 'info' }),
        r2c1: el('r2c1', 'Text', { content: 'Jane Smith' }),
        r2c2: el('r2c2', 'Text', { content: 'jane@example.com' }),
        r2c3: el('r2c3', 'Badge', { text: 'User', variant: 'outline' }),
        r3c1: el('r3c1', 'Text', { content: 'Bob Wilson' }),
        r3c2: el('r3c2', 'Text', { content: 'bob@example.com' }),
        r3c3: el('r3c3', 'Badge', { text: 'Editor', color: 'success' }),
      },
    },
  },
  {
    id: 'dashboard-4',
    name: 'Progress Dashboard',
    description: 'Progress tracking cards',
    category: 'dashboards',
    tags: ['dashboard', 'progress', 'tracking'],
    tree: {
      root: 'grid',
      elements: {
        grid: el('grid', 'Grid', { columns: 2, gap: 'md' }, ['p1', 'p2', 'p3', 'p4']),
        p1: el('p1', 'Card', { title: 'Project Alpha' }, ['prog1']),
        p2: el('p2', 'Card', { title: 'Project Beta' }, ['prog2']),
        p3: el('p3', 'Card', { title: 'Project Gamma' }, ['prog3']),
        p4: el('p4', 'Card', { title: 'Project Delta' }, ['prog4']),
        prog1: el('prog1', 'Progress', { value: 75, max: 100, showValue: true, color: 'success' }),
        prog2: el('prog2', 'Progress', { value: 45, max: 100, showValue: true, color: 'info' }),
        prog3: el('prog3', 'Progress', { value: 90, max: 100, showValue: true, color: 'success' }),
        prog4: el('prog4', 'Progress', { value: 30, max: 100, showValue: true, color: 'warning' }),
      },
    },
  },
  {
    id: 'dashboard-5',
    name: 'Metric Cards',
    description: 'KPI metric cards',
    category: 'dashboards',
    tags: ['dashboard', 'kpi', 'metrics'],
    tree: {
      root: 'grid',
      elements: {
        grid: el('grid', 'Grid', { columns: 3, gap: 'lg' }, ['c1', 'c2', 'c3']),
        c1: el('c1', 'Card', { variant: 'elevated' }, ['m1']),
        c2: el('c2', 'Card', { variant: 'elevated' }, ['m2']),
        c3: el('c3', 'Card', { variant: 'elevated' }, ['m3']),
        m1: el('m1', 'Metric', { label: 'Monthly Visitors', value: '125K', change: '+12.3%', changeType: 'positive' }),
        m2: el('m2', 'Metric', { label: 'Bounce Rate', value: '32.1%', change: '-5.2%', changeType: 'positive' }),
        m3: el('m3', 'Metric', { label: 'Avg. Session', value: '4m 32s', change: '+8.1%', changeType: 'positive' }),
      },
    },
  },
  {
    id: 'dashboard-6',
    name: 'Charts Dashboard',
    description: 'Dashboard with chart placeholders',
    category: 'dashboards',
    tags: ['dashboard', 'charts', 'analytics'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl' }, ['row']),
        row: el('row', 'Grid', { columns: 2, gap: 'lg' }, ['chart1', 'chart2']),
        chart1: el('chart1', 'Card', { title: 'Revenue Trend' }, ['c1']),
        chart2: el('chart2', 'Card', { title: 'User Growth' }, ['c2']),
        c1: el('c1', 'Chart', { type: 'line', height: 200 }),
        c2: el('c2', 'Chart', { type: 'bar', height: 200 }),
      },
    },
  },
  {
    id: 'dashboard-7',
    name: 'User Dashboard',
    description: 'User account dashboard',
    category: 'dashboards',
    tags: ['dashboard', 'user', 'account'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'lg' }, ['header', 'content']),
        header: el('header', 'Row', { gap: 'md', align: 'center' }, ['avatar', 'info']),
        avatar: el('avatar', 'Avatar', { name: 'John Doe', size: 'lg' }),
        info: el('info', 'Column', { gap: 'xs' }, ['name', 'email']),
        name: el('name', 'Heading', { level: '3', text: 'John Doe' }),
        email: el('email', 'Text', { content: 'john@example.com', color: 'muted' }),
        content: el('content', 'Grid', { columns: 2, gap: 'md' }, ['stats', 'actions']),
        stats: el('stats', 'Card', { title: 'Your Stats' }, ['statList']),
        statList: el('statList', 'Column', { gap: 'sm' }, ['s1', 's2']),
        s1: el('s1', 'Text', { content: 'Projects: 12' }),
        s2: el('s2', 'Text', { content: 'Tasks: 48' }),
        actions: el('actions', 'Card', { title: 'Quick Actions' }, ['btnList']),
        btnList: el('btnList', 'Column', { gap: 'sm' }, ['b1', 'b2']),
        b1: el('b1', 'Button', { label: 'Edit Profile', variant: 'outline', fullWidth: true }),
        b2: el('b2', 'Button', { label: 'View Projects', variant: 'solid', fullWidth: true }),
      },
    },
  },
  {
    id: 'dashboard-8',
    name: 'Analytics Overview',
    description: 'Analytics dashboard',
    category: 'dashboards',
    tags: ['dashboard', 'analytics', 'overview'],
    tree: {
      root: 'column',
      elements: {
        column: el('column', 'Column', { gap: 'lg' }, ['title', 'metrics', 'chart']),
        title: el('title', 'Heading', { level: '2', text: 'Analytics Dashboard' }),
        metrics: el('metrics', 'Grid', { columns: 4, gap: 'md' }, ['m1', 'm2', 'm3', 'm4']),
        m1: el('m1', 'Metric', { label: 'Page Views', value: '1.2M', changeType: 'positive', change: '+15%' }),
        m2: el('m2', 'Metric', { label: 'Unique Visitors', value: '450K', changeType: 'positive', change: '+8%' }),
        m3: el('m3', 'Metric', { label: 'Conversions', value: '12.5K', changeType: 'positive', change: '+23%' }),
        m4: el('m4', 'Metric', { label: 'Revenue', value: '$85K', changeType: 'positive', change: '+12%' }),
        chart: el('chart', 'Card', { title: 'Traffic Overview' }, ['chartPlaceholder']),
        chartPlaceholder: el('chartPlaceholder', 'Chart', { type: 'area', height: 300 }),
      },
    },
  },
  {
    id: 'dashboard-9',
    name: 'Task Management',
    description: 'Task management board',
    category: 'dashboards',
    tags: ['dashboard', 'tasks', 'kanban'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: '2xl' }, ['header', 'board']),
        header: el('header', 'Row', { justify: 'between', align: 'center' }, ['title', 'addBtn']),
        title: el('title', 'Heading', { level: '2', text: 'Tasks' }),
        addBtn: el('addBtn', 'Button', { label: 'Add Task', variant: 'solid' }),
        board: el('board', 'Grid', { columns: 3, gap: 'md' }, ['todo', 'inProgress', 'done']),
        todo: el('todo', 'Card', { title: 'To Do' }, ['t1', 't2']),
        inProgress: el('inProgress', 'Card', { title: 'In Progress' }, ['t3']),
        done: el('done', 'Card', { title: 'Done' }, ['t4', 't5']),
        t1: el('t1', 'Card', { variant: 'outlined', title: 'Task 1', description: 'Implement feature X' }),
        t2: el('t2', 'Card', { variant: 'outlined', title: 'Task 2', description: 'Fix bug in module Y' }),
        t3: el('t3', 'Card', { variant: 'outlined', title: 'Task 3', description: 'Review pull request' }),
        t4: el('t4', 'Card', { variant: 'outlined', title: 'Task 4', description: 'Deploy to staging' }),
        t5: el('t5', 'Card', { variant: 'outlined', title: 'Task 5', description: 'Write documentation' }),
      },
    },
  },
  {
    id: 'dashboard-10',
    name: 'Notification Center',
    description: 'Notifications dashboard',
    category: 'dashboards',
    tags: ['dashboard', 'notifications', 'alerts'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { title: 'Notifications' }, ['list']),
        list: el('list', 'Column', { gap: 'sm' }, ['n1', 'n2', 'n3', 'n4']),
        n1: el('n1', 'Alert', { status: 'success', title: 'Success', description: 'Your changes have been saved.' }),
        n2: el('n2', 'Alert', { status: 'warning', title: 'Warning', description: 'Your storage is almost full.' }),
        n3: el('n3', 'Alert', { status: 'info', title: 'Info', description: 'New features available.' }),
        n4: el('n4', 'Alert', { status: 'error', title: 'Error', description: 'Failed to sync data.' }),
      },
    },
  },

  // ============================================
  // MARKETING TEST CASES (41-50)
  // ============================================
  {
    id: 'marketing-1',
    name: 'Hero Section',
    description: 'Landing page hero',
    category: 'marketing',
    tags: ['marketing', 'hero', 'landing'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'lg', centered: true }, ['content']),
        content: el('content', 'Column', { gap: 'lg', align: 'center' }, ['badge', 'title', 'subtitle', 'cta']),
        badge: el('badge', 'Badge', { text: 'New', variant: 'solid', color: 'info' }),
        title: el('title', 'Heading', { level: '1', text: 'Build Better Products Faster', align: 'center' }),
        subtitle: el('subtitle', 'Text', { content: 'The all-in-one platform for modern teams. Ship faster, collaborate better.', align: 'center', color: 'muted' }),
        cta: el('cta', 'Row', { gap: 'md' }, ['primary', 'secondary']),
        primary: el('primary', 'Button', { label: 'Get Started', variant: 'solid', size: 'lg' }),
        secondary: el('secondary', 'Button', { label: 'Learn More', variant: 'outline', size: 'lg' }),
      },
    },
  },
  {
    id: 'marketing-2',
    name: 'Feature Grid',
    description: 'Features showcase',
    category: 'marketing',
    tags: ['marketing', 'features', 'showcase'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl' }, ['header', 'grid']),
        header: el('header', 'Column', { gap: 'sm', align: 'center' }, ['title', 'subtitle']),
        title: el('title', 'Heading', { level: '2', text: 'Everything You Need', align: 'center' }),
        subtitle: el('subtitle', 'Text', { content: 'Powerful features to help you succeed', align: 'center', color: 'muted' }),
        grid: el('grid', 'Grid', { columns: 3, gap: 'lg' }, ['f1', 'f2', 'f3']),
        f1: el('f1', 'Card', { title: 'Lightning Fast', description: 'Optimized for performance and speed' }),
        f2: el('f2', 'Card', { title: 'Secure by Default', description: 'Enterprise-grade security built in' }),
        f3: el('f3', 'Card', { title: 'Easy Integration', description: 'Works with your existing tools' }),
      },
    },
  },
  {
    id: 'marketing-3',
    name: 'Pricing Cards',
    description: 'Pricing plans',
    category: 'marketing',
    tags: ['marketing', 'pricing', 'plans'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl', centered: true }, ['header', 'grid']),
        header: el('header', 'Heading', { level: '2', text: 'Simple Pricing', align: 'center' }),
        grid: el('grid', 'Grid', { columns: 3, gap: 'lg' }, ['basic', 'pro', 'enterprise']),
        basic: el('basic', 'Card', { variant: 'outlined' }, ['b1', 'b2', 'b3', 'b4']),
        b1: el('b1', 'Heading', { level: '4', text: 'Basic' }),
        b2: el('b2', 'Text', { content: '$9/month', size: 'lg' }),
        b3: el('b3', 'Text', { content: 'Perfect for individuals', color: 'muted' }),
        b4: el('b4', 'Button', { label: 'Get Started', variant: 'outline', fullWidth: true }),
        pro: el('pro', 'Card', { variant: 'elevated' }, ['p1', 'p2', 'p3', 'p4']),
        p1: el('p1', 'Heading', { level: '4', text: 'Pro' }),
        p2: el('p2', 'Text', { content: '$29/month', size: 'lg' }),
        p3: el('p3', 'Text', { content: 'For growing teams', color: 'muted' }),
        p4: el('p4', 'Button', { label: 'Get Started', variant: 'solid', fullWidth: true }),
        enterprise: el('enterprise', 'Card', { variant: 'outlined' }, ['e1', 'e2', 'e3', 'e4']),
        e1: el('e1', 'Heading', { level: '4', text: 'Enterprise' }),
        e2: el('e2', 'Text', { content: 'Custom', size: 'lg' }),
        e3: el('e3', 'Text', { content: 'For large organizations', color: 'muted' }),
        e4: el('e4', 'Button', { label: 'Contact Sales', variant: 'outline', fullWidth: true }),
      },
    },
  },
  {
    id: 'marketing-4',
    name: 'Testimonials',
    description: 'Customer testimonials',
    category: 'marketing',
    tags: ['marketing', 'testimonials', 'social-proof'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'lg' }, ['header', 'grid']),
        header: el('header', 'Heading', { level: '2', text: 'What Our Customers Say', align: 'center' }),
        grid: el('grid', 'Grid', { columns: 2, gap: 'lg' }, ['t1', 't2']),
        t1: el('t1', 'Card', { variant: 'outlined' }, ['q1', 'a1']),
        q1: el('q1', 'Quote', { text: 'This product has transformed how we work. Highly recommended!' }),
        a1: el('a1', 'Row', { gap: 'sm', align: 'center' }, ['av1', 'info1']),
        av1: el('av1', 'Avatar', { name: 'Sarah Johnson', size: 'sm' }),
        info1: el('info1', 'Text', { content: 'Sarah Johnson, CEO', size: 'sm' }),
        t2: el('t2', 'Card', { variant: 'outlined' }, ['q2', 'a2']),
        q2: el('q2', 'Quote', { text: 'The best investment we\'ve made this year. Amazing support team!' }),
        a2: el('a2', 'Row', { gap: 'sm', align: 'center' }, ['av2', 'info2']),
        av2: el('av2', 'Avatar', { name: 'Mike Chen', size: 'sm' }),
        info2: el('info2', 'Text', { content: 'Mike Chen, CTO', size: 'sm' }),
      },
    },
  },
  {
    id: 'marketing-5',
    name: 'CTA Section',
    description: 'Call to action section',
    category: 'marketing',
    tags: ['marketing', 'cta', 'conversion'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { variant: 'filled' }, ['content']),
        content: el('content', 'Column', { gap: 'lg', align: 'center' }, ['title', 'subtitle', 'btn']),
        title: el('title', 'Heading', { level: '2', text: 'Ready to Get Started?', align: 'center' }),
        subtitle: el('subtitle', 'Text', { content: 'Join thousands of happy customers today.', align: 'center' }),
        btn: el('btn', 'Button', { label: 'Start Free Trial', variant: 'solid', size: 'lg' }),
      },
    },
  },
  {
    id: 'marketing-6',
    name: 'Newsletter Signup',
    description: 'Email subscription form',
    category: 'marketing',
    tags: ['marketing', 'newsletter', 'email'],
    tree: {
      root: 'card',
      elements: {
        card: el('card', 'Card', { variant: 'outlined' }, ['content']),
        content: el('content', 'Column', { gap: 'md', align: 'center' }, ['title', 'subtitle', 'form']),
        title: el('title', 'Heading', { level: '3', text: 'Subscribe to Our Newsletter' }),
        subtitle: el('subtitle', 'Text', { content: 'Get the latest updates delivered to your inbox.' }),
        form: el('form', 'Row', { gap: 'sm' }, ['email', 'submit']),
        email: el('email', 'Input', { type: 'email', placeholder: 'Enter your email' }),
        submit: el('submit', 'Button', { label: 'Subscribe', variant: 'solid' }),
      },
    },
  },
  {
    id: 'marketing-7',
    name: 'FAQ Section',
    description: 'Frequently asked questions',
    category: 'marketing',
    tags: ['marketing', 'faq', 'questions'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'lg' }, ['header', 'accordion']),
        header: el('header', 'Heading', { level: '2', text: 'Frequently Asked Questions', align: 'center' }),
        accordion: el('accordion', 'Column', { gap: 'sm' }, ['q1', 'q2', 'q3']),
        q1: el('q1', 'Card', { variant: 'outlined', title: 'What is your refund policy?' }, ['a1']),
        a1: el('a1', 'Text', { content: 'We offer a 30-day money-back guarantee on all plans.' }),
        q2: el('q2', 'Card', { variant: 'outlined', title: 'How do I get started?' }, ['a2']),
        a2: el('a2', 'Text', { content: 'Simply sign up for a free trial and start exploring.' }),
        q3: el('q3', 'Card', { variant: 'outlined', title: 'Do you offer enterprise plans?' }, ['a3']),
        a3: el('a3', 'Text', { content: 'Yes, contact our sales team for custom pricing.' }),
      },
    },
  },
  {
    id: 'marketing-8',
    name: 'Team Section',
    description: 'Team members showcase',
    category: 'marketing',
    tags: ['marketing', 'team', 'about'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl' }, ['header', 'grid']),
        header: el('header', 'Heading', { level: '2', text: 'Meet Our Team', align: 'center' }),
        grid: el('grid', 'Grid', { columns: 4, gap: 'lg' }, ['m1', 'm2', 'm3', 'm4']),
        m1: el('m1', 'Card', { variant: 'outlined' }, ['a1', 'n1', 'r1']),
        m2: el('m2', 'Card', { variant: 'outlined' }, ['a2', 'n2', 'r2']),
        m3: el('m3', 'Card', { variant: 'outlined' }, ['a3', 'n3', 'r3']),
        m4: el('m4', 'Card', { variant: 'outlined' }, ['a4', 'n4', 'r4']),
        a1: el('a1', 'Avatar', { name: 'Alice Smith', size: 'lg' }),
        a2: el('a2', 'Avatar', { name: 'Bob Jones', size: 'lg' }),
        a3: el('a3', 'Avatar', { name: 'Carol White', size: 'lg' }),
        a4: el('a4', 'Avatar', { name: 'David Brown', size: 'lg' }),
        n1: el('n1', 'Heading', { level: '5', text: 'Alice Smith' }),
        n2: el('n2', 'Heading', { level: '5', text: 'Bob Jones' }),
        n3: el('n3', 'Heading', { level: '5', text: 'Carol White' }),
        n4: el('n4', 'Heading', { level: '5', text: 'David Brown' }),
        r1: el('r1', 'Text', { content: 'CEO', color: 'muted' }),
        r2: el('r2', 'Text', { content: 'CTO', color: 'muted' }),
        r3: el('r3', 'Text', { content: 'Design Lead', color: 'muted' }),
        r4: el('r4', 'Text', { content: 'Engineering Lead', color: 'muted' }),
      },
    },
  },
  {
    id: 'marketing-9',
    name: 'Footer Section',
    description: 'Website footer',
    category: 'marketing',
    tags: ['marketing', 'footer', 'navigation'],
    tree: {
      root: 'container',
      elements: {
        container: el('container', 'Container', { maxWidth: 'xl' }, ['grid', 'bottom']),
        grid: el('grid', 'Grid', { columns: 4, gap: 'lg' }, ['col1', 'col2', 'col3', 'col4']),
        col1: el('col1', 'Column', { gap: 'sm' }, ['logo', 'desc']),
        logo: el('logo', 'Heading', { level: '4', text: 'Company' }),
        desc: el('desc', 'Text', { content: 'Building the future of work.', color: 'muted' }),
        col2: el('col2', 'Column', { gap: 'sm' }, ['t2', 'l1', 'l2', 'l3']),
        t2: el('t2', 'Text', { content: 'Product' }),
        l1: el('l1', 'Link', { text: 'Features', href: '#' }),
        l2: el('l2', 'Link', { text: 'Pricing', href: '#' }),
        l3: el('l3', 'Link', { text: 'Changelog', href: '#' }),
        col3: el('col3', 'Column', { gap: 'sm' }, ['t3', 'l4', 'l5', 'l6']),
        t3: el('t3', 'Text', { content: 'Company' }),
        l4: el('l4', 'Link', { text: 'About', href: '#' }),
        l5: el('l5', 'Link', { text: 'Blog', href: '#' }),
        l6: el('l6', 'Link', { text: 'Careers', href: '#' }),
        col4: el('col4', 'Column', { gap: 'sm' }, ['t4', 'l7', 'l8']),
        t4: el('t4', 'Text', { content: 'Legal' }),
        l7: el('l7', 'Link', { text: 'Privacy', href: '#' }),
        l8: el('l8', 'Link', { text: 'Terms', href: '#' }),
        bottom: el('bottom', 'Text', { content: '© 2024 Company. All rights reserved.', color: 'muted', align: 'center' }),
      },
    },
  },
  {
    id: 'marketing-10',
    name: 'Full Landing Page',
    description: 'Complete landing page',
    category: 'marketing',
    tags: ['marketing', 'landing', 'complete'],
    tree: {
      root: 'page',
      elements: {
        page: el('page', 'Column', { gap: 'xl' }, ['nav', 'hero', 'features', 'cta', 'footer']),
        nav: el('nav', 'Row', { justify: 'between', align: 'center' }, ['brand', 'links', 'action']),
        brand: el('brand', 'Heading', { level: '4', text: 'Brand' }),
        links: el('links', 'Row', { gap: 'md' }, ['link1', 'link2', 'link3']),
        link1: el('link1', 'Link', { text: 'Features', href: '#' }),
        link2: el('link2', 'Link', { text: 'Pricing', href: '#' }),
        link3: el('link3', 'Link', { text: 'About', href: '#' }),
        action: el('action', 'Button', { label: 'Sign Up', variant: 'solid' }),
        hero: el('hero', 'Column', { gap: 'lg', align: 'center' }, ['heroTitle', 'heroSubtitle', 'heroCta']),
        heroTitle: el('heroTitle', 'Heading', { level: '1', text: 'Welcome to the Future', align: 'center' }),
        heroSubtitle: el('heroSubtitle', 'Text', { content: 'Build amazing products with our platform.', align: 'center' }),
        heroCta: el('heroCta', 'Button', { label: 'Get Started', variant: 'solid', size: 'lg' }),
        features: el('features', 'Grid', { columns: 3, gap: 'lg' }, ['f1', 'f2', 'f3']),
        f1: el('f1', 'Card', { title: 'Fast', description: 'Lightning fast performance' }),
        f2: el('f2', 'Card', { title: 'Secure', description: 'Enterprise security' }),
        f3: el('f3', 'Card', { title: 'Simple', description: 'Easy to use interface' }),
        cta: el('cta', 'Card', { variant: 'filled' }, ['ctaContent']),
        ctaContent: el('ctaContent', 'Column', { gap: 'md', align: 'center' }, ['ctaTitle', 'ctaBtn']),
        ctaTitle: el('ctaTitle', 'Heading', { level: '2', text: 'Ready to Start?', align: 'center' }),
        ctaBtn: el('ctaBtn', 'Button', { label: 'Try Free', variant: 'solid' }),
        footer: el('footer', 'Text', { content: '© 2024 Brand. All rights reserved.', align: 'center', color: 'muted' }),
      },
    },
  },
];

// Helper functions for test case management
export function getTestCasesByCategory(category: string): TestCase[] {
  return testCases.filter((tc) => tc.category === category);
}

export function getTestCaseById(id: string): TestCase | undefined {
  return testCases.find((tc) => tc.id === id);
}

export function getAllCategories(): string[] {
  return [...new Set(testCases.map((tc) => tc.category))];
}

export function getTestCasesByTag(tag: string): TestCase[] {
  return testCases.filter((tc) => tc.tags.includes(tag));
}

export function searchTestCases(query: string): TestCase[] {
  const lowerQuery = query.toLowerCase();
  return testCases.filter(
    (tc) =>
      tc.name.toLowerCase().includes(lowerQuery) ||
      tc.description.toLowerCase().includes(lowerQuery) ||
      tc.tags.some((tag) => tag.includes(lowerQuery))
  );
}
