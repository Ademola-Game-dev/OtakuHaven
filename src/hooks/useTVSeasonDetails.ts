/**
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2025 SnoozeScript
 */

import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdbService';

export interface Episode {
  id: number;
  episodeNumber: number;
  name: string;
  overview: string;
  stillPath: string | null;
  airDate: string;
  runtime: number;
  voteAverage: number;
}

interface SeasonDetails {
  episodes: Episode[];
  name: string;
  overview: string;
  posterPath: string | null;
  seasonNumber: number;
}

export function useTVSeasonDetails(tvId: number, seasonNumber: number) {
  const [data, setData] = useState<SeasonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSeasonDetails = async () => {
      if (!tvId || !seasonNumber) return;

      setLoading(true);
      setError(null);

      try {
        const seasonData = await tmdbService.getSeasonDetails(tvId, seasonNumber);
        
        if (!cancelled) {
          setData({
            episodes: seasonData.episodes.map(ep => ({
              id: ep.id,
              episodeNumber: ep.episode_number,
              name: ep.name,
              overview: ep.overview,
              stillPath: ep.still_path,
              airDate: ep.air_date,
              runtime: ep.runtime,
              voteAverage: ep.vote_average,
            })),
            name: seasonData.name,
            overview: seasonData.overview,
            posterPath: seasonData.poster_path,
            seasonNumber: seasonData.season_number,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
          console.error('Error fetching season details:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSeasonDetails();

    return () => {
      cancelled = true;
    };
  }, [tvId, seasonNumber]);

  return { data, loading, error };
}
