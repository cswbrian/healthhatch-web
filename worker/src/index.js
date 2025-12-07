/**
 * Cloudflare Worker for Decap CMS GitHub OAuth Proxy
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // 1. Redirect to GitHub for Authorization
    if (url.pathname === '/auth') {
      const clientId = env.GITHUB_CLIENT_ID;
      // Default to the worker's own URL/callback if not provided, but Decap usually provides none,
      // so we use the env var or construct it.
      const redirectUri = env.REDIRECT_URI || `${url.origin}/callback`;
      const scope = url.searchParams.get('scope') || 'repo';
      const state = crypto.randomUUID(); // Good practice to have state
      
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
      
      return Response.redirect(authUrl, 302);
    }

    // 2. Handle Callback from GitHub
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      
      if (!code) {
        return new Response('Missing authorization code', { status: 400 });
      }

      // Exchange code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Cloudflare-Worker-Decap-CMS'
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code: code,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.error) {
        return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, { 
          status: 400,
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      // 3. Return the standard script to notify Decap CMS
      const token = tokenData.access_token;
      const provider = 'github';
      
      // This strict format "authorization:provider:success:json" is what Decap CMS expects
      const message = `authorization:${provider}:success:${JSON.stringify({ token, provider })}`;

      const html = `
        <!DOCTYPE html>
        <html>
        <body>
        <script>
          const message = '${message}';
          // Send message to the main window (the CMS)
          window.opener.postMessage(message, '*');
          // Close this popup after a short delay
          setTimeout(() => {
            window.close();
          }, 100);
        </script>
        </body>
        </html>
      `;
      
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
