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
import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  userValidation,
  processLoginForm,
  processLogout,
  showLoginForm,
  requireLogin,
  requireRole,
  showDashboard,
  showUsersPage,
} from "./controllers/users.js";
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
router.get("/new-organization", requireRole("admin"), showNewOrganizationForm);

// Route to display the edit organization form
router.get(
  "/edit-organization/:id",
  requireRole("admin"),
  showEditOrganizationForm,
);

// Route to handle new organization form submission
router.post(
  "/new-organization",
  requireRole("admin"),
  organizationValidation,
  processNewOrganizationForm,
);

// Route to handle the edit organization form submission
router.post(
  "/edit-organization/:id",
  requireRole("admin"),
  organizationValidation,
  processEditOrganizationForm,
);

// Routes to handle the project page
router.get("/new-project", requireRole("admin"), showNewProjectForm);
router.post(
  "/new-project",
  requireRole("admin"),
  projectValidation,
  processNewProjectForm,
);
router.get("/edit-project/:id", requireRole("admin"), showEditProjectForm);
router.post(
  "/edit-project/:id",
  requireRole("admin"),
  projectValidation,
  processEditProjectForm,
);

// Routes to handle the assign categories to project form
router.get(
  "/assign-categories/:projectId",
  requireRole("admin"),
  showAssignCategoriesForm,
);
router.post(
  "/assign-categories/:projectId",
  requireRole("admin"),
  processAssignCategoriesForm,
);

//Routes to handle the categories page
router.get("/new-category", requireRole("admin"), showNewCategoryForm);
router.post(
  "/new-category",
  requireRole("admin"),
  categoryValidation,
  processNewCategoryForm,
);
router.get("/edit-category/:id", requireRole("admin"), showEditCategoryForm);
router.post(
  "/edit-category/:id",
  requireRole("admin"),
  categoryValidation,
  processEditCategoryForm,
);

// User registration routes
router.get("/register", showUserRegistrationForm);
router.post("/register", userValidation, processUserRegistrationForm);

// User login routes
router.get("/login", showLoginForm);
router.post("/login", processLoginForm);
router.get("/logout", processLogout);

//Dashboard
router.get("/dashboard", requireLogin, showDashboard);

//User list
router.get("/users", requireRole("admin", "/dashboard"), showUsersPage);

export default router;
