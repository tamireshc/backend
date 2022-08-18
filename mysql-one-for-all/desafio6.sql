SELECT MIN(valor) AS faturamento_minimo,
 MAX(valor) AS faturamento_maximo,
 ROUND(AVG(valor),2) AS faturamento_medio,
 SUM(valor) AS faturamento_total
FROM SpotifyClone.plano AS p
INNER JOIN SpotifyClone.usuario AS u ON u.plano_id = p.plano_id;