"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js Router
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Input,
  Label,
  Select,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  ToastActionButton,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";

export function ModalEdit({ destination }) {
  const router = useRouter();
  const {
    title,
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl,
    description,
    _id
  } = destination;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [loading, setLoading] = useState(false);

 const onSubmit = async (event) => {
  event.preventDefault();

  // 1. Guard check: Ensure _id is defined before making the request
  if (!_id) {
    console.error("Missing destination ID.");
    return;
  }

  setLoading(true);

  const formData = new FormData(event.currentTarget);
  const updatedData = Object.fromEntries(formData.entries());
  updatedData.category = selectedCategory;

  try {
    const res = await fetch(`http://localhost:5000/destinations/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
    toast.success("Travel package updated successfully!");
        
      setIsOpen(false);
      
      // 2. Safe router call (ensures Next.js router exists)
      if (typeof router?.refresh === "function") {
        router.refresh();
        
      }
    } else {
      // Handle server error responses (e.g. 400, 404, 500)
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to update destination:", res.status, errorData);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm transition-all duration-200 hover:shadow active:scale-[0.98]"
        >
          <BiEdit className="w-4 h-4 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors" />
          <span>Edit</span>
        </button>
     

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Envelope className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Edit Destination</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Update the travel destination details below.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={onSubmit} className="p-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <TextField defaultValue={destinationName} name="destinationName" isRequired>
                          <Label>Destination Name</Label>
                          <Input placeholder="Bali Paradise" className="rounded-2xl" />
                          <FieldError />
                        </TextField>
                      </div>

                      <TextField defaultValue={country} name="country" isRequired>
                        <Label>Country</Label>
                        <Input placeholder="Indonesia" className="rounded-2xl" />
                        <FieldError />
                      </TextField>

                      <div>
  <Select 
    selectedKeys={selectedCategory ? [selectedCategory] : []} 
    onSelectionChange={(keys) => {
      const selectedValue = Array.from(keys)[0];
      setSelectedCategory(selectedValue || "");
    }}
    name="category" 
    isRequired 
    className="w-full" 
    placeholder="Select category"
  >
    <Label>category</Label>
    <Select.Trigger className="rounded-2xl">
      <Select.Value />
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover>
      <ListBox>
        <ListBox.Item id="Beach" textValue="Beach">Beach</ListBox.Item>
        <ListBox.Item id="Mountain" textValue="Mountain">Mountain</ListBox.Item>
        <ListBox.Item id="City" textValue="City">City</ListBox.Item>
        <ListBox.Item id="Adventure" textValue="Adventure">Adventure</ListBox.Item>
        <ListBox.Item id="Cultural" textValue="Cultural">Cultural</ListBox.Item>
        <ListBox.Item id="Luxury" textValue="Luxury">Luxury</ListBox.Item>
      </ListBox>
    </Select.Popover>
  </Select>
</div>

                      <TextField defaultValue={price} name="price" type="number" isRequired>
                        <Label>Price (USD)</Label>
                        <Input type="number" placeholder="1299" className="rounded-2xl" />
                        <FieldError />
                      </TextField>

                      <TextField defaultValue={duration} name="duration" isRequired>
                        <Label>Duration</Label>
                        <Input placeholder="7 Days / 6 Nights" className="rounded-2xl" />
                        <FieldError />
                      </TextField>

                      <div className="md:col-span-2">
                        <TextField defaultValue={departureDate} name="departureDate" type="date" isRequired>
                          <Label>Departure Date</Label>
                          <Input type="date" className="rounded-2xl" />
                          <FieldError />
                        </TextField>
                      </div>

                      <div className="md:col-span-2">
                        <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
                          <Label>Image URL</Label>
                          <Input type="url" placeholder="https://example.com/bali.jpg" className="rounded-2xl" />
                          <FieldError />
                        </TextField>
                      </div>

                      <div className="md:col-span-2">
                        <TextField defaultValue={description} name="description" isRequired>
                          <Label>Description</Label>
                          <TextArea placeholder="Describe the travel experience..." className="rounded-3xl" />
                          <FieldError />
                        </TextField>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="outline"
                      disabled={loading}
                      className="rounded-full w-full bg-cyan-500 text-white mt-4"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}