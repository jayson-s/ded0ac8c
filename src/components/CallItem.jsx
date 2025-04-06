import { updateCallArchiveStatus, getCallDetails } from '../api/aircall';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CallItem = ({ data }) => {
  const [archived, setArchived] = useState(data.is_archived);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState(null);

  const handleToggleArchive = async () => {
    try {
      await updateCallArchiveStatus(data.id, !archived);
      toast.success(`Call ${archived ? 'unarchived' : 'archived'}`);
      setArchived(!archived);
    } catch (error) {
      toast.error('Failed to update call');
    }
  };

  const formatPhoneNumber = (num) => {
    if (!num || typeof num !== 'string') return num;
    const digits = num.replace(/\D/g, '');
    if (digits.length === 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    if (digits.length > 10) {
      const country = digits.slice(0, digits.length - 10);
      const area = digits.slice(-10, -7);
      const mid = digits.slice(-7, -4);
      const last = digits.slice(-4);
      return `+${country} ${area}-${mid}-${last}`;
    }
    return num;
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const iconMap = {
    missed: '❌',
    answered: '📞',
    voicemail: '🎙️',
  };

  const loadDetails = async () => {
    try {
      const res = await getCallDetails(data.id);
      setDetail(res.data);
      setShowDetail(true);
    } catch (error) {
      toast.error('Failed to load details');
    }
  };

  return (
    <>
      <div className="call-card" onClick={loadDetails}>
        <div className="call-header">
          <strong>{formatPhoneNumber(data.from)}</strong> → {formatPhoneNumber(data.to)} {iconMap[data.call_type]}
        </div>
        <div className="call-meta">
          {data.call_type} via <strong>{data.via}</strong>
        </div>
        <div className="call-meta">
          {new Date(data.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          — Duration: {formatDuration(data.duration)}
        </div>
        <button onClick={(e) => { e.stopPropagation(); handleToggleArchive(); }}>
          {archived ? 'Unarchive' : 'Archive'}
        </button>
      </div>

      {showDetail && detail && (
        <div className="call-modal" onClick={(e) => e.stopPropagation()}>
          <h3>📋 Call Details</h3>
          <p><strong>From:</strong> {formatPhoneNumber(detail.from)}</p>
          <p><strong>To:</strong> {formatPhoneNumber(detail.to)}</p>
          <p><strong>Via:</strong> {formatPhoneNumber(detail.via)}</p>
          <p><strong>Duration:</strong> {formatDuration(detail.duration)}</p>
          <p><strong>Type:</strong> {detail.call_type}</p>
          <p><strong>Direction:</strong> {detail.direction}</p>
          <p><strong>Date:</strong> {new Date(detail.created_at).toLocaleString()}</p>
          <button onClick={() => setShowDetail(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default CallItem;