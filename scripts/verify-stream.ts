
async function verifyStream() {
  console.log('Starting verification...');

  try {
    // Retry connection loop
    let response;
    for (let i = 0; i < 10; i++) {
        try {
            response = await fetch('http://localhost:3000/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: 'A simple button',
                    currentRegistry: 'shadcn'
                })
            });
            break;
        } catch (e) {
            console.log('Waiting for server...');
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    if (!response) throw new Error('Could not connect to server');
    if (!response.body) throw new Error('No body');

    // Node's fetch body is a ReadableStream (web standard)
    // We can iterate it
    // @ts-ignore
    for await (const chunk of response.body) {
        // chunk is Buffer in Node? Or Uint8Array.
        const text = new TextDecoder().decode(chunk);
        console.log('Chunk:', text);
    }

    console.log('Stream finished.');
  } catch (e) {
    console.error('Verification failed:', e);
    process.exit(1);
  }
}

verifyStream();
