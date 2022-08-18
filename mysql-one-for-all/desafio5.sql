SELECT nome_cancao AS cancao, COUNT(h.cancao_id) AS reproducoes
FROM SpotifyClone.cancoes AS c
INNER JOIN SpotifyClone.historico_de_reproducoes AS h ON c.cancao_id = h.cancao_id
GROUP BY nome_cancao
ORDER BY reproducoes DESC, nome_cancao
LIMIT 2;