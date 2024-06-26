import { sql } from '@vercel/postgres';
import {
  User,
  Revenue,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  noStore();

  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchCardData(department: string) {
  noStore();
  try {
    const resolvedReportsCountPromise = sql`SELECT COUNT(*) FROM reports where reports.status = 'resolved' AND reports.department = ${department}`;
    const pendingReportsCountPromise = sql`SELECT COUNT(*) FROM reports where reports.status = 'pending' AND reports.department = ${department}`;
    const reportsCountPromise = sql`SELECT COUNT(*) FROM reports WHERE reports.department = ${department}`;
    const personnelCountPromise = sql`SELECT COUNT(*) FROM users WHERE users.department = ${department}`;
    const data = await Promise.all([
      resolvedReportsCountPromise,
      pendingReportsCountPromise,
      reportsCountPromise,
      personnelCountPromise,
    ]);

    const totalResolvedReports = data[0].rows[0].count ?? '0';
    const totalPendingReports = data[1].rows[0].count ?? '0';
    const totalReports = data[2].rows[0].count ?? '0';
    const totalPersonnels = data[3].rows[0].count ?? '0';
    

    return {
      totalResolvedReports,
      totalPendingReports,
      totalReports,
      totalPersonnels,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchFilteredAnnouncements(
  department: string,
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const announcements = await sql`
      SELECT
        announcements.id,
        announcements.subject,
        announcements.description,
        announcements.date,
        users.firstName,
        users.email,
        users.department,
        users.image_url
      FROM announcements
      JOIN users ON announcements.personnel_id = users.id
      WHERE
        users.department = ${department} AND
        (users.firstName ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        users.department ILIKE ${`%${query}%`} OR
        announcements.subject ILIKE ${`%${query}%`} OR
        announcements.description ILIKE ${`%${query}%`})
      ORDER BY announcements.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return announcements.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch announcements.');
  }
}

export async function fetchAnnouncementById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        announcements.id,
        announcements.personnel_id,
        announcements.subject,
        announcements.description
      FROM announcements
      WHERE announcements.id = ${id};
    `;

    const announcement = data.rows.map((announcement) => ({
      ...announcement,
    }));

    return announcement[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch announcement.');
  }
}

export async function fetchAnnouncementsPages(department: string, query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM announcements
    JOIN users ON announcements.personnel_id = users.id
    WHERE
      users.department = ${department} AND
      (users.firstName ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      announcements.subject ILIKE ${`%${query}%`} OR
      announcements.description ILIKE ${`%${query}%`})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of announcements.');
  }
}

export async function fetchFilteredReports(department: string, query: string, 
  currentPage: number, reportStatus: string) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql`
		SELECT
		  reports.id,
		  reports.name,
		  reports.contact_number,
		  reports.department,
		  reports.what,
		  reports.when,
		  reports.where,
		  reports.status,
		  reports.date
		FROM reports
		WHERE
      reports.department = ${department} AND
      reports.status = ${reportStatus} AND
      (reports.name ILIKE ${`%${query}%`} OR
      reports.contact_number ILIKE ${`%${query}%`} OR
      reports.what ILIKE ${`%${query}%`} OR
      reports.when ILIKE ${`%${query}%`} OR
      reports.where ILIKE ${`%${query}%`} OR
      reports.department ILIKE ${`%${query}%`})
		ORDER BY reports.date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data?.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch reports table.');
  }
}

export async function fetchReportsPages(department: string, query: string, reportStatus: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM reports
    WHERE
      reports.department = ${department} AND
      reports.status = ${reportStatus} AND
      (reports.name ILIKE ${`%${query}%`} OR
      reports.contact_number ILIKE ${`%${query}%`} OR
      reports.what ILIKE ${`%${query}%`} OR
      reports.when ILIKE ${`%${query}%`} OR
      reports.where ILIKE ${`%${query}%`})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reports.');
  }
}

export async function fetchReportById(id: string) {
  noStore();
  try {
    const data = await sql`
      SELECT
        reports.id,
        reports.name,
        reports.contact_number,
        reports.department,
        reports.what,
        reports.where,
        reports.when,
        reports.status
      FROM reports
      WHERE reports.id = ${id};
    `;

    const report = data.rows.map((item) => ({
      ...item,
    }));

    return report[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch report.');
  }
}

export async function fetchLatestReports(department: string) {
  noStore();
  try {
    const data = await sql`
      SELECT reports.id, reports.name, reports.contact_number, reports.department, reports.what, reports.where, reports.when, reports.status
      FROM reports
      WHERE reports.department = ${department}
      ORDER BY reports.date DESC
      LIMIT 5`;
    const latestReports = data.rows.map((report) => ({
      ...report,
    }));
    return latestReports;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest reports.');
  }
}
