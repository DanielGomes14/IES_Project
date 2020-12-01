# IES_Project -GeniHouse

## Our Product

The idea of our project for the assignment of the Introduction to Software Engineering course, is the implementation of a system capable of monitoring, configuring a smart House and all its devices.  

## Work  Methodology and Backlog Management

The approach for this work will be the Scrum Agile Methods, where we will define to-do features for every member of the group. Every week we will discuss what needs to be done  and what was done, updating the backlog. To manage every sprint and the backlog we will use the Jira Software.


## Roles

- Team Manager - Mário Silva
- DevOps Master - Daniel Gomes
- Product Owner - Leandro Silva
- Architect - Bruno Bastos



## Personas and  User Stories

### Personas

O João é um jovem com bastante interesse pelas novas tecnologias. Sempre quis ter uma casa inteligente onde pudesse programar e configurar ao seu gosto. Trabalha remotamente e portanto tem um horário bastante flexível e passa grande parte do seu dia dentro de casa. 

O António é um trabalhador noturno e precisa de automatizar alguns processos eletrônicos para a sua família durante o dia.

A Célia é uma senhora de idade que quer aproveitar as vantagens que as tecnologias oferecem, apesar de ter muita dificuldade e pouca ajuda externa.



### User Stories

Qualquer utilizador que queira utilizar o sistema tem de se registar primeiro e depois efetuar o login para se autenticar.

Um utilizador registado quer adicionar dispositivos para poder controlá-los através da app.

O António quer configurar o cilindro para deixar a água quente nas horas que quiser para a sua família.

O António quer dar permissão à sua filha de 12 anos para que ela possa configurar os aparelhos do  seu quarto à sua maneira, mas não quer que esta possa configurar o resto da casa.

O António quer partilhar o acesso à smart home app com a sua mulher para se for preciso alguma coisa ela também poder verificar.

Como João, quero poder ligar automaticamente o ar condicionado do quarto por volta das 18:00, durante meia hora, caso a temperatura da casa durante o dia seja inferior a 15ºC, de forma a aquecer a divisão. 

Como um utilizador registado, o João quer poder customizar a iluminação para que as luzes se apaguem 5 minutos depois de não houver detecção de nenhum movimento, apenas na divisão da sala.

O João quer estar sempre a par de como a aplicação está a atuar nos dispositivos emparelhados, recebendo sempre notificações da mudança do estado deles.

A Célia, como não percebe muito de tecnologia, quer que todo o processo de aprendizagem da aplicação seja fácil, pelo que necessita de um perfil pré-definido para as necessidades das pessoas na mesma situação que ela.

A Célia gostava de poder ter algumas das suas tarefas diárias automatizadas para não se desgastar tanto, por exemplo, seria-lhe bastante útil que todas as manhãs, por volta das 9 horas, os estores da casa abrissem automaticamente evitando que esta se tivesse de deslocar pela casa toda.

A Célia tem o mau hábito de se esquecer de desligar as luzes das divisões que não está a usar, por isso queria um sistema automatizado que desligasse as luzes ao não detectar ninguém numa certa divisão.



## Architeture



### Data generation/sensing

We will be using a temperature sensor, and for other things like humidity and light, all data will be simulated. To run the scripts to simulate data,send the data streams to our Backend, and for the use of sensors, it will be used a Raspberry Pi. We are using python to communicate with the server. 

### Frontend

Template: https://github.com/knledg/react-blur-admin

#### Mobile App

For the mobile app we are using react native since it can be used for cross-platform development for both Android and IOS. 

#### Web App

The web app uses react since the syntax is similar to react native so that we can reuse some of the code for the mobile app.

### Backend

#### Database:

The database management system in use is MySQL. In the beginning we were thinking about a NoSQL database like Mongodb but since we don’t have much experience with this technology we opt for a relational database system. MySQL might have some scalability problems, however, MySQL has a really high performing database.

#### Entity Relationship Diagram

![](/Users/mario/Desktop/geanie/EntityDiagram.jpg)

#### Message Queues:

RabbitMQ is going to receive the messages from the sensors and pass them to the backend. Our choice comes from the fact that rabbitMQ is one of the most used message brokers which makes it easy to find information about it and is easy to integrate in spring-boot.

#### Service layer (API) + Processing & Bizz Logic

For the backend of our System, since we got to know the Spring framework from the practical classes of this course and it was highly recommended by the Teacher, we will use Spring.
