"use client";

import { useState } from "react";
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
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";

export function ModalEdit({ destination }) {
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

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log(destination);


    const res = await fetch(`http://localhost:5000/destinations/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(destination)
      });
    setIsOpen(false);

    const data = await res.json();
    console.log(data);
  };
 

  return (
    <>
      <div className="flex justify-end mx-auto">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm transition-all duration-200 hover:shadow active:scale-[0.98]"
        >
          <BiEdit className="w-4 h-4 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors" />
          <span>Edit</span>
        </button>
      </div>

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
                        <TextField defaultValue={destinationName} isRequired>
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
                        <Select defaultValue={category} name="category" isRequired className="w-full" placeholder="Select category">
                          <Label>Category</Label>
                          <Select.Trigger className="rounded-2xl">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              <ListBox.Item id="Beach" textValue="Beach">
                                Beach
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Mountain" textValue="Mountain">
                                Mountain
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="City" textValue="City">
                                City
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Adventure" textValue="Adventure">
                                Adventure
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Cultural" textValue="Cultural">
                                Cultural
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Luxury" textValue="Luxury">
                                Luxury
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
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
                        <TextField defaultValue={imageUrl}  name="imageUrl" isRequired>
                          <Label>Image URL</Label>
                          <Input
                            type="url"
                            placeholder="https://example.com/bali-paradise.jpg"
                            className="rounded-2xl"
                          />
                          <FieldError />
                        </TextField>
                      </div>

                      <div className="md:col-span-2">
                        <TextField defaultValue={description} name="description" isRequired>
                          <Label>Description</Label>
                          <TextArea
                            placeholder="Describe the travel experience..."
                            className="rounded-3xl"
                          />
                          <FieldError />
                        </TextField>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="outline"
                      className="rounded-full w-full bg-cyan-500 text-white mt-4"
                    >
                      Save Changes
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