import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jane Doe",
    feedback: "This product changed my life! The best investment I've made.",
    rating: 5,
  },
  {
    name: "John Smith",
    feedback: "Amazing quality and fantastic support. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    feedback: "A solid choice for anyone looking for reliability and style.",
    rating: 4,
  },
];

const Homepage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-10">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What Our Customers Say
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <Card className="bg-gray-800 text-white shadow-lg p-6 rounded-2xl">
              <CardContent>
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg italic">"{testimonial.feedback}"</p>
                <h3 className="mt-4 font-semibold text-xl">- {testimonial.name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
