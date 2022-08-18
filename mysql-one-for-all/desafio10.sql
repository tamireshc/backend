SELECT nome_cancao AS nome, COUNT(h.cancao_id) AS reproducoes
FROM SpotifyClone.cancoes as c
INNER JOIN SpotifyClone.historico_de_reproducoes AS h 
ON c.cancao_id = h.cancao_id
INNER JOIN SpotifyClone.usuario AS u 
ON h.usuario_id = u.usuario_id
WHERE u.plano_id = 1 OR u.plano_id = 3
GROUP BY nome_cancao
ORDER BY nome_cancao;