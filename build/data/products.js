"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products = [
    {
        name: "Pulpo común para aficionados",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/pulpo.jpg", // '/images/airpods.jpg
        description: "Pulpo común para aficionados, ideal para acuarios pequeños y medianos, fácil de cuidar y alimentar.",
        brand: "Pulpos",
        category: "invertebrados",
        price: 89.99,
        countInStock: 10,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Camarón fantasma",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/ghostShrimp.jpg", // '/images/phone.jpg
        description: "Camarón fantasma, es un crustáceo pequeño y fácil de cuidar, ideal para acuarios pequeños y medianos. Muy buen limpiador de acuarios.",
        brand: "Invertebrados",
        category: "invertebrados",
        price: 599.99,
        countInStock: 7,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Dorado",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/goldenFish.jpg", // '/images/camera.jpg
        description: "Muy popular en acuarios, el pez dorado es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "goldFish",
        category: "Peces",
        price: 929.99,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Guppy",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/guppyFish.jpg", // '/images/playstation.jpg
        description: "El pez guppy es ideal para personas que se inician en el mundo de los acuarios, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Guppy",
        category: "Peces",
        price: 399.99,
        countInStock: 12,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Caracol manzana",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/appleSnail.jpg", // '/images/mouse.jpg
        description: "El caracol manzana es un molusco de agua dulce, se alimenta de algas y restos de comida, se recomienda tener un acuario con tapa ya que pueden salir del agua.",
        brand: "AppleSnail",
        category: "invertebrados",
        price: 49.99,
        countInStock: 12,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Betta",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/bettaFish.jpg", // '/images/alexa.jpg
        description: "El pez betta es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Betta",
        category: "Especiales",
        price: 29.99,
        countInStock: 36,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Disco",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/discusFish.jpg", // '/images/phone.jpg
        description: "El pez disco es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios grandes.",
        brand: "Discus",
        category: "Peces",
        price: 199.99,
        countInStock: 6,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Molly",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/mollyFish.jpg", // '/images/playstation.jpg
        description: "El pez molly es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Molly",
        category: "Peces",
        price: 399.99,
        countInStock: 12,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Neón",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/neonFish.jpg", // '/images/mouse.jpg
        description: "El pez neón es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Neón",
        category: "Peces",
        price: 49.99,
        countInStock: 24,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Platy",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/platyFish.jpg", // '/images/alexa.jpg
        description: "El pez platy es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Platy",
        category: "Peces",
        price: 29.99,
        countInStock: 18,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Tetra",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/tetraFish.jpg", // '/images/phone.jpg
        description: "El pez tetra es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Tetra",
        category: "Peces",
        price: 199.99,
        countInStock: 10,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Cíclido",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/cichlidFish.jpeg", // '/images/playstation.jpg
        description: "El pez cíclido es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Cíclido",
        category: "Peces",
        price: 399.99,
        countInStock: 20,
        rating: 0,
        numReviews: 0,
    },
    {
        name: "Pez Ángel",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/angelFish.jpg", // '/images/mouse.jpg
        description: "El pez ángel es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Ángel",
        category: "Peces",
        price: 49.99,
        countInStock: 20,
        rating: 3.5,
        numReviews: 0,
    },
    {
        name: "Pez Gourami",
        image: "https://proshop-gt.s3.amazonaws.com/public/products/gouramiFish.jpg", // '/images/alexa.jpg
        description: "El pez gourami es un pez de agua dulce, fácil de cuidar y alimentar. Ideal para acuarios pequeños y medianos.",
        brand: "Gourami",
        category: "Peces",
        price: 29.99,
        countInStock: 20,
        rating: 0,
        numReviews: 0,
    },
];
exports.default = products;
