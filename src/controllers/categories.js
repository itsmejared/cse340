import { body, validationResult } from "express-validator";

import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
  createCategory,
  updateCategory,
  updateCategoryAssignments,
} from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters"),
];

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

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);

  const title = "Assign Categories to Project";

  res.render("assign-categories", {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories,
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];

  // Ensure selectedCategoryIds is an array
  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, categoryIdsArray);
  req.flash("success", "Categories updated successfully.");
  res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = async (req, res) => {
  res.render("new-category", {
    title: "Add New Category",
  });
};

const processNewCategoryForm = async (req, res) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    return res.redirect("/new-category");
  }

  const { name } = req.body;
  const categoryId = await createCategory(name);
  req.flash("success", "Category added successfully!");
  res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
  const category = await getCategoryById(req.params.id);

  res.render("edit-category", {
    title: "Edit Category",
    category,
  });
};

const processEditCategoryForm = async (req, res) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect(`/edit-category/${req.params.id}`);
  }

  const { name } = req.body;
  await updateCategory(req.params.id, name);
  req.flash("success", "Category updated successfully!");
  res.redirect(`/category/${req.params.id}`);
};

// Export any controller functions
export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
};
