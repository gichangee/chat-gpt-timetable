const apiKey = ""
const serverless = require('serverless-http');

const { Configuration, OpenAIApi } = require("openai");

const express = require('express')
var cors = require('cors')
const app = express()


const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);


//cors 이슈 해결
//해당 사이트 요청 아니면 거절
let corsOptions = {
  origin: 'https://chat-gpt-timetable.pages.dev',
  credentials: true
}

app.use(cors(corsOptions));


//post 요청 받을 수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded( { extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/timetableTell', async function (req, res) 
{
        let {mySubject, userMessages, assistantMessages}= req.body
        //console.log(userMessages);
        //console.log(assistantMessages);


        let messages = [
          {role: "system", content: "You are an ai that makes a timetable using only the information I give you."},
          {role: "system", content: "I want to get a format table like this Entries are as follows 'Time' 'Mon' 'Tue' 'Wed' 'Thu' 'Fri'"},
          {role: "system", content: "The time is displayed in 1 hour increments from 9:00 to 18:00."},
          {role: "system", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "system", content: "|09:00-10:00| - | - | - | - | - |"},
          {role: "system", content: "|10:00-11:00| - | - | - | - | - |"},
          {role: "system", content: "|11:00-12:00| - | - | - | - | - |"},
          {role: "system", content: "|12:00-13:00| - | - | - | - | - |"},
          {role: "system", content: "|13:00-14:00| - | - | - | - | - |"},
          {role: "system", content: "|14:00-15:00| - | - | - | - | - |"},
          {role: "system", content: "|15:00-16:00| - | - | - | - | - |"},
          {role: "system", content: "|16:00-17:00| - | - | - | - | - |"},
          {role: "system", content: "|17:00-18:00| - | - | - | - | - |"},
          {role: "system", content: "I will provide you with information in this format. Group n: Subject name (class time)"},
          {role: "system", content: "There can be several subjects in one group."},
          {role: "system", content: "You should make a timetable using only one subject in one group."},
          {role: "system", content: "You shouldn't make a timetable that overlaps with time. If there is a subject that overlaps with the one in the other group, you should select only one and write a timetable."},
          {role: "system", content: "The class time given must be kept."},
          {role: "system", content: "You have to make a timetable using all the groups."},
          {role: "system", content: "If there are several subjects in one group, you can make several timetables using one by one."},
          {role: "system", content: "The given class time must be entered."},
          {role: "system", content: "If the result value does not contain a subject in one row, it can be omitted. For example, |11:00-12:00| - | - | - | - | - | This line does not need to be printed."},
          {role: "system", content: "example"},
          {role: "system", content: "Group 1: Math1(9am to 11am on Mon and 9am to 11am on Wed), Math2(9am to 11am on Tue and 9am to 11am on Thu)."},
          {role: "system", content: "Group 2: Science 1 (10 am to 11 am on Fri)."},
          {role: "system", content: "In the above example, two timetables can be created when using Mathematics 1 in Group 1 and when using Mathematics 2."},
          {role: "system", content: "Schedule 1"},
          {role: "system", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "system", content: "|09:00-10:00| Math 1 | - | Math 1 | - | - |"},
          {role: "system", content: "|10:00-11:00| Math 1 | - | Math 1 | - | Science1 |"},
          {role: "system", content: "Schedule 2"},
          {role: "system", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "system", content: "|09:00-10:00| - | Math 2 | - | Math 2 | - |"},
          {role: "system", content: "|10:00-11:00| - | Math 2 | - | Math 2 | Science 1 |"},
          {role: "user", content: "You are an ai that makes a timetable using only the information I give you."},
          {role: "user", content: "I want to get a format table like this Entries are as follows 'Time' 'Mon' 'Tue' 'Wed' 'Thu' 'Fri'"},
          {role: "user", content: "The time is displayed in 1 hour increments from 9:00 to 18:00."},
          {role: "user", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "user", content: "|09:00-10:00| - | - | - | - | - |"},
          {role: "user", content: "|10:00-11:00| - | - | - | - | - |"},
          {role: "user", content: "|11:00-12:00| - | - | - | - | - |"},
          {role: "user", content: "|12:00-13:00| - | - | - | - | - |"},
          {role: "user", content: "|13:00-14:00| - | - | - | - | - |"},
          {role: "user", content: "|14:00-15:00| - | - | - | - | - |"},
          {role: "user", content: "|15:00-16:00| - | - | - | - | - |"},
          {role: "user", content: "|16:00-17:00| - | - | - | - | - |"},
          {role: "user", content: "|17:00-18:00| - | - | - | - | - |"},
          {role: "user", content: "I will provide you with information in this format. Group n: Subject name (class time)"},
          {role: "user", content: "There can be several subjects in one group."},
          {role: "user", content: "You should make a timetable using only one subject in one group."},
          {role: "user", content: "You shouldn't make a timetable that overlaps with time. If there is a subject that overlaps with the one in the other group, you should select only one and write a timetable."},
          {role: "user", content: "The class time given must be kept."},
          {role: "user", content: "You have to make a timetable using all the groups."},
          {role: "user", content: "If there are several subjects in one group, you can make several timetables using one by one."},
          {role: "user", content: "The given class time must be entered."},
          {role: "user", content: "If the result value does not contain a subject in one row, it can be omitted. For example, |11:00-12:00| - | - | - | - | - | This line does not need to be printed."},
          {role: "user", content: "example"},
          {role: "user", content: "Group 1: Math1(9am to 11am on Mon and 9am to 11am on Wed), Math2(9am to 11am on Tue and 9am to 11am on Thu)."},
          {role: "user", content: "Group 2: Science 1 (10 am to 11 am on Fri)."},
          {role: "user", content: "In the above example, two timetables can be created when using Mathematics 1 in Group 1 and when using Mathematics 2."},
          {role: "user", content: "Schedule 1"},
          {role: "user", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "user", content: "|09:00-10:00| Math 1 | - | Math 1 | - | - |"},
          {role: "user", content: "|10:00-11:00| Math 1 | - | Math 1 | - | Science1 |"},
          {role: "user", content: "Schedule 2"},
          {role: "user", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "user", content: "|09:00-10:00| - | Math 2 | - | Math 2 | - |"},
          {role: "user", content: "|10:00-11:00| - | Math 2 | - | Math 2 | Science 1 |"},
          {role: "user", content: "Did you understand?"},
          {role: "assistant", content:"Yes, I understood your request. I will create multiple timetables based on the groups of subjects provided, ensuring that there are no time overlaps within a single timetable and every subject from each group is used to make at least one timetable. Please provide me with the groups and corresponding class times, and I will create the required timetables."},
          {role: "user", content: "Group 1: Math1(9am to 11am on Mon and 9am to 11am on Wed), Math2(9am to 11am on Tue and 9am to 11am on Thu)"},
          {role: "user", content: "Group 2: Science 1 (10 am to 11 am on Fri)"},
          {role: "user", content: "Group 3: computer vision (15 pm to 16 pm on mon and 12 pm to 14 pm on wed)"},
          {role: "assistant", content:"Timetable 1: Using Math1 from Group 1, Science 1 from Group 2, and Computer Vision from Group 3"},
          {role: "assistant", content:"| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "assistant", content:"|09:00-10:00| Math 1 | - | Math 1 | - | - |"},
          {role: "assistant", content:"|10:00-11:00| Math 1 | - | Math 1 | - | Science1 |"},
          {role: "assistant", content:"|12:00-13:00| - | - | Computer Vision | - | - |"},
          {role: "assistant", content:"|13:00-14:00| - | - | Computer Vision | - | - |"},
          {role: "assistant", content:"|15:00-16:00| Computer Vision | - | - | - | - |"},
          {role: "assistant", content:"Timetable 2: Using Math2 from Group 1, Science 1 from Group 2, and Computer Vision from Group 3"},
          {role: "assistant", content:"| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "assistant", content:"|09:00-10:00| - | Math 2 | - | Math 2 | - |"},
          {role: "assistant", content:"|10:00-11:00| - | Math 2 | - | Math 2 | Science 1 |"},
          {role: "assistant", content:"|12:00-13:00| - | - | Computer Vision | - | - |"},
          {role: "assistant", content:"|13:00-14:00| - | - | Computer Vision | - | - |"},
          {role: "assistant", content:"|15:00-16:00| Computer Vision | - | - | - | - |"},
          {role: "assistant", content:"Please let me know if you need anything else."},
          {role: "user", content: `${mySubject}`},
        ]
        
        while( userMessages.length != 0 || assistantMessages.length !=0)
        {
              if(userMessages.length != 0)
              {
                messages.push(
                  JSON.parse('{"role": "user", "content":"'+String(userMessages.shift()).replace(/\n/g,"")+'"}') 
                )
              }
              if(assistantMessages.length != 0)
              {
                messages.push(
                  JSON.parse('{"role": "assistant", "content":"'+String(assistantMessages.shift()).replace(/\n/g,"")+'"}') 
                )
              }
        }

        //console.log(messages);
        
        const maxRetries = 3;
        let retries = 0;
        let completion
        while (retries < maxRetries) {
          try {
            completion = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              //temperature:0.5,
              //model: "gpt-4",
              messages: messages
            });
            break;
          } catch (error) {
              retries++;
              console.log(error);
              console.log(`Error fetching data, retrying (${retries}/${maxRetries})...`);
          }
        }


        // const completion = await openai.createChatCompletion(
        //   {
        //       model: "gpt-3.5-turbo",
        //       messages: messages 
        //   });
        //

          let timetable = completion.data.choices[0].message['content'];
          //console.log(timetable);
          res.json({"assistant": timetable});
          //res.send({timetable});
});

module.exports.handler=serverless(app);
//app.listen(3000)





