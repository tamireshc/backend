SELECT   nome_artista AS artista, nome_album AS album, COUNT(a.artista_id) AS seguidores
FROM SpotifyClone.artista AS a
INNER JOIN SpotifyClone.album AS al ON a.artista_id = al.artista_id
LEFT JOIN SpotifyClone.seguidor_artista AS s ON s.artista_id = a.artista_id
GROUP BY nome_artista, nome_album
ORDER BY seguidores DESC, nome_artista, nome_album;