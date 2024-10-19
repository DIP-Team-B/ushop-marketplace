import { NextResponse } from 'next/server';
import { createConnection } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { withSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const connection = await createConnection();

    const query = `SELECT Password, Role FROM account_table WHERE Email = ?`;
    const [rows] = await connection.execute(query, [email]);
    
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' });
    }

    return NextResponse.json({ success: true, role: user.Role, id: user.id});
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
