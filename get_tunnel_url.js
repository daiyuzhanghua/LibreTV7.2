import localtunnel from 'localtunnel';

// Try multiple localtunnel servers
const servers = [
  'https://localtunnel.me',
  'https://tunnel.dev',
  'https://loca.lt',
];

async function tryTunnel(serverUrl) {
  console.log(`Trying ${serverUrl}...`);
  try {
    const tunnel = await localtunnel({ port: 8080, host: serverUrl });
    console.log('TUNNEL_URL:', tunnel.url);
    tunnel.on('error', err => {
      console.log('tunnel error:', err.message);
      process.exit(0);
    });
    return true;
  } catch (err) {
    console.log(`Failed: ${err.message}`);
    return false;
  }
}

for (const server of servers) {
  const ok = await tryTunnel(server);
  if (ok) break;
}
