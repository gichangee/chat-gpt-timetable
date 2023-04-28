const apiKey = "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"
const { Configuration, OpenAIApi } = require("openai");


const express = require('express')
var cors = require('cors')
const app = express()


const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);


//cors 이슈 해결
// let corsOptions = {
//   origin: 'https://www.domain.com',
//   credentials: true
// }

app.use(cors());


//post 요청 받을 수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/timetableTell', async function (req, res) 
{
  
        const completion = await openai.createChatCompletion(
          {
            model: "gpt-3.5-turbo",
            messages: [
              {role: "user", content: "I am a college student who needs to register for classes."},
              {role: "assistant", content: "Sure, I can assist you with that. Do you have any specific questions or concerns about the registration process?"},
              {role: "user", content: "I want to make a timetable of all possible cases."},
              {role: "assistant", content: "Creating a timetable of all possible cases can be a helpful way to visualize your options for course scheduling. Here are some general steps you can follow:"},
              {role: "assistant", content: "1. Start by listing all the classes you want to take, including their course codes, times, and days of the week they're offered. "},
              {role: "assistant", content: "2. Next, create a grid with days of the week as the columns and time slots (e.g. 8am-10am, 10am-12pm, etc.) as the rows. "},
              {role: "assistant", content: "3. Fill in the grid with the times and days each of your classes is offered. Be sure to account for any breaks between classes or other commitments you may have during the week."},
              {role: "assistant", content: "4. Once you have filled in the grid with your desired classes, take a look at the overall schedule to see if there are any conflicts or overlaps. If there are, you may need to adjust your choices or consider taking some classes during a different semester."},
              {role: "assistant", content: "5. Finally, double-check that you have met all the requirements for your degree program and that your schedule allows enough time for studying and other important activities."},
              {role: "assistant", content: "Remember that creating a timetable of all possible cases can be time-consuming, but it can also help you make informed decisions about your course schedule and ensure that you stay on track to graduate on time."},
              {role: "user", content: "You should make all the timetables you can with the information I gave you."},
              {role: "assistant", content: "I'm sorry, but as an AI language model, I don't have access to the specific information about the courses you want to take and their scheduling details. In order to create all possible timetables, I would need more detailed information such as the specific course codes, times, and days that you are considering."},
              {role: "assistant", content: "However, I can give you some general tips on how to create multiple timetables based on different scenarios. For example, you could try creating a timetable for each of the following scenarios:"},
              {role: "assistant", content: "Taking all your classes during weekdays"},
              {role: "assistant", content: "Taking some classes on weekdays and some on weekends"},
              {role: "assistant", content: "Taking classes that are offered in the mornings or afternoons only"},
              {role: "assistant", content: "Taking classes that have overlapping schedules"},
              {role: "assistant", content: "By creating multiple timetables based on different scenarios, you can compare the different options and choose the one that works best for your schedule and academic goals."},
              {role: "user", content: "I want to get result in this format Entries are as follows"},
              {role: "user", content: "'Time' 'Mon' 'Tue' 'Wed' 'Thu' 'Fri'"},
              {role: "user", content: "The time is displayed in 1 hour increments from 9:00 to 18:00."},
              {role: "assistant", content: "Time       Mon           Tue            Wed           Thu           Fri"},
              {role: "assistant", content: "----------------------------------------------------------------------------"},
              {role: "assistant", content: "09:00-18:00 -              -              -              -             -"},
              {role: "user", content: "The courses that I can register for are 1 minute and a half of basic programming (9:00 am to 11:00 am on Monday, 9:00 am to 11:00 am on Tuesday) or 2 minutes and a half of basic programming (9:00 am to 11:00 am on Wednesday and 9:00 am on Thursday). ~11 a.m.)."},
              {role: "user", content: "If the names are the same, but the divisions are different, they cannot be placed in the same timetable."},
              {role: "user", content: "In other words, the above information shows a total of two timetables."},
              {role: "user", content: "show me these two timetables"},
              {role: "assistant", content: "Timetable 1:"},
              {role: "assistant", content: "Time       Mon           Tue            Wed           Thu           Fri "},
              {role: "assistant", content: "----------------------------------------------------------------------------"},
              {role: "assistant", content: "09:00-11:00 Basic Prog 1 Basic Prog 1   -              -             -"},
              {role: "assistant", content: "11:00-13:00 Math 1       Math 1         -              -             -"},
              {role: "assistant", content: "Timetable 2:"},
              {role: "assistant", content: "Time       Mon           Tue            Wed           Thu           Fri "},
              {role: "assistant", content: "----------------------------------------------------------------------------"},
              {role: "assistant", content: "09:00-11:00 -             -              Basic Prog 2 Basic Prog 2   -"},
              {role: "assistant", content: "11:00-13:00 Math 1       Math 1         -              -             -"},
              {role: "user", content: "Show me again"},
            ],
            
          });

          let timetable = completion.data.choices[0].message['content'];
          console.log(timetable);
          res.json({"assistant": timetable});
});

app.listen(3000)





