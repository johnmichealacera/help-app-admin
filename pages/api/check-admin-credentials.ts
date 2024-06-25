import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const rawUser = await sql`SELECT * FROM users WHERE email=${email}`;
    const user = rawUser.rows[0];
    const passwordsMatch = password ? await bcrypt.compare(password, user.password) : false;

    if (passwordsMatch && user?.administrator) {
      res.status(200).json({ isAdmin: true });
    } else {
      res.status(401).json({ isAdmin: false });
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Failed to check credentials' });
  }
}
