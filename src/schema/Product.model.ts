import {
  BookCategory, BookCoverType,
  BookLanguage, ClothingColorForBoys,
  ClothingColorForGirls, ClothingSize,
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
      required: true,
    },

    ProductAge: {
      type: Number,
      enum: ProductAge,
      required: true,
    },

    toyType: {
      type: String,
      enum: ToyType,
      required: true,
    },

    toySize: {
      type: String,
      enum: ToySize,
      required: true,
    },

    toyColor: {
      type: String,
      enum: ToyColor,
      required: true,
    },

    clothingType: {
      type: String,
      enum: ClothingType,
      required: true,
    },

    clothingSize: {
      type: String,
      enum: ClothingSize,
      required: true,
    },

    clothingColorForBoys: {
      type: String,
      enum: ClothingColorForBoys,
      required: true,
    },

    clothingColorForGirls: {
      type: String,
      enum: ClothingColorForGirls,
      required: true,
    },

    bookCategory: {
      type: String,
      enum: BookCategory,
      required: true,
    },

    bookLanguage: {
      type: String,
      enum: BookLanguage,
      required: true,
    },

    bookCoverType: {
      type: String,
      enum: BookCoverType,
      required: true,
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
  { productName: 1, productSize: 1, productCollection: 1 },
  { unique: true }
);
export default mongoose.model("Product", productSchema);
