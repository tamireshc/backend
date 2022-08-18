SELECT nome_usuario AS usuario, 
(SELECT IF (MAX(data_reproducao) >= DATE('2021-01-01 00:00:01'), 'Usuário ativo', 'Usuário inativo'))
AS status_usuario
FROM SpotifyClone.usuario AS u
INNER JOIN SpotifyClone.historico_de_reproducoes AS h
ON u.usuario_id = h.usuario_id
GROUP BY u.nome_usuario
ORDER BY u.nome_usuario;