-- ====================================================================
-- STUDENT SKILLS SWAP PLATFORM - SUPABASE POSTGRESQL SCHEMA
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop Existing Tables if needed (safe setup)
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS connections CASCADE;
DROP TABLE IF EXISTS swap_requests CASCADE;
DROP TABLE IF EXISTS student_skills CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 3. PROFILES TABLE
-- Extends Supabase auth.users or standalone UUIDs
CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    college TEXT NOT NULL DEFAULT '',
    course TEXT NOT NULL DEFAULT '',
    bio TEXT DEFAULT 'Ready to exchange skills and grow together!',
    avatar_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    linkedin_url TEXT DEFAULT '',
    rating NUMERIC(3,2) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. MASTER SKILLS CATALOG TABLE
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    icon TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. STUDENT SKILLS (Junction for teach vs learn)
CREATE TABLE student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
    skill_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('teach', 'learn')),
    proficiency_level TEXT DEFAULT 'Intermediate' CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, skill_name, type)
);

-- 6. SWAP REQUESTS TABLE
CREATE TABLE swap_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    offered_skill TEXT NOT NULL,
    wanted_skill TEXT NOT NULL,
    message TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (sender_id <> receiver_id)
);

-- 7. CONNECTIONS TABLE
CREATE TABLE connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    swap_request_id UUID REFERENCES swap_requests(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user1_id, user2_id),
    CHECK (user1_id <> user2_id)
);

-- 8. MESSAGES TABLE (Real-time Peer Chat)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_id UUID REFERENCES connections(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- INDEXES FOR FAST QUERIES & MATCHING
-- ====================================================================
CREATE INDEX idx_profiles_college ON profiles(college);
CREATE INDEX idx_student_skills_lookup ON student_skills(skill_name, type);
CREATE INDEX idx_student_skills_profile ON student_skills(profile_id);
CREATE INDEX idx_swap_requests_users ON swap_requests(sender_id, receiver_id, status);
CREATE INDEX idx_messages_connection ON messages(connection_id, created_at);
CREATE INDEX idx_messages_chat ON messages(sender_id, receiver_id);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE swap_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone authenticated can read all profiles; users can update their own
CREATE POLICY "Public profiles are readable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id OR auth.uid() IS NULL);

-- Skills catalog: Read-only for all
CREATE POLICY "Skills are readable by everyone" ON skills FOR SELECT USING (true);

-- Student Skills: Anyone can view; owners can insert/delete
CREATE POLICY "Student skills are viewable by everyone" ON student_skills FOR SELECT USING (true);
CREATE POLICY "Users can insert their own skills" ON student_skills FOR INSERT WITH CHECK (auth.uid() = profile_id OR auth.uid() IS NULL);
CREATE POLICY "Users can delete their own skills" ON student_skills FOR DELETE USING (auth.uid() = profile_id OR auth.uid() IS NULL);

-- Swap Requests: Sender or receiver can view; sender can insert; receiver/sender can update
CREATE POLICY "Users can view their own swap requests" ON swap_requests FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id OR auth.uid() IS NULL
);
CREATE POLICY "Users can create swap requests" ON swap_requests FOR INSERT WITH CHECK (
    auth.uid() = sender_id OR auth.uid() IS NULL
);
CREATE POLICY "Involved users can update swap requests" ON swap_requests FOR UPDATE USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id OR auth.uid() IS NULL
);

-- Connections: Involved users can view and create
CREATE POLICY "Users can view their connections" ON connections FOR SELECT USING (
    auth.uid() = user1_id OR auth.uid() = user2_id OR auth.uid() IS NULL
);
CREATE POLICY "Users can insert connections" ON connections FOR INSERT WITH CHECK (
    auth.uid() = user1_id OR auth.uid() = user2_id OR auth.uid() IS NULL
);

-- Messages: Involved users can view and send messages
CREATE POLICY "Users can view their chat messages" ON messages FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id OR auth.uid() IS NULL
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id OR auth.uid() IS NULL
);

-- ====================================================================
-- AUTOMATIC PROFILE TRIGGER (ON SUPABASE AUTH SIGNUP)
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, college, course, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'college', 'University Campus'),
    COALESCE(NEW.raw_user_meta_data->>'course', 'Computer Science'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || NEW.id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users (Supabase managed)
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ====================================================================
-- SEED DATA: POPULAR SKILLS CATALOG
-- ====================================================================
INSERT INTO skills (name, category) VALUES
-- Web Development
('React.js', 'Web Development'),
('JavaScript', 'Web Development'),
('HTML5 & CSS3', 'Web Development'),
('Node.js & Express', 'Web Development'),
('Next.js', 'Web Development'),
('TypeScript', 'Web Development'),
('Vue.js', 'Web Development'),
('Tailwind CSS', 'Web Development'),
('Python Full Stack', 'Web Development'),
('PHP & Laravel', 'Web Development'),

-- AI, ML & Data Science
('Python Programming', 'AI & Data Science'),
('Machine Learning', 'AI & Data Science'),
('Deep Learning & PyTorch', 'AI & Data Science'),
('Data Analysis (Pandas/NumPy)', 'AI & Data Science'),
('Natural Language Processing', 'AI & Data Science'),
('Computer Vision', 'AI & Data Science'),
('SQL & Databases', 'AI & Data Science'),

-- Mobile App Development
('Flutter & Dart', 'Mobile App Development'),
('React Native', 'Mobile App Development'),
('Android (Kotlin)', 'Mobile App Development'),
('iOS (Swift)', 'Mobile App Development'),

-- Design & Creative
('UI/UX Design (Figma)', 'Design & Creative'),
('Graphic Design', 'Design & Creative'),
('Video Editing (Premiere Pro)', 'Design & Creative'),
('3D Modeling (Blender)', 'Design & Creative'),
('Product Design', 'Design & Creative'),

-- Cloud, DevOps & Security
('Git & GitHub', 'DevOps & Tools'),
('Docker & Containers', 'DevOps & Tools'),
('AWS Cloud', 'DevOps & Tools'),
('Cybersecurity Basics', 'DevOps & Tools'),
('Linux Command Line', 'DevOps & Tools'),

-- Business, Languages & Academics
('Public Speaking', 'Soft Skills'),
('Spoken English', 'Languages'),
('Spanish Language', 'Languages'),
('German Language', 'Languages'),
('Digital Marketing', 'Business'),
('Data Structures & Algorithms', 'Computer Science Core'),
('Financial Literacy', 'Business'),
('Content Writing', 'Creative')
ON CONFLICT (name) DO NOTHING;
