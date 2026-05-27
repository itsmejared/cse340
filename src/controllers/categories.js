import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
} from "../models/categories.js";

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = "Categories";

  res.render("categories", { title, categories });
};

const showCategoryDetailsPage = async (req, res, next) => {
  const { id } = req.params;

  const category = await getCategoryById(id);

  if (!category) {
    const err = new Error("Category not found.");
    err.status = 404;
    return next(err);
  }

  const projects = await getProjectsByCategoryId(id);

  res.render("category", {
    title: category.name,
    category,
    projects,
  });
};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };
