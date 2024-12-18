import React, { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [currentTask, setCurrentTask] = useState("");

    return (
        <TaskContext.Provider value={{ currentTask, setCurrentTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    return useContext(TaskContext);
};
