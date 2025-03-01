'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { FaStar } from 'react-icons/fa'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { motion } from 'framer-motion'

const testimonialsData = [
    {
        name: "John Doe",
        image: "https://cdn.pixabay.com/photo/2023/04/28/23/32/ai-generated-7957457_1280.png",
        comment: "This is an amazing product! Highly recommend.",
        rating: 5,
    },
    {
        name: "Jane Smith",
        image: "https://cdn.lucidpic.com/cdn-cgi/image/w=600,format=auto,metadata=none/66e2e5fbe0cca.png",
        comment: "I absolutely love it! The best I've ever used.",
        rating: 4,
    },
    {
        name: "Michael Lee",
        image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2023/11/14/301015.jpg",
        comment: "Good quality, but could be improved in some areas.",
        rating: 4,
    },
    {
        name: "Sarah Brown",
        image: "https://cdn.basedlabs.ai/27d772e0-9fdb-11ef-8edd-1d0dc01e4477.jpg",
        comment: "Fantastic service and support! Will buy again.",
        rating: 5,
    },
    {
        name: "Chris Johnson",
        image: "https://img.freepik.com/premium-photo/portrait-happy-young-man-ai-generated_804788-34413.jpg",
        comment: "Overall, a great experience with this product.",
        rating: 3,
    },
    {
        name: "Emily Davis",
        image: "https://static.vecteezy.com/system/resources/previews/031/726/592/large_2x/ai-generated-studio-portrait-of-handsome-indian-man-on-colour-background-photo.jpg",
        comment: "Really satisfied with my purchase. Worth the price!",
        rating: 5,
    },
    {
        name: "Emran",
        image: "https://cdn.pixabay.com/photo/2024/03/31/05/00/ai-generated-8665996_1280.jpg",
        comment: "Really satisfied with my purchase. Worth the price!",
        rating: 5,
    },
]

const Testimonials = () => {
    return (
        <div className="py-10 px-5">
            <h2 className="text-4xl font-bold text-center mb-6">Our Testimonials</h2>

            <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                <div className="md:w-1/2">
                    <img
                        src="https://www.sweetprocess.com/wp-content/uploads/2022/03/Testimonials.jpg"
                        alt="FAQ"
                        className="w-full h-[400px] sm:h-[500px] object-cover rounded-lg shadow-xl"
                    />
                </div>

                <div className="md:w-1/2 md:pl-10">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        orientation="vertical"
                        className="w-full max-w-4xl mx-auto"
                    >
                        <CarouselContent className="h-[400px]">
                            {testimonialsData.map((testimonial, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pt-4 md:basis-1/2"
                                >
                                    <motion.div
                                        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2, duration: 0.6 }}
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
                                        <p className="text-center mb-4">{testimonial.comment}</p>
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, idx) => (
                                                <FaStar
                                                    key={idx}
                                                    className={`text-yellow-500 ${idx < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
