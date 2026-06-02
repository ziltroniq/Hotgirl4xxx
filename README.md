# Hotgirl4xxx - React Project

A modern, responsive project showcase built with React and featuring a sleek dark UI design.

## Features

- ⚡ Modern React architecture with functional components
- 🎨 Beautiful gradient header and dark theme design
- 📱 Responsive grid layout for project showcase
- 🔍 Search functionality
- 📊 Stats panel with user engagement metrics
- 🎯 Modular component structure

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ziltroniq/Power-project.git
cd Power-project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Card.js              # Project card component
│   ├── Card.css
│   ├── Content.js           # Main content wrapper
│   ├── Content.css
│   ├── Gallery.js           # Project gallery grid
│   ├── Gallery.css
│   ├── Header.js            # Top navigation header
│   ├── Header.css
│   ├── Hero.js              # Hero section
│   ├── Hero.css
│   ├── Panel.js             # Stats and action panel
│   ├── Panel.css
│   ├── Sidebar.js           # Left navigation sidebar
│   └── Sidebar.css
├── App.js                   # Main App component
├── App.css
├── index.js                 # React entry point
└── index.css                # Global styles
```

## Components

### Sidebar
Navigation sidebar with icons for Home, Games, Trending, Favorites, and Profile.

### Header
Top navigation with logo and search functionality.

### Hero
Large banner section with background image and title.

### Gallery
3-column grid displaying project cards with images and titles.

### Panel
Right sidebar with action button and stats display.

## Customization

### Adding Projects
Edit the `projects` array in `src/components/Gallery.js` to add or modify projects.

### Styling
All components have their own CSS files for easy customization. Global styles are in `src/index.css`.

### Colors
- Primary: `#ec4899` (Pink)
- Secondary: `#8b5cf6` (Purple)
- Background: `#0f172a` (Dark Blue)

## Technologies Used

- React 18
- CSS3 with Flexbox & Grid
- FontAwesome Icons
- Picsum Photos API

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue on the GitHub repository.