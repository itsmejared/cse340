import db from "./db.js";

const getAllProjects = async () => {
  const query = `
        SELECT sp.project_date, sp.title, o.name AS organization_name
        FROM service_project sp
        INNER JOIN organization o ON sp.organization_id = o.organization_id
        ORDER BY sp.project_date;
    `;

  const result = await db.query(query);

  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.project_date
        FROM service_project sp
        WHERE sp.organization_id = $1
        ORDER BY sp.project_date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT sp.project_id, sp.title, sp.description, sp.project_date,
      sp.location, sp.organization_id, o.name AS organization_name
    FROM service_project sp
    JOIN organization o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_date >= CURRENT_DATE
    ORDER BY sp.project_date ASC
    LIMIT $1;
  `;

  const queryParams = [numberOfProjects];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (serviceProjectId) => {
  const query = `
    SELECT sp.project_id, sp.title, sp.description, sp.project_date,
      sp.location, sp.organization_id, o.name AS organization_name
    FROM service_project sp
    JOIN organization o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1;
  `;

  const queryParams = [serviceProjectId];
  const result = await db.query(query, queryParams);

  return result.rows[0];
};

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
};
