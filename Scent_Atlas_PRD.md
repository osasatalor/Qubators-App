# Product Requirements Document (PRD)

## Product Name

Scent Atlas

## 1. Product Overview

Scent Atlas is an interactive fragrance discovery platform that helps users explore and discover perfumes based on more than just brand or perfume name.

The platform combines a structured fragrance database with contextual information such as fragrance families, notes, mood, season, time of day, occasion, and personal style. Users can search for specific note combinations, explore fragrances that match particular contexts, compare perfumes, and save fragrances they are interested in.

The long-term vision is to build a comprehensive, continually expanding database of fragrances from designer, niche, indie, celebrity, and emerging fragrance houses.

---

## 2. Problem

The fragrance market contains thousands of perfumes from hundreds of brands and fragrance houses. Information about these fragrances is often scattered across brand websites, fragrance databases, retailers, blogs, social media, and reviews.

Users may know what they want to smell like without knowing which perfume will provide that experience.

For example, a user might know:

- "I want something warm and vanilla-based."
- "I want a perfume for a summer evening."
- "I want something woody but not too masculine."
- "I want something that feels elegant and expensive."
- "I love sandalwood and musk. What other perfumes might I like?"

Traditional fragrance searches often require users to already know the name of a perfume or brand.

Scent Atlas aims to make fragrance discovery more intuitive by allowing users to search based on the characteristics, context, and experience they are looking for.

---

## 3. Product Goal

Create an engaging fragrance discovery experience that helps users move from:

> "I know what kind of fragrance I want"

to:

> "I found perfumes that match what I'm looking for."

The MVP should demonstrate that structured fragrance information can be transformed into an interactive discovery experience.

---

## 4. Target Users

### Primary Users

#### Fragrance Enthusiasts

People who actively explore perfumes, fragrance houses, notes, and fragrance communities.

They may:

- Own multiple fragrances
- Enjoy discovering new perfumes
- Search for perfumes based on specific notes
- Compare fragrances
- Follow fragrance content online
- Want to discover less-known fragrance houses

#### Casual Perfume Users

People who wear perfume but may not have extensive fragrance knowledge.

They may:

- Know a few perfumes they like
- Have difficulty understanding fragrance terminology
- Want recommendations without researching extensively
- Choose fragrances based on occasions, moods, or seasons

---

## 5. User Needs

Users need to be able to:

1. Discover fragrances without already knowing the perfume name.
2. Understand what a fragrance smells like.
3. Search using individual notes or combinations of notes.
4. Discover fragrances by fragrance family.
5. Find fragrances appropriate for specific occasions.
6. Find fragrances appropriate for different seasons and times of day.
7. Explore fragrances based on mood or aesthetic.
8. Compare fragrances.
9. Save interesting fragrances for later.
10. Continuously discover new fragrances.

---

## 6. Product Scope

### MVP

The first version should focus on five core experiences:

1. Fragrance discovery
2. Fragrance search
3. Filtering by fragrance characteristics
4. Detailed fragrance profiles
5. Saving and comparing fragrances

### Future Scope

Potential future functionality includes:

- Personalized recommendations
- User fragrance collections
- Fragrance quizzes
- AI-powered fragrance discovery
- Similar-fragrance recommendations
- User reviews and ratings
- Fragrance wardrobe management
- Price tracking
- Retailer availability
- Community features
- User-generated fragrance profiles
- Trending fragrances
- Fragrance house profiles
- Personalized scent profiles

---

## 7. Core User Journeys

### Journey 1: Discover a Fragrance

1. User opens Scent Atlas.
2. User sees featured and recently added fragrances.
3. User can browse by:
   - Fragrance family
   - Notes
   - Mood
   - Season
   - Occasion
   - Time of day
   - Style
4. User selects one or more preferences.
5. Scent Atlas displays matching fragrances.
6. User opens a fragrance profile.
7. User can save or compare the fragrance.

### Journey 2: Search by Notes

1. User opens search.
2. User enters one or more fragrance notes.
3. The system identifies fragrances containing those notes.
4. Matching fragrances are displayed.
5. User can refine results using filters.
6. User opens individual fragrance profiles.
7. User can save or compare fragrances.

Example:

User searches:

> Vanilla + Sandalwood + Musk

The system returns fragrances containing some or all of these notes, with the closest matches surfaced first.

### Journey 3: Search by Context

1. User selects a context such as:
   - Season
   - Time of day
   - Occasion
   - Mood
   - Style
2. The system displays fragrances associated with those characteristics.
3. User can further refine results using notes and fragrance families.
4. User explores individual fragrance profiles.
5. User saves fragrances they like.

Example:

User selects:

> Summer + Evening + Date Night + Warm

Scent Atlas returns fragrances tagged with those characteristics.

### Journey 4: Compare Fragrances

