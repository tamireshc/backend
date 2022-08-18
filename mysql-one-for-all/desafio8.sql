SELECT 
nome_artista AS artista, 
nome_album AS album
FROM SpotifyClone.artista AS a
INNER JOIN SpotifyClone.album AS al ON a.artista_id = al.artista_id
WHERE nome_artista = 'Elis Regina';