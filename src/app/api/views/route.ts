import { type NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

function getClientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;

  return null;
}

function getSiteFromHost(req: NextRequest): string | null {
  const host = req.headers.get('host');
  if (!host) return null;
  return host.replace(/^www\./, '');
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get('user-agent');
  const site = getSiteFromHost(req);

  if (!ip || !userAgent || !site) {
    return NextResponse.json(
      { success: false, error: 'Missing required headers (ip, user-agent, or host)' },
      { status: 400 },
    );
  }

  try {
    const client = await pool.connect();

    await client.query(
      `INSERT INTO visits (site, ip, user_agent) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (site, ip) DO NOTHING`,
      [site, ip, userAgent],
    );

    client.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error while registering visit:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const site = getSiteFromHost(req);

  if (!site) {
    return NextResponse.json({ success: false, error: 'Missing host header' }, { status: 400 });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT COUNT(*)::int AS total FROM visits WHERE site = $1`, [
      site,
    ]);
    client.release();

    return NextResponse.json({ total: result.rows[0].total });
  } catch (error) {
    console.error('Error while fetching visits:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
