import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Lesson, Resource } from '../types';
import { INITIAL_LESSONS, INITIAL_RESOURCES } from './mockData';

// Helper to initialize localStorage for offline demo
const initLocalStorage = () => {
  if (!localStorage.getItem('lessons')) {
    localStorage.setItem('lessons', JSON.stringify(INITIAL_LESSONS));
  }
  if (!localStorage.getItem('resources')) {
    localStorage.setItem('resources', JSON.stringify(INITIAL_RESOURCES));
  }
};

export const dbService = {
  // =========================================================================
  // LESSONS
  // =========================================================================
  async getLessons(): Promise<Lesson[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .order('lesson_number', { ascending: true });
        
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error('Supabase getLessons error, falling back to local data:', err);
      }
    }
    
    initLocalStorage();
    const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    return lessons.sort((a: Lesson, b: Lesson) => a.lesson_number - b.lesson_number);
  },

  async getLessonBySlug(slug: string): Promise<Lesson | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) throw error;
        return data;
      } catch (err) {
        console.error(`Supabase getLessonBySlug (${slug}) error, falling back to local data:`, err);
      }
    }

    initLocalStorage();
    const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    return lessons.find((l: Lesson) => l.slug === slug) || null;
  },

  async createLesson(lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>): Promise<Lesson> {
    const newLesson: Lesson = {
      ...lesson,
      id: 'lesson-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .insert([lesson])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase createLesson error, saving to local data:', err);
      }
    }

    initLocalStorage();
    const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    lessons.push(newLesson);
    localStorage.setItem('lessons', JSON.stringify(lessons));
    return newLesson;
  },

  async updateLesson(id: string, lesson: Partial<Lesson>): Promise<Lesson> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .update({ ...lesson, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase updateLesson error, saving to local data:', err);
      }
    }

    initLocalStorage();
    const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    const index = lessons.findIndex((l: Lesson) => l.id === id);
    if (index === -1) throw new Error('Lesson not found');
    
    const updatedLesson = {
      ...lessons[index],
      ...lesson,
      updated_at: new Date().toISOString(),
    };
    lessons[index] = updatedLesson;
    localStorage.setItem('lessons', JSON.stringify(lessons));
    return updatedLesson;
  },

  async deleteLesson(id: string): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('lessons')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return;
      } catch (err) {
        console.error('Supabase deleteLesson error, removing from local data:', err);
      }
    }

    initLocalStorage();
    const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    const filtered = lessons.filter((l: Lesson) => l.id !== id);
    localStorage.setItem('lessons', JSON.stringify(filtered));

    // Cascade delete resources locally
    const resources = JSON.parse(localStorage.getItem('resources') || '[]');
    const filteredResources = resources.filter((r: Resource) => r.lesson_id !== id);
    localStorage.setItem('resources', JSON.stringify(filteredResources));
  },

  // =========================================================================
  // RESOURCES
  // =========================================================================
  async getResources(lessonId?: string): Promise<Resource[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('resources').select('*, lessons(title, lesson_number, slug)');
        
        if (lessonId) {
          query = query.eq('lesson_id', lessonId);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error('Supabase getResources error, falling back to local data:', err);
      }
    }

    initLocalStorage();
    const resources = JSON.parse(localStorage.getItem('resources') || '[]');
    const lessons = JSON.parse(localStorage.getItem('lessons') || '[]');
    
    let filtered = resources;
    if (lessonId) {
      filtered = resources.filter((r: Resource) => r.lesson_id === lessonId);
    }

    // Join with lesson details for displaying lesson badge in the library
    return filtered.map((r: Resource) => {
      const lesson = lessons.find((l: Lesson) => l.id === r.lesson_id);
      return {
        ...r,
        lessons: lesson ? {
          title: lesson.title,
          lesson_number: lesson.lesson_number,
          slug: lesson.slug
        } : null
      };
    });
  },

  async createResource(resource: Omit<Resource, 'id' | 'created_at' | 'updated_at'>): Promise<Resource> {
    const newResource: Resource = {
      ...resource,
      id: 'res-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('resources')
          .insert([resource])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase createResource error, saving to local data:', err);
      }
    }

    initLocalStorage();
    const resources = JSON.parse(localStorage.getItem('resources') || '[]');
    resources.push(newResource);
    localStorage.setItem('resources', JSON.stringify(resources));
    return newResource;
  },

  async updateResource(id: string, resource: Partial<Resource>): Promise<Resource> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('resources')
          .update({ ...resource, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase updateResource error, saving to local data:', err);
      }
    }

    initLocalStorage();
    const resources = JSON.parse(localStorage.getItem('resources') || '[]');
    const index = resources.findIndex((r: Resource) => r.id === id);
    if (index === -1) throw new Error('Resource not found');
    
    const updatedResource = {
      ...resources[index],
      ...resource,
      updated_at: new Date().toISOString(),
    };
    resources[index] = updatedResource;
    localStorage.setItem('resources', JSON.stringify(resources));
    return updatedResource;
  },

  async deleteResource(id: string): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('resources')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return;
      } catch (err) {
        console.error('Supabase deleteResource error, removing from local data:', err);
      }
    }

    initLocalStorage();
    const resources = JSON.parse(localStorage.getItem('resources') || '[]');
    const filtered = resources.filter((r: Resource) => r.id !== id);
    localStorage.setItem('resources', JSON.stringify(filtered));
  },

  // =========================================================================
  // FILE UPLOAD AND DIRECT DOWNLOAD UTILITY
  // =========================================================================
  async uploadFile(file: File): Promise<string> {
    if (isSupabaseConfigured()) {
      try {
        // Clean filename: remove special characters, replace spaces with hyphens
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error } = await supabase.storage
          .from('resources')
          .upload(filePath, file);

        if (error) throw error;

        // Get public URL
        const { data } = supabase.storage.from('resources').getPublicUrl(filePath);
        return data.publicUrl;
      } catch (err) {
        console.error('Supabase file upload error, falling back to local file simulation:', err);
      }
    }

    // Offline mode: convert small files to Base64, or return public test URL for large files to avoid storage quota crash
    return new Promise((resolve, reject) => {
      // If it's a test PDF/MP3 or under 3MB, we can represent it. Otherwise, return a dummy file URL
      if (file.size > 3 * 1024 * 1024) {
        // Return dummy file based on type
        if (file.type.startsWith('audio/')) {
          resolve('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3');
        } else {
          resolve('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
        }
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file as data URL'));
      };
      reader.readAsDataURL(file);
    });
  },

  // Method to download a file directly without opening in a new tab
  downloadFileDirectly(url: string, filename: string) {
    // For local base64/data URLs
    if (url.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // For web URLs, fetch it as a blob to force direct download and bypass target="_blank"
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
      })
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(err => {
        console.error('Direct download failed, falling back to open in tab:', err);
        // Fallback: simple anchor click which might open in new tab depending on browser
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
};
