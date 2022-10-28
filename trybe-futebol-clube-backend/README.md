


# Trybe Futebol Clube :bookmark:

Projeto de uma API REST para um campeonato de futebol. <br>
  As tecnologias utilizadas foram:  mysql, mysql2, node, express, typescript, sequelize, mocha, chai, sinon, jwt e Joi:<br>
  As interações com o banco de dados mysql foram realizadas por meio do Sequelize.<br>
  Os arquivos foram organizados com a arquitetura MSC.<br>

:outbox_tray: Link do deploy via vercel do front-end fornecido pela trybe para implementar a API desenvolvida:<br>
https://tfc-tamires-ft.vercel.app<br>

:outbox_tray: Arquivos do backend desenvolvido: <br>
https://github.com/tamireshc/backend/tree/master/trybe-futebol-clube-backend<br>

![Captura de Tela 2022-10-27 às 21 56 54](https://user-images.githubusercontent.com/65035109/198425654-97dec868-ad3e-49fd-b33a-23fcbf0862ce.png)
![Captura de Tela 2022-10-27 às 22 00 27](https://user-images.githubusercontent.com/65035109/198427066-b1f11c05-463a-4eb1-8032-f1885534b15e.png)

## :mag:  ENDPOINS  :mag:<br>


:soccer: **GET:** Busca pela classificaçao geral do campeonato<br>
https://tfc-tamires-ft.vercel.app/leaderboard<br>

:soccer: **GET:** Busca pela classificaçao pelos times visitantes campeonato<br>
https://tfc-tamires-ft.vercel.app/leaderboard/away<br>

:soccer: **GET:** Busca pela classificaçao pelos times da casa campeonato<br>
https://tfc-tamires-ft.vercel.app/matches/:id/leaderboard/home<br>

:soccer: **PATCH:** Edita o resultado de uma partida<br>
http://localhost:3001/matches/:id<br>

:soccer: **PATCH:** Edita uma partida pelo id para o status de finalizada<br>
https://tfc-tamires-ft.vercel.app/matchesmatches/:id/finish<br>

:soccer: **POST:** Inclui nova partida(necessário um token válido)<br>
http://localhost:3001/matches<br>

:soccer: **GET:** Busca pelas partidas com o status de finalizada<br>
https://tfc-tamires-ft.vercel.app1/matches?inProgress=true<br>

:soccer: **GET:** Busca pelas partidas com o status de em andamento<br>
https://tfc-tamires-ft.vercel.app/matches?inProgress=false<br>

:soccer: **GET:** Busca todas as partidas realizada no campeonato<br>
https://tfc-tamires-ft.vercel.app/matches<br>

:soccer: **GET:** Busca um time pelo seu id<br>
https://tfc-tamires-ft.vercel.app/teams/:id<br>

:soccer: **GET:** Busca todos os times<br>
https://tfc-tamires-ft.vercel.app/teams<br>

:soccer: **GET:** valida se o login foi feito pelo admin(necessário um token válido)<br>
https://tfc-tamires-ft.vercel.app/login/validate<br>

:soccer: **POST:** Realiza o login retornado um token<br>
https://tfc-tamires-ft.vercel.app//login<br>

# Vídeo dos retornos da aplicação :dart:

https://user-images.githubusercontent.com/65035109/198422114-12832cf7-eb4e-484b-908f-d00f69fac9ab.mov

