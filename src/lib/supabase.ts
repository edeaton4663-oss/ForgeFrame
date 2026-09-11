import { createClient } from '@supabase/supabase-js';

// Clean, cross-compatible variable check for Vite applications
const supabaseUrl = (import.meta.env?.VITE_SUPABASE_URL) || '';
const supabaseAnonKey = (import.meta.env?.VITE_SUPABASE_ANON_KEY) || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Check your environment configuration variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Wrapper for the 'deduct_game_credit' RPC function
 * Safely deducts a credit from the user's account before game compilation
 * 
 * @param userId - The authenticated user's UUID
 * @returns Promise<boolean> - True if credit was deducted, throws error if insufficient credits
 * @throws Error with message 'INSUFFICIENT_CREDITS' when user has 0 credits
 */
export const deductGameCredit = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('deduct_game_credit', {
      user_uuid: userId,
    });

    if (error) {
      // Check if error message indicates insufficient credits
      if (error.message.includes('Insufficient credits') || error.message.includes('INSUFFICIENT_CREDITS')) {
        throw new Error('INSUFFICIENT_CREDITS');
      }
      throw new Error(error.message);
    }

    return data === true;
  } catch (err: any) {
    if (err.message === 'INSUFFICIENT_CREDITS') {
      throw err;
    }
    throw new Error(err.message || 'Failed to deduct game credit');
  }
};

/**
 * Fetches the current user's authentication session
 * @returns Promise<{id: string, email: string} | null> - User object or null if not authenticated
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error('Authentication required. Please log in.');
  }
  return user;
};
