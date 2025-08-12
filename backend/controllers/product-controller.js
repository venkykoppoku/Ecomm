export const getAllProducts = (req, res) => {
  return res.status(200).json({
    message: "All products",
  });
};
