import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { createUser, authenticateUser } from "../models/users.js";

const userValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be between 6 and 100 characters"),
];

const showUserRegistrationForm = (req, res) => {
  res.render("register", { title: "Register" });
};

const processUserRegistrationForm = async (req, res) => {
  const { name, email, password } = req.body ?? {};
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    return res.redirect("/register");
  }

  try {
    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the user in the database
    await createUser(name, email, passwordHash);

    // Redirect to the home page after successful registration
    req.flash("success", "Registration successful! Please log in.");
    res.redirect("/");
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    logger.error(error.stack);
    req.flash(
      "error",
      "An error occurred during registration. Please try again.",
    );
    res.redirect("/register");
  }
};

const showLoginForm = (req, res) => {
  const title = "User Login";
  res.render("login", { title });
};

const processLoginForm = async (req, res) => {
  const { email, password } = req.body || {};

  try {
    const user = await authenticateUser(email, password);

    if (user) {
      req.session.user = user;
      req.flash("success", "Login successful!");

      if (res.locals.NODE_ENV === "development") {
        logger.info("User logged in:", user);
      }

      return res.redirect("/dashboard");
    } else {
      req.flash("error", "Invalid email or password. Please try again.");
      return res.redirect("/login");
    }
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    logger.error(error.stack);
    req.flash("error", "An error occurred during login. Please try again.");
    return res.redirect("/login");
  }
};

const processLogout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }
  req.flash("success", "Logout successful!");
  res.redirect("/login");
};

const requireLogin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    req.flash("error", "You must be logged in to access that page.");
    return res.redirect("/login");
  }
  next();
};

const requireRole = (role) => (req, res, next) => {
  // Check if user is logged in first
  if (!req.session?.user) {
    req.flash("error", "You must be logged in to access this page.");
    return res.redirect("/login");
  }

  // Check if user's role matches the required role
  if (req.session.user.role_name !== role) {
    req.flash("error", "You do not have permission to access this page.");
    return res.redirect("/");
  }

  // User has required role, continue
  next();
};

const showDashboard = (req, res) => {
  const user = req.session.user;
  res.render("dashboard", {
    title: "Dashboard",
    name: user.name,
    email: user.email,
  });
};

export {
  showUserRegistrationForm,
  processUserRegistrationForm,
  userValidation,
  processLoginForm,
  processLogout,
  showLoginForm,
  requireLogin,
  requireRole,
  showDashboard,
};
