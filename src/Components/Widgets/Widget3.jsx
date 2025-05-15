import React from 'react'

const testimonials=[{
  name:"John Doe",
  testimonial:"This is a great product!",
  image:"https://via.placeholder.com/150"
},
{
  name:"Jane Smith",
  testimonial:"I love using this service!",
  image:"https://via.placeholder.com/150"
},
{
  name:"Bob Johnson",
  testimonial:"Highly recommend to everyone!",
  image:"https://via.placeholder.com/150"
}]

const Widget3= () => {
  return (
    // display fixed testimonails
   <div>
    <h3>Masonry-Slider</h3>
    <div>
      {
        testimonials.map((testimonial,index)=>(
          <div  key={index} className="bg-gray-100 p-4 rounded shadow-sm">
            <div  className="flex items-center gap-4 mb-2">
              <img src={testimonial.image} alt={testimonial.name} 
              className='w-10 h-10 rounded-full mr-2'
              />
              <span className='text-sm font-semibold'>{testimonial.name}</span>
            </div>
            <p className="text-sm text-gray-700 italic">{testimonial.testimonial}</p>
          </div>
        ))
      }
    </div>
   </div>
  )
}

export default Widget3
