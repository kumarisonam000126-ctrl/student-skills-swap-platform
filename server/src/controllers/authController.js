const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('../data/mockStore');
const { supabase, isSupabaseConfigured } = require('../config/supabase');
const { JWT_SECRET } = require('../middleware/auth');

exports.register = async (req, res) => {
  try {
    const { full_name, email, password, confirmPassword, college, course, skillsTeach, skillsLearn, bio, avatar_url } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide full name, email and password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    // If Supabase live is configured
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            college,
            course,
            avatar_url: avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          }
        }
      });

      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

      // Also persist skills into supabase student_skills if profile ready
      return res.status(201).json({
        success: true,
        message: 'Registration successful via Supabase.',
        user: data.user,
        session: data.session
      });
    }

    // Dual-Mode Store
    try {
      const newProfile = store.createUser({
        full_name,
        email,
        password,
        college,
        course,
        skillsTeach: skillsTeach || [],
        skillsLearn: skillsLearn || [],
        bio,
        avatar_url
      });

      const token = jwt.sign({ id: newProfile.id, email: newProfile.email }, JWT_SECRET, { expiresIn: '7d' });
      const { password_hash, ...safeUser } = newProfile;

      return res.status(201).json({
        success: true,
        message: 'Welcome to Student Skills Swap! Account created successfully.',
        token,
        user: safeUser
      });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    // If Supabase live is configured
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        token: data.session?.access_token,
        user: data.user
      });
    }

    // Dual-Mode store
    const user = store.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    const { password_hash, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: 'Login successful. Welcome back!',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = store.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const { password_hash, ...safeUser } = user;
    res.status(200).json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve user profile.' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your registered email address.' });
    }

    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return res.status(400).json({ success: false, message: error.message });
      return res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });
    }

    const user = store.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email address.' });
    }

    return res.status(200).json({
      success: true,
      message: `Password reset instructions have been generated for ${email}. (Demo mode: Use Password123! or register a new account)`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error processing password reset request.' });
  }
};
