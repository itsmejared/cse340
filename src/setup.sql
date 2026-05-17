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
-- Create Table: Organizations
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