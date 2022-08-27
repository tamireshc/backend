const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
const msg = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

const checkWatcheAtAndRate = (req, res, next) => {
    const { talk } = req.body;
    if (!regex.test(talk.watchedAt)) {
        return res.status(400).json({ message: msg });
    } if (talk.rate > 6 || talk.rate < 1) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    } if (talk.rate === 0) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

module.exports = checkWatcheAtAndRate;