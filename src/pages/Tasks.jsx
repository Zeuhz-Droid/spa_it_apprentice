import Task from "../components/Task";
import Loader from "../components/Loader";
import { useTask } from "../contexts/TaskContext";
import AddTask from "../components/AddTask";

const LIMIT = 10;

function Tasks() {
  const { tasks, isLoading } = useTask();

  const tasksDisplayed = tasks.slice(0, LIMIT);

  if (isLoading)
    return (
      <div className="h-[80vh] grid place-content-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 m-auto md:w-[80%]">
      <AddTask />
      <div className="flex flex-col gap-4 m-auto w-[90%] md:w-[70%] mt-4">
        <h2 className="text-3xl">Tasks:</h2>
        {tasksDisplayed.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
