const express = require("express");

const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require(
  "./brand.controller"
);

const router =
express.Router();

router.post(
  "/add",
  addBrand
);

router.get(
  "/getall",
  getBrands
);

router.put(
  "/:id",
  updateBrand
);

router.delete(
  "/:id",
  deleteBrand
);

module.exports = router;