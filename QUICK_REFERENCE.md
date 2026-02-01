# Quick Reference: AI Content Generation V2

## 🎯 What Changed?

**Before:** Empty components → Click Polish → Wait → Get realistic content
**After:** Generate once → Get realistic content immediately

## ✅ Quality Standards

### Text
- ✅ Headings: "Dashboard Analytics" ❌ Not: "Heading"
- ✅ Paragraphs: 1-3 sentences ❌ Not: Lorem ipsum
- ✅ Buttons: "Get Started" ❌ Not: "Click Here"

### Data
- ✅ Metrics: "$45,231" ❌ Not: "1234"
- ✅ Labels: "Monthly Revenue" ❌ Not: "Metric"
- ✅ Changes: "+12.5%" ❌ Not: Empty

### Images
- ✅ Src: `https://source.unsplash.com/800x600/?query`
- ✅ Alt: Descriptive text
- ❌ Not: Empty or missing

### Layout
- ✅ Gap: Always in Row/Column/Stack/Grid
- ✅ Responsive: `{ sm: 1, md: 2, lg: 3 }`
- ❌ Not: Missing spacing

## 📝 Test Prompts

```
1. "Create a dashboard with 4 metric cards"
   → Check: Realistic values, labels, icons

2. "Create a login form"
   → Check: Labels, placeholders, button text

3. "Create a product card with image and price"
   → Check: Image src, alt, product name, price
```

## 📚 Documentation

| File | Purpose |
|------|---------|
| `src/lib/ai/README.md` | Developer guide |
| `src/lib/ai/CONTENT_PATTERNS.md` | Usage examples |
| `AI_GENERATION_V2.md` | Overview for everyone |

## 🧪 Testing

**Automated:**
```bash
ts-node src/lib/ai/test-content-generation.ts
```

**Verification:**
```bash
bash verify-content-generation.sh
```

## 🔧 Files Modified

- `src/lib/ai/prompts.ts` - Enhanced system prompts
- `src/lib/ai/schemas.ts` - Better prop descriptions

## 🆕 Files Created

- `test-content-generation.ts` - Quality tests
- `CONTENT_GENERATION.md` - Detailed docs
- `CONTENT_PATTERNS.md` - Pattern guide
- `README.md` - Developer guide
- Plus 3 more summary docs

## 🎨 Common Patterns

### Metric
```json
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
```

### Button
```json
{
  "type": "Button",
  "props": {
    "label": "Get Started Free",
    "variant": "solid",
    "color": "primary",
    "size": "lg"
  }
}
```

### Image
```json
{
  "type": "Image",
  "props": {
    "src": "https://source.unsplash.com/800x600/?business,team",
    "alt": "Team collaborating in modern office",
    "rounded": true
  }
}
```

### Grid
```json
{
  "type": "Grid",
  "props": {
    "cols": 3,
    "gap": "lg",
    "responsive": { "sm": 1, "md": 2, "lg": 3 }
  }
}
```

## ⚡ Quick Commands

```bash
# Type check
npx tsc --noEmit src/lib/ai/*.ts

# Run tests
ts-node src/lib/ai/test-content-generation.ts

# Verify implementation
bash verify-content-generation.sh

# Start dev server
npm run dev
```

## 🎯 Success Criteria

- [ ] No lorem ipsum
- [ ] All headings have specific text
- [ ] All buttons have action labels
- [ ] All metrics have values
- [ ] All images have src + alt
- [ ] All layouts have spacing
- [ ] Polish button is optional

## 💡 Tips

1. **Be specific in prompts** - "Create a sales dashboard" is better than "Create a dashboard"
2. **Polish is optional** - Use for theme changes, not required for basic content
3. **Check examples** - See `CONTENT_PATTERNS.md` for detailed patterns
4. **Test regularly** - Run content tests to catch regressions

## 🆘 Troubleshooting

### Empty content?
- Check system prompt is loaded
- Verify API key configured
- Run type checks

### Generic labels?
- Review prompts.ts updates
- Check schema descriptions
- Verify temperature setting

### Missing images?
- Confirm component type is "Image"
- Check src prop in schema
- Review Unsplash URL format

## 📞 Getting Help

1. Read `src/lib/ai/README.md`
2. Check `CONTENT_PATTERNS.md`
3. Run `test-content-generation.ts`
4. Review schema validation

---

**Version:** 2.0 | **Status:** Production Ready | **Date:** 2026-02-01
