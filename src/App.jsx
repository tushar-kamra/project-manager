import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import Sidebar from "./components/Sidebar";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
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
                projects: [...prevState.projects, newProject],
            };
        });
    };

    console.log(projectsState);

    let content;
    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} />;
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProject onStartAddProject={handleStartAddProject} />;
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar onStartAddProject={handleStartAddProject} />
            {content}
        </main>
    );
}

export default App;
