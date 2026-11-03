export const subjects = {
  'Science & nature': { subject:'Science', color:'peach', resources:['Backyard ecosystem journal','Mystery Science: habitats'], projects:['Build a mini ecosystem','Track the weather for seven days'] },
  Technology: { subject:'Technology', color:'blue', resources:['Scratch beginner studio','Code.org: Course D'], projects:['Make a quiz in Scratch','Design a helpful app'] },
  'Arts & design': { subject:'Creative studio', color:'purple', resources:['The Artful Parent prompts','Canva Design School'], projects:['Create a visual story','Design a tiny exhibition'] },
  'Business & money': { subject:'Money skills', color:'yellow', resources:['Biz Kid$ activities','Junior Achievement lessons'], projects:['Plan a pop-up shop','Make a simple budget'] },
  'Writing & stories': { subject:'Writing workshop', color:'pink', resources:['NaNoWriMo Young Writers','Storybird prompts'], projects:['Write a mystery scene','Make a family zine'] },
  'People & society': { subject:'Social studies', color:'green', resources:['iCivics games','Local history archive'], projects:['Map your neighborhood','Interview a community helper'] }
};
export const assessment = {
  foundations:[
    {id:'math1', subject:'Math foundations', prompt:'A garden has 4 rows with 6 plants in each row. How many plants are there?', options:['10','20','24','30'], answer:'24'},
    {id:'read1', subject:'Reading', prompt:'Which sentence is the strongest opening for an adventure story?', options:['I woke up.','The map began to glow at midnight.','It was a day.','I like stories.'], answer:'The map began to glow at midnight.'}
  ],
  'Science & nature':[{id:'sci1',subject:'Science',prompt:'What does a plant need to make its own food?',options:['Moonlight','Sunlight','Plastic','Music'],answer:'Sunlight'}],
  Technology:[{id:'tech1',subject:'Technology',prompt:'Which skill helps you give a robot a list of instructions?',options:['Coding','Painting','Gardening','Singing'],answer:'Coding'}],
  'Arts & design':[{id:'art1',subject:'Creative thinking',prompt:'Before drawing a poster, what is most useful to decide?',options:['Your message and audience','The price of paper','Your bedtime','Nothing'],answer:'Your message and audience'}],
  'Business & money':[{id:'money1',subject:'Money skills',prompt:'You have $10 and spend $4. How much is left?',options:['$4','$6','$10','$14'],answer:'$6'}],
  'Writing & stories':[{id:'write1',subject:'Writing',prompt:'Which detail best helps a reader picture a character?',options:['They were nice.','Their boots squelched in the rain.','They did things.','It happened.'],answer:'Their boots squelched in the rain.'}],
  'People & society':[{id:'soc1',subject:'Social studies',prompt:'Your neighborhood needs a safer crossing. Who can help make a change?',options:['A local council','A fictional dragon','Nobody','Only one child'],answer:'A local council'}]
};
export function makeQuestions(interests){ return [...assessment.foundations, ...interests.map(x=>assessment[x]?.[0]).filter(Boolean)].slice(0,6) }
export function makePlan(profile, answers){
 const questions=makeQuestions(profile.interests||[]); const correct=questions.filter(q=>answers[q.id]===q.answer).length; const ratio=questions.length?correct/questions.length:0;
 const level=ratio>=.8?'Ready to stretch':ratio>=.45?'Comfortable starting point':'Foundation builder';
 const pace=profile.goal==='Catch up on foundations'?'4 focused sessions':'3 focused sessions + 1 project';
 const picks=(profile.interests||[]).slice(0,3).map((x,i)=>({id:x, ...subjects[x], duration:i===0?'35 min':'30 min', title:subjects[x].projects[0]}));
 return {level, pace, score:correct, total:questions.length, picks, nextStep: ratio<.45?'Begin with short confidence-building lessons and revisit skills weekly.':'Start with choice-rich projects, then increase challenge as confidence grows.'}
}
