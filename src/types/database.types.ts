export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ads: {
        Row: {
          id: string
          imageUrl: string
          is_mobile: boolean
          rank: number | null
          url: string | null
        }
        Insert: {
          id?: string
          imageUrl: string
          is_mobile?: boolean
          rank?: number | null
          url?: string | null
        }
        Update: {
          id?: string
          imageUrl?: string
          is_mobile?: boolean
          rank?: number | null
          url?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          rank: number | null
        }
        Insert: {
          id?: string
          name: string
          rank?: number | null
        }
        Update: {
          id?: string
          name?: string
          rank?: number | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          id: string
          name: string | null
          rank: number | null
        }
        Insert: {
          id: string
          name?: string | null
          rank?: number | null
        }
        Update: {
          id?: string
          name?: string | null
          rank?: number | null
        }
        Relationships: []
      }
      degrees: {
        Row: {
          id: string
          name: string
          rank: number
        }
        Insert: {
          id?: string
          name: string
          rank: number
        }
        Update: {
          id?: string
          name?: string
          rank?: number
        }
        Relationships: []
      }
      fields: {
        Row: {
          id: string
          name: string
          rank: number | null
        }
        Insert: {
          id: string
          name: string
          rank?: number | null
        }
        Update: {
          id?: string
          name?: string
          rank?: number | null
        }
        Relationships: []
      }
      graduated_majors: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      latest_posts: {
        Row: {
          id: string
          no: number
        }
        Insert: {
          id: string
          no?: number
        }
        Update: {
          id?: string
          no?: number
        }
        Relationships: [
          {
            foreignKeyName: "latest_posts_id_fkey"
            columns: ["id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      majors: {
        Row: {
          degree_id: string
          field_id: string
          id: string
          name: string
          university_id: string
        }
        Insert: {
          degree_id: string
          field_id: string
          id?: string
          name: string
          university_id: string
        }
        Update: {
          degree_id?: string
          field_id?: string
          id?: string
          name?: string
          university_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "majors_degree_id_fkey"
            columns: ["degree_id"]
            referencedRelation: "degrees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "majors_field_id_fkey"
            columns: ["field_id"]
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "majors_university_id_fkey"
            columns: ["university_id"]
            referencedRelation: "universities"
            referencedColumns: ["id"]
          }
        ]
      }
      navys: {
        Row: {
          navy_id: string
        }
        Insert: {
          navy_id: string
        }
        Update: {
          navy_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "navys_navy_id_fkey"
            columns: ["navy_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string
          from: string
          id: string
          post_id: string | null
          result_user_id: string | null
          to: string
          view: boolean
        }
        Insert: {
          created_at: string
          from: string
          id?: string
          post_id?: string | null
          result_user_id?: string | null
          to: string
          view?: boolean
        }
        Update: {
          created_at?: string
          from?: string
          id?: string
          post_id?: string | null
          result_user_id?: string | null
          to?: string
          view?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "notifications_from_fkey"
            columns: ["from"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_result_user_id_fkey"
            columns: ["result_user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_to_fkey"
            columns: ["to"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      pending_comments: {
        Row: {
          comment: string
          delay_sec: number
          id: string
          is_deleted: boolean
          post_id: string
          target_at: string
          user_id: string | null
        }
        Insert: {
          comment: string
          delay_sec: number
          id?: string
          is_deleted?: boolean
          post_id: string
          target_at: string
          user_id?: string | null
        }
        Update: {
          comment?: string
          delay_sec?: number
          id?: string
          is_deleted?: boolean
          post_id?: string
          target_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_bookmarked: {
        Row: {
          post_id: string
          user_id: string
        }
        Insert: {
          post_id: string
          user_id: string
        }
        Update: {
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_bookmarked_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_bookmarked_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          is_deleted: boolean
          parent_comment_id: string | null
          post_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_likes: {
        Row: {
          post_id: string
          user_id: string
        }
        Insert: {
          post_id: string
          user_id: string
        }
        Update: {
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      post_views: {
        Row: {
          post_id: string
          user_id: string
        }
        Insert: {
          post_id: string
          user_id?: string
        }
        Update: {
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_views_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          category_id: string
          content: string
          content_raw: string
          created_at: string
          id: string
          is_deleted: boolean
          score: number
          title: string
          title_raw: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id: string
          content: string
          content_raw?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          score?: number
          title: string
          title_raw?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string
          content?: string
          content_raw?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          score?: number
          title?: string
          title_raw?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string
          created_at: string
          email: string
          id: string
          is_deleted: boolean
          is_writer: boolean
          name: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string
          created_at?: string
          email?: string
          id: string
          is_deleted?: boolean
          is_writer?: boolean
          name?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string
          created_at?: string
          email?: string
          id?: string
          is_deleted?: boolean
          is_writer?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      results: {
        Row: {
          created_at: string
          date: string
          major_id: string
          scholarship_id: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          major_id: string
          scholarship_id: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          major_id?: string
          scholarship_id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "results_scholarship_id_fkey"
            columns: ["scholarship_id"]
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      results_comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          is_deleted: boolean
          parent_comment_id: string | null
          result_user_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          parent_comment_id?: string | null
          result_user_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          parent_comment_id?: string | null
          result_user_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "results_comments_result_user_id_fkey"
            columns: ["result_user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      results_dev_line: {
        Row: {
          created_at: string
          date: string
          id: string | null
          line_broadcast: number | null
          major_id: string
          scholarship_id: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string | null
          line_broadcast?: number | null
          major_id: string
          scholarship_id: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string | null
          line_broadcast?: number | null
          major_id?: string
          scholarship_id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "results_dev_line_scholarship_id_fkey"
            columns: ["scholarship_id"]
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_dev_line_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      scholarships: {
        Row: {
          id: string
          name: string
          rank: number
        }
        Insert: {
          id?: string
          name: string
          rank: number
        }
        Update: {
          id?: string
          name?: string
          rank?: number
        }
        Relationships: []
      }
      scores_gmat: {
        Row: {
          awa: string | null
          overall: string | null
          q: string | null
          user_id: string
          v: string | null
        }
        Insert: {
          awa?: string | null
          overall?: string | null
          q?: string | null
          user_id: string
          v?: string | null
        }
        Update: {
          awa?: string | null
          overall?: string | null
          q?: string | null
          user_id?: string
          v?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_gmat_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      scores_gre: {
        Row: {
          aw: string | null
          overall: string | null
          q: string | null
          user_id: string
          v: string | null
        }
        Insert: {
          aw?: string | null
          overall?: string | null
          q?: string | null
          user_id: string
          v?: string | null
        }
        Update: {
          aw?: string | null
          overall?: string | null
          q?: string | null
          user_id?: string
          v?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_gre_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      scores_ielts: {
        Row: {
          listening: string | null
          overall: string | null
          reading: string | null
          speaking: string | null
          user_id: string
          writing: string | null
        }
        Insert: {
          listening?: string | null
          overall?: string | null
          reading?: string | null
          speaking?: string | null
          user_id: string
          writing?: string | null
        }
        Update: {
          listening?: string | null
          overall?: string | null
          reading?: string | null
          speaking?: string | null
          user_id?: string
          writing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_ielts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      scores_toefl: {
        Row: {
          listening: string | null
          overall: string | null
          reading: string | null
          speaking: string | null
          user_id: string
          writing: string | null
        }
        Insert: {
          listening?: string | null
          overall?: string | null
          reading?: string | null
          speaking?: string | null
          user_id: string
          writing?: string | null
        }
        Update: {
          listening?: string | null
          overall?: string | null
          reading?: string | null
          speaking?: string | null
          user_id?: string
          writing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_toefl_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      selected_posts: {
        Row: {
          post_id: string
        }
        Insert: {
          post_id: string
        }
        Update: {
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "selected_posts_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      subscribe_notification: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          read: boolean
          subscribe_to_user_id: string | null
          subscriber_id: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          read?: boolean
          subscribe_to_user_id?: string | null
          subscriber_id: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          read?: boolean
          subscribe_to_user_id?: string | null
          subscriber_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscribe_notification_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscribe_notification_subscribe_to_user_id_fkey"
            columns: ["subscribe_to_user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscribe_notification_subscriber_id_fkey"
            columns: ["subscriber_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: string
          is_official: boolean
          name: string
        }
        Insert: {
          id?: string
          is_official?: boolean
          name: string
        }
        Update: {
          id?: string
          is_official?: boolean
          name?: string
        }
        Relationships: []
      }
      universities: {
        Row: {
          country_id: string
          id: string
          name: string
        }
        Insert: {
          country_id: string
          id?: string
          name: string
        }
        Update: {
          country_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "universities_country_id_fkey"
            columns: ["country_id"]
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      user_background: {
        Row: {
          gpa: string | null
          graduated_major_id: string | null
          graduated_university_id: string | null
          max_gpa: string | null
          user_id: string
        }
        Insert: {
          gpa?: string | null
          graduated_major_id?: string | null
          graduated_university_id?: string | null
          max_gpa?: string | null
          user_id: string
        }
        Update: {
          gpa?: string | null
          graduated_major_id?: string | null
          graduated_university_id?: string | null
          max_gpa?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_background_graduated_major_id_fkey"
            columns: ["graduated_major_id"]
            referencedRelation: "graduated_majors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_background_graduated_university_id_fkey"
            columns: ["graduated_university_id"]
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_background_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_extensive_subscriptions: {
        Row: {
          country_id: string
          created_at: string
          field_id: string
          user_id: string
        }
        Insert: {
          country_id: string
          created_at?: string
          field_id: string
          user_id: string
        }
        Update: {
          country_id?: string
          created_at?: string
          field_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_extensive_subscriptions_country_id_fkey"
            columns: ["country_id"]
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_extensive_subscriptions_field_id_fkey"
            columns: ["field_id"]
            referencedRelation: "fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_extensive_subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_line: {
        Row: {
          created_at: string
          line_id: string
          sent_message: number
          token: string | null
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          line_id: string
          sent_message?: number
          token?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          line_id?: string
          sent_message?: number
          token?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_line_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_precise_subscriptions: {
        Row: {
          created_at: string
          major_id: string
          university_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          major_id: string
          university_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          major_id?: string
          university_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_precise_subscriptions_major_id_fkey"
            columns: ["major_id"]
            referencedRelation: "majors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_precise_subscriptions_university_id_fkey"
            columns: ["university_id"]
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_precise_subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_line_id: {
        Args: {
          gcf_line_id: string
          gcf_token: string
        }
        Returns: undefined
      }
      check_line_binding: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      check_valid_name: {
        Args: {
          current_email: string
          new_name: string
        }
        Returns: boolean
      }
      check_valid_name_sign_up: {
        Args: {
          current_email: string
          new_name: string
        }
        Returns: string
      }
      check_valid_name_signup: {
        Args: {
          current_email: string
          new_name: string
        }
        Returns: string
      }
      delete_all_results: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_all_tags: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_background: {
        Args: {
          user_id: string
        }
        Returns: {
          author: Json
        }[]
      }
      get_bookmarked_posts: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          title: string
          title_raw: string
          content: string
          created_at: string
          updated_at: string
          user_info: Json
          views_count: number
          likes_count: number
          is_liked: boolean
          is_bookmarked: boolean
          is_selected: boolean
          comments_count: number
          category: string
          tags: Json
        }[]
      }
      get_bookmarked_posts_amount: {
        Args: {
          username: string
        }
        Returns: number
      }
      get_categories: {
        Args: {
          is_writer: boolean
        }
        Returns: {
          id: string
          name: string
          rank: number
        }[]
      }
      get_comments: {
        Args: {
          post_id: string
        }
        Returns: {
          id: string
          comment: string
          created_at: string
          updated_at: string
          is_deleted: boolean
          parent_comment_id: string
          user_info: Json
        }[]
      }
      get_common_post_data: {
        Args: {
          post_id: string
        }
        Returns: {
          id: string
          title: string
          title_raw: string
          content: string
          content_raw: string
          created_at: string
          updated_at: string
          views_count: number
          likes_count: number
          is_liked: boolean
          is_bookmarked: boolean
          is_selected: boolean
          comments_count: number
          category: string
          tags: Json
        }[]
      }
      get_degrees_by_university_id: {
        Args: {
          university_id: string
        }
        Returns: {
          id: string
          name: string
          rank: number
        }[]
      }
      get_edit_post: {
        Args: {
          post_id: string
        }
        Returns: {
          title: string
          content: string
          category: Json
          tags: Json
        }[]
      }
      get_extensive_subscribers: {
        Args: {
          country: string
          field: string
        }
        Returns: unknown
      }
      get_majors_by_university_id: {
        Args: {
          university_id: string
          degree_id?: string
        }
        Returns: {
          id: string
          name: string
        }[]
      }
      get_my_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          email: string
          avatar_url: string
          bio: string
          is_writer: boolean
          user_info: Json
        }[]
      }
      get_nested_comments: {
        Args: {
          post_id: string
        }
        Returns: Json
      }
      get_popular_tags: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_popular_tags_v1: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_post_comments: {
        Args: {
          post_id: string
        }
        Returns: {
          id: string
          user_info: Json
          parent_comment_id: string
          comment: string
          created_at: string
          updated_at: string
          is_deleted: boolean
        }[]
      }
      get_posts: {
        Args: {
          filter: Json
          sort_by?: string
          page_size?: number
          page_number?: number
        }
        Returns: {
          id: string
          title: string
          title_raw: string
          content: string
          created_at: string
          updated_at: string
          user_info: Json
          views_count: number
          likes_count: number
          is_liked: boolean
          is_bookmarked: boolean
          comments_count: number
          category: string
          tags: Json
          popularity_score: number
          is_selected: boolean
        }[]
      }
      get_precise_subscribers: {
        Args: {
          university: string
          major: string
        }
        Returns: unknown
      }
      get_profile: {
        Args: {
          username: string
        }
        Returns: {
          user_info: Json
          user_results: Json
          user_background: Json
          user_test_scores: Json
        }[]
      }
      get_profile_background: {
        Args: {
          username: string
        }
        Returns: {
          user_background: Json
        }[]
      }
      get_profile_posts: {
        Args: {
          username: string
          page_size?: number
          page_number?: number
        }
        Returns: {
          id: string
          title: string
          title_raw: string
          content: string
          created_at: string
          updated_at: string
          views_count: number
          likes_count: number
          is_liked: boolean
          is_bookmarked: boolean
          is_selected: boolean
          comments_count: number
          category: string
          tags: Json
        }[]
      }
      get_profile_results: {
        Args: {
          username: string
        }
        Returns: {
          user_background: Json
          user_info: Json
          results: Json[]
        }[]
      }
      get_profile_test_scores: {
        Args: {
          username: string
        }
        Returns: {
          toefl: Json
          ielts: Json
          gre: Json
          gmat: Json
        }[]
      }
      get_recent_user_results: {
        Args: {
          mode: string
        }
        Returns: Json
      }
      get_results: {
        Args: {
          filter: Json
        }
        Returns: {
          user_background: Json
          user_info: Json
          results: Json[]
        }[]
      }
      get_results_by_graduated_university: {
        Args: {
          graduated_university?: string
        }
        Returns: {
          result: Json
        }[]
      }
      get_results_comments: {
        Args: {
          result_user_id: string
        }
        Returns: {
          id: string
          user_info: Json
          parent_comment_id: string
          comment: string
          created_at: string
          updated_at: string
          is_deleted: boolean
        }[]
      }
      get_results_v2: {
        Args: {
          filter: Json
        }
        Returns: {
          user_background: Json
          user_info: Json
          user_scores: Json
          results: Json[]
        }[]
      }
      get_results_v3: {
        Args: {
          filter: Json
          page_size?: number
          page_number?: number
        }
        Returns: {
          user_background: Json
          user_info: Json
          user_scores: Json
          results: Json[]
        }[]
      }
      get_results_v4: {
        Args: {
          filter: Json
          page_size?: number
          page_number?: number
        }
        Returns: {
          user_background: Json
          user_info: Json
          user_scores: Json
          comments_count: number
          results: Json[]
        }[]
      }
      get_saved_post_count: {
        Args: {
          username: string
        }
        Returns: {
          saved_post_count: number
        }[]
      }
      get_selected_posts: {
        Args: {
          filter: Json
        }
        Returns: {
          id: string
          title: string
          content: string
          created_at: string
          user_id: string
          username: string
          avatar_url: string
          views_count: number
          likes_count: number
          comments_count: number
          category: string
          tags: string[]
          popularity_score: number
          school: string
          major: string
        }[]
      }
      get_similar_articles: {
        Args: {
          article_id: string
        }
        Returns: {
          id: string
          title: string
          content: string
          similarity: number
        }[]
      }
      get_single_post: {
        Args: {
          post_id: string
        }
        Returns: {
          id: string
          title: string
          title_raw: string
          content: string
          content_raw: string
          created_at: string
          updated_at: string
          is_deleted: boolean
          user_info: Json
          views_count: number
          likes_count: number
          comments_count: number
          is_liked: boolean
          is_bookmarked: boolean
          is_selected: boolean
          category: string
          tags: Json
        }[]
      }
      get_subscribe_notification: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          result_notification: Json
          post_notification: Json
          read: boolean
          type: string
          updated_at: string
        }[]
      }
      get_total_posts_amount: {
        Args: {
          username: string
        }
        Returns: number
      }
      get_unique_locations: {
        Args: Record<PropertyKey, never>
        Returns: {
          locations: string[]
        }[]
      }
      get_unique_major: {
        Args: {
          major_key: string
        }
        Returns: {
          major: string
        }[]
      }
      get_unique_results_amount: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_universities_by_country_id: {
        Args: {
          country_id: string
        }
        Returns: {
          id: string
          name: string
          country_id: string
        }[]
      }
      get_user_extensive_subscription: {
        Args: {
          user_id: string
        }
        Returns: unknown
      }
      get_user_info: {
        Args: {
          user_id: string
        }
        Returns: {
          user_info: Json
        }[]
      }
      get_user_notifications: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          user_id: string
          view: boolean
          created_at: string
          post_notification: Json
          result_notification: Json
        }[]
      }
      get_user_post_notifications: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          post_id: string
          user_id: string
          view: boolean
          created_at: string
          post_title: string
        }[]
      }
      get_user_posts_filter: {
        Args: {
          user_id: string
          filter: string
        }
        Returns: {
          id: string
          title: string
          content: string
          created_at: string
          user_id: string
          username: string
          avatar_url: string
          views_count: number
          likes_count: number
          comments_count: number
          category: string
          tags: string[]
          popularity_score: number
          school: string
          major: string
        }[]
      }
      get_user_precise_subscription: {
        Args: {
          user_id: string
        }
        Returns: unknown
      }
      get_user_scores: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      get_user_subscriptions: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      post_results: {
        Args: {
          _url: string
          _mode: string
        }
        Returns: undefined
      }
      post_results_request: {
        Args: {
          _url: string
          _mode: string
        }
        Returns: undefined
      }
      publish_results: {
        Args: {
          results_data: unknown[]
        }
        Returns: undefined
      }
      publish_test_scores: {
        Args: {
          test_scores: Json
        }
        Returns: undefined
      }
      publish_user_background: {
        Args: {
          user_background: Json
        }
        Returns: undefined
      }
      reset_line_quota: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_tags: {
        Args: {
          query: string
        }
        Returns: {
          id: string
          name: string
          count: number
        }[]
      }
      update_extensive_subscriptions: {
        Args: {
          p_user_id: string
          extensives: Json
        }
        Returns: undefined
      }
      update_line_quota: {
        Args: {
          line_ids: string[]
        }
        Returns: undefined
      }
      update_line_user_id_by_token: {
        Args: {
          input_token: string
          input_id: string
        }
        Returns: undefined
      }
      update_precise_subscriptions: {
        Args: {
          p_user_id: string
          precises: Json
        }
        Returns: undefined
      }
      urlencode:
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string
        value: string
      }
      http_request: {
        method: unknown
        uri: string
        headers: unknown
        content_type: string
        content: string
      }
      http_response: {
        status: number
        content_type: string
        headers: unknown
        content: string
      }
    }
  }
}
