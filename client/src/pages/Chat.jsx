import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Send, 
  MessageSquare, 
  Users, 
  Sparkles, 
  GraduationCap, 
  CheckCheck, 
  Search, 
  Smile, 
  Paperclip,
  Compass
} from 'lucide-react';
import { connectionAPI, messageAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Chat() {
  const { user } = useAuth();
  const toast = useToast();
  const location = useLocation();

  const [connections, setConnections] = useState([]);
  const [selectedConn, setSelectedConn] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loadingConns, setLoadingConns] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [sending, setSending] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Fetch connections on load
  useEffect(() => {
    const fetchConns = async () => {
      try {
        setLoadingConns(true);
        const res = await connectionAPI.getMyConnections();
        if (res.data.success) {
          const list = res.data.connections || [];
          setConnections(list);

          // Check if navigated with state.selectedConnectionId
          const targetId = location.state?.selectedConnectionId;
          if (targetId) {
            const found = list.find(c => c.id === targetId);
            if (found) setSelectedConn(found);
            else if (list.length > 0) setSelectedConn(list[0]);
          } else if (list.length > 0) {
            setSelectedConn(list[0]);
          }
        }
      } catch (err) {
        toast.error('Failed to load active chats.');
      } finally {
        setLoadingConns(false);
      }
    };

    fetchConns();
  }, [location.state]);

  // 2. Fetch messages whenever selectedConn changes
  useEffect(() => {
    if (!selectedConn) return;

    const fetchMsgs = async () => {
      try {
        setLoadingMsgs(true);
        const res = await messageAPI.getByConnection(selectedConn.id);
        if (res.data.success) {
          setMessages(res.data.messages || []);
        }
      } catch (err) {
        toast.error('Failed to retrieve chat messages.');
      } finally {
        setLoadingMsgs(false);
      }
    };

    fetchMsgs();
  }, [selectedConn]);

  // Scroll on messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || !selectedConn || sending) return;

    const text = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      const res = await messageAPI.sendMessage(selectedConn.id, text);
      if (res.data.success) {
        setMessages(prev => [...prev, res.data.message]);
        // Update connection lastMessage in list
        setConnections(prev => prev.map(c => {
          if (c.id === selectedConn.id) {
            return { ...c, lastMessage: res.data.message };
          }
          return c;
        }));
      }
    } catch (err) {
      toast.error('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const filteredConnections = connections.filter(c => {
    if (!searchFilter.trim()) return true;
    return c.partner?.full_name?.toLowerCase().includes(searchFilter.toLowerCase());
  });

  const partner = selectedConn?.partner;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row h-[78vh] min-h-[550px]">
        
        {/* LEFT PANE: CONVERSATION LIST */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50 ${selectedConn && 'hidden md:flex'}`}>
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-600" /> Messages
            </h2>
            <div className="relative mt-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search connected peers..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {loadingConns ? (
              <div className="p-6 text-center text-xs text-slate-400">Loading chats...</div>
            ) : filteredConnections.length > 0 ? (
              filteredConnections.map(c => {
                const isSelected = selectedConn?.id === c.id;
                const p = c.partner;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConn(c)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition ${
                      isSelected ? 'bg-blue-50/80 border-l-4 border-primary-600' : 'hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={p?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p?.id}`}
                        alt={p?.full_name}
                        className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${isSelected ? 'font-bold text-primary-900' : 'font-semibold text-slate-800'}`}>
                          {p?.full_name}
                        </p>
                        {c.lastMessage && (
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {new Date(c.lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {c.lastMessage ? c.lastMessage.content : 'Started connection'}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                <Users className="w-8 h-8 mx-auto text-slate-300 mb-1" />
                <p className="font-semibold text-slate-600">No active chats yet</p>
                <p>Accept a swap request to begin messaging!</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: ACTIVE CHAT THREAD */}
        {selectedConn && partner ? (
          <div className="flex-1 flex flex-col bg-white">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConn(null)}
                  className="md:hidden p-1 text-slate-500 hover:text-slate-800"
                >
                  ←
                </button>
                <div className="relative">
                  <img
                    src={partner.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${partner.id}`}
                    alt={partner.full_name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary-100"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <Link to={`/profile/${partner.id}`} className="font-bold text-slate-900 hover:text-primary-600 text-sm block">
                    {partner.full_name}
                  </Link>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-slate-400" />
                    <span>{partner.college}</span>
                    <span className="text-emerald-600 font-semibold">• Online</span>
                  </p>
                </div>
              </div>

              <Link
                to={`/profile/${partner.id}`}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                View Profile
              </Link>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/60">
              {loadingMsgs ? (
                <div className="py-12 text-center text-xs text-slate-400">Loading conversation...</div>
              ) : messages.length > 0 ? (
                messages.map((m, idx) => {
                  const isMe = m.sender_id === user?.id;
                  return (
                    <div
                      key={m.id || idx}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                        }`}
                      >
                        {m.content}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                        <span>
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isMe && <CheckCheck className="w-3 h-3 text-blue-500" />}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <Sparkles className="w-8 h-8 text-primary-400 mx-auto" />
                  <p className="font-semibold text-slate-700 text-sm">You are connected with {partner.full_name}!</p>
                  <p className="text-xs">Say hello and decide when to start your first skill swap session.</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${partner.full_name.split(' ')[0]}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || sending}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition transform active:scale-95 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 hidden md:flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3 bg-slate-50/30">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Select a conversation</h3>
            <p className="text-xs max-w-xs leading-relaxed">
              Choose a connected peer from the left panel to review chat history and coordinate skill swap sessions.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
