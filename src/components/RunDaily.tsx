import { useEffect } from 'react';

type RunDailyProps = {
    id?: string;
    onDailyRun: () => void;
};

export default function RunDaily({ id = 'default', onDailyRun } : RunDailyProps) {
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const key = `lastRunDate:${id}`; // allows multiple daily tasks
    const lastRun = localStorage.getItem(key);

    if (lastRun !== today) {
      onDailyRun();
      localStorage.setItem(key, today);
    }
  }, [id, onDailyRun]);

  return null; // no visual output
}
