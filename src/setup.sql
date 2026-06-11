-- ========================================
-- Create Table: Organizations
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Create Table: Service Project
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_project
(organization_id, title, description, location, project_date)
VALUES
(1,
'Community Playground Renovation',
'Rebuilding playground equipment and repainting recreation areas for neighborhood families.',
'Salt Lake City, UT',
'2026-06-15'),
(1,
'Affordable Housing Repair Initiative',
'Providing home repairs and accessibility improvements for low-income residents.',
'Provo, UT',
'2026-07-02'),
(1,
'School Classroom Restoration',
'Renovating damaged classrooms and improving learning spaces for elementary students.',
'Ogden, UT',
'2026-08-10'),
(1,
'Neighborhood Sidewalk Improvement',
'Installing safer sidewalks and repairing walkways in older residential areas.',
'West Valley City, UT',
'2026-09-05'),
(1,
'Community Center Expansion Project',
'Helping expand and modernize a local community center for youth programs.',
'Lehi, UT',
'2026-10-12'),
(2,
'Urban Garden Workshop',
'Teaching residents how to grow vegetables in small urban spaces.',
'Provo, UT',
'2026-06-20'),
(2,
'School Greenhouse Build',
'Constructing a greenhouse for local students to learn sustainable agriculture.',
'Orem, UT',
'2026-07-18'),
(2,
'Neighborhood Compost Training',
'Providing hands-on composting education and sustainable waste management tips.',
'Sandy, UT',
'2026-08-08'),
(2,
'Community Farmers Market',
'Hosting a local farmers market featuring organic produce and educational booths.',
'American Fork, UT',
'2026-09-14'),
(2,
'Tree Planting Volunteer Day',
'Organizing volunteers to plant trees and improve urban green spaces.',
'Draper, UT',
'2026-10-01'),
(3,
'Food Drive Distribution',
'Sorting and distributing donated food packages to local families in need.',
'Orem, UT',
'2026-06-12'),
(3,
'Senior Assistance Outreach',
'Helping senior citizens with home cleaning, errands, and companionship.',
'Spanish Fork, UT',
'2026-07-09'),
(3,
'Back-to-School Supply Giveaway',
'Distributing backpacks and school supplies to underserved students.',
'Provo, UT',
'2026-08-15'),
(3,
'Winter Clothing Donation Event',
'Collecting and distributing warm clothing for homeless shelters.',
'Salt Lake City, UT',
'2026-11-05'),
(3,
'Holiday Community Meal Service',
'Preparing and serving holiday meals for families experiencing hardship.',
'Lehi, UT',
'2026-12-18');

-- ========================================
-- Create Table: Categories
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Insert sample data: Categories
-- ========================================
INSERT INTO category (name)
VALUES
('Community Service'),
('Environmental Sustainability'),
('Education & Youth'),
('Food & Humanitarian Aid');

-- ========================================
-- Create Table: Service Projects x Category
-- ========================================
CREATE TABLE service_project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_spc_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_spc_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert sample data: Service Projects x Category
-- ========================================
INSERT INTO service_project_category (project_id, category_id)
VALUES
(1, 1),  -- Community Playground Renovation
(2, 1),  -- Affordable Housing Repair Initiative
(4, 1),  -- Neighborhood Sidewalk Improvement
(5, 1),  -- Community Center Expansion Project
(11, 1), -- Food Drive Distribution
(12, 1), -- Senior Assistance Outreach
(3, 2),  -- School Classroom Restoration
(6, 2),  -- Urban Garden Workshop
(8, 2),  -- Neighborhood Compost Training
(9, 2),  -- Community Farmers Market
(10, 2), -- Tree Planting Volunteer Day
(3, 3),  -- School Classroom Restoration
(6, 3),  -- Urban Garden Workshop
(7, 3),  -- School Greenhouse Build
(13, 3), -- Back-to-School Supply Giveaway
(15, 3), -- Holiday Community Meal Service
(9, 4),  -- Community Farmers Market
(11, 4), -- Food Drive Distribution
(14, 4), -- Winter Clothing Donation Event
(15, 4); -- Holiday Community Meal Service

-- ========================================
-- Create Table: Roles
-- ========================================
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- ========================================
-- Insert sample data: Roles
-- ========================================
INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- ========================================
-- Create Table: Users
-- ========================================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- Insert sample data: Users
-- ========================================
INSERT INTO users (name, email, password_hash, role_id) 
VALUES ('testuser', 'test@example.com', 'placeholder_hash', 1);

-- ========================================
-- Create Table: Service Project x Volunteer
-- ========================================
CREATE TABLE service_project_volunteer (
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, user_id),

    CONSTRAINT fk_spv_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_spv_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);