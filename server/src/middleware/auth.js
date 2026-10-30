const jwt = require('jsonwebtoken');
const store = require('../data/mockStore');
const { supabase, isSupabaseConfigured } = require('../config/supabase');

const JWT_SECRET = process.env.JWT_SECRET || 'student-skills-swap-secret-key-2025';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    // If Supabase is configured, verify with Supabase
    if (isSupabaseConfigured()) {
      try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (!error && user) {
          req.user = {
            id: user.id,
            email: user.email,
            ...user.user_metadata
          };
          return next();
        }
      } catch (err) {
        // Fall back to JWT verify
      }
    }

    // Verify local JWT
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = store.findUserById(decoded.id);
      if (!user) {
        return res.status(401).json({ success: false, message: 'User session expired or user not found.' });
      }
      const { password_hash, ...safeUser } = user;
      req.user = safeUser;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal authentication error.' });
  }
};

module.exports = {
  authMiddleware,
  JWT_SECRET
};
