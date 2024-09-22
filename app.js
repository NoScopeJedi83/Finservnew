const express = require('express');
const app = express();
app.use(express.json());

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    const file_b64 = req.body.file_b64 || '';

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    const lowercaseAlphabets = alphabets.filter(ch => ch === ch.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length ? Math.max(...lowercaseAlphabets) : null;

    const fileValid = !!file_b64;

    res.json({
        is_success: true,
        user_id: "atharv_grover",
        email: "al2980@srmist.edu.in",
        roll_number: "RA2111026030002",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid: fileValid,
        file_mime_type: "image/png",
        file_size_kb: "400"
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
