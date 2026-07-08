const brandService = require(
  "./brand.service"
);


// Add Brand
const addBrand = async (
  req,
  res
) => {
  try {

    const brand =
      await brandService.createBrand(
        req.body
      );

    res.status(201).json({
      success: true,
      data: brand,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get All Brands
const getBrands = async (
  req,
  res
) => {
  try {

    const brands =
      await brandService.getAllBrands();

    res.json({
      success: true,
      data: brands,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Update
const updateBrand = async (
  req,
  res
) => {
  try {

    const brand =
      await brandService.updateBrand(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: brand,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Delete
const deleteBrand = async (
  req,
  res
) => {
  try {

    await brandService.deleteBrand(
      req.params.id
    );

    res.json({
      success: true,
      message: "Brand Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};