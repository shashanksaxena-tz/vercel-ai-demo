
import { z } from 'zod';

const stylesSchema = z.record(z.string(), z.any()).optional();

export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: z.ZodObject<z.ZodRawShape>;
}

export const marketingSchemas: Record<string, ComponentSchema> = {
  // Hero Components
  Hero: {
    category: 'marketing',
    keywords: ['hero', 'banner', 'header', 'landing', 'headline', 'above-fold'],
    description: 'Main hero section for landing pages with headline and CTA',
    props: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      cta: z.object({
        label: z.string(),
        action: z.string(),
        variant: z.string().optional(),
      }).optional(),
      secondaryCta: z.object({
        label: z.string(),
        action: z.string(),
      }).optional(),
      align: z.enum(['left', 'center', 'right']).optional(),
      size: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      backgroundImage: z.string().optional(),
      overlay: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  HeroSection: {
    category: 'marketing',
    keywords: ['hero', 'section', 'landing', 'banner', 'intro'],
    description: 'Full-width hero section with flexible content layout',
    props: z.object({
      children: z.any(),
      variant: z.enum(['default', 'centered', 'split', 'gradient', 'image']).optional(),
      height: z.enum(['auto', 'screen', 'half']).optional(),
      backgroundImage: z.string().optional(),
      backgroundColor: z.string().optional(),
      overlay: z.boolean().optional(),
      overlayOpacity: z.number().optional(),
      padding: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      style: stylesSchema,
    }),
  },

  HeroWithImage: {
    category: 'marketing',
    keywords: ['hero', 'image', 'visual', 'banner', 'landing'],
    description: 'Hero section with prominent image alongside content',
    props: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      image: z.string(),
      imageAlt: z.string().optional(),
      imagePosition: z.enum(['left', 'right']).optional(),
      cta: z.object({
        label: z.string(),
        action: z.string(),
      }).optional(),
      secondaryCta: z.object({
        label: z.string(),
        action: z.string(),
      }).optional(),
      badges: z.array(z.string()).optional(),
      style: stylesSchema,
    }),
  },

  HeroWithVideo: {
    category: 'marketing',
    keywords: ['hero', 'video', 'media', 'banner', 'landing'],
    description: 'Hero section with background or embedded video',
    props: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      videoUrl: z.string(),
      videoPoster: z.string().optional(),
      autoplay: z.boolean().optional(),
      muted: z.boolean().optional(),
      loop: z.boolean().optional(),
      overlay: z.boolean().optional(),
      cta: z.object({
        label: z.string(),
        action: z.string(),
      }).optional(),
      style: stylesSchema,
    }),
  },

  HeroSplit: {
    category: 'marketing',
    keywords: ['hero', 'split', 'two-column', 'landing', 'banner'],
    description: 'Split-screen hero with content on one side and media on other',
    props: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      media: z.object({
        type: z.enum(['image', 'video', 'component']),
        src: z.string().optional(),
        content: z.any().optional(),
      }),
      contentPosition: z.enum(['left', 'right']).optional(),
      cta: z.object({
        label: z.string(),
        action: z.string(),
      }).optional(),
      secondaryCta: z.object({
        label: z.string(),
        action: z.string(),
      }).optional(),
      style: stylesSchema,
    }),
  },

  // Feature Components
  FeatureSection: {
    category: 'marketing',
    keywords: ['feature', 'section', 'benefits', 'highlights', 'showcase'],
    description: 'Section showcasing product features or benefits',
    props: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        image: z.string().optional(),
      })),
      columns: z.number().optional(),
      variant: z.enum(['default', 'cards', 'icons', 'list']).optional(),
      align: z.enum(['left', 'center', 'right']).optional(),
      style: stylesSchema,
    }),
  },

  FeatureGrid: {
    category: 'marketing',
    keywords: ['feature', 'grid', 'benefits', 'cards', 'layout'],
    description: 'Grid layout for displaying multiple features',
    props: z.object({
      features: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        image: z.string().optional(),
        link: z.string().optional(),
      })),
      columns: z.union([z.number(), z.object({
        sm: z.number(),
        md: z.number(),
        lg: z.number(),
      })]).optional(),
      gap: z.number().optional(),
      variant: z.enum(['default', 'bordered', 'filled', 'minimal']).optional(),
      style: stylesSchema,
    }),
  },

  FeatureList: {
    category: 'marketing',
    keywords: ['feature', 'list', 'benefits', 'checklist', 'bullets'],
    description: 'Vertical list of features with icons',
    props: z.object({
      features: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        checked: z.boolean().optional(),
      })),
      variant: z.enum(['default', 'checkmarks', 'numbered', 'icons']).optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      style: stylesSchema,
    }),
  },

  FeatureCard: {
    category: 'marketing',
    keywords: ['feature', 'card', 'benefit', 'highlight', 'box'],
    description: 'Card component for showcasing a single feature',
    props: z.object({
      title: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
      image: z.string().optional(),
      link: z.string().optional(),
      linkLabel: z.string().optional(),
      variant: z.enum(['default', 'bordered', 'filled', 'elevated']).optional(),
      align: z.enum(['left', 'center']).optional(),
      style: stylesSchema,
    }),
  },

  Feature: {
    category: 'marketing',
    keywords: ['feature', 'benefit', 'highlight', 'item'],
    description: 'Simple feature component with icon and text',
    props: z.object({
      title: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
      iconColor: z.string().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      style: stylesSchema,
    }),
  },

  FeatureIcon: {
    category: 'marketing',
    keywords: ['feature', 'icon', 'symbol', 'badge'],
    description: 'Icon wrapper for feature components',
    props: z.object({
      icon: z.string(),
      size: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
      variant: z.enum(['default', 'filled', 'outlined', 'ghost']).optional(),
      color: z.string().optional(),
      backgroundColor: z.string().optional(),
      rounded: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  // Pricing Components
  Pricing: {
    category: 'marketing',
    keywords: ['pricing', 'plans', 'subscription', 'tiers', 'cost'],
    description: 'Complete pricing section with multiple plans',
    props: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      plans: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.union([z.string(), z.number()]),
        period: z.string().optional(),
        currency: z.string().optional(),
        features: z.array(z.string()),
        highlighted: z.boolean().optional(),
        badge: z.string().optional(),
        cta: z.string().optional(),
        ctaAction: z.string().optional(),
      })),
      columns: z.number().optional(),
      showToggle: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  PricingTable: {
    category: 'marketing',
    keywords: ['pricing', 'table', 'comparison', 'plans', 'features'],
    description: 'Comparison table for pricing plans and features',
    props: z.object({
      plans: z.array(z.object({
        name: z.string(),
        price: z.union([z.string(), z.number()]),
        period: z.string().optional(),
        highlighted: z.boolean().optional(),
      })),
      features: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
        values: z.array(z.union([z.boolean(), z.string()])),
      })),
      showCta: z.boolean().optional(),
      ctaLabels: z.array(z.string()).optional(),
      style: stylesSchema,
    }),
  },

  PricingCard: {
    category: 'marketing',
    keywords: ['pricing', 'card', 'plan', 'tier', 'subscription'],
    description: 'Individual pricing card for a single plan',
    props: z.object({
      name: z.string(),
      description: z.string().optional(),
      price: z.union([z.string(), z.number()]),
      originalPrice: z.union([z.string(), z.number()]).optional(),
      period: z.string().optional(),
      currency: z.string().optional(),
      features: z.array(z.union([
        z.string(),
        z.object({
          text: z.string(),
          included: z.boolean(),
        }),
      ])),
      highlighted: z.boolean().optional(),
      badge: z.string().optional(),
      cta: z.string().optional(),
      ctaVariant: z.string().optional(),
      ctaAction: z.string().optional(),
      style: stylesSchema,
    }),
  },

  PricingTier: {
    category: 'marketing',
    keywords: ['pricing', 'tier', 'level', 'plan'],
    description: 'Pricing tier component for plan selection',
    props: z.object({
      name: z.string(),
      price: z.union([z.string(), z.number()]),
      period: z.string().optional(),
      description: z.string().optional(),
      selected: z.boolean().optional(),
      recommended: z.boolean().optional(),
      onSelect: z.string().optional(),
      style: stylesSchema,
    }),
  },

  PricingToggle: {
    category: 'marketing',
    keywords: ['pricing', 'toggle', 'switch', 'billing', 'monthly', 'yearly'],
    description: 'Toggle switch for pricing period (monthly/yearly)',
    props: z.object({
      options: z.array(z.object({
        label: z.string(),
        value: z.string(),
        discount: z.string().optional(),
      })),
      value: z.string().optional(),
      onChange: z.string().optional(),
      style: stylesSchema,
    }),
  },

  PricingFeature: {
    category: 'marketing',
    keywords: ['pricing', 'feature', 'benefit', 'item', 'included'],
    description: 'Single feature item in a pricing plan',
    props: z.object({
      text: z.string(),
      included: z.boolean().optional(),
      tooltip: z.string().optional(),
      highlight: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  // Testimonial Components
  Testimonial: {
    category: 'marketing',
    keywords: ['testimonial', 'review', 'quote', 'feedback', 'customer'],
    description: 'Customer testimonial with quote and attribution',
    props: z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string().optional(),
      company: z.string().optional(),
      avatar: z.string().optional(),
      rating: z.number().optional(),
      variant: z.enum(['default', 'filled', 'minimal', 'card']).optional(),
      style: stylesSchema,
    }),
  },

  TestimonialCard: {
    category: 'marketing',
    keywords: ['testimonial', 'card', 'review', 'customer', 'quote'],
    description: 'Card-style testimonial component',
    props: z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string().optional(),
      company: z.string().optional(),
      companyLogo: z.string().optional(),
      avatar: z.string().optional(),
      rating: z.number().optional(),
      date: z.string().optional(),
      variant: z.enum(['default', 'bordered', 'elevated']).optional(),
      style: stylesSchema,
    }),
  },

  TestimonialCarousel: {
    category: 'marketing',
    keywords: ['testimonial', 'carousel', 'slider', 'reviews', 'rotating'],
    description: 'Carousel of testimonials with navigation',
    props: z.object({
      testimonials: z.array(z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
        company: z.string().optional(),
        avatar: z.string().optional(),
        rating: z.number().optional(),
      })),
      autoplay: z.boolean().optional(),
      interval: z.number().optional(),
      showDots: z.boolean().optional(),
      showArrows: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  TestimonialGrid: {
    category: 'marketing',
    keywords: ['testimonial', 'grid', 'reviews', 'masonry', 'layout'],
    description: 'Grid layout for multiple testimonials',
    props: z.object({
      testimonials: z.array(z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
        company: z.string().optional(),
        avatar: z.string().optional(),
        rating: z.number().optional(),
      })),
      columns: z.number().optional(),
      variant: z.enum(['default', 'masonry', 'uniform']).optional(),
      gap: z.number().optional(),
      style: stylesSchema,
    }),
  },

  // Review Components
  Review: {
    category: 'marketing',
    keywords: ['review', 'rating', 'feedback', 'stars', 'customer'],
    description: 'Customer review with rating and content',
    props: z.object({
      rating: z.number(),
      title: z.string().optional(),
      content: z.string(),
      author: z.string(),
      date: z.string().optional(),
      verified: z.boolean().optional(),
      helpful: z.number().optional(),
      images: z.array(z.string()).optional(),
      style: stylesSchema,
    }),
  },

  ReviewCard: {
    category: 'marketing',
    keywords: ['review', 'card', 'rating', 'feedback', 'comment'],
    description: 'Card component for displaying a review',
    props: z.object({
      rating: z.number(),
      title: z.string().optional(),
      content: z.string(),
      author: z.string(),
      avatar: z.string().optional(),
      date: z.string().optional(),
      verified: z.boolean().optional(),
      variant: z.enum(['default', 'compact', 'detailed']).optional(),
      style: stylesSchema,
    }),
  },

  ReviewList: {
    category: 'marketing',
    keywords: ['review', 'list', 'ratings', 'comments', 'feedback'],
    description: 'List of customer reviews',
    props: z.object({
      reviews: z.array(z.object({
        rating: z.number(),
        title: z.string().optional(),
        content: z.string(),
        author: z.string(),
        date: z.string().optional(),
        verified: z.boolean().optional(),
      })),
      showSummary: z.boolean().optional(),
      sortBy: z.enum(['newest', 'oldest', 'highest', 'lowest', 'helpful']).optional(),
      style: stylesSchema,
    }),
  },

  ReviewSummary: {
    category: 'marketing',
    keywords: ['review', 'summary', 'rating', 'average', 'breakdown'],
    description: 'Summary of reviews with rating breakdown',
    props: z.object({
      averageRating: z.number(),
      totalReviews: z.number(),
      breakdown: z.array(z.object({
        stars: z.number(),
        count: z.number(),
      })).optional(),
      showHistogram: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  // CTA Components
  CTA: {
    category: 'marketing',
    keywords: ['cta', 'call-to-action', 'button', 'action', 'convert'],
    description: 'Call-to-action component with headline and button',
    props: z.object({
      title: z.string(),
      description: z.string().optional(),
      buttonLabel: z.string(),
      buttonAction: z.string(),
      buttonVariant: z.string().optional(),
      secondaryLabel: z.string().optional(),
      secondaryAction: z.string().optional(),
      align: z.enum(['left', 'center', 'right']).optional(),
      style: stylesSchema,
    }),
  },

  CTASection: {
    category: 'marketing',
    keywords: ['cta', 'section', 'call-to-action', 'banner', 'convert'],
    description: 'Full-width CTA section with background',
    props: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      primaryCta: z.object({
        label: z.string(),
        action: z.string(),
        variant: z.string().optional(),
      }),
      secondaryCta: z.object({
        label: z.string(),
        action: z.string(),
      }).optional(),
      variant: z.enum(['default', 'gradient', 'image', 'dark']).optional(),
      backgroundImage: z.string().optional(),
      style: stylesSchema,
    }),
  },

  CTABanner: {
    category: 'marketing',
    keywords: ['cta', 'banner', 'strip', 'announcement', 'action'],
    description: 'Horizontal CTA banner for promotions',
    props: z.object({
      message: z.string(),
      buttonLabel: z.string(),
      buttonAction: z.string(),
      icon: z.string().optional(),
      dismissible: z.boolean().optional(),
      variant: z.enum(['default', 'info', 'success', 'warning', 'gradient']).optional(),
      onDismiss: z.string().optional(),
      style: stylesSchema,
    }),
  },

  CTACard: {
    category: 'marketing',
    keywords: ['cta', 'card', 'action', 'promotion', 'box'],
    description: 'Card-style CTA component',
    props: z.object({
      title: z.string(),
      description: z.string().optional(),
      image: z.string().optional(),
      buttonLabel: z.string(),
      buttonAction: z.string(),
      variant: z.enum(['default', 'bordered', 'filled', 'gradient']).optional(),
      style: stylesSchema,
    }),
  },

  CTAInline: {
    category: 'marketing',
    keywords: ['cta', 'inline', 'action', 'link', 'text'],
    description: 'Inline CTA within content',
    props: z.object({
      text: z.string(),
      linkText: z.string(),
      linkAction: z.string(),
      icon: z.string().optional(),
      style: stylesSchema,
    }),
  },

  // FAQ Components
  FAQ: {
    category: 'marketing',
    keywords: ['faq', 'questions', 'answers', 'help', 'support'],
    description: 'Frequently asked questions section',
    props: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      items: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })),
      variant: z.enum(['default', 'accordion', 'grid', 'list']).optional(),
      columns: z.number().optional(),
      defaultOpen: z.array(z.number()).optional(),
      allowMultiple: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  FAQItem: {
    category: 'marketing',
    keywords: ['faq', 'question', 'answer', 'item'],
    description: 'Single FAQ question and answer pair',
    props: z.object({
      question: z.string(),
      answer: z.string(),
      open: z.boolean().optional(),
      onToggle: z.string().optional(),
      style: stylesSchema,
    }),
  },

  FAQAccordion: {
    category: 'marketing',
    keywords: ['faq', 'accordion', 'collapsible', 'questions'],
    description: 'Accordion-style FAQ component',
    props: z.object({
      items: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })),
      allowMultiple: z.boolean().optional(),
      defaultOpen: z.array(z.number()).optional(),
      variant: z.enum(['default', 'bordered', 'separated']).optional(),
      style: stylesSchema,
    }),
  },

  // Newsletter Components
  Newsletter: {
    category: 'marketing',
    keywords: ['newsletter', 'subscribe', 'email', 'signup', 'mailing'],
    description: 'Newsletter subscription section',
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      placeholder: z.string().optional(),
      buttonLabel: z.string().optional(),
      onSubmit: z.string().optional(),
      variant: z.enum(['default', 'inline', 'card', 'minimal']).optional(),
      showName: z.boolean().optional(),
      privacyText: z.string().optional(),
      style: stylesSchema,
    }),
  },

  NewsletterForm: {
    category: 'marketing',
    keywords: ['newsletter', 'form', 'email', 'subscribe', 'input'],
    description: 'Newsletter subscription form',
    props: z.object({
      placeholder: z.string().optional(),
      buttonLabel: z.string().optional(),
      showName: z.boolean().optional(),
      namePlaceholder: z.string().optional(),
      layout: z.enum(['inline', 'stacked']).optional(),
      onSubmit: z.string().optional(),
      style: stylesSchema,
    }),
  },

  Subscribe: {
    category: 'marketing',
    keywords: ['subscribe', 'newsletter', 'email', 'signup'],
    description: 'Simple subscription component',
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      inputPlaceholder: z.string().optional(),
      buttonText: z.string().optional(),
      onSubscribe: z.string().optional(),
      successMessage: z.string().optional(),
      style: stylesSchema,
    }),
  },

  // Contact Components
  ContactForm: {
    category: 'marketing',
    keywords: ['contact', 'form', 'message', 'inquiry', 'support'],
    description: 'Contact form for user inquiries',
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      fields: z.array(z.object({
        name: z.string(),
        label: z.string(),
        type: z.enum(['text', 'email', 'phone', 'textarea', 'select']),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        options: z.array(z.string()).optional(),
      })).optional(),
      submitLabel: z.string().optional(),
      onSubmit: z.string().optional(),
      style: stylesSchema,
    }),
  },

  ContactSection: {
    category: 'marketing',
    keywords: ['contact', 'section', 'reach', 'support', 'info'],
    description: 'Contact information section with form',
    props: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      hours: z.string().optional(),
      socialLinks: z.array(z.object({
        platform: z.string(),
        url: z.string(),
      })).optional(),
      showForm: z.boolean().optional(),
      mapUrl: z.string().optional(),
      style: stylesSchema,
    }),
  },

  // About Components
  About: {
    category: 'marketing',
    keywords: ['about', 'company', 'story', 'mission', 'info'],
    description: 'About section with company information',
    props: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string().optional(),
      imagePosition: z.enum(['left', 'right']).optional(),
      stats: z.array(z.object({
        value: z.string(),
        label: z.string(),
      })).optional(),
      style: stylesSchema,
    }),
  },

  AboutSection: {
    category: 'marketing',
    keywords: ['about', 'section', 'company', 'story', 'values'],
    description: 'Full about section with mission and values',
    props: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      mission: z.string().optional(),
      vision: z.string().optional(),
      values: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })).optional(),
      image: z.string().optional(),
      style: stylesSchema,
    }),
  },

  // Team Components
  Team: {
    category: 'marketing',
    keywords: ['team', 'members', 'staff', 'people', 'crew'],
    description: 'Team members section',
    props: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      members: z.array(z.object({
        name: z.string(),
        role: z.string(),
        image: z.string().optional(),
        bio: z.string().optional(),
        social: z.array(z.object({
          platform: z.string(),
          url: z.string(),
        })).optional(),
      })),
      columns: z.number().optional(),
      variant: z.enum(['default', 'cards', 'minimal', 'detailed']).optional(),
      style: stylesSchema,
    }),
  },

  TeamMember: {
    category: 'marketing',
    keywords: ['team', 'member', 'person', 'profile', 'staff'],
    description: 'Individual team member card',
    props: z.object({
      name: z.string(),
      role: z.string(),
      image: z.string().optional(),
      bio: z.string().optional(),
      email: z.string().optional(),
      social: z.array(z.object({
        platform: z.string(),
        url: z.string(),
      })).optional(),
      variant: z.enum(['default', 'horizontal', 'minimal']).optional(),
      style: stylesSchema,
    }),
  },

  TeamGrid: {
    category: 'marketing',
    keywords: ['team', 'grid', 'members', 'layout', 'staff'],
    description: 'Grid layout for team members',
    props: z.object({
      members: z.array(z.object({
        name: z.string(),
        role: z.string(),
        image: z.string().optional(),
        bio: z.string().optional(),
      })),
      columns: z.number().optional(),
      gap: z.number().optional(),
      variant: z.enum(['default', 'cards', 'circular']).optional(),
      style: stylesSchema,
    }),
  },

  // Partner Components
  Partner: {
    category: 'marketing',
    keywords: ['partner', 'client', 'sponsor', 'brand', 'collaboration'],
    description: 'Partner or client showcase component',
    props: z.object({
      name: z.string(),
      logo: z.string(),
      description: z.string().optional(),
      url: z.string().optional(),
      featured: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  PartnerLogo: {
    category: 'marketing',
    keywords: ['partner', 'logo', 'client', 'brand', 'image'],
    description: 'Partner logo display component',
    props: z.object({
      name: z.string(),
      logo: z.string(),
      url: z.string().optional(),
      grayscale: z.boolean().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      style: stylesSchema,
    }),
  },

  PartnerGrid: {
    category: 'marketing',
    keywords: ['partner', 'grid', 'logos', 'clients', 'brands'],
    description: 'Grid of partner logos',
    props: z.object({
      partners: z.array(z.object({
        name: z.string(),
        logo: z.string(),
        url: z.string().optional(),
      })),
      columns: z.number().optional(),
      grayscale: z.boolean().optional(),
      variant: z.enum(['default', 'bordered', 'minimal']).optional(),
      style: stylesSchema,
    }),
  },

  // Trust & Social Proof Components
  TrustBadge: {
    category: 'marketing',
    keywords: ['trust', 'badge', 'secure', 'verified', 'certification'],
    description: 'Trust and security badge component',
    props: z.object({
      type: z.enum(['secure', 'verified', 'certified', 'guarantee', 'custom']),
      label: z.string().optional(),
      icon: z.string().optional(),
      image: z.string().optional(),
      tooltip: z.string().optional(),
      variant: z.enum(['default', 'outlined', 'filled']).optional(),
      style: stylesSchema,
    }),
  },

  SocialProof: {
    category: 'marketing',
    keywords: ['social', 'proof', 'users', 'customers', 'trust'],
    description: 'Social proof component showing user activity',
    props: z.object({
      variant: z.enum(['avatars', 'count', 'activity', 'rating']).optional(),
      avatars: z.array(z.string()).optional(),
      count: z.number().optional(),
      countLabel: z.string().optional(),
      rating: z.number().optional(),
      reviewCount: z.number().optional(),
      recentActivity: z.array(z.object({
        user: z.string(),
        action: z.string(),
        time: z.string(),
      })).optional(),
      style: stylesSchema,
    }),
  },

  Counter: {
    category: 'marketing',
    keywords: ['counter', 'number', 'statistic', 'metric', 'count'],
    description: 'Animated counter for statistics',
    props: z.object({
      value: z.number(),
      prefix: z.string().optional(),
      suffix: z.string().optional(),
      label: z.string().optional(),
      duration: z.number().optional(),
      decimals: z.number().optional(),
      separator: z.string().optional(),
      animate: z.boolean().optional(),
      style: stylesSchema,
    }),
  },

  LogoCloud: {
    category: 'marketing',
    keywords: ['logo', 'cloud', 'clients', 'partners', 'brands', 'trust'],
    description: 'Cloud of partner/client logos',
    props: z.object({
      title: z.string().optional(),
      logos: z.array(z.object({
        name: z.string(),
        src: z.string(),
        url: z.string().optional(),
      })),
      variant: z.enum(['default', 'marquee', 'grid', 'minimal']).optional(),
      grayscale: z.boolean().optional(),
      columns: z.number().optional(),
      style: stylesSchema,
    }),
  },
};

export default marketingSchemas;
