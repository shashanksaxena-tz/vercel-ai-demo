# Content Generation Patterns

Quick reference for generating high-quality content in UI components.

## Typography

### Headings
```json
// ✅ GOOD
{
  "type": "Heading",
  "props": {
    "level": "1",
    "text": "Transform Your Business with AI",
    "align": "center"
  }
}

// ❌ BAD
{
  "type": "Heading",
  "props": {
    "level": "1",
    "text": "Heading"
  }
}
```

**Guidelines:**
- Use specific, descriptive text
- H1: Main page title (4-8 words)
- H2: Section titles (3-6 words)
- H3: Subsection titles (2-5 words)
- Never use "Heading", "Title", or similar placeholders

### Text/Paragraphs
```json
// ✅ GOOD
{
  "type": "Text",
  "props": {
    "content": "Our AI-powered platform helps teams collaborate more effectively, automate repetitive tasks, and deliver projects faster than ever before.",
    "size": "lg",
    "color": "muted"
  }
}

// ❌ BAD
{
  "type": "Text",
  "props": {
    "content": "Lorem ipsum dolor sit amet..."
  }
}
```

**Guidelines:**
- Provide 1-3 sentences of contextual content
- Explain value, benefits, or features
- Use clear, professional language
- NO lorem ipsum ever

### Links
```json
// ✅ GOOD
{
  "type": "Link",
  "props": {
    "text": "Learn more about our platform",
    "href": "/about"
  }
}

// ❌ BAD
{
  "type": "Link",
  "props": {
    "text": "Click here",
    "href": "#"
  }
}
```

**Guidelines:**
- Descriptive link text (tells where it goes)
- Use meaningful href paths
- Use "#" only for demos/examples

## Buttons

### Call-to-Action Buttons
```json
// ✅ GOOD - Primary Actions
{
  "type": "Button",
  "props": {
    "label": "Get Started Free",
    "variant": "solid",
    "color": "primary",
    "size": "lg"
  }
}

// ✅ GOOD - Secondary Actions
{
  "type": "Button",
  "props": {
    "label": "Watch Demo",
    "variant": "outline",
    "color": "secondary",
    "leftIcon": "play-circle"
  }
}

// ❌ BAD
{
  "type": "Button",
  "props": {
    "label": "Click Here"
  }
}
```

**Common Button Labels by Context:**
- E-commerce: "Add to Cart", "Buy Now", "View Details", "Quick View"
- Auth: "Sign In", "Create Account", "Reset Password", "Continue with Google"
- Forms: "Save Changes", "Submit Form", "Cancel", "Next Step"
- Content: "Read More", "View Full Article", "Download PDF"
- Navigation: "Go to Dashboard", "View Profile", "Back to Home"

## Data Display

### Metrics
```json
// ✅ GOOD
{
  "type": "Metric",
  "props": {
    "label": "Monthly Revenue",
    "value": "$45,231",
    "change": "+12.5%",
    "changeType": "positive",
    "icon": "dollar-sign"
  }
}

// ❌ BAD
{
  "type": "Metric",
  "props": {
    "label": "Metric",
    "value": "1234"
  }
}
```

**Common Metrics:**
- Revenue: "$45,231", "$1.2M", "€89,450"
- Users: "12,458", "50K+", "1.2M"
- Percentages: "98.5%", "23.4%", "67%"
- Counts: "1,234 orders", "456 items", "89 reviews"
- Growth: "+12.5%", "-3.2%", "+156"

**Common Labels:**
- "Monthly Revenue", "Total Users", "Conversion Rate"
- "Active Subscriptions", "Customer Satisfaction", "Response Time"
- "Orders Completed", "Average Order Value", "Retention Rate"

### Images
```json
// ✅ GOOD
{
  "type": "Image",
  "props": {
    "src": "https://source.unsplash.com/800x600/?business,team",
    "alt": "Team collaborating in a modern office",
    "rounded": true
  }
}

// ❌ BAD
{
  "type": "Image",
  "props": {
    "src": ""
  }
}
```

