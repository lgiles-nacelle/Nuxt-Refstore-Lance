export async function onRequestGet(context) {
  // Contents of context object
  const res = await fetch(
    'https://lance-nostalgia.lance-giles4562.workers.dev'
  );
  const data = await res.json();
  const info = JSON.stringify(data, null, 2);
  return new Response(info);
}
