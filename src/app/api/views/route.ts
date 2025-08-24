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

function isDbError(err: unknown): err is { code: string } {
  return typeof err === 'object' && err !== null && 'code' in err;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const site = getSiteFromHost(req);

    if (!site) {
      return NextResponse.json({ success: false, error: 'Missing host header' }, { status: 400 });
    }

    if (body.action === 'count') {
      const client = await pool.connect();
      try {
        const res = await client.query('SELECT COUNT(*) as total FROM visits WHERE site = $1', [
          site,
        ]);
        const total = res.rows[0]?.total ?? 0;
        return NextResponse.json({ success: true, total: Number(total) });
      } finally {
        client.release();
      }
    }

    const ip = getClientIp(req);
    const userAgent = req.headers.get('user-agent');

    if (!ip || !userAgent) {
      return NextResponse.json(
        { success: false, error: 'Missing required headers' },
        { status: 400 },
      );
    }

    const client = await pool.connect();
    try {
      await client.query(`INSERT INTO visits (site, ip, user_agent) VALUES ($1, $2, $3)`, [
        site,
        ip,
        userAgent,
      ]);

      const res = await client.query('SELECT COUNT(*) as total FROM visits WHERE site = $1', [
        site,
      ]);
      const total = res.rows[0]?.total ?? 0;

      return NextResponse.json({ success: true, total: Number(total) });
    } catch (err: unknown) {
      if (isDbError(err) && err.code === '23505') {
        const res = await client.query('SELECT COUNT(*) as total FROM visits WHERE site = $1', [
          site,
        ]);
        const total = res.rows[0]?.total ?? 0;
        return NextResponse.json({
          success: true,
          message: 'Visit already registered with this IP and User-Agent',
          total: Number(total),
        });
      }
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT() {
  return NextResponse.json({ success: false, error: 'PUT method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ success: false, error: 'DELETE method not allowed' }, { status: 405 });
}
