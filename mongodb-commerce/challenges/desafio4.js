db.produtos.find({ vendidos: { $gt: 40, $lt: 100 } },
    { nome: 1, vendidos: 1, _id: 0 }).sort({ vendidos: 1 });