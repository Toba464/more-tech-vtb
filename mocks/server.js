'use strict';

const Hapi = require('@hapi/hapi');

const MONTH_IN_SEC = 2592000;

const init = async () => {
  const server = Hapi.server({
    port: 8090,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        credentials: true
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/voting/1',
    handler: function (request, h) {
      return {
        title: 'Переезд в новый офис',
        description: 'Добрый день, коллеги, у меня для Вас хорошие новости. ' +
          'Мы планируем переехать в новый офис. ' +
          'Я думаю, все со мной согласятся, что уже пора расширятся. ' +
          'Но давайте все же согласуем с вами несколько вещей, которые я считаю важными. ',
        points: [
          {
            title: 'Всем будет удобно, что наш офис будет на метро Сокол? Рядом есть ЖД станция.',
            links: [
              {
                title: 'Схема проезда.pdf',
                url: 'https://material-ui.com/api/divider/'
              },

              {
                title: 'Расписание электричек.pdf',
                url: 'https://material-ui.com/api/divider/'
              },
            ]
          },
          {
            title: 'Нужно ли нам закупить в новый офис бытовую технику? Набросал список, посмотрите.',
            links: [
              {
                title: 'Список.pdf',
                url: 'https://material-ui.com/api/divider/'
              },
            ]
          },
          {
            title: 'Может на этой неделе сходить в кино, в честь переезда, кто что думает?',
            links: [
              {
                title: 'Сеансы.pdf',
                url: 'https://material-ui.com/api/divider/'
              },
            ]
          },
          {
            title: 'Кто как смотрит на то, чтобы перенести начало рабочего дня на 10?',
            links: [
              {
                title: 'Новое расписание.pdf',
                url: 'https://material-ui.com/api/divider/'
              },

              {
                title: 'Старое расписание.pdf',
                url: 'https://material-ui.com/api/divider/'
              },
            ]
          },
        ],
        participants: [
          {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          {
            id: 2,
            name: 'Петров Никита',
            email: 'webnikler@klevertech.fun',
            role: 'admin'
          },
          {
            id: 3,
            name: 'Панормов Никита',
            email: 'npanormov@klevertech.fun',
            role: 'user'
          },
          {
            id: 4,
            name: 'Мельник Михаил',
            email: 'mmelnik@klevertech.fun',
            role: 'user'
          },
          {
            id: 5,
            name: 'Яньшин Михаил',
            email: 'myanshin@klevertech.fun',
            role: 'user'
          },
          {
            id: 6,
            name: 'Василий Василькин',
            email: 'vv@klevertech.fun',
            role: 'user'
          },

        ],
        creator: {
          id: 1,
          name: 'Бабин Анатолий',
          email: 'toba@klevertech.fun',
          role: 'admin'
        },
        // был meetType
        // withTimeBounds
        // withoutTimeBounds
        type : 'Бессрочная',
        closed: false,
        id: '1',
        // dateOfBegin: '21 - 09 - 2019 13:48',
        createdTime: '01/09/2019 04:42',
        // dateOfEnd: '22 - 09 - 2019 13:40',
        closedTime: '01/09/2019 04:42',
        status: 'В работе'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, h) {
      return [
        {
          id: 1,
          name: 'Бабин Анатолий',
          email: 'toba@klevertech.fun',
          role: 'admin'
        },
        {
          id: 2,
          name: 'Петров Никита',
          email: 'webnikler@klevertech.fun',
          role: 'admin'
        },
        {
          id: 3,
          name: 'Панормов Никита',
          email: 'npanormov@klevertech.fun',
          role: 'user'
        },
        {
          id: 4,
          name: 'Мельник Михаил',
          email: 'mmelnik@klevertech.fun',
          role: 'user'
        },
        {
          id: 5,
          name: 'Яньшин Михаил',
          email: 'myanshin@klevertech.fun',
          role: 'user'
        },
        {
          id: 6,
          name: 'Василий Василькин',
          email: 'vv@klevertech.fun',
          role: 'user'
        },
        {
          id: 7,
          name: 'Николай Вахуемов',
          email: 'nv@klevertech.fun',
          role: 'user'
        },
        {
          id: 8,
          name: 'Тест Тестович',
          email: 'tt@klevertech.fun',
          role: 'user'
        },
        {
          id: 9,
          name: 'Бабин Анатолий',
          email: 'xx@klevertech.fun',
          role: 'user'
        },
        {
          id: 10,
          name: 'Бабин Анатолий',
          email: 'zz@klevertech.fun',
          role: 'user'
        },
      ]
    }
  });

  // моки авторизации
  server.route({
    method: 'POST',
    path: '/auth',
    handler: function (request, h) {
      switch (request.payload.email) {
        case "toba@klevertech.fun" :
          return {
            role: "admin",
          };
        case "myanshin@klevertech.fun" :
          return {
            role: "user",
          };
      }

      // Не авторизовывать если нет данных
    }
  });


  // get list of all votings
  server.route({
    method: 'GET',
    path: '/votings',
    handler: function (request, h) {
      return [
        {
          id: '1',
          title: 'Переезд в новый офис',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: false,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '2',
          title: 'Подняться на гору Эверест',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: false,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '3',
          title: 'Слетать командой на Бали',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: false,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '4',
          title: 'Купить частный самолет',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: false,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '5',
          title: 'Набрать в штат 20 новых разработчиков',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: false,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '6',
          title: 'Купить офис в центре Москвы',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: false,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '7',
          title: 'Проиграть на скрипке',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: false,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '8',
          title: 'Нанять в офис группу для живой музыки',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: true,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '8',
          title: 'Закупить разработчикам mac pro',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: true,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '9',
          title: 'Перевод фирмы на систему канбан',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: true,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        },
        {
          id: '10',
          title: 'Перенос начала рабочего дня на 10 утра',
          description: 'Мы хотим переехать в новый офис. Наш текущий офис начинает заканчиваться ' +
            'нам необходимо большее пространство. Так же хочется выглядеть более презентабильно в целом ' +
            'перед нашими заказчиками. А так же повысить комфорт для своей команды. Так же хочется ' +
            'чтобы можно было приглашать людей для знакомства в наш офис - в нем должно быть комфортно ',
          points: [
            {
              title: 'Заказать кофе машину',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Купить мониторы',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать стулья',
              links: [
                {
                  title: 'кофе-машина.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
            {
              title: 'Заказать массажистку',
              links: [
                {
                  title: 'монитор.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },

                {
                  title: 'стул.pdf',
                  url: 'https://material-ui.com/api/divider/'
                },
              ]
            },
          ],
          participants: [
            {
              id: 1,
              name: 'Бабин Анатолий',
              email: 'toba@klevertech.fun',
              role: 'admin'
            },
            {
              id: 2,
              name: 'Петров Никита',
              email: 'webnikler@klevertech.fun',
              role: 'admin'
            },
            {
              id: 3,
              name: 'Панормов Никита',
              email: 'npanormov@klevertech.fun',
              role: 'user'
            },
            {
              id: 4,
              name: 'Мельник Михаил',
              email: 'mmelnik@klevertech.fun',
              role: 'user'
            },
            {
              id: 5,
              name: 'Яньшин Михаил',
              email: 'myanshin@klevertech.fun',
              role: 'user'
            },
            {
              id: 6,
              name: 'Василий Василькин',
              email: 'vv@klevertech.fun',
              role: 'user'
            },

          ],
          creator: {
            id: 1,
            name: 'Бабин Анатолий',
            email: 'toba@klevertech.fun',
            role: 'admin'
          },
          // был meetType
          // withTimeBounds
          // withoutTimeBounds
          type : 'Бессрочная',
          closed: true,
          // dateOfBegin: '21 - 09 - 2019 13:48',
          createdTime: '01/09/2019 04:42',
          // dateOfEnd: '22 - 09 - 2019 13:40',
          closedTime: '01/09/2019 04:42',
          status: 'В работе'
        }
      ]
    }
  });




  await server.start();
  console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();


