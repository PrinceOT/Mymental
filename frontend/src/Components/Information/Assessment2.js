import React from 'react';
import  { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {postUserData} from '../../Dbqueries/qtracker';

import { useAuth ,AuthProvider } from '../../Auth/AuthProvider';
//import {options , questions} from './questions';
import './Assessment.scss';



const desc = [{ topic: 'Mild', desc: ' Mild \n The scores you have given suggest are unlikely to be suffering with this diagnosis and report many of the common symptoms.', value:3},{ topic: 'Moderate', desc: 'Moderate \n The scores you have given suggest are likely to be suffering with this diagnosis and report many of the common symptoms.',value:8},{ topic: 'Severe', desc: 'Severe \n The scores you have given suggest are very likely to be suffering with this diagnosis and report many of the common symptoms.',value:15 },]
const options = [{ choice: 'Not at all', value: 0},{ choice: 'Several days', value: 1},{ choice: 'More than half the days', value: 2 },{ choice: 'Nearly every day', value: 3 },]
const questions = [
  {
    topic:'Anxiety',
    question: 'Feeling nervous, anxious, or on edge?',
    answers: options,
  },
  {
    topic:'Depression',
    question: "Feeling bad about yourself – or that you are a failure or have let yourself or your family down",
    answers: options,
  },
  {
    topic:'Ptsd',
    question: 'Repeated, disturbing, and unwanted memories of the stressful experience?',
    answers: options,
  },
  {
    topic:'Stress',
    question: 'How often have you felt confident about your ability to handle your personal problems?',
    answers: options,
  },
  {
    topic:'Anxiety',
    question: 'Not being able to stop or control worrying?',
    answers: options,
  },
  {
    topic:'Depression',
    question: "Little interest or pleasure in doing things. ",
    answers: options,
  },
  {
    topic:'Ptsd',
    question: 'Feeling jumpy or easily startled?',
    answers: options,
  },
  {
    topic:'Stress',
    question: 'How often have you felt nervous and stressed?',
    answers: options,
  },
  {
    topic:'Anxiety',
    question: 'Becoming easily annoyed or irritable?',
    answers: options,
  },
  {
    topic:'Depression',
    question: "Thoughts that you would be better off dead, or of hurting yourself in some way?",
    answers: options,
  },
  {
    topic:'Ptsd',
    question: 'Irritable behavior, angry outbursts, or acting aggressively?',
    answers: options,

  },
  {
    topic:'Stress',
    question: 'how often have you felt difficulties were piling up so high that you could not overcome them?',
    answers: options,
    
  },
  {
    topic:'Anxiety',
    question: 'Being so restless that it’s hard to sit still?',
    answers: options,
  },
  {
    topic:'Depression',
    question: "Feeling down, depressed, or hopeless?",
    answers: options,
  },
  {
    topic:'Ptsd',
    question: 'Repeated, disturbing dreams of the stressful experience?',
    answers: options,

  },
  {
    topic:'Stress',
    question: 'how often have you found that you could not cope with all the things that you had to do?',
    answers: options,
    
  },
  {
    topic:'Anxiety',
    question: 'Not being able to stop or control worrying?',
    answers: options,
  },
  {
    topic:'Depression',
    question: "Poor appetite or overeating.",
    answers: options,
  },
  {
    topic:'Ptsd',
    question: 'Taking too many risks or doing things that could cause you harm?',
    answers: options,

  },
  {
    topic:'Stress',
    question: 'how often have you been upset because of something that happened unexpectedly?',
    answers: options,
    
  },
  
]; 


const Selfform = () => {
  const { user} = useAuth();
  const navigate = useNavigate();
  

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({
    Total:0,
    Depression: 0,
    Anxiety : 0,
    Ptsd : 0,
    Stress : 0,
    })
    const [max, setMax] = useState({
      Depression: 0,
      Anxiety : 0,
      Ptsd : 0,
      Stress : 0,
      })
      const [percent,setPercent] = useState({
        Depression: 0,
        Anxiety : 0,
        Ptsd : 0,
        Stress : 0,
        })
      // const [descr,setDescr] = useState({
      //   Depression: '',
      //   Anxiety : '',
      //   Ptsd : '',
      //   Stress : '',
      //   })
        const [depressDesc, setdepressDesc] = useState('');
        const [anxietyDesc, setanxietyDesc] = useState('');
        const [ptsdDesc, setptsdDesc] = useState('');
        const [stressDesc, setstressDesc] = useState('');
 
  const [showResult,setShowResult] = useState(false)
  const [selectedTopic,setSelectedTopic] = useState('')
  const maxi = 3;
  var viewgame = false;

  useEffect(() =>{
   if(showResult){
    
    setPercent({
      Depression: (score.Depression / max.Depression) * 100,
      Anxiety : (score.Anxiety / max.Anxiety) * 100,
      Ptsd : (score.Ptsd / max.Ptsd) * 100,
      Stress : (score.Stress / max.Stress) * 100,   })
     if(user){
  const response =  postUserData(score,user);
    }

  
    console.log(score.Stress)
   }
  },[showResult]);

 

  const onAnswerSelected = async (topic ,answer, index) => {

    try {
    
     setSelectedTopic(topic);
     //console.log()
     console.log(selectedTopic);
     switch(topic){
      case 'Depression':
        setScore({ ...score,
          Total:score.Total + answer,
          Depression: score.Depression + answer,});
          
          setMax({...max,
          Depression: max.Depression + maxi});
          break;

      case 'Anxiety':
        setScore({ ...score,
          Total:score.Total + answer,
          Anxiety: score.Anxiety + answer,});

          setMax({...max,
            Anxiety: max.Anxiety + maxi});
            break;

      case 'Ptsd':
        setScore((prev) => ({ ...prev,
          Total:prev.Total + answer,
          Ptsd: prev.Ptsd + answer,}));
          
          setMax({...max,
            Ptsd: max.Ptsd + maxi});
            break;

      case 'Stress':
        setScore((prev) => ({ ...prev,
          Total:prev.Total + answer,
          Stress: prev.Stress + answer,}));
          
          setMax({...max,
            Stress: max.Stress + maxi});
            break;

      default:
        console.error('Error in topics');
        break;
    }
 
    
    if (currentQuestion !== questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        setCurrentQuestion(0)
        const array = ['Depression','Ptsd','Anxiety','Stress']

        array.map((topic)=>{ 
          var description = '';
         // console.log(topic === 'Depression')
         // console.log(desc[0].value >= score[topic])
          //console.log(desc[1].value >= score[topic] > desc[0].value)
          //console.log(desc[2].value >= score[topic])
          3 >= score[topic] ? description = desc[0].desc : 8 >= score[topic]  ?  description = desc[1].desc :  description = desc[2].desc ;
          (topic === 'Depression') ? setdepressDesc(description) : (topic === 'Ptsd') ? setptsdDesc(description) : (topic === 'Stress') ? setstressDesc(description) : setanxietyDesc(description)
      })
       
       
        
        setShowResult(true);
        
      
        
      
      }
      }catch (error) {
        console.error(error);
      
    }

 


  }
  function redirect(){
    console.log('hello');
    navigate('/gameview', { state: { src: score}});

  }


  return (
    <div class="div">
      <head>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
      <style>
          h1 width:score.Depression;
          </style>

      </head>
      < >
    
        {!showResult ? (
    <div><div className='quiz-container'>
       <span className="active-question-no">{(currentQuestion + 1)}</span>
            <span className="total-question">/{(questions.length)}</span>
      <h2>{questions[currentQuestion].question}</h2>
     
           

     

      <div className='answers'>
        {questions[currentQuestion].answers.map((answer, index) => (
          <button 
          key={index} 
          onClick={() => onAnswerSelected(questions[currentQuestion].topic,answer.value,index)} 
          className='choicebtn'>
            {answer.choice}
          </button>
        ))}
      </div>

       </div>
        
     <div className='quiz-container'> 
     <h3>Over the last two weeks, how often have you
been bothered by the following problems? </h3>


     <p>This test will help identify if you might be suffering from either depression, anxiety, ptsd or stress;</p> 
     <h2>These series of questions is an indicator only and not meant to replace a full assessment by a qualified clinician.</h2>
     <p>if you have concerns about your mental health or well-being, it is crucial to seek advice from a qualified mental health professional. They can offer personalized guidance based on a thorough assessment of your individual circumstances.
</p>
     <p>The results obtained from this assessment are intended to offer general insights and may not accurately reflect an individual's specific mental health condition.
</p>


    </div>
        
      
    </div>
    
        ):(
         
            <div className="result"> <div className='quiz-container'>
          <h3>Result</h3>
         
         {/* <div className='bars'>
          <p>
          Depression: <progress className="lifebar" id='d' value={score.Depression} max={max.Depression} ></progress> <br></br>
          </p>
          <p>
          Anxiety: <progress className="lifebar" id='a' value={score.Anxiety} max={max.Anxiety} ></progress><br></br>
          </p>
          <p>
          Ptsd:  <progress className="lifebar" id='p' value={score.Ptsd} max={max.Ptsd} ></progress><br></br>
          </p>
          <p>
          Stress:  <progress className="lifebar" id='s' value={score.Stress} max={max.Stress} ></progress>
         </p>
         </div> */}
         <p>Depression:</p>

<div class="w3-light-grey w3-round-xlarge">
  <div id="myBar" class="w3-container w3-orange w3-round-xlarge" style={{height:24,width:percent.Depression + "%"}}> </div>
  </div>
   <p>Anxiety:</p>
<div class="w3-light-grey w3-round-xlarge">
  <div id="myBar" class="w3-container w3-blue w3-round-xlarge" style={{height:24,width:percent.Anxiety + "%"}}></div>
  </div>
   <p>Stress:</p>
<div class="w3-light-grey w3-round-xlarge">
  <div id="myBar" class="w3-container w3-green w3-round-xlarge" style={{height:24,width:percent.Stress + "%"}}></div>
  </div>
   <p>Ptsd:</p>
<div class="w3-light-grey w3-round-xlarge">
  <div id="myBar" class="w3-container w3-red w3-round-xlarge" style={{height:24,width:percent.Ptsd + "%"}}></div>
  </div>
         <div className='ranges'>
         <ul>
           <li style={{width: "26.66667%"}}> 
           Mild <br></br>
           (0 - 3)        
           </li> 
           <li style={{width: "33%"}}> 
           Moderate <br></br>
           (4 - 8)       
            </li> 
            <li style={{width: "40%"}}> 
            Severe <br></br>
            (9 - 15)        
            </li> </ul>
            </div>
            <a class="a" onClick={()=>redirect()} >View Games</a>
            
            </div>
            <div className='quiz-container'>
            <div className='info'>
            <h3>What next ?</h3>
<p>I know you might have a lot of questions but lets take this step by step.</p>
<dl>
  <dt><h4>What do these results mean?</h4></dt>
  <dd><dl>
  <dt><h2>Depression</h2></dt>
  <dd><p>{depressDesc}</p></dd>
  <dt><h2>Anxiety </h2></dt>
  <dd><p>{anxietyDesc}</p></dd>
  <dt><h2>Stress</h2></dt>
  <dd><p>{stressDesc}</p></dd>
  <dt><h2>Ptsd</h2></dt>
  <dd><p>{ptsdDesc}</p></dd>
</dl></dd>
  <dt><h4>What should I do with these results?</h4></dt>
  <dd><p>This is absolutly up to you.As this is not a diagnosis performed by a professional. It would be recomened to get a profesional opinion to understand your specifc symptoms better. But till then , see the games that we tailored picked for you. </p></dd>
  <dt><h4>If I'm ready to seek help ,what should I do</h4></dt>
  <dd><p>The first step is to speak to a trained professional. Depending on the severity of your symptoms, we may recommend a psychiatric assessment which involves discussing your thoughts, feelings and behaviour to help identify a diagnosis and check for related complications. Said doctor might provide you with a personalised treatment plan that will usually involve talking therapy and may include medication.But if you want to take the first step <a href='/mymental/getsupport'>Check out some here</a></p></dd>
</dl>





        
        </div>
        </div>
        </div>

        )}
   
    </>
    </div>
  );
};

export default Selfform;
