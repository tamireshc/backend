SELECT 
    COUNT(c.cancao_id) AS cancoes, 
    COUNT(DISTINCT a.artista_id) AS artistas, 
    COUNT(DISTINCT al.album_id) AS albuns
FROM SpotifyClone.cancoes AS c
INNER JOIN SpotifyClone.album AS al ON c.album_id = al.album_id
INNER JOIN SpotifyClone.artista AS a ON al.artista_id = a.artista_id;