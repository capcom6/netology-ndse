# Домашнее задание к занятию «2.6. База данных и хранение данных»

**Правила выполнения домашней работы:** 
* выполняйте домашнее задание в отдельной ветке проекта на GitHub,
* в поле для сдачи работы прикрепите ссылку на ваш проект в Git,
* присылать на проверку можно каждую задачу по отдельности или все задачи вместе, 
* во время проверки по частям ваша домашняя работа будет обозначаться статусом «На доработке»,
* любые вопросы по решению задач задавайте в канале вашей группы.


#### Задание 1
Чтобы в будущем вам было легче работать с **MongoDB**, изучите раздел 
документации об использовании [**CRUD Operations**](https://docs.mongodb.com/manual/crud/).

#### Задание 2
В файле **README.md** написать следующие запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**,
 - запрос для *поиска* полей документов коллекции **books** по полю *title*,
 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи.
 
*Каждый документ коллекции **books** должен содержать следующую структуру данных: 
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 

##### Решение

1. Запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**:
   ```js
   db.books.insertMany([
     {
       title: "Microservices with Go",
       description: "This book covers the key benefits and common issues of microservices, helping you understand the problems microservice architecture helps to solve, the issues it usually introduces, and the ways to tackle them. You’ll start by learning about the importance of using the right principles and standards in order to achieve the key benefits of microservice architecture. The following chapters will explain why the Go programming language is one of the most popular languages for microservice development and lay down the foundations for the next chapters of the book. You’ll explore the foundational aspects of Go microservice development including service scaffolding, service discovery, data serialization, synchronous and asynchronous communication, deployment, and testing. After covering the development aspects, you’ll progress to maintenance and reliability topics. The last part focuses on more advanced topics of Go microservice development including system reliability, observability, maintainability, and scalability. In this part, you’ll dive into the best practices and examples which illustrate how to apply the key ideas to existing applications, using the services scaffolded in the previous part as examples. By the end of this book, you’ll have gained hands-on experience with everything you need to develop scalable, reliable and performant microservices using Go.",
       authors: "Alexander Shuiskov"
     },
     {
       title: "11/22/63",
       description: "On November 22, 1963, three shots rang out in Dallas, President Kennedy died, and the world changed. What if you could change it back? Stephen King’s heart-stoppingly dramatic new novel is about a man who travels back in time to prevent the JFK assassination—a thousand page tour de force.",
       authors: "Stephen King"
     }
   ]);
   ```
   ```json
   {
        "acknowledged" : true,
        "insertedIds" : [ 
            ObjectId("65f835fe64de62befdc4af61"), 
            ObjectId("65f835fe64de62befdc4af62")
        ]
   }
   ```
2. Запрос для *поиска* полей документов коллекции **books** по полю *title*:
   ```js
   db.books.find({ title: "Microservices with Go" });
   ```
   ```json
   {
        "_id" : ObjectId("65f835fe64de62befdc4af61"),
        "title" : "Microservices with Go",
        "description" : "This book covers the key benefits and common issues of microservices, helping you understand the problems microservice architecture helps to solve, the issues it usually introduces, and the ways to tackle them. You’ll start by learning about the importance of using the right principles and standards in order to achieve the key benefits of microservice architecture. The following chapters will explain why the Go programming language is one of the most popular languages for microservice development and lay down the foundations for the next chapters of the book. You’ll explore the foundational aspects of Go microservice development including service scaffolding, service discovery, data serialization, synchronous and asynchronous communication, deployment, and testing. After covering the development aspects, you’ll progress to maintenance and reliability topics. The last part focuses on more advanced topics of Go microservice development including system reliability, observability, maintainability, and scalability. In this part, you’ll dive into the best practices and examples which illustrate how to apply the key ideas to existing applications, using the services scaffolded in the previous part as examples. By the end of this book, you’ll have gained hands-on experience with everything you need to develop scalable, reliable and performant microservices using Go.",
        "authors" : "Alexander Shuiskov"
   }
   ```
3. Запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи
   ```js
   db.books.updateOne(
     { _id: ObjectId("65f835fe64de62befdc4af61") },
     { $set: { description: "This book covers the key benefits and common issues of microservices, helping you understand the problems microservice architecture helps to solve, the issues it usually introduces, and the ways to tackle them.", authors: "Shuiskov Alexander" } }
   );
   ```
   ```json
   {
        "acknowledged" : true,
        "matchedCount" : 1.0,
        "modifiedCount" : 1.0
   }
   ```
