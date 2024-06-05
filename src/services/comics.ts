import axios from 'axios';

import { IComic } from '../db/models/Comic';

export const fetchComic = async (comicId: string): Promise<IComic> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await axios.get(`${apiUrl}/api/comics/${comicId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching comic:', error);
    throw error;
  }
};

interface FetchComicsResponse {
  comics: IComic[];
  totalComics: number;
  totalPages: number;
}

export const fetchComicsByCategory = async (
  category: string,
  page: number = 1,
  limit: number = 10,
): Promise<FetchComicsResponse> => {
  try {
    const response = await axios.get(`/api/comics`, {
      params: {
        category: category === 'ego gala' ? 'diary' : category,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comics by category:', error);
    throw error;
  }
};

export const fetchPreviousDiaryComicId = async (comicId: string): Promise<string> => {
  try {
    const response = await axios.get(`/api/comics/${comicId}/prev`);
    return response.data.id;
  } catch (error) {
    console.error('Error fetching previous diary comic ID:', error);
    throw error;
  }
};

export const fetchNextDiaryComicId = async (comicId: string): Promise<string> => {
  try {
    const response = await axios.get(`/api/comics/${comicId}/next`);
    return response.data.id;
  } catch (error) {
    console.error('Error fetching previous diary comic ID:', error);
    throw error;
  }
};

export const fetchEarliestDiaryComicId = async (): Promise<string> => {
  try {
    const response = await axios.get(`/api/comics/earliest-diary-id`);
    return response.data.id;
  } catch (error) {
    console.error('Error fetching earliest diary comic ID:', error);
    throw error;
  }
};

export const fetchLatestDiaryComicId = async (): Promise<string> => {
  try {
    const response = await axios.get(`/api/comics/latest-diary-id`);
    return response.data.id;
  } catch (error) {
    console.error('Error fetching latest diary comic ID:', error);
    throw error;
  }
};

// Matches ComicFormState + PanelState in ComicForm.tsx - how can we simplify?
interface ComicPayload {
  title: string;
  category: 'diary' | 'fantology' | 'other works';
  description: string;
  publication_date: Date;
  panels: Array<{
    image_url: string;
    panel_number: number;
  }>;
}

export const createComic = async (payload: ComicPayload) => {
  try {
    const response = await axios.post('/api/cms/submitComic', payload);

    if (response.status === 200) {
      return { success: true, data: response.data };
    }
    return { success: false, error: response.data };
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: string } }).response?.data || 'An error occurred';
    return { success: false, error: errorMessage };
  }
};

export const deleteComic = async (comicId: string) => {
  try {
    const response = await axios.delete(`/api/cms/deleteComic`, {
      data: {
        comicId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting comic:', error);
    throw error;
  }
};
