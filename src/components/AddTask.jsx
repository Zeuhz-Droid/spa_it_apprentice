import { useEffect, useRef, useState } from "react";
import { useTask } from "../contexts/TaskContext";
import toast from "react-hot-toast";
import MiniLoader from "./MiniLoader";
import DOMPurify from "dompurify";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

const iconStyles =
  "flex gap-4 items-center py-2 px-3 md:px-4 text-black cursor-pointer justify-center";

const AddTask = () => {
  const { createTask } = useTask();
  const [isCreating, setIsCreating] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCreate = async () => {
    if (!value.trim()) {
      toast.error("Task title cannot be empty.");
      return;
    }

    setIsCreating(true);
    const sanitizedValue = DOMPurify.sanitize(value);

    const task = {
      title: sanitizedValue,
    };

    try {
      await createTask(task);
      toast.success("Task created successfully!");
      setValue("");
    } catch (error) {
      toast.error("Error creating task:", error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <form className="flex py-9">
      <input
        required
        type="text"
        title="task"
        value={value}
        id="add_task"
        ref={inputRef}
        disabled={isCreating}
        onKeyDown={handleEnter}
        aria-label="add new-task"
        onChange={(e) => setValue(e.target.value)}
        className={`outline-none appearance-none text-gray-900 placeholder:text-gray-900 font-medium px-3 py-2 w-[85%] ${
          isCreating ? "cursor-not-allowed bg-gray-200" : ""
        }`}
      />
      <button
        onClick={handleCreate}
        className={`${iconStyles} bg-blue-500 w-[15%] flex items-center`}
        disabled={isCreating}
      >
        {isCreating ? <MiniLoader /> : <HiOutlinePaperAirplane />}
      </button>
    </form>
  );
};

export default AddTask;
