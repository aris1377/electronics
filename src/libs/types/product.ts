import { Types } from "mongoose";
import {
 BookCategory, BookCoverType,
  BookLanguage,  ClothingColor,  ClothingSize,
  ClothingType, ProductAge, ProductCollection, ProductGender, ProductStatus, ToyColor,
  ToySize, ToyType
} from "../enums/product.enum";


export interface Product {
  _id: Types.ObjectId;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productGender: ProductGender;
  productAgeRange: ProductAge;

  // Toy
  productToyType?: ToyType;
  productToyColor?: ToyColor;
  productToySize?: ToySize;

  // Clothing
  productClothingType?: ClothingType;
  productClothingSize?: ClothingSize;
  productClothingColor?: ClothingColor;

  // Book
  productBookType?: BookCategory;
  productBookLanguage?: BookLanguage;
  productBookCoverType?: BookCoverType;

  productName: string;
  productPrice: number;
  productLeftCount: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface ProductInput {
  productStatus?: ProductStatus;
  productCollection: ProductCollection;
  productGender: ProductGender;
  productAgeRange: ProductAge;

  // Toy-related (optional if not toy)
  productToyType?: ToyType;
  productToyColor?: ToyColor;
  productToySize?: ToySize;

  // Clothing-related (optional if not clothing)
  productClothingType?: ClothingType;
  productClothingSize?: ClothingSize;
  productClothingColor?: ClothingColor;

  // Book-related (optional if not book)
  productBookType?: BookCategory;
  productBookLanguage?: BookLanguage;
  productBookCoverType?: BookCoverType;

  productName: string;
  productPrice: number;
  productLeftCount: number;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}

