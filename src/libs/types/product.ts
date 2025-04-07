import { Types } from "mongoose";
import {
 BookCategory, BookCoverType,
  BookLanguage, ClothingColorForBoys,
  ClothingColorForGirls, ClothingSize,
  ClothingType, ProductAge, ProductGender, ProductStatus, ToyColor,
  ToySize, ToyType
} from "../enums/product.enum";

// Common Product Base
export interface BaseProduct {
  _id: Types.ObjectId;
  ProductStatus: ProductStatus;
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
  productGender: ProductGender;
  productType: ToyType;
  productAgeRange: ProductAge;
  productSize: ToySize;
  productColor: ToyColor;
}

// Clothing Product
export interface ClothingProduct extends BaseProduct {
  productCategory: "clothing";
  productGender: ProductGender;
  productType: ClothingType;
  productAgeRange: ProductAge;
  productSize: ClothingSize;
  productColor: ClothingColorForBoys | ClothingColorForGirls;
}

// Book Product
export interface BookProduct extends BaseProduct {
  productCategory: "book";
  productType: BookCategory;
  productAgeRange: ProductAge;
  productLanguage: BookLanguage;
  productCoverType: BookCoverType;
}

