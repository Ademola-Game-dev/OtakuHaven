/**
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2025 SnoozeScript
 */

import { lazy, Suspense } from 'react';
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { ReactiveGridBackground } from '../components/backgrounds/ReactiveGridBackground';
import { MagneticDock } from '../components/layout/MagneticDock';
import { Footer } from '../components/layout/Footer';
import { RouterDevtools } from '../components/dev/RouterDevtools';

// Lazy load page components for better initial load performance
const HomePage = lazy(() => import('../pages/HomePage').then(m => ({ default: m.HomePage })));
const MovieDetails = lazy(() => import('../pages/MovieDetails').then(m => ({ default: m.MovieDetails })));
const TVShowDetails = lazy(() => import('../pages/TVShowDetails').then(m => ({ default: m.TVShowDetails })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const TVShowsPage = lazy(() => import('../pages/TVShowsPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
      <p className="text-white/60">Loading...</p>
    </div>
  </div>
);

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 relative flex flex-col">
      <ReactiveGridBackground />
      <MagneticDock />
      <main className="flex-1 relative z-10">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <RouterDevtools />
    </div>
  ),
});

// Home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// Movie details route with dynamic ID
const movieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/$movieId',
  component: () => {
    const { movieId } = movieRoute.useParams();
    return (
      <MovieDetails 
        movieId={movieId} 
        onBack={() => window.history.back()}
      />
    );
  },
});

// Movies listing route
const moviesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movies',
  component: MoviesPage,
});

// TV Shows listing route
const tvShowsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tv-shows',
  component: TVShowsPage,
});

// TV Show details route with dynamic ID
const tvShowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tv-show/$showId',
  component: () => {
    const { showId } = tvShowRoute.useParams();
    return (
      <TVShowDetails 
        showId={showId} 
        onBack={() => window.history.back()}
      />
    );
  },
});

// Favorites route
const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/favorites',
  component: () => (
    <div className="min-h-screen bg-black text-white pt-20 pb-32 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
          Favorites Page
        </h1>
        <p className="text-white/60">Coming soon...</p>
      </div>
    </div>
  ),
});

// Watchlist route
const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/watchlist',
  component: () => (
    <div className="min-h-screen bg-black text-white pt-20 pb-32 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Watchlist Page
        </h1>
        <p className="text-white/60">Coming soon...</p>
      </div>
    </div>
  ),
});

// Profile route
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  movieRoute,
  moviesRoute,
  tvShowsRoute,
  tvShowRoute,
  favoritesRoute,
  watchlistRoute,
  profileRoute,
]);

// Create router
export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
