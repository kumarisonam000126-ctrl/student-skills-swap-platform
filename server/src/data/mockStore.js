const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// Master skills catalog
const initialSkills = [
  { id: 'sk-1', name: 'React.js', category: 'Web Development' },
  { id: 'sk-2', name: 'JavaScript', category: 'Web Development' },
  { id: 'sk-3', name: 'HTML5 & CSS3', category: 'Web Development' },
  { id: 'sk-4', name: 'Node.js & Express', category: 'Web Development' },
  { id: 'sk-5', name: 'Python Programming', category: 'AI & Data Science' },
  { id: 'sk-6', name: 'Machine Learning', category: 'AI & Data Science' },
  { id: 'sk-7', name: 'Flutter & Dart', category: 'Mobile App Development' },
  { id: 'sk-8', name: 'UI/UX Design (Figma)', category: 'Design & Creative' },
  { id: 'sk-9', name: 'SQL & Databases', category: 'Data & Backend' },
  { id: 'sk-10', name: 'Tailwind CSS', category: 'Web Development' },
  { id: 'sk-11', name: 'Docker & DevOps', category: 'DevOps & Tools' },
  { id: 'sk-12', name: 'Data Structures & Algorithms', category: 'Computer Science' },
  { id: 'sk-13', name: 'Spoken English & Communication', category: 'Soft Skills' },
  { id: 'sk-14', name: 'Digital Marketing', category: 'Business' }
];

// Initial profiles (realistic university students)
const initialProfiles = [
  {
    id: 'user-alex',
    full_name: 'Alex Rivera',
    email: 'alex.rivera@stanford.edu',
    password_hash: bcrypt.hashSync('Password123!', 8),
    college: 'Stanford University',
    course: 'B.S. Computer Science (Year 3)',
    bio: 'Passionate about frontend architecture and design systems. Looking to level up my backend and cloud skills in exchange for React/Tailwind coaching!',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    skills: {
      teach: [
        { id: 'st-1', name: 'React.js', level: 'Advanced' },
        { id: 'st-2', name: 'Tailwind CSS', level: 'Expert' },
        { id: 'st-3', name: 'UI/UX Design (Figma)', level: 'Intermediate' }
      ],
      learn: [
        { id: 'sl-1', name: 'Node.js & Express', level: 'Beginner' },
        { id: 'sl-2', name: 'Docker & DevOps', level: 'Beginner' }
      ]
    }
  },
  {
    id: 'user-priya',
    full_name: 'Priya Sharma',
    email: 'priya.sharma@mit.edu',
    password_hash: bcrypt.hashSync('Password123!', 8),
    college: 'MIT (Massachusetts Institute of Technology)',
    course: 'M.S. Artificial Intelligence',
    bio: 'Deep learning researcher and Python enthusiast. Excited to teach ML fundamentals and PyTorch if you can help me master modern React for interactive data apps.',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    rating: 5.0,
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    skills: {
      teach: [
        { id: 'st-4', name: 'Python Programming', level: 'Expert' },
        { id: 'st-5', name: 'Machine Learning', level: 'Advanced' },
        { id: 'st-6', name: 'SQL & Databases', level: 'Advanced' }
      ],
      learn: [
        { id: 'sl-3', name: 'React.js', level: 'Beginner' },
        { id: 'sl-4', name: 'JavaScript', level: 'Intermediate' }
      ]
    }
  },
  {
    id: 'user-marcus',
    full_name: 'Marcus Chen',
    email: 'marcus.chen@berkeley.edu',
    password_hash: bcrypt.hashSync('Password123!', 8),
    college: 'UC Berkeley',
    course: 'B.A. Cognitive Science & Design',
    bio: 'Figma certified UI/UX designer. I create wireframes, interactive prototypes, and design tokens. Wanting to learn Flutter to turn my mobile prototypes into real apps!',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    skills: {
      teach: [
        { id: 'st-7', name: 'UI/UX Design (Figma)', level: 'Expert' },
        { id: 'st-8', name: 'HTML5 & CSS3', level: 'Advanced' }
      ],
      learn: [
        { id: 'sl-5', name: 'Flutter & Dart', level: 'Beginner' },
        { id: 'sl-6', name: 'React.js', level: 'Intermediate' }
      ]
    }
  },
  {
    id: 'user-zainab',
    full_name: 'Zainab Al-Mansoor',
    email: 'zainab.m@oxford.ac.uk',
    password_hash: bcrypt.hashSync('Password123!', 8),
    college: 'University of Oxford',
    course: 'B.Sc. Software Engineering',
    bio: 'Backend specialist working with Node.js microservices and PostgreSQL. Looking for someone with strong Python & Machine Learning skills to collaborate on research.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 4.95,
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    skills: {
      teach: [
        { id: 'st-9', name: 'Node.js & Express', level: 'Expert' },
        { id: 'st-10', name: 'SQL & Databases', level: 'Advanced' },
        { id: 'st-11', name: 'Docker & DevOps', level: 'Intermediate' }
      ],
      learn: [
        { id: 'sl-7', name: 'Python Programming', level: 'Intermediate' },
        { id: 'sl-8', name: 'Machine Learning', level: 'Beginner' }
      ]
    }
  },
  {
    id: 'user-david',
    full_name: 'David Kim',
    email: 'david.kim@utoronto.ca',
    password_hash: bcrypt.hashSync('Password123!', 8),
    college: 'University of Toronto',
    course: 'B.S. Mobile Computing',
    bio: 'Mobile dev building cross-platform apps with Flutter. Need help with Data Structures & Algorithms for upcoming summer internship technical interviews!',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 4.75,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    skills: {
      teach: [
        { id: 'st-12', name: 'Flutter & Dart', level: 'Advanced' },
        { id: 'st-13', name: 'JavaScript', level: 'Advanced' }
      ],
      learn: [
        { id: 'sl-9', name: 'Data Structures & Algorithms', level: 'Intermediate' },
        { id: 'sl-10', name: 'Python Programming', level: 'Beginner' }
      ]
    }
  }
];