**Unsplash Query Patterns:**
- Business: `/?business,office`, `/?business,team`, `/?corporate,meeting`
- Tech: `/?technology,computer`, `/?coding,developer`, `/?software,workspace`
- E-commerce: `/?product,shopping`, `/?retail,store`, `/?fashion,clothes`
- People: `/?person,professional`, `/?portrait,business`, `/?team,collaboration`
- Nature: `/?nature,landscape`, `/?outdoor,travel`, `/?city,architecture`

**Alt Text Guidelines:**
- Describe what's in the image
- Include context and action
- Keep under 125 characters
- Don't start with "Image of..." or "Picture of..."

## Layout & Spacing

### Row (Horizontal Layout)
```json
// ✅ GOOD
{
  "type": "Row",
  "props": {
    "gap": "md",
    "justify": "between",
    "align": "center"
  },
  "children": ["logo", "nav", "cta_button"]
}

// ❌ BAD - Missing gap
{
  "type": "Row",
  "children": ["item1", "item2"]
}
```

**Gap Sizes:**
- `xs`: 0.25rem (4px) - Very tight spacing
- `sm`: 0.5rem (8px) - Compact spacing
- `md`: 1rem (16px) - Default spacing
- `lg`: 1.5rem (24px) - Comfortable spacing
- `xl`: 2rem (32px) - Generous spacing

### Column (Vertical Layout)
```json
// ✅ GOOD
{
  "type": "Column",
  "props": {
    "gap": "lg",
    "align": "center"
  },
  "children": ["heading", "description", "button_group"]
}
```

### Grid
```json
// ✅ GOOD - Responsive Grid
{
  "type": "Grid",
  "props": {
    "cols": 3,
    "gap": "lg",
    "responsive": {
      "sm": 1,
      "md": 2,
      "lg": 3
    }
  },
  "children": ["card1", "card2", "card3"]
}

// ✅ GOOD - Fixed Columns
{
  "type": "Grid",
  "props": {
    "cols": 4,
    "gap": "md"
  },
  "children": ["metric1", "metric2", "metric3", "metric4"]
}
```

**Common Column Counts:**
- 1 column: Mobile-first, full-width content
- 2 columns: Split layouts, before/after, pros/cons
- 3 columns: Feature cards, service offerings, team members
- 4 columns: Metrics, stats, product grids
- 6+ columns: Icon grids, small items

## Forms

### Input Fields
```json
// ✅ GOOD
{
  "type": "Input",
  "props": {
    "label": "Email Address",
    "placeholder": "you@example.com",
    "type": "email",
    "required": true,
    "hint": "We'll never share your email"
  }
}

// ❌ BAD
{
  "type": "Input",
  "props": {
    "type": "email"
  }
}
```

**Common Input Labels:**
- "Email Address", "Full Name", "Phone Number"
- "Company Name", "Job Title", "Website URL"
- "Password", "Confirm Password"
- "Street Address", "City", "ZIP Code"

**Common Placeholders:**
- Email: "you@example.com", "name@company.com"
- Name: "John Doe", "Jane Smith"
- Phone: "(555) 123-4567", "+1 (555) 000-0000"
- URL: "https://yoursite.com", "www.example.com"

## Icons

### Common Icon Names
```json
// Navigation
"home", "menu", "search", "settings", "user"

// Actions
"plus", "edit", "trash", "download", "upload", "share"

// E-commerce
"shopping-cart", "heart", "star", "tag", "credit-card"

// Business
"chart-line", "dollar-sign", "users", "briefcase", "building"

// Communication
"mail", "bell", "message", "phone", "calendar"

// Media
"play", "pause", "video", "image", "camera"

// UI
"check", "x", "arrow-right", "arrow-left", "chevron-down"
```

### Icon Usage
```json
// ✅ In Buttons
{
  "type": "Button",
  "props": {
    "label": "Download Report",
    "leftIcon": "download",
    "variant": "outline"
  }
}

// ✅ In Metrics
{
  "type": "Metric",
  "props": {
    "label": "Total Users",
    "value": "12,458",
    "icon": "users"
  }
}

// ✅ Standalone
{
  "type": "Icon",
  "props": {
    "name": "check-circle",
    "color": "success",
    "size": "lg"
  }
}
```

