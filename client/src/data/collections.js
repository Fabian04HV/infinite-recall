import axios from 'axios'

const fetchData = () => {
  return axios.get('http://localhost:5005/api/data')
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}
export default fetchData


// const collectionsData = [
//   {
//     _id: 1,
//     title: 'Ordering Food in Spanish',
//     creator: 'Jeff Who', 
//     createdAt: 'today', 
//     flashcards: [
//       {
//         front: 'Buenos Días',
//         back: 'Good Morning',
//         importance: 'normal'
//       },
//       {
//         front: 'Me gustaría una tortilla por favor',
//         back: 'I would like an omelette please',
//         importance: 'high'
//       },
//       {
//         front: 'Dónde está el restaurante?',
//         back: 'Where is the restaurant',
//         importance: 'normal'
//       },
//       {
//         front: 'La comida es muy cara',
//         back: 'The food is very expensive',
//         importance: 'normal'
//       },

//     ]
//   },
//   {
//     _id: 2,
//     title: 'Introduce yourself in Spanish',
//     creator: 'Fabian04HV', 
//     createdAt: '1 year ago', 
//     flashcards: [
//       {
//         front: 'Hola, me llamo Felipe Hernandez',
//         back: 'Hello, my name is Felipe Hernandez',
//         importance: 'normal'
//       },
//       {
//         front: 'Cómo te llamas?',
//         back: 'What is your name?',
//         importance: 'normal'
//       },
//       {
//         front: 'Tengo 19 años',
//         back: 'I am 19 years old',
//         importance: 'normal'
//       },
//       {
//         front: 'Cuántos años tienes?',
//         back: 'How old are you?',
//         importance: 'normal'
//       },
//       {
//         front: 'De dónde eres?',
//         back: 'Where are you from?',
//         importance: 'normal'
//       },
//       {
//         front: 'Soy de Berlin',
//         back: 'I am from Berlin',
//         importance: 'normal'
//       },

//     ]
//   },
//   {
//     _id: 3,
//     title: 'Talking to friends in Spanish',
//     creator: 'Fabian04HV', 
//     createdAt: '1 year ago', 
//     flashcards: [
//       {
//         front: 'Hola, me llamo Fabian',
//         back: 'Hello, my name is Fabian',
//         importance: 'normal'
//       },
//       {
//         front: 'Cómo te llamas?',
//         back: 'What is your name?',
//         importance: 'normal'
//       },
//       {
//         front: 'De dónde eres?',
//         back: 'Where are you from?',
//         importance: 'normal'
//       },
//       {
//         front: 'Qué has estado haciendo últimamente?',
//         back: 'What have you been up to lately?',
//         importance: 'normal'
//       },
//       {
//         front: 'Tienes algún plan para el fin de semana?',
//         back: 'Do you have any plans for the weekend?',
//         importance: 'normal'
//       },
//       {
//         front: 'Te gustaría salir a cenar algún día?',
//         back: 'Would you like to go out to dinner sometime?',
//         importance: 'normal'
//       },
//       {
//         front: 'Cómo está tu familia?',
//         back: 'How is your family?',
//         importance: 'normal'
//       },
//       {
//         front: 'Qué tipo de música te gusta?',
//         back: 'What kind of music do you like?',
//         importance: 'normal'
//       },
//       {
//         front: 'Has estado viendo alguna serie interesante últimamente?',
//         back: 'Have you been watching any interesting TV shows lately?',
//         importance: 'normal'
//       },
//       {
//         front: 'Qué deportes te gustan?',
//         back: 'What sports do you like?',
//         importance: 'normal'
//       },
//       {
//         front: 'Tienes algún plan para las vacaciones?',
//         back: 'Do you have any plans for the holidays?',
//         importance: 'normal'
//       },
//       {
//         front: 'Cómo te sientes hoy?',
//         back: 'How are you feeling today?',
//         importance: 'normal'
//       }      
//     ]
//   },
//   {
//     _id: 4,
//     title: 'Job interview at a tech company in Spain',
//     creator: 'Jeff Who', 
//     createdAt: '1 week ago', 
//     flashcards: [
//       {
//         front: '¿Cómo describirías tu experiencia en el desarrollo de software?',
//         back: 'How would you describe your experience in software development?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Qué te motiva a trabajar en el campo de la tecnología?',
//         back: 'What motivates you to work in the field of technology?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Puedes hablar sobre un proyecto en el que hayas trabajado recientemente?',
//         back: 'Can you talk about a project you have worked on recently?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Cuál es tu experiencia con lenguajes de programación específicos?',
//         back: 'What experience do you have with specific programming languages?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Cómo manejas los conflictos en un equipo de trabajo?',
//         back: 'How do you handle conflicts in a team environment?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Qué habilidades crees que son esenciales para tener éxito en un rol de tecnología?',
//         back: 'What skills do you think are essential to succeed in a technology role?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Puedes hablar sobre algún proyecto personal que hayas desarrollado recientemente?',
//         back: 'Can you talk about a personal project you have recently developed?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Cómo te aseguras de mantener tus habilidades técnicas actualizadas?',
//         back: 'How do you ensure that you keep your technical skills up-to-date?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Cómo describirías tu estilo de trabajo?',
//         back: 'How would you describe your working style?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Puedes hablar sobre un desafío técnico al que hayas enfrentado y cómo lo superaste?',
//         back: 'Can you talk about a technical challenge you faced and how you overcame it?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Cómo te mantienes organizado y administras tu tiempo de trabajo?',
//         back: 'How do you stay organized and manage your work time?',
//         importance: 'normal'
//       },
//       {
//         front: '¿Por qué crees que eres la mejor persona para este trabajo?',
//         back: 'Why do you think you are the best person for this job?',
//         importance: 'normal'
//       }      
//     ]
//   }

// ]

// export default collectionsData