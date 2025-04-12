import React, { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

const NewProject = ({ onAdd, onCancel }) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    const modalRef = useRef();

    const handleSave = () => {
        const inputTitle = titleRef.current.value;
        const inputDescription = descriptionRef.current.value;
        const inputDueDate = dueDateRef.current.value;

        if (
            inputTitle.trim() === "" ||
            inputDescription.trim() === "" ||
            inputDueDate.trim() === ""
        ) {
            modalRef.current.open();
            return;
        }

        onAdd({
            title: inputTitle,
            description: inputDescription,
            dueDate: inputDueDate,
        });
    };

    return (
        <>
            <Modal ref={modalRef} buttonLabel="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">
                    Invalid input
                </h2>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button
                            className="text-stone-800 hover:text-stone-950"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={titleRef} label={"Title"} />
                    <Input
                        ref={descriptionRef}
                        label={"Description"}
                        isTextarea
                    />
                    <Input type="date" ref={dueDateRef} label={"Due Date"} />
                </div>
            </div>
        </>
    );
};

export default NewProject;
