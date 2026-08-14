"use client";

import {AlertDialog, Button} from "@heroui/react";

export function DeletDestinations({ destination }) {


    const {
    title,
    destinationName,
    _id
  } = destination;

  const handleDelete = () => {
    const res = fetch(`http://localhost:5000/destinations/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }



  return (
    <AlertDialog>
      <Button variant="bordered"
  color="danger"
  radius="md"
    
  className="bg-danger text-white hover:bg-danger-600 transition-all duration-300">
        Delete Project
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                    This will permanently delete <strong>{destinationName}</strong> and all of its
                    data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete 
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}