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
          {role: "system", content: "The time is displayed in 1 hour increments from 1 to 9."},
          {role: "system", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "system", content: "| 1 | - | - | - | - | - |"},
          {role: "system", content: "| 2 | - | - | - | - | - |"},
          {role: "system", content: "| 3 | - | - | - | - | - |"},
          {role: "system", content: "| 4 | - | - | - | - | - |"},
          {role: "system", content: "| 5 | - | - | - | - | - |"},
          {role: "system", content: "| 6 | - | - | - | - | - |"},
          {role: "system", content: "| 7 | - | - | - | - | - |"},
          {role: "system", content: "| 8 | - | - | - | - | - |"},
          {role: "system", content: "| 9 | - | - | - | - | - |"},
          {role: "system", content: "I will provide you with information in this format. Group n: Subject name (class time)"},
          {role: "system", content: "When you write a timetable, you have to make one subject in each group"},
          {role: "system", content: "Group 1: A, B"},
          {role: "system", content: "Group 2: C"},
          {role: "system", content: "Number of cases that can be created"},
          {role: "system", content: "1.AC"},
          {role: "system", content: "2.BC"},
          {role: "system", content: "example 1"},
          {role: "system", content: "Group 1: Math1 (Mon 1, Mon 2, Wen 1), Math2 (Mon 3, Mon 4, Wen 1)"},
          {role: "system", content: "Group 2: Science(Fri 2)"},
          {role: "system", content: "Number of cases that can be created"},
          {role: "system", content: "1.Math1, Science"},
          {role: "system", content: "2.Math2, Science"},
          {role: "system", content: "Schedule 1"},
          {role: "system", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "system", content: "| 1 | Math1 | - | Math1 | - | - |"},
          {role: "system", content: "| 2 | Math1 | - | - | - | Science |"},
          {role: "system", content: "| 3 | - | - | - | - | - |"},
          {role: "system", content: "| 4 | - | - | - | - | - |"},
          {role: "system", content: "| 5 | - | - | - | - | - |"},
          {role: "system", content: "| 6 | - | - | - | - | - |"},
          {role: "system", content: "| 7 | - | - | - | - | - |"},
          {role: "system", content: "| 8 | - | - | - | - | - |"},
          {role: "system", content: "| 9 | - | - | - | - | - |"},
          {role: "system", content: "Schedule 2"},
          {role: "system", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "system", content: "| 1 | - | - | Math2  | - | - |"},
          {role: "system", content: "| 2 | - | - | - | - | Science  |"},
          {role: "system", content: "| 3 | Math2  | - | - | - | - |"},
          {role: "system", content: "| 4 | Math2  | - | - | - | - |"},
          {role: "system", content: "| 5 | - | - | - | - | - |"},
          {role: "system", content: "| 6 | - | - | - | - | - |"},
          {role: "system", content: "| 7 | - | - | - | - | - |"},
          {role: "system", content: "| 8 | - | - | - | - | - |"},
          {role: "system", content: "| 9 | - | - | - | - | - |"},
          {role: "system", content: "example 2"},
          {role: "system", content: "Group 1: Math1 (Mon 1, Mon 2, Wen 1), Math2 (Mon 3, Mon 4, Wen 1)"},
          {role: "system", content: "Group 2: Science(Fri 2)"},
          {role: "system", content: "Group 3: Group 3: computer(Tue 2)"},
          {role: "system", content: "Number of cases that can be created"},
          {role: "system", content: "1.Math1, Science, computer"},
          {role: "system", content: "2.Math2, Science, computer"},
          {role: "system", content: "Schedule 1"},
          {role: "system", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "system", content: "| 1 | Math1 | - | Math1 | - | - |"},
          {role: "system", content: "| 2 | Math1 | computer  | - | - | Science |"},
          {role: "system", content: "| 3 | - | - | - | - | - |"},
          {role: "system", content: "| 4 | - | - | - | - | - |"},
          {role: "system", content: "| 5 | - | - | - | - | - |"},
          {role: "system", content: "| 6 | - | - | - | - | - |"},
          {role: "system", content: "| 7 | - | - | - | - | - |"},
          {role: "system", content: "| 8 | - | - | - | - | - |"},
          {role: "system", content: "| 9 | - | - | - | - | - |"},
          {role: "system", content: "Schedule 2"},
          {role: "system", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "system", content: "| 1 | - | - | Math2  | - | - |"},
          {role: "system", content: "| 2 | - | computer  | - | - | Science  |"},
          {role: "system", content: "| 3 | Math2  | - | - | - | - |"},
          {role: "system", content: "| 4 | Math2  | - | - | - | - |"},
          {role: "system", content: "| 5 | - | - | - | - | - |"},
          {role: "system", content: "| 6 | - | - | - | - | - |"},
          {role: "system", content: "| 7 | - | - | - | - | - |"},
          {role: "system", content: "| 8 | - | - | - | - | - |"},
          {role: "system", content: "| 9 | - | - | - | - | - |"},
          {role: "user", content: "You are an ai that makes a timetable using only the information I give you."},
          {role: "user", content: "I want to get a format table like this Entries are as follows 'Time' 'Mon' 'Tue' 'Wed' 'Thu' 'Fri'"},
          {role: "user", content: "The time is displayed in 1 hour increments from 1 to 9."},
          {role: "user", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "user", content: "| 1 | - | - | - | - | - |"},
          {role: "user", content: "| 2 | - | - | - | - | - |"},
          {role: "user", content: "| 3 | - | - | - | - | - |"},
          {role: "user", content: "| 4 | - | - | - | - | - |"},
          {role: "user", content: "| 5 | - | - | - | - | - |"},
          {role: "user", content: "| 6 | - | - | - | - | - |"},
          {role: "user", content: "| 7 | - | - | - | - | - |"},
          {role: "user", content: "| 8 | - | - | - | - | - |"},
          {role: "user", content: "| 9 | - | - | - | - | - |"},
          {role: "user", content: "I will provide you with information in this format. Group n: Subject name (class time)"},
          {role: "user", content: "When you write a timetable, you have to make one subject in each group"},
          {role: "user", content: "Group 1: A, B"},
          {role: "user", content: "Group 2: C"},
          {role: "user", content: "Number of cases that can be created"},
          {role: "user", content: "1.AC"},
          {role: "user", content: "2.BC"},
          {role: "user", content: "example 1"},
          {role: "user", content: "Group 1: Math1 (Mon 1, Mon 2, Wen 1), Math2 (Mon 3, Mon 4, Wen 1)"},
          {role: "user", content: "Group 2: Science(Fri 2)"},
          {role: "user", content: "Number of cases that can be created"},
          {role: "user", content: "1.Math1, Science"},
          {role: "user", content: "2.Math2, Science"},
          {role: "user", content: "Schedule 1"},
          {role: "user", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "user", content: "| 1 | Math1 | - | Math1 | - | - |"},
          {role: "user", content: "| 2 | Math1 | - | - | - | Science |"},
          {role: "user", content: "| 3 | - | - | - | - | - |"},
          {role: "user", content: "| 4 | - | - | - | - | - |"},
          {role: "user", content: "| 5 | - | - | - | - | - |"},
          {role: "user", content: "| 6 | - | - | - | - | - |"},
          {role: "user", content: "| 7 | - | - | - | - | - |"},
          {role: "user", content: "| 8 | - | - | - | - | - |"},
          {role: "user", content: "| 9 | - | - | - | - | - |"},
          {role: "user", content: "Schedule 2"},
          {role: "user", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "user", content: "| 1 | - | - | Math2  | - | - |"},
          {role: "user", content: "| 2 | - | - | - | - | Science  |"},
          {role: "user", content: "| 3 | Math2  | - | - | - | - |"},
          {role: "user", content: "| 4 | Math2  | - | - | - | - |"},
          {role: "user", content: "| 5 | - | - | - | - | - |"},
          {role: "user", content: "| 6 | - | - | - | - | - |"},
          {role: "user", content: "| 7 | - | - | - | - | - |"},
          {role: "user", content: "| 8 | - | - | - | - | - |"},
          {role: "user", content: "| 9 | - | - | - | - | - |"},
          {role: "user", content: "example 2"},
          {role: "user", content: "Group 1: Math1 (Mon 1, Mon 2, Wen 1), Math2 (Mon 3, Mon 4, Wen 1)"},
          {role: "user", content: "Group 2: Science(Fri 2)"},
          {role: "user", content: "Group 3: Group 3: computer(Tue 2)"},
          {role: "user", content: "Number of cases that can be created"},
          {role: "user", content: "1.Math1, Science, computer"},
          {role: "user", content: "2.Math2, Science, computer"},
          {role: "user", content: "Schedule 1"},
          {role: "user", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "user", content: "| 1 | Math1 | - | Math1 | - | - |"},
          {role: "user", content: "| 2 | Math1 | computer  | - | - | Science |"},
          {role: "user", content: "| 3 | - | - | - | - | - |"},
          {role: "user", content: "| 4 | - | - | - | - | - |"},
          {role: "user", content: "| 5 | - | - | - | - | - |"},
          {role: "user", content: "| 6 | - | - | - | - | - |"},
          {role: "user", content: "| 7 | - | - | - | - | - |"},
          {role: "user", content: "| 8 | - | - | - | - | - |"},
          {role: "user", content: "| 9 | - | - | - | - | - |"},
          {role: "user", content: "Schedule 2"},
          {role: "user", content: "| Time | Mon | Tue | Wed | Thu | Fri |"},
          {role: "user", content: "| 1 | - | - | Math2  | - | - |"},
          {role: "user", content: "| 2 | - | computer  | - | - | Science  |"},
          {role: "user", content: "| 3 | Math2  | - | - | - | - |"},
          {role: "user", content: "| 4 | Math2  | - | - | - | - |"},
          {role: "user", content: "| 5 | - | - | - | - | - |"},
          {role: "user", content: "| 6 | - | - | - | - | - |"},
          {role: "user", content: "| 7 | - | - | - | - | - |"},
          {role: "user", content: "| 8 | - | - | - | - | - |"},
          {role: "user", content: "| 9 | - | - | - | - | - |"},
          {role: "assistant", content:"Sure! I can help you create a timetable based on the information you provided. Please provide the subject names and their corresponding class times for each group."},
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
          timetable=markdownToHtml(timetable);
          //console.log(timetable);
          res.json({"assistant": timetable});
          //res.send({timetable});
});

module.exports.handler=serverless(app);
//app.listen(3000)

function markdownToHtml(input) 
{
    // split the input into lines
    let lines = input.trim().split("\n");

    // start creating the htmlTable string
    let htmlTable = "<table>\n";

    for (let line of lines) {
        // Skip the line if it's just dashes
        if (line.startsWith('|-----')) continue;

        // Remove extra '|' at the start and end of the line
        line = line.replace(/^\|/, "").replace(/\|$/, "");

        // split the line into cells
        let cells = line.split("|");

        // create an htmlRow string, and figure out if it's a header or a regular row
        let htmlRow = "  <tr>\n";
        let rowType = line.includes('Time') ? 'th' : 'td';

        for (let cell of cells) {
            cell = cell.trim();  // remove any leading/trailing whitespace
            htmlRow += `    <${rowType}>${cell}</${rowType}>\n`;  // add each cell to the htmlRow string
        }

        htmlRow += "  </tr>\n";
        htmlTable += htmlRow;  // add the row to the table
    }

    htmlTable += "</table>";

    return htmlTable;
}



