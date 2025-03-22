import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    text: "This service changed my life! Highly recommended.",
    company: "Acme Corp"
  },
  {
    name: "Jane Smith",
    text: "An incredible experience from start to finish.",
    company: "Tech Innovations"
  },
  {
    name: "Emily Johnson",
    text: "I couldn't be happier with the results!",
    company: "Creative Studio"
  }
];

export default function TestimonialLanding() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <motion.h1 
        className="text-4xl font-bold text-center my-6" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        What Our Customers Say
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="bg-white p-4 shadow-lg rounded-2xl">
              <CardContent>
                <p className="text-lg italic">"{testimonial.text}"</p>
                <p className="mt-4 font-bold">- {testimonial.name}, {testimonial.company}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-8" 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Button className="px-6 py-3 text-lg rounded-xl shadow-md">
          Get Started Today
        </Button>
      </motion.div>
    </div>
  );
}
