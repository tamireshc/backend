DROP DATABASE IF EXISTS SpotifyClone;
CREATE DATABASE IF NOT EXISTS SpotifyClone;

  CREATE TABLE SpotifyClone.plano(
      plano_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
      nome_plano VARCHAR(100) NOT NULL,
      valor DECIMAL(3,2)
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.usuario(
      usuario_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      nome_usuario VARCHAR(100) NOT NULL,
      idade INT NOT NULL,
      plano_id INT NOT NULL,
      data_assinatura DATE NOT NULL,
      FOREIGN KEY (plano_id) REFERENCES plano (plano_id)
  ) engine = InnoDB;
  
    CREATE TABLE SpotifyClone.artista(
      artista_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      nome_artista VARCHAR(100) NOT NULL
  ) engine = InnoDB;
  
  
    CREATE TABLE SpotifyClone.album(
      album_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      nome_album  VARCHAR(100) NOT NULL,
      artista_id INT NOT NULL,
      FOREIGN KEY (artista_id) REFERENCES artista (artista_id)
  ) engine = InnoDB;
  
    CREATE TABLE SpotifyClone.cancoes(
      cancao_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      nome_cancao VARCHAR(100) NOT NULL,
      duracao INT NOT NULL,
      album_id INT NOT NULL,
      FOREIGN KEY (album_id) REFERENCES album (album_id)
  ) engine = InnoDB;
  
    CREATE TABLE SpotifyClone.historico_de_reproducoes(
      -- historico_id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      data_reproducao DATETIME NOT NULL,
      usuario_id INT NOT NULL,
      cancao_id INT NOT NULL,
      CONSTRAINT PRIMARY KEY(data_reproducao, usuario_id, cancao_id),
      FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id),
      FOREIGN KEY (cancao_id) REFERENCES  cancoes (cancao_id)
  ) engine = InnoDB;

   CREATE TABLE SpotifyClone.seguidor_artista(
      -- seguidor_artista_id INT NOT NULL AUTO_INCREMENT,
      usuario_id INT NOT NULL,
      artista_id INT,
      CONSTRAINT PRIMARY KEY(usuario_id, artista_id),
      FOREIGN KEY (artista_id) REFERENCES artista (artista_id),
	    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
  ) engine = InnoDB;

  INSERT INTO SpotifyClone.plano(nome_plano, valor)
  VALUES
    ('gratuito', 0),
    ('familiar', 7.99),
    ('pessoal', 6.99),
    ('universitário', 5.99);

  INSERT INTO SpotifyClone.usuario(nome_usuario, idade, plano_id, data_assinatura)
  VALUES
    ('Barbara Liskov', 82, 1, '2019-10-20'),
    ('Robert Cecil Martin', 58, 1, '2017-01-06'),
    ('Ada Lovelace', 37, 2, '2017-12-30'),
    ('Martin Fowler', 46, 2, '2017-01-17'),
    ('Sandi Metz', 58, 2, '2018-04-29'),
    ('Paulo Freire', 19, 4, '2018-02-14'),
    ('Bell Hooks', 26, 4, '2018-01-05' ),
    ('Christopher Alexander', 85, 3, '2019-06-05'),
    ('Judith Butler', 45, 3, '2020-05-13'),
    ('Jorge Amado', 58, 3, '2017-02-17');
        
 INSERT INTO SpotifyClone.artista(nome_artista)
  VALUES
	('Beyoncé'),
	('Queen'),
	('Elis Regina'),
	('Baco Exu do Blues'),
	('Blind Guardian'),
	('Nina Simone');
    
 INSERT INTO SpotifyClone.seguidor_artista(usuario_id, artista_id)
  VALUES
    (1, 1),
	  (1, 2),
	  (1, 3),
    (2, 1),
	  (2, 3),
	  (3, 2),
    (4, 4),
	  (5, 5),
	  (5, 6),
    (6, 1),
    (6, 6),
    (7, 6),
	  -- (8, null), --
	  (9, 3),
    (10, 2);

 INSERT INTO SpotifyClone.album(nome_album, artista_id)
  VALUES
    ('Renaissance', 1),
    ('Jazz', 2),
    ('Hot Space', 2),
    ('Falso Brilhante', 3),
    ('Vento de Maio', 3),
    ('QVVJFA?', 4),
    ('Somewhere Far Beyond', 5),
    ('I Put A Spell On You', 6);
    
 INSERT INTO SpotifyClone.cancoes(nome_cancao, duracao, album_id)
  VALUES
    ('BREAK MY SOUL', 279, 1),
    ('VIRGO’S GROOVE', 369, 2),
    ('ALIEN SUPERSTAR', 116, 1),
    ('Don’t Stop Me Now', 203, 1),
    ('Under Pressure', 152, 3),
    ('Como Nossos Pais', 105, 4),
    ('O Medo de Amar é o Medo de Ser Livre', 207, 5),
    ('Samba em Paris', 267, 6),
    ('The Bard’s Song', 244, 7),
    ('Feeling Good', 100, 8);

 INSERT INTO SpotifyClone.historico_de_reproducoes(data_reproducao, usuario_id,cancao_id)
  VALUES
  ("2022-02-28 10:45:55", 1, 8),
	("2020-05-02 05:30:35", 1, 2),
	("2020-03-06 11:22:33", 1, 10),
	("2022-08-05 08:05:17", 2, 10),
	("2020-01-02 07:40:33", 2, 7),
	("2020-11-13 16:55:13", 3, 10),
	("2020-12-05 18:38:30", 3, 2),
	("2021-08-15 17:10:10", 4, 8),
	("2022-01-09 01:44:33", 5, 8),
	("2020-08-06 15:23:43", 5, 5),
	("2017-01-24 00:31:17", 6, 7),
	("2017-10-12 12:35:20", 6, 1),
	("2011-12-15 22:30:49", 7, 4),
	("2012-03-17 14:56:41", 8, 4),
	("2022-02-24 21:14:22", 9, 9),
	("2015-12-13 08:30:22", 10, 3);
	
     
    