## Complete Examples

### Dashboard Card
```json
{
  "type": "Card",
  "props": { "variant": "elevated", "padding": "lg" },
  "children": ["card_header", "metrics_grid"]
},
{
  "type": "CardHeader",
  "props": {
    "title": "Sales Performance",
    "subtitle": "Last 30 days"
  }
},
{
  "type": "Grid",
  "props": { "cols": 2, "gap": "md" },
  "children": ["metric_revenue", "metric_orders"]
},
{
  "type": "Metric",
  "props": {
    "label": "Revenue",
    "value": "$45,231",
    "change": "+12.5%",
    "changeType": "positive"
  }
},
{
  "type": "Metric",
  "props": {
    "label": "Orders",
    "value": "1,234",
    "change": "+8.2%",
    "changeType": "positive"
  }
}
```

### Product Card
```json
{
  "type": "Card",
  "props": { "hoverable": true },
  "children": ["product_image", "card_body", "card_footer"]
},
{
  "type": "Image",
  "props": {
    "src": "https://source.unsplash.com/400x300/?product,tech",
    "alt": "Wireless noise-cancelling headphones",
    "rounded": true
  }
},
{
  "type": "CardBody",
  "children": ["product_title", "product_description", "price_badge"]
},
{
  "type": "Heading",
  "props": {
    "level": "3",
    "text": "Premium Wireless Headphones"
  }
},
{
  "type": "Text",
  "props": {
    "content": "Experience crystal-clear audio with active noise cancellation and 30-hour battery life."
  }
},
{
  "type": "Badge",
  "props": {
    "text": "$199.99",
    "color": "primary",
    "size": "lg"
  }
},
{
  "type": "CardFooter",
  "children": ["add_to_cart_button"]
},
{
  "type": "Button",
  "props": {
    "label": "Add to Cart",
    "variant": "solid",
    "color": "primary",
    "fullWidth": true,
    "leftIcon": "shopping-cart"
  }
}
```

### Login Form
```json
{
  "type": "Column",
  "props": { "gap": "lg", "maxWidth": "md" },
  "children": ["form_heading", "email_input", "password_input", "button_row", "footer_link"]
},
{
  "type": "Heading",
  "props": {
    "level": "1",
    "text": "Sign In to Your Account",
    "align": "center"
  }
},
{
  "type": "Input",
  "props": {
    "label": "Email Address",
    "placeholder": "you@example.com",
    "type": "email",
    "required": true
  }
},
{
  "type": "Input",
  "props": {
    "label": "Password",
    "placeholder": "Enter your password",
    "type": "password",
    "required": true
  }
},
{
  "type": "Row",
  "props": { "gap": "md", "justify": "between" },
  "children": ["remember_checkbox", "forgot_link"]
},
{
  "type": "Button",
  "props": {
    "label": "Sign In",
    "variant": "solid",
    "color": "primary",
    "fullWidth": true,
    "size": "lg"
  }
},
{
  "type": "Row",
  "props": { "gap": "sm", "justify": "center" },
  "children": ["signup_text", "signup_link"]
},
{
  "type": "Text",
  "props": {
    "content": "Don't have an account?"
  }
},
{
  "type": "Link",
  "props": {
    "text": "Sign up for free",
    "href": "/signup"
  }
}
```

## Quality Checklist

Before generating, verify:
- [ ] All Headings have specific, descriptive text
- [ ] All Text components have realistic content (no lorem ipsum)
- [ ] All Buttons have action-oriented labels
- [ ] All Metrics have formatted values and descriptive labels
- [ ] All Images have src URLs and alt text
- [ ] All layout components have gap values when needed
- [ ] Icons are specified where they enhance the UI
- [ ] Links have meaningful text and href values
- [ ] Forms have labels, placeholders, and hints
- [ ] Responsive grids have column configurations
