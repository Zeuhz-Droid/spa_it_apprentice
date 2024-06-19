import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />

            <Route
              path="tasks"
              element={
                <TaskProvider>
                  <Tasks />
                </TaskProvider>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        gutter={12}
        position="top-right"
        reverseOrder={false}
        containerStyle={{ margin: "8px" }}
      />
    </div>
  );
}

export default App;
