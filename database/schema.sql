-- 1. Create a profiles table tied to Supabase Auth users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    credits INTEGER DEFAULT 3 NOT NULL CHECK (credits >= 0),
    is_premium BOOLEAN DEFAULT FALSE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create a games metadata and source storage table
CREATE TABLE IF NOT EXISTS public.games (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL DEFAULT 'Untitled Masterpiece',
    prompt TEXT NOT NULL,
    game_genre TEXT NOT NULL,
    source_code TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0 NOT NULL,
    is_public BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Enable Row-Level Security (RLS) for data protection
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- 4. Set up security policies
CREATE POLICY "Users can view their own profile data." 
    ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile data." 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view any public game." 
    ON public.games FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own games." 
    ON public.games FOR ALL USING (auth.uid() = user_id);

-- 5. Atomic function to deduct credits safely
CREATE OR REPLACE FUNCTION public.deduct_game_credit(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_credits INT;
    has_premium BOOLEAN;
BEGIN
    -- Check user current profile metrics
    SELECT credits, is_premium INTO current_credits, has_premium 
    FROM public.profiles WHERE id = user_uuid;

    -- Premium users bypass credit constraints
    IF has_premium THEN
        RETURN TRUE;
    END IF;

    -- Abort execution if credits are depleted
    IF current_credits <= 0 OR current_credits IS NULL THEN
        RAISE EXCEPTION 'Insufficient credits remaining. Please upgrade your package.';
    END IF;

    -- Safe subtraction increment
    UPDATE public.profiles 
    SET credits = credits - 1 
    WHERE id = user_uuid;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;