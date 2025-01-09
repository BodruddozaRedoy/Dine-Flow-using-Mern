import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PageTitle from '../Layouts/PageTitle';
import { useStore } from 'zustand';
import { authStore } from '../store/authStore';
import { Helmet } from 'react-helmet';



const GalleryPage = () => {
  const [index, setIndex] = useState(-1);
const {user} = useStore(authStore)
console.log(user);

const name = user?.name

const photos = [
  { src: 'https://static.vecteezy.com/system/resources/previews/036/804/331/non_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg', name, description: 'A classic platter of Indian delicacies with rich flavors and vibrant colors.' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKACcOj-yOSHcYhRYFEyhkSCS_BCUoobMd9g&s', name, description: 'Freshly prepared seafood with a hint of lemon and garlic.' },
  { src: 'https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_732,c_fill,g_auto/v1661347429/india-food-dal-makani/india-food-dal-makani-1120x732.jpg', name, description: 'Traditional Georgian khinkali served with a variety of sides.' },
  { src: 'https://www.shutterstock.com/image-photo/table-filled-dishes-food-set-600nw-2477073165.jpg', name, description: 'Indian comfort food with creamy curries and flavorful rice.' },
  { src: 'https://cdn.pixabay.com/photo/2022/06/07/20/52/curry-7249247_640.jpg', name, description: 'Aromatic chicken curry simmered in a blend of exotic spices.' },
  { src: 'https://www.southernliving.com/thmb/TiGXc2JsEJpsioS_TA-LDzRFPEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/27531_ST_TENDERLOINS_13-7442687e434e4c4c95609ff0262773a2.jpg', name, description: 'Juicy steak tenderloin grilled to perfection with herb seasoning.' },
  { src: 'https://media.istockphoto.com/id/104704117/photo/restaurant-plates.jpg?s=612x612&w=0&k=20&c=MhFdN_qVgzoHov-kgFx0qWSW0nZht4lZV1zinC3Ea44=', name, description: 'Elegant fine dining dish with a fusion of modern and traditional flavors.' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKbkBmzfquTztZd7wk9zMTohXAkZVIXr0mw&s', name, description: 'A spicy bowl of ramen topped with fresh vegetables and boiled eggs.' },
  { src: 'https://www.shutterstock.com/image-photo/table-filled-dishes-food-set-600nw-2477073165.jpg', name, description: 'A family-style feast with diverse dishes for every taste.' },
  { src: 'https://www.tastingtable.com/img/gallery/20-delicious-indian-dishes-you-have-to-try-at-least-once/intro-1733153567.jpg', name, description: 'A hearty serving of biryani packed with aromatic spices and tender meat.' },
  { src: 'https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_732,c_fill,g_auto/v1661347429/india-food-dal-makani/india-food-dal-makani-1120x732.jpg', name, description: 'Creamy dal makhani slow-cooked for a rich and indulgent taste.' },
  { src: 'https://static.vecteezy.com/system/resources/previews/010/517/496/non_2x/homemade-romanian-food-with-polenta-meat-cheese-and-vegetables-delicious-corn-porridge-in-clay-dishes-mamaliga-or-polenta-a-traditional-dish-in-moldova-hungary-and-ukrainian-cuisine-photo.JPG', name, description: 'Traditional Romanian polenta served with hearty meat and cheese.' },
];




  return (
     <div>
            <Helmet title='Gallery | Dine Flow'/>
       <PageTitle pageTitle={"Gallery Section"}/>
    <div className="max-w-7xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-serif text-center mb-10 dark:text-white">Gallery Section</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {photos.map((photo, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className="relative cursor-pointer overflow-hidden rounded-lg group"
          >
            <img
              src={photo.src}
              alt={photo.name}
              className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-lg font-semibold">{photo.name}</p>
              <p className="text-sm">{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map((photo) => ({ src: photo.src }))}
      />
    </div>
     </div>
  );
};

export default GalleryPage;
