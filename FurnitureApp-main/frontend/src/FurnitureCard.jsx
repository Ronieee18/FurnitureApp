import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody, Button, Typography, IconButton } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch furniture details from your API
    const fetchFurnitures = async () => {
      try {
        const response = await axios.get('/furniture');
        console.log(response.data);
        setProducts(response.data); // Assuming response.data is an array of furniture objects
        // setFilteredFurnitures(response.data);
      } catch (error) {
        console.error('Error fetching furniture data:', error);
      }
    };
    fetchFurnitures();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-6">
        <Typography variant="h4" className="mb-2">
          You'll love to take these home
        </Typography>
        <div className="h-1 w-16 bg-red-500 mx-auto mb-4" />
      </div>
      <div className="relative w-full max-w-5xl">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <IconButton onClick={scrollLeft} color="red">
            <ChevronLeftIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <div
          className="flex overflow-x-scroll scrollbar-hide space-x-6 py-4"
          ref={scrollRef}
        >
          {products.map((product) => (
            <Card key={product.id} className="w-80 flex-shrink-0">
              <CardHeader color="gray" className="relative h-48">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h6" className="mb-2">
                  {product.name}
                </Typography>
                <Typography color="gray" className="mb-4">
                  Rent <span className="font-semibold">{product.price}</span>
                </Typography>
                <Button variant="outlined" color="red" onClick={()=>navigate(`/furnitures/${product._id}`)}>
                  See more
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <IconButton onClick={scrollRight} color="red">
            <ChevronRightIcon className="w-6 h-6" />
          </IconButton>
        </div>
      </div>
      <button onClick={() => navigate("/furnitures")} className="mt-6 text-white font-bold text-lg py-2 px-6 rounded-lg bg-gradient-to-r from-red-400 to-red-600 shadow-md hover:shadow-lg transition-shadow duration-300 hover:from-red-500 hover:to-red-700">
        View More Products
      </button>
    </div>
  );
}
