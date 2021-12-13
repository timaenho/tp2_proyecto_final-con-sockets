*Descripción*
Taalgenio es una aplicación que se puede usar para encontrar gente que 
quiere practicar un idioma.
La aplicación es para estudiantes de idioma. Por ejemplo: estás aprendiendo inglés y querés encontrar alguien para chatear en inglés. Puede ser alguien que habla inglés nativo o también alguien que quiere practicar el idioma (o sea un estudiante).

La aplicación te conecta
con alguien en el mundo por el mapa con los mismos intereses 
y te conecta con este usuario especifico

Tiene una base de datos de usuarios y mensajes
Un chat privado (sockets io)
Usamos una api para localizar usuarios (api de google) 
Es una app con autenticación  

*Funcionalidades*
-Sala de Chat privado en tiempo real. - sockets
-Listado de usuarios activos 
-Autenticación con google -- facebook - api facebook - google
react native
-Autenticación con credenciales
-friendlist
-persistencia de usuarios y mensajes

El backend funcciona con 2 servidores
puerto 3000: servidor de los sockets
puerto 4000: servidor de la api

*Endpoints*
GET
/users
/users/:id
/mensajes/:mail
/mensajes
/friendlist/:id

POST
/users/signup
/users/login
/users/login/google
/mensajes
/friendlist

PUT
/users/:id

DELETE
/friendlist




