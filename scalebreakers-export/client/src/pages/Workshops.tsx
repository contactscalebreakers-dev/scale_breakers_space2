import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Calendar, MapPin, Users, Loader } from "lucide-react";
import { Link } from "wouter";

export default function Workshops() {
  const { data: workshops, isLoading } = trpc.workshops.list.useQuery();
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    quantity: "1",
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log("Submitting ticket:", ticketForm);
    setTicketForm({ name: "", email: "", quantity: "1" });
    setSelectedWorkshop(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Creative Workshops</h1>
          <p className="text-lg text-gray-600">
            Join our fortnightly creative workshops and learn from experienced artists.
          </p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : workshops && workshops.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map((workshop) => (
                <div key={workshop.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  {workshop.imageUrl && (
                    <img
                      src={workshop.imageUrl}
                      alt={workshop.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
                    {workshop.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">{workshop.description}</p>
                    )}
                    
                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                      {workshop.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(workshop.date).toLocaleDateString()}
                          {workshop.time && ` at ${workshop.time}`}
                        </div>
                      )}
                      {workshop.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {workshop.location}
                        </div>
                      )}
                      {workshop.capacity && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Capacity: {workshop.capacity}
                        </div>
                      )}
                      {workshop.price && (
                        <div className="text-lg font-bold text-black">
                          ${workshop.price}
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setSelectedWorkshop(workshop.id)}
                    >
                      Get Tickets
                    </Button>

                    {workshop.qrCode && (
                      <div className="mt-4 text-center">
                        <img
                          src={workshop.qrCode}
                          alt="QR Code"
                          className="w-24 h-24 mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No workshops scheduled yet.</p>
              <p className="text-gray-500">Check back soon for upcoming workshops!</p>
            </div>
          )}
        </div>
      </section>

      {/* Ticket Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Purchase Tickets</h2>
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={ticketForm.name}
                  onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={ticketForm.email}
                  onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <select
                  value={ticketForm.quantity}
                  onChange={(e) => setTicketForm({ ...ticketForm, quantity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} ticket{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedWorkshop(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Purchase
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

