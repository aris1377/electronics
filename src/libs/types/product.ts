import { Types } from "mongoose";
import {
  BookAgeRange, BookCategory, BookCoverType,
  BookLanguage, ClothingAgeRange, ClothingColorForBoys,
  ClothingColorForGirls, ClothingGender, ClothingSize,
  ClothingType, ToyAgeRange, ToyColor, ToyGender,
  ToySize, ToyType
} from "../enums/product.enum";

// Common Product Base
export interface BaseProduct {
  _id: Types.ObjectId;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productDescription?: string;
  productViews: number;
  productImages: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Toy Product
export interface ToyProduct extends BaseProduct {
  productCategory: "toy";
  productGender: ToyGender;
  productType: ToyType;
  productAgeRange: ToyAgeRange;
  productSize: ToySize;
  productColor: ToyColor;
}

// Clothing Product
export interface ClothingProduct extends BaseProduct {
  productCategory: "clothing";
  productGender: ClothingGender;
  productType: ClothingType;
  productAgeRange: ClothingAgeRange;
  productSize: ClothingSize;
  productColor: ClothingColorForBoys | ClothingColorForGirls;
}

// Book Product
export interface BookProduct extends BaseProduct {
  productCategory: "book";
  productType: BookCategory;
  productAgeRange: BookAgeRange;
  productLanguage: BookLanguage;
  productCoverType: BookCoverType;
}

