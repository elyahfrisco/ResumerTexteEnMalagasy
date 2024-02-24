const OpenAI = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

// Configuration du client OpenAI
const openai = new OpenAI({
  // enter cle gpt
  apiKey: "",
});

// Middleware pour traiter les requêtes JSON
app.use(bodyParser.json());

// Route pour résumer le texte
app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    const chat_completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Résumez ce texte en malgache, le resumé ne doit pas depasser la moitié des mots du texte initial: '${text}'`,
        },
      ],
    });

    const response_content = chat_completion.choices[0].message.content;

    res.status(200).json({ summary: response_content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors du résumé du texte." });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
