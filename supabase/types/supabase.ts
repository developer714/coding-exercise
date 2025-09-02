export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      channels: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      channels_followers: {
        Row: {
          channel_id: string
          created_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          channel_id: string
          created_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          channel_id?: string
          created_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
      }
      course_authors: {
        Row: {
          author_id: string
          course_id: string
        }
        Insert: {
          author_id: string
          course_id: string
        }
        Update: {
          author_id?: string
          course_id?: string
        }
      }
      course_difficulties: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      course_field_of_studies: {
        Row: {
          course_credit: number | null
          course_id: string
          field_of_study_id: string
        }
        Insert: {
          course_credit?: number | null
          course_id: string
          field_of_study_id: string
        }
        Update: {
          course_credit?: number | null
          course_id?: string
          field_of_study_id?: string
        }
      }
      course_licensing_bodies: {
        Row: {
          course_id: string
          course_number: string | null
          licensing_body_id: string
        }
        Insert: {
          course_id: string
          course_number?: string | null
          licensing_body_id: string
        }
        Update: {
          course_id?: string
          course_number?: string | null
          licensing_body_id?: string
        }
      }
      courses: {
        Row: {
          active: boolean | null
          category_id: string | null
          cost: number | null
          course_index: string | null
          created_at: string | null
          description: string | null
          difficulty_id: string | null
          duration: number | null
          earmark_id: string | null
          featured: boolean | null
          glossary: string | null
          id: string
          index: string | null
          instructions: string | null
          irsnumber: string | null
          post_course_special_offer: string | null
          prerequisites: string | null
          published_date: string | null
          table_of_contents: string | null
          title: string | null
          transcript: string | null
          updated_at: string | null
          use_channel_photo: boolean | null
        }
        Insert: {
          active?: boolean | null
          category_id?: string | null
          cost?: number | null
          course_index?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_id?: string | null
          duration?: number | null
          earmark_id?: string | null
          featured?: boolean | null
          glossary?: string | null
          id?: string
          index?: string | null
          instructions?: string | null
          irsnumber?: string | null
          post_course_special_offer?: string | null
          prerequisites?: string | null
          published_date?: string | null
          table_of_contents?: string | null
          title?: string | null
          transcript?: string | null
          updated_at?: string | null
          use_channel_photo?: boolean | null
        }
        Update: {
          active?: boolean | null
          category_id?: string | null
          cost?: number | null
          course_index?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_id?: string | null
          duration?: number | null
          earmark_id?: string | null
          featured?: boolean | null
          glossary?: string | null
          id?: string
          index?: string | null
          instructions?: string | null
          irsnumber?: string | null
          post_course_special_offer?: string | null
          prerequisites?: string | null
          published_date?: string | null
          table_of_contents?: string | null
          title?: string | null
          transcript?: string | null
          updated_at?: string | null
          use_channel_photo?: boolean | null
        }
      }
      courses_enrolled: {
        Row: {
          course_id: string
          created_at: string | null
          non_quiz_entry_completed: Json | null
          progress_info: Json | null
          purchase_info: Json | null
          question_choices: Json | null
          quiz_state: Json | null
          start_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          non_quiz_entry_completed?: Json | null
          progress_info?: Json | null
          purchase_info?: Json | null
          question_choices?: Json | null
          quiz_state?: Json | null
          start_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          non_quiz_entry_completed?: Json | null
          progress_info?: Json | null
          purchase_info?: Json | null
          question_choices?: Json | null
          quiz_state?: Json | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
      }
      courses_likes: {
        Row: {
          course_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          user_id?: string
        }
      }
      courses_reviews: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          review_text: string | null
          stars: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          review_text?: string | null
          stars?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          review_text?: string | null
          stars?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
      }
      episodes: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          link: string | null
          notes: string | null
          number: string | null
          published_date: string | null
          thumbnail: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          link?: string | null
          notes?: string | null
          number?: string | null
          published_date?: string | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          link?: string | null
          notes?: string | null
          number?: string | null
          published_date?: string | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
        }
      }
      field_of_studies: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      licensing_bodies: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      modules: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      presentation_modes: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      questions: {
        Row: {
          active: boolean | null
          choices: Json | null
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          choices?: Json | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          choices?: Json | null
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      shows: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          link: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          link?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          link?: string | null
          title?: string | null
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          ptin: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          ptin?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          ptin?: string | null
          updated_at?: string | null
        }
      }
      users_profiles_jobs_active_campaign: {
        Row: {
          active_campaign_id: string | null
          created_at: string | null
          email: string | null
          fields: Json | null
          first_name: string | null
          id: string
          last_name: string | null
          old_email: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          active_campaign_id?: string | null
          created_at?: string | null
          email?: string | null
          fields?: Json | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          old_email?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          active_campaign_id?: string | null
          created_at?: string | null
          email?: string | null
          fields?: Json | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          old_email?: string | null
          type?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
