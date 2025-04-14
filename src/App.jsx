import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    const handleStartAddProject = () => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
    };

    const handleAddProject = (projectData) => {
        setProjectsState((prevState) => {
            const newProject = {
                ...projectData,
                id: Math.random(),
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject],
            };
        });
    };

    const handleCancelProject = () => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        });
    };

    const handleSelectProject = (projectId) => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: projectId,
            };
        });
    };

    const handleDeleteProject = () => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId
                ),
            };
        });
    };

    const handleAddTask = (task) => {
        setProjectsState((prevState) => {
            const newTask = {
                id: Math.random(),
                projectId: prevState.selectedProjectId,
                task: task,
            };
            return {
                ...prevState,
                tasks: [...prevState.tasks, newTask],
            };
        });
    };

    const handleDeleteTask = (taskId) => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== taskId),
            };
        });
    };

    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId
    );
    let content = (
        <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks}
        />
    );
    if (projectsState.selectedProjectId === null) {
        content = (
            <NewProject
                onAdd={handleAddProject}
                onCancel={handleCancelProject}
            />
        );
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProject onStartAddProject={handleStartAddProject} />;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
