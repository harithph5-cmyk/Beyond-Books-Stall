import type { IncomingMessage, ServerResponse } from 'http';

// In-memory persistent storage for serverless runtime
let globalLeads: any[] = [];

// Helper to read request body
function getRequestBody(req: any): Promise<any> {
  return new Promise((resolve) => {
    if (req.body) {
      resolve(req.body);
      return;
    }
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

export default async function handler(req: any, res: any) {
  // Set CORS headers so any phone browser or origin can post leads
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  try {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, leads: globalLeads }));
      return;
    }

    if (req.method === 'POST') {
      const data = await getRequestBody(req);

      if (!data || !data.fullName) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Missing lead data' }));
        return;
      }

      // Check if lead already exists to avoid duplicates
      const exists = globalLeads.some(
        (l) =>
          l.id === data.id ||
          (l.whatsappNumber === data.whatsappNumber && l.fullName === data.fullName)
      );

      if (!exists) {
        globalLeads.unshift({
          ...data,
          receivedAt: new Date().toISOString()
        });
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: true,
          count: globalLeads.length,
          lead: data
        })
      );
      return;
    }

    if (req.method === 'DELETE') {
      globalLeads = [];
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, message: 'Leads cleared' }));
      return;
    }

    res.statusCode = 405;
    res.end('Method Not Allowed');
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err?.message || 'Server Error' }));
  }
}
