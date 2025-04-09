import {
  BookCategory, BookCoverType,
   BookLanguage,
   ClothingColor,
   ClothingSize,
  ClothingType, ProductAge, ProductCollection,
  ProductGender, ProductStatus, ToyColor, ToySize, ToyType
} from "./../libs/enums/product.enum";
import mongoose, { Schema } from "mongoose";



const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PAUSE,
    },
    productCollection: {
      type: String,
      enum: ProductCollection,
      default: ProductCollection.KIDS_TOYS,
    },

    productGender: {
      type: String,
      enum: ProductGender,
      required: false,
    },

    productAgeRange: {
      type: String,
      enum: ProductAge,
      required: false,
    },

    productToyType: {
      type: String,
      enum: ToyType,
      required: false,
    },

    productToySize: {
      type: String,
      enum: ToySize,
      required: false,
    },

    productToyColor: {
      type: String,
      enum: ToyColor,
      required: false,
    },

    productClothingType: {
      type: String,
      enum: ClothingType,
      required: false,
    },

    productClothingSize: {
      type: String,
      enum: ClothingSize,
      required: false,
    },

    productClothingColor: {
      type: String,
      enum: ClothingColor,
      required: false,
    },

    productBookType: {
      type: String,
      enum: BookCategory,
      required: false,
    },

    productBookLanguage: {
      type: String,
      enum: BookLanguage,
      required: false,
    },

    productBookCoverType: {
      type: String,
      enum: BookCoverType,
      required: false,
    },

    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productLeftCount: {
      type: Number,
      required: true,
    },

    productDesc: {
      type: String,
      required: true,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } //updatedAt, createdAt
);
productSchema.index(
  { productName: 1, productCollection: 1 },
  { unique: true }
);
export default mongoose.model("Product", productSchema);
