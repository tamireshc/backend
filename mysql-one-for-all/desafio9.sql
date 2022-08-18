SELECT COUNT(cancao_id) AS quantidade_musicas_no_historico
FROM SpotifyClone.historico_de_reproducoes AS h
INNER JOIN SpotifyClone.usuario AS u ON u.usuario_id = h.usuario_id 
WHERE u.nome_usuario = "Barbara Liskov"
GROUP BY h.usuario_id;
