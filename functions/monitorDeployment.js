export default {
  async fetch(request, env) {
    return await handleRequest(request, env);
  }
};

async function handleRequest(request, env) {
  const cloudflareMsg = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const runCloudFlareWorker = await fetch(
    'https://lance-nostalgia.lance-giles4562.workers.dev',
    cloudflareMsg
  );

  console.log('allBuilds', runCloudFlareWorker);

  return new Response('New build detected', { status: 200 });
}
