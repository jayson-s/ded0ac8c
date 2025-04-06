import { useEffect, useState } from 'react';
import { getActivities, updateCallArchiveStatus } from '../api/aircall';
import CallItem from '../components/CallItem';
import toast from 'react-hot-toast';

const groupByDate = (calls) => {
  return calls.reduce((acc, call) => {
    const date = new Date(call.created_at).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(call);
    return acc;
  }, {});
};

const Inbox = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities()
      .then(res => {
        const unarchived = res.data.filter(call => !call.is_archived);
        setCalls(unarchived);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const archiveAll = async () => {
    await Promise.all(calls.map(call => updateCallArchiveStatus(call.id, true)));
    toast.success('All calls archived');
    setCalls([]);
  };

  const grouped = groupByDate(calls);

  return (
    <div>
      <button onClick={archiveAll} className="archive-all-btn">Archive All</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(grouped).map(date => (
          <div key={date}>
            <h4>{date}</h4>
            {grouped[date].map(call => <CallItem key={call.id} data={call} />)}
          </div>
        ))
      )}
    </div>
  );
};

export default Inbox;