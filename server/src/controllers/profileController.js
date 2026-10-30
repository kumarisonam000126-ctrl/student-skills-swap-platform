const store = require('../data/mockStore');

exports.getAllProfiles = async (req, res) => {
  try {
    const { search, college, skill } = req.query;
    const profiles = store.getAllProfiles({ search, college, skill });
    res.status(200).json({ success: true, count: profiles.length, profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch student profiles.' });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = store.findUserById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }
    const { password_hash, ...safeStudent } = student;

    // Get count of connections and swaps
    const connections = store.getConnectionsForUser(id);
    const { incoming, outgoing } = store.getSwapRequestsForUser(id);

    res.status(200).json({
      success: true,
      profile: {
        ...safeStudent,
        stats: {
          totalConnections: connections.length,
          totalSwaps: outgoing.filter(r => r.status === 'accepted').length + incoming.filter(r => r.status === 'accepted').length,
          skillsOffered: safeStudent.skills.teach.length,
          skillsWanted: safeStudent.skills.learn.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving profile.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, college, course, bio, avatar_url, skills } = req.body;

    const updated = store.updateProfile(userId, {
      full_name,
      college,
      course,
      bio,
      avatar_url,
      skills
    });

    const { password_hash, ...safeUpdated } = updated;
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      profile: safeUpdated
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Error updating profile.' });
  }
};

exports.getColleges = async (req, res) => {
  try {
    const profiles = store.profiles;
    const colleges = [...new Set(profiles.map(p => p.college).filter(Boolean))];
    res.status(200).json({ success: true, colleges });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch colleges.' });
  }
};

exports.getSkillsCatalog = async (req, res) => {
  try {
    const skills = store.getAllSkills();
    res.status(200).json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch skills catalog.' });
  }
};
