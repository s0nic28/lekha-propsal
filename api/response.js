export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { answer } = req.body;

  const webhook = "https://discord.com/api/webhooks/1522964231769817099/V9wfmxQWEzTxkZplhyWVxu2Wp-3KtVypEIm1FWCtgv3bKjdRi8RIWJvC8sp15MEnaiZG";

  try {
    await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "💜 Proposal Response",
            color: answer === "yes" ? 0x57F287 : 0xED4245,
            fields: [
              {
                name: "Answer",
                value: answer.toUpperCase(),
                inline: true
              },
              {
                name: "Time",
                value: new Date().toLocaleString(),
                inline: true
              },
              {
                name: "User Agent",
                value: req.headers["user-agent"] || "Unknown"
              }
            ]
          }
        ]
      })
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
