import { useState } from "react";
import { HiCheck, HiXMark, HiKey } from "react-icons/hi2";
import { useTask } from "../contexts/TaskContext";
import MiniLoader from "./MiniLoader";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

const iconStyles =
  "flex gap-4 items-center py-2 px-3 md:px-4 text-black cursor-pointer justify-center";

function Task({ task }) {
  const { deleteTask, updateTask } = useTask();
  const [value, setValue] = useState(task.title || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      toast.success("Task Deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (updatedFields) => {
    const updatedTask = { ...task, ...updatedFields };

    const sanitizedValue = DOMPurify.sanitize(updatedTask.title);

    if (!sanitizedValue) {
      toast.error("Invalid input: contains potentially dangerous HTML.");
      return;
    }

    setIsUpdating(true);
    try {
      await updateTask(task.id, { ...updatedTask, title: sanitizedValue });
      toast.success("Task Updated successfully!");
    } catch (error) {
      toast.error("Error updating task:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getButtonProps = () => {
    if (task.completed) {
      return {
        className: `${iconStyles} bg-gray-500 w-16 flex items-center`,
        onClick: () => handleUpdate({ completed: false }),
        icon: <HiKey />,
      };
    } else {
      return {
        className: `${iconStyles} bg-green-500 w-16 flex items-center`,
        onClick: () => handleUpdate({ completed: true }),
        icon: <HiCheck />,
      };
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleUpdate({ title: value });
      e.target.blur();
    }
  };

  const handleBlur = () => {
    if (!value) return;

    handleUpdate({ title: value });
  };

  return (
    <div className="flex mr-2">
      <input
        required
        id="show_task"
        type="text"
        title="task"
        aria-label="task display"
        disabled={task.completed}
        onBlur={handleBlur}
        onKeyDown={handleEnter}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`outline-none appearance-none text-gray-900 font-medium px-3 py-2 w-[85%] ${
          task.completed ? "line-through cursor-not-allowed" : ""
        }`}
      />

      <button
        onClick={getButtonProps().onClick}
        className={getButtonProps().className}
        disabled={isUpdating}
      >
        {isUpdating ? <MiniLoader /> : getButtonProps().icon}
      </button>

      <button
        onClick={handleDelete}
        className={`${iconStyles} bg-red-500 w-16 flex items-center`}
        disabled={isDeleting}
      >
        {isDeleting ? <MiniLoader /> : <HiXMark />}
      </button>
    </div>
  );
}

export default Task;
