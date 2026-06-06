export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'guest';
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  lesson_number: number;
  slug: string;
  title: string;
  semester: 1 | 2;
  description: string | null;
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type ResourceGroup = 'interactive_digital' | 'reading_support' | 'teaching_model';
export type ResourceType = 'video' | 'interactive_worksheet' | 'podcast' | 'visual_worksheet' | 'drama_script' | 'lesson_plan';

export interface Resource {
  id: string;
  lesson_id: string | null;
  title: string;
  resource_group: ResourceGroup;
  resource_type: ResourceType;
  file_url: string | null;
  external_url: string | null;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  lessons?: {
    title: string;
    lesson_number: number;
    slug: string;
  } | null;
}
