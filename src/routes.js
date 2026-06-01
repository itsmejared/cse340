import express from "express";

import { showHomePage } from "./controllers/index.js";
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  showEditOrganizationForm,
  processNewOrganizationForm,
  processEditOrganizationForm,
  organizationValidation,
} from "./controllers/organizations.js";
import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  projectValidation,
} from "./controllers/projects.js";
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
} from "./controllers/categories.js";
import { testErrorPage } from "./controllers/errors.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/categories", showCategoriesPage);

// Route for organization details page
router.get("/organization/:id", showOrganizationDetailsPage);

// Route for project details page
router.get("/project/:id", showProjectDetailsPage);

// Route for category details page
router.get("/category/:id", showCategoryDetailsPage);

// error-handling routes
router.get("/test-error", testErrorPage);

// Route for new organization page
router.get("/new-organization", showNewOrganizationForm);

// Route to display the edit organization form
router.get("/edit-organization/:id", showEditOrganizationForm);

// Route to handle new organization form submission
router.post(
  "/new-organization",
  organizationValidation,
  processNewOrganizationForm,
);

// Route to handle the edit organization form submission
router.post(
  "/edit-organization/:id",
  organizationValidation,
  processEditOrganizationForm,
);

// Routes to handle the project page
router.get("/new-project", showNewProjectForm);
router.post("/new-project", projectValidation, processNewProjectForm);
router.get("/edit-project/:id", showEditProjectForm);
router.post("/edit-project/:id", projectValidation, processEditProjectForm);

// Routes to handle the assign categories to project form
router.get("/assign-categories/:projectId", showAssignCategoriesForm);
router.post("/assign-categories/:projectId", processAssignCategoriesForm);

//Routes to handle the categories page
router.get("/new-category", showNewCategoryForm);
router.post("/new-category", categoryValidation, processNewCategoryForm);
router.get("/edit-category/:id", showEditCategoryForm);
router.post("/edit-category/:id", categoryValidation, processEditCategoryForm);

export default router;
