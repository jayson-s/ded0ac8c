import { useEffect, useState } from 'react';
import { getActivities, updateCallArchiveStatus } from '../api/aircall';
import CallItem from '../components/CallItem';
import toast from 'react-hot-toast';

const Archived = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities()
      .then(res => {
        const archived = res.data.filter(call => call.is_archived);
        setCalls(archived);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const unarchiveAll = async () => {
    await Promise.all(calls.map(call => updateCallArchiveStatus(call.id, false)));
    toast.success('All calls unarchived');
    setCalls([]);
  };

  return (
    <div>
      <button onClick={unarchiveAll} className="archive-all-btn">Unarchive All</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        calls.map(call => <CallItem key={call.id} data={call} />)
      )}
    </div>
  );
};

export default Archived;