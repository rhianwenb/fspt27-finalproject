import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

export default function Alert() {



    const [showAlert, setShowAlert] = useState(false);
    const cancelRef = useRef();
    const open = () => setShowAlert(true);
    const close = () => setShowAlert(false);

    return (
        <div>
        <button onClick={open}>Delete something</button>

        {showDialog && (
            <AlertDialog leastDestructiveRef={cancelRef}>
            <AlertDialogLabel>Please Confirm!</AlertDialogLabel>

            <AlertDialogDescription>
                Are you sure you want to delete something? This action is permanent,
                and we're totally not just flipping a field called "deleted" to
                "true" in our database, we're actually deleting something.
            </AlertDialogDescription>

            <div className="alert-buttons">
                <button onClick={close}>Yes, delete</button>{" "}
                <button ref={cancelRef} onClick={close}>
                Nevermind, don't delete.
                </button>
            </div>
            </AlertDialog>
        )}
        </div>
    );
    }