// Initial swap requests
const initialSwapRequests = [
  {
    id: 'req-1',
    sender_id: 'user-priya',
    receiver_id: 'user-alex',
    offered_skill: 'Python Programming',
    wanted_skill: 'React.js',
    message: 'Hey Alex! Saw your amazing React projects. I can coach you on Python backend or ML if you can help me get comfortable building React dashboards!',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'req-2',
    sender_id: 'user-alex',
    receiver_id: 'user-zainab',
    offered_skill: 'React.js',
    wanted_skill: 'Node.js & Express',
    message: 'Hi Zainab! Would love to trade full-stack skills. I can guide you through React component libraries in exchange for Node.js API best practices.',
    status: 'accepted',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 86400000).toISOString()
  }
];

// Initial connections
const initialConnections = [
  {
    id: 'conn-1',
    user1_id: 'user-alex',
    user2_id: 'user-zainab',
    swap_request_id: 'req-2',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  }
];

// Initial messages
const initialMessages = [
  {
    id: 'msg-1',
    connection_id: 'conn-1',
    sender_id: 'user-alex',
    receiver_id: 'user-zainab',
    content: 'Hi Zainab! Thanks for accepting my swap request! When are you free for our first session?',
    is_read: true,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'msg-2',
    connection_id: 'conn-1',
    sender_id: 'user-zainab',
    receiver_id: 'user-alex',
    content: 'Awesome to meet you Alex! I am free this Thursday after 4 PM. We can start by outlining the Express REST endpoints you want to build!',
    is_read: true,
    created_at: new Date(Date.now() - 2 * 86400000 + 3600000).toISOString()
  },
  {
    id: 'msg-3',
    connection_id: 'conn-1',
    sender_id: 'user-alex',
    receiver_id: 'user-zainab',
    content: 'Sounds perfect! I prepared a starter Figma mockup and schema we can go over together.',
    is_read: false,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

class MemoryStore {
  constructor() {
    this.skills = [...initialSkills];
    this.profiles = [...initialProfiles];
    this.swapRequests = [...initialSwapRequests];
    this.connections = [...initialConnections];
    this.messages = [...initialMessages];
  }

  // Auth & Profile
  findUserByEmail(email) {
    return this.profiles.find(p => p.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.profiles.find(p => p.id === id);
  }

  createUser({ full_name, email, password, college, course, skillsTeach = [], skillsLearn = [], bio, avatar_url }) {
    const existing = this.findUserByEmail(email);
    if (existing) {
      throw new Error('User with this email already exists.');
    }

    const id = `user-${uuidv4().slice(0, 8)}`;
    const newProfile = {
      id,
      full_name,
      email,
      password_hash: bcrypt.hashSync(password, 8),
      college: college || 'University Campus',
      course: course || 'General Studies',
      bio: bio || 'Excited to learn new skills and share what I know!',
      avatar_url: avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
      rating: 5.0,
      created_at: new Date().toISOString(),
      skills: {
        teach: skillsTeach.map(s => ({
          id: `st-${uuidv4().slice(0, 6)}`,
          name: typeof s === 'string' ? s : s.name,
          level: typeof s === 'object' && s.level ? s.level : 'Intermediate'
        })),
        learn: skillsLearn.map(s => ({
          id: `sl-${uuidv4().slice(0, 6)}`,
          name: typeof s === 'string' ? s : s.name,
          level: typeof s === 'object' && s.level ? s.level : 'Beginner'
        }))
      }
    };

    this.profiles.push(newProfile);
    return newProfile;
  }

  updateProfile(id, updates) {
    const profile = this.findUserById(id);
    if (!profile) throw new Error('Student profile not found');

    if (updates.full_name) profile.full_name = updates.full_name;
    if (updates.college) profile.college = updates.college;
    if (updates.course) profile.course = updates.course;
    if (updates.bio !== undefined) profile.bio = updates.bio;
    if (updates.avatar_url) profile.avatar_url = updates.avatar_url;
    if (updates.skills) {
      profile.skills = updates.skills;
    }

    return profile;
  }

  getAllProfiles({ search, college, skill } = {}) {
    let list = this.profiles.map(p => {
      const { password_hash, ...rest } = p;
      return rest;
    });

    if (search) {
      const s = search.toLowerCase();
      list = list.filter(p => 
        p.full_name.toLowerCase().includes(s) ||
        p.college.toLowerCase().includes(s) ||
        p.course.toLowerCase().includes(s) ||
        p.skills.teach.some(t => t.name.toLowerCase().includes(s)) ||
        p.skills.learn.some(l => l.name.toLowerCase().includes(s))
      );
    }

    if (college && college !== 'All') {
      list = list.filter(p => p.college.toLowerCase() === college.toLowerCase());
    }

    if (skill && skill !== 'All') {
      list = list.filter(p => 
        p.skills.teach.some(t => t.name.toLowerCase() === skill.toLowerCase()) ||
        p.skills.learn.some(l => l.name.toLowerCase() === skill.toLowerCase())
      );
    }

    return list;
  }

  // Skills
  getAllSkills() {
    return this.skills;
  }

  addSkill(name, category = 'General') {
    const existing = this.skills.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing;
    const newSkill = { id: `sk-${uuidv4().slice(0, 6)}`, name, category };
    this.skills.push(newSkill);
    return newSkill;
  }

  // Swap Requests
  createSwapRequest({ sender_id, receiver_id, offered_skill, wanted_skill, message }) {
    if (sender_id === receiver_id) {
      throw new Error('You cannot send a swap request to yourself.');
    }

    // Check if duplicate pending exists
    const duplicate = this.swapRequests.find(r => 
      r.sender_id === sender_id && 
      r.receiver_id === receiver_id && 
      r.status === 'pending'
    );
    if (duplicate) {
      throw new Error('A pending swap request already exists between you two.');
    }

    const request = {
      id: `req-${uuidv4().slice(0, 8)}`,
      sender_id,
      receiver_id,
      offered_skill,
      wanted_skill,
      message: message || '',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.swapRequests.unshift(request);
    return this.enrichSwapRequest(request);
  }

  enrichSwapRequest(req) {
    const sender = this.findUserById(req.sender_id);
    const receiver = this.findUserById(req.receiver_id);
    return {
      ...req,
      sender: sender ? { id: sender.id, full_name: sender.full_name, college: sender.college, avatar_url: sender.avatar_url, course: sender.course } : null,
      receiver: receiver ? { id: receiver.id, full_name: receiver.full_name, college: receiver.college, avatar_url: receiver.avatar_url, course: receiver.course } : null
    };
  }

  getSwapRequestsForUser(userId) {
    const incoming = this.swapRequests
      .filter(r => r.receiver_id === userId)
      .map(r => this.enrichSwapRequest(r));
    const outgoing = this.swapRequests
      .filter(r => r.sender_id === userId)
      .map(r => this.enrichSwapRequest(r));
    return { incoming, outgoing };
  }

  updateSwapRequestStatus(requestId, status, userId) {
    const req = this.swapRequests.find(r => r.id === requestId);
    if (!req) throw new Error('Swap request not found');

    if (req.receiver_id !== userId && req.sender_id !== userId) {
      throw new Error('Unauthorized to modify this request');
    }

    req.status = status;
    req.updated_at = new Date().toISOString();

    // If accepted, automatically create connection
    if (status === 'accepted') {
      const existingConn = this.connections.find(c => 
        (c.user1_id === req.sender_id && c.user2_id === req.receiver_id) ||
        (c.user1_id === req.receiver_id && c.user2_id === req.sender_id)
      );

      if (!existingConn) {
        const newConn = {
          id: `conn-${uuidv4().slice(0, 8)}`,
          user1_id: req.sender_id,
          user2_id: req.receiver_id,
          swap_request_id: req.id,
          created_at: new Date().toISOString()
        };
        this.connections.push(newConn);

        // Also add an automated welcome exchange message
        this.messages.push({
          id: `msg-${uuidv4().slice(0, 8)}`,
          connection_id: newConn.id,
          sender_id: req.receiver_id,
          receiver_id: req.sender_id,
          content: `🎉 I have accepted your skill swap request! Let's swap "${req.offered_skill}" for "${req.wanted_skill}". How would you like to get started?`,
          is_read: false,
          created_at: new Date().toISOString()
        });
      }
    }

    return this.enrichSwapRequest(req);
  }

  // Connections
  getConnectionsForUser(userId) {
    const userConns = this.connections.filter(c => c.user1_id === userId || c.user2_id === userId);
    return userConns.map(c => {
      const partnerId = c.user1_id === userId ? c.user2_id : c.user1_id;
      const partner = this.findUserById(partnerId);
      const lastMsg = this.messages
        .filter(m => m.connection_id === c.id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null;

      const unreadCount = this.messages.filter(m => m.connection_id === c.id && m.receiver_id === userId && !m.is_read).length;

      return {
        ...c,
        partner: partner ? {
          id: partner.id,
          full_name: partner.full_name,
          email: partner.email,
          college: partner.college,
          course: partner.course,
          bio: partner.bio,
          avatar_url: partner.avatar_url,
          rating: partner.rating,
          skills: partner.skills
        } : null,
        lastMessage: lastMsg,
        unreadCount
      };
    });
  }

  // Messages
  getMessagesForConnection(connectionId, userId) {
    const conn = this.connections.find(c => c.id === connectionId);
    if (!conn) throw new Error('Connection not found');
    if (conn.user1_id !== userId && conn.user2_id !== userId) {
      throw new Error('Unauthorized to view messages for this connection');
    }

    // Mark messages directed to this user as read
    this.messages.forEach(m => {
      if (m.connection_id === connectionId && m.receiver_id === userId) {
        m.is_read = true;
      }
    });

    return this.messages
      .filter(m => m.connection_id === connectionId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  sendMessage({ connectionId, sender_id, content }) {
    const conn = this.connections.find(c => c.id === connectionId);
    if (!conn) throw new Error('Connection not found');
    if (conn.user1_id !== sender_id && conn.user2_id !== sender_id) {
      throw new Error('Unauthorized to send message in this connection');
    }

    const receiver_id = conn.user1_id === sender_id ? conn.user2_id : conn.user1_id;
    const msg = {
      id: `msg-${uuidv4().slice(0, 8)}`,
      connection_id: connectionId,
      sender_id,
      receiver_id,
      content,
      is_read: false,
      created_at: new Date().toISOString()
    };

    this.messages.push(msg);
    return msg;
  }

  // Smart Skill Matching Engine
  getMatchesForUser(userId) {
    const user = this.findUserById(userId);
    if (!user) return [];

    const userLearnNames = user.skills.learn.map(s => s.name.toLowerCase());
    const userTeachNames = user.skills.teach.map(s => s.name.toLowerCase());

    const otherStudents = this.profiles.filter(p => p.id !== userId);

    const matches = otherStudents.map(other => {
      const otherTeachNames = other.skills.teach.map(s => s.name.toLowerCase());
      const otherLearnNames = other.skills.learn.map(s => s.name.toLowerCase());

      // 1. Can other teach what user wants to learn?
      const userCanLearnFromOther = user.skills.learn.filter(l => 
        otherTeachNames.includes(l.name.toLowerCase())
      );

      // 2. Can user teach what other wants to learn?
      const otherCanLearnFromUser = other.skills.learn.filter(l => 
        userTeachNames.includes(l.name.toLowerCase())
      );

      let matchScore = 0;
      let matchType = 'No Match';

      if (userCanLearnFromOther.length > 0 && otherCanLearnFromUser.length > 0) {
        matchScore = 95 + Math.min(userCanLearnFromOther.length * 2, 5);
        matchType = 'Mutual Swap (Perfect Match)';
      } else if (userCanLearnFromOther.length > 0) {
        matchScore = 75 + Math.min(userCanLearnFromOther.length * 5, 15);
        matchType = 'Can Teach You';
      } else if (otherCanLearnFromUser.length > 0) {
        matchScore = 60 + Math.min(otherCanLearnFromUser.length * 5, 15);
        matchType = 'Wants to Learn From You';
      } else {
        matchScore = 30;
        matchType = 'Potential Partner';
      }

      const { password_hash, ...safeOther } = other;

      return {
        student: safeOther,
        matchScore,
        matchType,
        userCanLearnFromOther,
        otherCanLearnFromUser
      };
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }
}

const store = new MemoryStore();
module.exports = store;