1. User selects two or more fragrances.
2. User chooses "Compare."
3. The system displays their:
   - Fragrance families
   - Notes
   - Mood
   - Season
   - Occasion
   - Time of day
   - Style
4. User can identify similarities and differences.

---

## 8. Core Features

### 8.1 Home / Discover

The home screen should provide an engaging entry point into the fragrance world.

#### Requirements

Display:

- Featured fragrances
- Recently added fragrances
- Popular fragrance families
- Popular notes
- Discovery categories
- Seasonal recommendations
- Contextual discovery options

Example discovery prompts:

- "Explore Vanilla"
- "Find a Summer Fragrance"
- "Discover Woody Scents"
- "Date Night"
- "Fresh & Clean"
- "Warm & Cozy"

### 8.2 Fragrance Database

The platform should contain structured fragrance records.

#### Basic Information

- Fragrance name
- Brand / fragrance house
- Release year
- Fragrance type
- Concentration, where available
- Gender positioning, where applicable
- Image

#### Olfactory Information

- Fragrance family
- Top notes
- Middle/heart notes
- Base notes
- Main accords

#### Contextual Information

- Mood
- Season
- Time of day
- Occasion
- Style / aesthetic

#### Additional Information

- Description
- Similar fragrances
- Related fragrances
- User rating, if implemented
- Saved/favourite status

### 8.3 Search

Users should be able to search for:

- Fragrance names
- Brands
- Notes
- Fragrance families
- Moods
- Occasions
- Styles

Search should provide relevant results even when users do not enter an exact fragrance name.

### 8.4 Advanced Filtering

Users should be able to combine multiple filters.

#### Filters

##### Fragrance Family

- Floral
- Woody
- Oriental/Amber
- Fresh
- Gourmand
- Chypre
- Fougère
- Other supported classifications

##### Notes

- Vanilla
- Rose
- Oud
- Musk
- Sandalwood
- Jasmine
- Bergamot
- Citrus
- etc.

##### Context

- Season
- Time of day
- Occasion
- Mood
- Style

Filters should be combinable.

Example:

> Woody + Sandalwood + Evening + Elegant

### 8.5 Fragrance Profile

Each fragrance should have a dedicated profile page.

#### Profile Structure

**Header**
- Fragrance image
- Fragrance name
- Brand
- Release year

**Olfactory Profile**
- Fragrance family
- Main accords
- Top notes
- Heart notes
- Base notes

**Context**
- Mood
- Season
- Time of day
- Occasion
- Style

**Discovery**
- Similar fragrances
- Related fragrances
- Other fragrances from the same house

**Actions**
- Save
- Add to collection
- Compare

### 8.6 Save / Wishlist

Users should be able to save fragrances for future reference.

A saved fragrance should be accessible from the user's profile.

Possible future categories:

- Want to Try
- Own
- Favourite
- Gift Ideas

For the MVP, a simple **Saved Fragrances** list is sufficient.

### 8.7 Compare

Users should be able to select multiple fragrances and compare them side by side.

Comparison should include:

| Attribute | Fragrance A | Fragrance B |
|---|---|---|
| Fragrance Family | Floral | Woody |
| Top Notes | ... | ... |
| Heart Notes | ... | ... |
| Base Notes | ... | ... |
| Mood | ... | ... |
| Season | ... | ... |
| Occasion | ... | ... |
| Time of Day | ... | ... |

---

## 9. Data Structure

Each fragrance should be represented as a structured record.

Example:

```json
{
  "name": "Example Fragrance",
  "brand": "Example House",
  "release_year": 2025,
  "family": "Woody",
  "top_notes": ["Bergamot", "Pear"],
  "heart_notes": ["Jasmine", "Rose"],
  "base_notes": ["Vanilla", "Musk", "Sandalwood"],
  "mood": ["Elegant", "Warm", "Romantic"],
  "season": ["Spring", "Autumn"],
  "time_of_day": ["Evening"],
  "occasion": ["Date Night", "Dinner"],
  "style": ["Elegant", "Chic"]
}
```

The data structure should allow multiple values for characteristics such as notes, moods, seasons, occasions, and styles.

---

## 10. Search & Discovery Logic

The discovery system should prioritize fragrances based on the user's selected characteristics.

For example, if a user searches:

> Vanilla + Musk + Evening

the system should prioritize fragrances containing:

1. All selected notes and the selected context
2. Most selected notes and the selected context
3. Some selected notes with closely related characteristics

The MVP does not require sophisticated machine learning.

A structured tagging and matching system is sufficient for the initial version.

---

## 11. User Interface Requirements

The interface should feel:

- Visually rich
- Modern
- Elegant
- Easy to explore
- Image-led
- Intuitive
- Responsive

The product should feel like a **fragrance discovery experience**, rather than a spreadsheet or encyclopedia.

### Design Priorities

