import React from 'react'

const Tabfive = ({slug}) => {
  return (
    <div className="space-y-4">
    <h2 className="text-3xl font-bold">Request Testimonials</h2>
    <p className="text-gray-400">
      Share this link with your clients or customers to request testimonials
    </p>

    <div className="bg-[#2e2e2e] p-4 rounded-lg flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-400 mb-1">On our hosted page</p>
        <a
          href={`http://localhost:5173/products/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          http://localhost:5173/products/{slug}
        </a>
      </div>
    </div>
  </div>
  )
}

export default Tabfive
