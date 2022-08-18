SELECT nome_usuario AS usuario, COUNT(DISTINCT h.cancao_id) AS qt_de_musicas_ouvidas, ROUND(SUM(c.duracao)/60, 2) AS total_minutos
FROM SpotifyClone.usuario AS u
INNER JOIN SpotifyClone.historico_de_reproducoes as h ON u.usuario_id = h.usuario_id
INNER JOIN SpotifyClone.cancoes as c ON h.cancao_id= c.cancao_id
GROUP BY h.usuario_id
ORDER BY nome_usuario;