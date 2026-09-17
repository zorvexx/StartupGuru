import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useIdeas } from '../context/IdeasContext';
import { Link } from 'react-router-dom';
import { User, Trash2, PlusCircle, Calendar, Target } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { ideas, clearUserIdeas } = useIdeas();

  if (!user) return null;

  const userIdeas = ideas.filter(
    (i) => i.userEmail && i.userEmail.toLowerCase() === user.email.toLowerCase()
  );

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your submitted ideas history?')) {
      clearUserIdeas(user.email);
    }
  };

  return (
    <div>
      <div class="profile-box">
        {/* User Header Card */}
        <div class="profile-header-card">
          <div class="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : 'F'}
          </div>
          <div>
            <h2 style={{ fontSize: '22px', color: '#2c3e50', marginBottom: '2px' }}>{user.name}</h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>{user.email}</p>
            <span class="member-badge">Verified Founder</span>
          </div>
        </div>

        {/* Submitted Ideas History */}
        <div style={{ marginTop: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '18px', color: '#2c3e50', borderBottom: '2px solid #e2e8f0', paddingBottom: '6px' }}>
              Your Submitted Startup Ideas ({userIdeas.length})
            </h3>
            {userIdeas.length > 0 && (
              <button
                onClick={handleClear}
                class="btn-logout"
                style={{ fontSize: '12px', padding: '5px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={13} /> Clear History
              </button>
            )}
          </div>

          {userIdeas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '35px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '6px' }}>
              <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '14px' }}>No startup ideas submitted yet.</p>
              <Link to="/submit" class="btn">
                <PlusCircle size={16} /> Submit Your First Idea
              </Link>
            </div>
          ) : (
            <div>
              {userIdeas.map((idea) => (
                <div key={idea.id} class="history-item">
                  <div class="history-item-header">
                    <span class="history-item-title">{idea.startupName}</span>
                    <span class="history-item-badge">{idea.industry}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#475569', marginBottom: '8px', lineHeight: '1.5' }}>
                    {idea.pitch}
                  </p>
                  <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <span><Target size={13} style={{ verticalAlign: 'middle', marginRight: '3px' }} /> Horizon: {idea.horizon} Months</span>
                    <span><Calendar size={13} style={{ verticalAlign: 'middle', marginRight: '3px' }} /> Submitted {idea.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
