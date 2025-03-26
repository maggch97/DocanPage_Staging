export default {
  async fetch(request) {
    const send_request = new Request('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'maggch@outlook.com', name: 'Recipient Name' }],
          },
        ],
        from: {
          email: 'sender@example.com',
          name: 'Sender Name',
        },
        subject: 'Test Email from Cloudflare Worker',
        content: [
          {
            type: 'text/plain',
            value: 'This is a test email sent from a Cloudflare Worker using MailChannels.',
          },
        ],
      }),
    });

    const response = await fetch(send_request);
    return new Response('Email sent!', {
      status: response.status,
      statusText: response.statusText,
    });
  },
};
