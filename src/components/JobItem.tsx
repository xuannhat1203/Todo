
type Job = {
  id: string;
  name: string;
  status: boolean;
};

type FunctionType = {
  job: Job;
  handleChangeStatus: (id: string) => any;
};

export default function JobItem({ job, handleChangeStatus }: FunctionType) {
  const handleChecked = (id: string) => {
    // truyền
    handleChangeStatus(id);
  };
  return (
    <>
      <li key={job.id}>
        <input
          onChange={() => handleChecked(job.id)}
          type="checkbox"
          id="task1"
          checked={job.status}
        />
        <label htmlFor="task1">
          {job.status ? <s>{job.name}</s> : <p>{job.name}</p>}
        </label>
        <button>Delete</button>
      </li>
    </>
  );
}
