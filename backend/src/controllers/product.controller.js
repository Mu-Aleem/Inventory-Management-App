import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";

const CreateProduct = async (req, res) => {
  console.log("🚀 ~ CreateProduct ~ req:", req);
  const { name, sku, category, quantity, price, description } = req.body;
  if (!name || !sku || !category || !quantity || !price || !description) {
    throw new ApiError(400, "Please provide all required fields");
  }

  // manage the file upload
  //   await cloudinaryconfig();

  //   let fileData = {};
  //   if (req.file) {
  //     let FileUpload;
  //     try {
  //       FileUpload = await cloudinary.uploader.upload(req.file.path, {
  //         folder: "pso image",
  //         resourse_type: "image",
  //       });
  //     } catch (error) {
  //       throw new BadApiRequestError("image could not be uploaded");
  //     }

  //     fileData = {
  //       fileName: req.file.originalname,
  //       filePath: FileUpload.secure_url,
  //       fileType: req.file.mimetype,
  //       fileSize: req.file.size,
  //     };
  //   }

  //   create the user

  const product = await Product.create({
    usreid: req.user._id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    // image: fileData,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Created Successfully"));
};

const getProduct = async (req, res) => {
  const AllProduct = await Product.find({ usreid: req.user._id }).sort(
    "-createdAt"
  );
  if (!AllProduct) {
    throw new ApiError(401, "Product Not Found");
  }

  return res.status(200).json(new ApiResponse(200, AllProduct, "All Product"));
};

const singleProduct = async (req, res) => {
  const SingleProduct = await Product.findOne({
    _id: req.params.id,
    usreid: req.user._id,
  });
  if (!SingleProduct) {
    throw new ApiError(401, "Product Not Found");
  }

  return res.status(200).json(new ApiResponse(200, SingleProduct));
};

const deleteProduct = async (req, res) => {
  const SingleProduct = await Product.findByIdAndDelete(req.params.id);
  if (!SingleProduct) {
    throw new ApiError(401, "Product Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, SingleProduct, "Product successfully deleted"));
};

const UpdateProduct = async (req, res) => {
  const { name, category, quantity, price, description } = req.body;

  const SingleProduct = await Product.findOne({
    _id: req.params.id,
    usreid: req.user._id,
  });
  if (!SingleProduct) {
    throw new ApiError(401, "Product Not Found");
  }

  const update = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      category,
      quantity,
      price,
      description,
      //   image:
      //     Object.keys(fileData).length === 0 ? SingleProduct?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, update, "Product successfully updated"));
};

export {
  CreateProduct,
  getProduct,
  deleteProduct,
  singleProduct,
  UpdateProduct,
};
