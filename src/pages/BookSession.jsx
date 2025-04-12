import React, { useState, useEffect } from "react";

const mentors = [
  {
    id: 1,
    name: "Anjali Sharma",
    subject: "Pottery Basics",
    slots: ["10:00 AM", "2:00 PM", "4:30 PM"]
  },
  {
    id: 2,
    name: "Ravi Mehta",
    subject: "Wood Carving",
    slots: ["11:30 AM", "1:00 PM", "5:00 PM"]
  },
  {
    id: 3,
    name: "Meera Jain",
    subject: "Embroidery",
    slots: ["9:00 AM", "12:00 PM", "3:00 PM"]
  }
];

const BookSession = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [bookings, setBookings] = useState([]);

  // Load previous bookings on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const handleBooking = () => {
    if (selectedMentor && selectedSlot) {
      const newBooking = {
        mentorName: selectedMentor.name,
        subject: selectedMentor.subject,
        slot: selectedSlot,
        timestamp: new Date().toLocaleString()
      };

      const updatedBookings = [...bookings, newBooking];
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setBookings(updatedBookings);

      setConfirmation(`✅ Session booked with ${selectedMentor.name} at ${selectedSlot}`);
      setSelectedMentor(null);
      setSelectedSlot("");
    } else {
      setConfirmation("⚠️ Please select a mentor and time slot.");
    }
  };

  return (
    <div className="from-blue-100 to-indigo-200 bg-gradient-to-br min-h-screen font-sans text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">📅 Book a Session with Mentor</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className={`border p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer ${
                selectedMentor?.id === mentor.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-300 bg-white"
              }`}
              onClick={() => {
                setSelectedMentor(mentor);
                setSelectedSlot("");
                setConfirmation("");
              }}
            >
              <h3 className="text-xl font-semibold text-indigo-700">{mentor.name}</h3>
              <p className="text-gray-600 mb-2">Subject: {mentor.subject}</p>
              <div>
                <p className="font-medium">Available Slots:</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {mentor.slots.map((slot, idx) => (
                    <li
                      key={idx}
                      className={`px-4 py-2 rounded-lg border text-sm ${
                        selectedMentor?.id === mentor.id && selectedSlot === slot
                          ? "bg-indigo-500 text-white"
                          : "hover:bg-indigo-100 bg-gray-50"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSlot(slot);
                        setConfirmation("");
                      }}
                    >
                      {slot}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleBooking}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300"
        >
          ✅ Confirm Booking
        </button>

        {confirmation && (
          <div className="mt-4 text-lg font-medium text-green-700 bg-green-100 px-4 py-2 rounded shadow-sm">
            {confirmation}
          </div>
        )}

        {/* Booking History */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">You have not booked any sessions yet.</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((b, idx) => (
                <li
                  key={idx}
                  className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white"
                >
                  <p className="font-semibold text-indigo-700">Mentor: {b.mentorName}</p>
                  <p>Subject: {b.subject}</p>
                  <p>Slot: {b.slot}</p>
                  <p className="text-sm text-gray-500">📅 Booked on: {b.timestamp}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSession;
