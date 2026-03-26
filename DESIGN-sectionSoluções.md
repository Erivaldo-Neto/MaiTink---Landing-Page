# Design System Document

## 1. Overview & Creative North Star: "The Neon Neural"
The design system for this agency is built upon the "Neon Neural" creative north star. It is a high-definition, editorial-inspired framework that rejects the safe, "SaaS-standard" look in favor of a futuristic, high-tech aesthetic. It treats the digital interface as a sophisticated command center—clean, professional, yet pulsing with the energy of artificial intelligence.

We break the traditional template look through **intentional asymmetry** and **tonal depth**. Rather than rigid grids, we utilize high-contrast typography scales and overlapping "glass" surfaces to create a sense of three-dimensional space within a two-dimensional screen. The visual identity is defined by the sharp tension between the `deep-black` void and the electric precision of `bright-mint` and `vibrant-yellow`.

---

## 2. Color Palette & Surface Philosophy

This system uses a Material 3-based tonal logic, optimized for a high-contrast dark mode.

### Primary Colors
- **Surface (Background):** `#0e0e0e` – A deep, void-like black that acts as the canvas.
- **Primary (Aqua):** `#31ffce` – Used for branding and high-energy interactive elements.
- **Secondary (Yellow):** `#ffed00` – Used exclusively for critical CTAs and "Signal" moments.

### The "No-Line" Rule
To maintain a premium, editorial feel, **1px solid borders for sectioning are strictly prohibited.** Separation of concerns must be achieved through:
1.  **Background Color Shifts:** Use `surface-container-low` for secondary sections and `surface-container-high` for elevated modules.
2.  **Vertical Space:** Use the Spacing Scale (specifically `16` or `20`) to create distinct content groups.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-translucent layers.
- **Base Layer:** `surface` (`#0e0e0e`).
- **Mid-Tier (Sections):** `surface-container-low` (`#131313`).
- **High-Tier (Cards/Modals):** `surface-container-highest` (`#262626`).

### The "Glass & Gradient" Rule
To prevent the design from feeling "flat," implement **Glassmorphism**. Floating elements (like the transparent navbar or floating action cards) should use a `40%` opacity of `surface-variant` combined with a `24px` backdrop-blur. 
*Director's Tip: Apply a subtle linear gradient to main CTAs transitioning from `primary` (`#7cffd7`) to `primary-dim` (`#00eabb`) at a 135-degree angle to provide "visual soul."*

---

## 3. Typography: Editorial Authority

We use a high-contrast pairing to balance technical precision with modern friendliness.

| Level | Font Family | Size | Case/Weight | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Display-LG** | Space Grotesk | 3.5rem | Bold | Hero Statements |
| **Headline-MD** | Space Grotesk | 1.75rem | Bold | Section Titles |
| **Title-LG** | Manrope | 1.375rem | Medium | Card Headers |
| **Body-LG** | Manrope | 1rem | Regular | Long-form Reading |
| **Label-MD** | Space Grotesk | 0.75rem | Bold/Caps | Metadata / Small Tags |

**Hierarchy Note:** Always lead with `Space Grotesk` for anything that needs to feel "Engineered." Use `Manrope` for utility and readability.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than structural lines.

- **The Layering Principle:** Depth is achieved by placing a `surface-container-lowest` card on a `surface-container-low` section. The contrast in black levels creates a soft, natural lift.
- **Ambient Shadows:** Standard shadows are forbidden. If an object must "float," use an extra-diffused shadow: `box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.6);`.
- **The "Ghost Border" Fallback:** If a container requires definition against a complex background, use a **Ghost Border**: 1px solid `outline-variant` at `15%` opacity. It should be felt, not seen.
- **Signature Glow:** For primary elements, use a `primary` colored drop shadow with a large spread (20px+) and very low opacity (10%) to simulate a neon glow.

---

## 5. Components

### Navbar (The Branding Anchor)
- **Style:** Fully transparent background with `backdrop-filter: blur(12px)`.
- **Branding:** 'MAI' in `primary` (`#31ffce`), 'tink' in `on-background` (`#ffffff`).
- **Interaction:** On scroll, the background transitions to `surface-container` at 80% opacity.

### Buttons
- **Primary (High-Contrast):** Background: `secondary` (`#ffed00`), Text: `surface` (`#0a0a0a`). Radius: `md` (`0.375rem`).
- **Secondary (Technical):** Background: Transparent, Border: 2px `primary` (`#31ffce`), Text: `primary`.
- **Tertiary (Minimal):** Text: `primary`. No background. Underline on hover only.

### Cards & Lists
- **Rule:** Forbid divider lines.
- **Cards:** Use `surface-container-high` with `xl` (0.75rem) roundedness. Content inside cards should be separated by `spacing-4` (1.4rem) of white space.
- **Lists:** Use alternating subtle background shifts or increased leading/trailing padding to distinguish items.

### Input Fields
- **Style:** "Underline" style or "Ghost box." Use `surface-container-highest` with a 1px `ghost border`.
- **Focus State:** Border color transitions to `primary` (`#31ffce`) with a subtle outer glow.

---

## 6. Do’s and Don'ts

### Do:
- **Use Intentional Asymmetry:** Offset text blocks from center-aligned images to create a dynamic, editorial feel.
- **Embrace the Dark:** Allow large areas of `#0a0a0a` to exist. Breathing room is what makes the "Neon" elements pop.
- **Use the Spacing Scale:** Stick strictly to the values (e.g., `8`, `12`, `16`) to maintain mathematical harmony.

### Don't:
- **No 100% Opaque Borders:** Never use a solid, high-contrast white or grey line to divide content.
- **No Standard Blue:** Never introduce colors outside the `primary`/`secondary` tokens.
- **No Center-Aligning Everything:** Avoid the "template" look. Use grid offsets to make the layout feel custom-built for the content.
- **No Crowding:** AI feels high-tech when it feels "fast." Crowded layouts feel slow. Keep margins generous.