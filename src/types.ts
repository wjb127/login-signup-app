export type Profile = {
  id: string;
  updated_at: string;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
  bio: string | null;
};

export type ProfileFormData = {
  full_name: string;
  website: string;
  bio: string;
}; 