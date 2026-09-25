"use client";

import {
    ArrowRight,
    Calendar,
    Clock,
    Envelope,
} from "@gravity-ui/icons";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";

const BookingButton = ({ destination }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userEmail, setUserEmail] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("userEmail") || ""
      : ""
  );

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!userEmail) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${SERVER_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destinationId: destination._id,
          destinationName: destination.destinationName,
          title: destination.title,
          imageUrl: destination.imageUrl,
          price: destination.price,
          duration: destination.duration,
          departureDate: destination.departureDate,
          userEmail: userEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Booking failed");
        return;
      }

      localStorage.setItem("userEmail", userEmail);

      toast.success("Booked successfully!");

      setIsOpen(false);

      router.push("/my-booking");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong while booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Book Destination Button */}

      <Button
        color="primary"
        size="lg"
        radius="full"
        endContent={<ArrowRight className="w-5 h-5" />}
        className="w-full font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform"
        onPress={() => setIsOpen(true)}
      >
        Book Destination
      </Button>

      {/* Booking Modal */}

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">

              <Modal.CloseTrigger
                onClick={() => setIsOpen(false)}
              />

              <Modal.Header>

                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Envelope className="size-5" />
                </Modal.Icon>

                <Modal.Heading>
                  Book Your Trip
                </Modal.Heading>

                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Confirm your booking details before booking this destination.
                </p>

              </Modal.Header>

              <Modal.Body className="p-6">

                <Surface variant="default">

                  <form
                    onSubmit={handleBooking}
                    className="p-4 space-y-5"
                  >

                    {/* Destination Information */}

                    <div className="rounded-2xl border border-divider p-4 space-y-3">

                      <div>
                        <p className="text-xs text-default-400">
                          Destination
                        </p>

                        <p className="font-bold text-lg">
                          {destination.title ||
                            destination.destinationName}
                        </p>
                      </div>

                      <div className="flex justify-between">

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />

                          <span className="text-sm">
                            {destination.duration || "N/A"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />

                          <span className="text-sm">
                            {destination.departureDate || "Flexible"}
                          </span>
                        </div>

                      </div>

                      <div className="border-t border-divider pt-3">

                        <span className="text-xs text-default-400">
                          Price
                        </span>

                        <p className="text-2xl font-black text-primary">
                          ${destination.price}
                        </p>

                      </div>

                    </div>

                    {/* Email */}

                    <TextField
                      value={userEmail}
                      onChange={setUserEmail}
                      name="userEmail"
                      type="email"
                      isRequired
                    >

                      <Label>
                        Email Address
                      </Label>

                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        className="rounded-2xl"
                      />

                    </TextField>

                    {/* Confirm Button */}

                    <Button
                      type="submit"
                      color="primary"
                      disabled={loading}
                      className="w-full rounded-full font-bold"
                    >
                      {loading
                        ? "Booking..."
                        : "Confirm Booking"}
                    </Button>

                  </form>

                </Surface>

              </Modal.Body>

              <Modal.Footer>

                <Button
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>

              </Modal.Footer>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default BookingButton;