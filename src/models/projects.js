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

export { getAllProjects, getProjectsByOrganizationId };