- Prominent fragrance imagery
- Clear note visualization
- Easy-to-use filters
- Visual discovery categories
- Minimal friction between search and results
- Mobile-first responsive design

---

## 12. Navigation

Suggested primary navigation:

- **Discover**
- **Search**
- **Explore**
- **Saved**

Optional:

- Profile

### Discover

Featured and curated fragrance discovery.

### Search

Search fragrances, brands, notes, and combinations.

### Explore

Browse fragrance families, notes, moods, occasions, seasons, and styles.

### Saved

View saved fragrances.

---

## 13. MVP Screens

The MVP should contain approximately these screens:

### 1. Home / Discover

Entry point for fragrance discovery.

### 2. Search

Search and filter fragrances.

### 3. Search Results

Display matching fragrances.

### 4. Fragrance Profile

Detailed information about a fragrance.

### 5. Compare

Side-by-side fragrance comparison.

### 6. Saved

User's saved fragrances.

### 7. Explore

Browse by notes, families, moods, occasions, seasons, and styles.

---

## 14. Example User Stories

### Discovery

> As a fragrance enthusiast, I want to browse fragrances by fragrance family so that I can discover perfumes within scent categories I enjoy.

### Note Search

> As a user, I want to search for multiple fragrance notes at once so that I can find perfumes that contain the combination of scents I like.

### Contextual Search

> As a user, I want to search for fragrances by season, occasion, mood, and time of day so that I can find something appropriate for a specific situation.

### Fragrance Information

> As a user, I want to see a fragrance's notes, family, and contextual characteristics so that I can understand what kind of fragrance it is.

### Comparison

> As a user, I want to compare fragrances side by side so that I can understand how they differ.

### Saving

> As a user, I want to save fragrances that interest me so that I can return to them later.

---

## 15. Functional Requirements

### Search

- Users can enter free-text searches.
- Search results should return relevant fragrances.
- Users can search by multiple notes.
- Users can combine search terms with filters.

### Filtering

- Users can apply multiple filters.
- Users can remove individual filters.
- Results should update based on selected filters.

### Fragrance Profiles

- Every fragrance in the database should have a dedicated profile.
- Profiles should display available fragrance information.
- Missing information should not prevent a fragrance from being displayed.

### Saving

- Users can save a fragrance.
- Users can remove a saved fragrance.
- Saved fragrances should persist between sessions.

### Comparison

- Users can select fragrances for comparison.
- Users can compare at least two fragrances.
- Comparison should show shared and differing characteristics.

---

## 16. Non-Functional Requirements

### Performance

Search and filtering should return results quickly and without unnecessary page reloads.

### Responsiveness

The product should work across:

- Mobile
- Tablet
- Desktop

### Usability

A new user should be able to discover a fragrance without needing prior knowledge of fragrance terminology.

### Scalability

The database structure should support adding thousands of fragrances and additional fragrance attributes over time.

---

## 17. MVP Success Criteria

The MVP should demonstrate that a user can:

1. Enter the product.
2. Discover fragrances.
3. Search for a fragrance or note.
4. Combine multiple notes in a search.
5. Filter results by contextual characteristics.
6. Open a detailed fragrance profile.
7. Compare fragrances.
8. Save fragrances for later.

The primary measure of product usefulness is whether users can successfully move from a desired scent/context to relevant fragrance discoveries.

---

## 18. Out of Scope for MVP

The following should not be required for the first version:

- Purchasing fragrances directly
- Real-time retailer pricing
- E-commerce functionality
- User reviews
- Social networking
- AI-generated fragrance recommendations
- Automated web scraping
- Complete global fragrance coverage
- Mobile native applications
- Advanced machine-learning recommendation models

These can be considered after validating the core discovery experience.

---

## 19. Future Opportunities

### Personalized Fragrance Profile

Users could complete a fragrance preference quiz and receive a personalized scent profile.

### AI Fragrance Discovery

Users could describe what they want in natural language.

Example:

> "I want something warm, feminine and sophisticated for a dinner date, but I don't want anything overly sweet."

The system could translate this into structured search criteria and return matching fragrances.

### Personal Fragrance Wardrobe

Users could catalogue fragrances they own and receive suggestions based on their existing collection.

### Similar Fragrance Discovery

Users could enter a fragrance they love and discover fragrances with similar characteristics.

### Community

Users could share reviews, collections, recommendations, and fragrance discoveries.

### Fragrance House Exploration

Users could explore fragrance houses and discover their collections, history, and signature styles.

---

## 20. Product Vision

Scent Atlas aims to become an interactive map of the fragrance world.

Instead of requiring users to know exactly what perfume they are looking for, the platform should allow them to start with a feeling, preference, note, occasion, or aesthetic and discover fragrances from there.

The long-term vision is:

> **Don't just search for a perfume. Explore the world of fragrance and find your scent.**
