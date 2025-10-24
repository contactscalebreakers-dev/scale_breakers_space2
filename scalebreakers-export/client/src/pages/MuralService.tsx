import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";

export default function MuralService() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    wallSize: "",
    wallCondition: "",
    theme: "",
    inspiration: "",
    timeline: "",
    budget: "",
    additionalNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const muralMutation = trpc.muralRequests.submit.useMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await muralMutation.mutateAsync(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        wallSize: "",
        wallCondition: "",
        theme: "",
        inspiration: "",
        timeline: "",
        budget: "",
        additionalNotes: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error: any) {
      setError(error?.message || "Failed to submit mural request. Please try again.");
      console.error("Failed to submit mural request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <GlitchTitle as="h1" className="text-4xl md:text-6xl font-bold mb-4 text-white">
                Custom Mural Service
              </GlitchTitle>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Transform vandalized walls into unique artworks that customers respect.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span>Stops repeat tagging and vandalism</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span>Boosts business image and curb appeal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span>Creates a landmark customers notice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span>Custom designs for your unique space</span>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              <img src="/commission-flyer.png" alt="Commission Flyer" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <GlitchTitle className="text-3xl font-bold text-center mb-12">How It Works</GlitchTitle>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-black transition">
              <div className="text-4xl font-bold text-black mb-4">01</div>
              <GlitchTitle as="h3" className="text-xl font-bold mb-3">Consultation</GlitchTitle>
              <p className="text-gray-600">
                We start with a detailed consultation to understand your vision, space requirements, 
                and artistic preferences. Share your ideas, inspiration, and any references.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-black transition">
              <div className="text-4xl font-bold text-black mb-4">02</div>
              <GlitchTitle as="h3" className="text-xl font-bold mb-3">Design & Quote</GlitchTitle>
              <p className="text-gray-600">
                Our artists create custom design concepts tailored to your space. We provide detailed 
                mockups, a comprehensive quote, timeline estimate, and answer all your questions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-black transition">
              <div className="text-4xl font-bold text-black mb-4">03</div>
              <GlitchTitle as="h3" className="text-xl font-bold mb-3">Execution & Delivery</GlitchTitle>
              <p className="text-gray-600">
                Once approved, we bring your mural to life with professional-grade materials and 
                techniques. We handle all preparation and deliver a stunning final result.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mural Request Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 md:p-12">
            <GlitchTitle className="text-4xl font-bold mb-2">Request Your Custom Mural</GlitchTitle>
            <p className="text-gray-600 mb-8">
              Fill out the form below with as much detail as possible. The more information you provide, 
              the better we can understand your vision and create the perfect design for your space.
            </p>

            {submitted && (
              <div className="mb-8 p-6 bg-green-50 border-2 border-green-300 rounded-lg flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-900 font-bold text-lg mb-1">
                    Thank you! Your mural request has been submitted.
                  </p>
                  <p className="text-green-800">
                    We've received your request and will review it carefully. You'll hear from us within 
                    2-3 business days with design concepts and a detailed quote.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-8 p-6 bg-red-50 border-2 border-red-300 rounded-lg flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900 font-bold">Error</p>
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div>
                <GlitchTitle as="h3" className="text-2xl font-bold mb-6">Contact Information</GlitchTitle>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Location / City
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Sydney, Australia"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              {/* Wall Details */}
              <div>
                <GlitchTitle as="h3" className="text-2xl font-bold mb-6">Wall Details</GlitchTitle>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Wall Size / Dimensions
                    </label>
                    <input
                      type="text"
                      name="wallSize"
                      value={formData.wallSize}
                      onChange={handleChange}
                      placeholder="e.g., 10ft wide x 8ft tall"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                    />
                    <p className="text-xs text-gray-500 mt-2">Provide width and height measurements</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Wall Condition
                    </label>
                    <select
                      name="wallCondition"
                      value={formData.wallCondition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                    >
                      <option value="">Select wall condition</option>
                      <option value="new">New / Freshly Painted</option>
                      <option value="good">Good Condition</option>
                      <option value="fair">Fair Condition (Minor repairs needed)</option>
                      <option value="needs-prep">Needs Preparation / Cleaning</option>
                      <option value="textured">Textured / Uneven Surface</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Design & Vision */}
              <div>
                <GlitchTitle as="h3" className="text-2xl font-bold mb-6">Design & Vision</GlitchTitle>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Theme / Concept / Style
                    </label>
                    <input
                      type="text"
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                      placeholder="e.g., Urban landscape, Abstract geometric, Nature-inspired, Graffiti art, Minimalist"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Inspiration, References & Details
                    </label>
                    <textarea
                      name="inspiration"
                      value={formData.inspiration}
                      onChange={handleChange}
                      placeholder="Describe your inspiration, style preferences, colors you love, mood/atmosphere, specific elements you want included, artists or styles you admire, etc. The more detail the better!"
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">You can also mention if you'd like to share reference images via email after submission</p>
                  </div>
                </div>
              </div>

              {/* Timeline & Budget */}
              <div>
                <GlitchTitle as="h3" className="text-2xl font-bold mb-6">Timeline & Budget</GlitchTitle>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Desired Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP (1-2 weeks)</option>
                      <option value="1month">1 Month</option>
                      <option value="2-3months">2-3 Months</option>
                      <option value="3-6months">3-6 Months</option>
                      <option value="flexible">Flexible / No deadline</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                    >
                      <option value="">Select budget range</option>
                      <option value="500-1000">$500 - $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000+">$10,000+</option>
                      <option value="not-sure">Not sure / Open to discussion</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Additional Notes & Questions
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Any other information you'd like us to know? Special requests? Questions about the process? Let us know!"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={muralMutation.isPending}
                >
                  {muralMutation.isPending ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    "Submit Mural Request"
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                We'll review your request and get back to you within 2-3 business days
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <GlitchTitle className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</GlitchTitle>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-lg mb-2">How long does a mural project typically take?</h4>
              <p className="text-gray-600">
                Timeline varies based on size, complexity, and wall condition. Small murals (under 100 sq ft) 
                typically take 2-5 days, while larger projects can take 2-4 weeks. We'll provide a detailed 
                timeline in your quote.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-lg mb-2">Do you provide design mockups?</h4>
              <p className="text-gray-600">
                Yes! We create detailed digital mockups showing how the mural will look on your wall. 
                You can request revisions until you're completely satisfied with the design.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-lg mb-2">What if I don't have a specific design in mind?</h4>
              <p className="text-gray-600">
                No problem! Share your style preferences, colors, mood, and any inspiration. Our artists 
                will create original designs based on your vision and the space.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-lg mb-2">Can you work with existing murals or cover-ups?</h4>
              <p className="text-gray-600">
                Yes, we can! We assess wall condition and provide recommendations. Some walls may need 
                preparation work, which we'll include in the quote.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

