import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

export default function Create() {
  const [questions, setQuestions] = useState([])

  class SelectOption {
    constructor() {
      this.uuid = uuidv4();
      this.title = "default option title";
      this.desc = "default option description"
    }
  }

  class Question {
    constructor(qType) {
      this.uuid = uuidv4();
      this.qType = qType;
      this.title = "default title";
      this.desc = "default description";
      this.selectOptions = [
        new SelectOption()
      ];
      this.text = "default text"
      this.longText = "default long text"
    }
  }

  const addQuestion = () => {
    const cp = [...questions]
    cp.push(new Question("checkbox"))
    setQuestions(cp)
  }

  const deleteQuestion = (key) => {
    const cp = [...questions]
    const index = cp.findIndex(ele => ele.uuid === key)
    cp.splice(index, 1)
    setQuestions(cp)
  }

  const addSelectOption = (key) => {
    const cp = [...questions]
    const index = cp.findIndex(ele => ele.uuid === key)
    const question = cp[index]
    question.selectOptions.push(new SelectOption)
    setQuestions(cp)
  }

  const updateOptionTitle = (title, key, okey) => {
    const cp = [...questions]
    const index = cp.findIndex(ele => ele.uuid === key)
    const oindex = cp[index].selectOptions.findIndex(ele => ele.uuid === okey)
    cp[index].selectOptions[oindex].title = title
    setQuestions(cp)
  }

  const updateOptionDesc = (desc, key, okey) => {
    const cp = [...questions]
    const index = cp.findIndex(ele => ele.uuid === key)
    const oindex = cp[index].selectOptions.findIndex(ele => ele.uuid === okey)
    cp[index].selectOptions[oindex].desc = desc
    setQuestions(cp)
  }

  const deleteSelectOption = (key, okey) => {
    const cp=[...questions]
    const index = cp.findIndex(ele => ele.uuid === key)
    const oindex = cp[index].selectOptions.findIndex(ele => ele.uuid === okey)
    cp[index].selectOptions.splice(oindex, 1)
    setQuestions(cp)
  }

  const updateQType = (qType, key) => {
    const cp = [...questions]
    cp.find(ele => ele.uuid === key).qType = qType
    setQuestions(cp)
  }

  const updateQTitle = (title, key) => {
    const cp = [...questions]
    cp.find(ele => ele.uuid === key).title = title
    setQuestions(cp)
  }

  const updateQDesc = (desc, key) => {
    const cp = [...questions]
    cp.find(ele => ele.uuid === key).desc = desc
    setQuestions(cp)
  }

  const updateText = (text, key) => {
    const cp = [...questions]
    cp.find(ele => ele.uuid === key).text = text
    setQuestions(cp)
  }

  const updateLongText = (longText, key) => {
    const cp = [...questions]
    cp.find(ele => ele.uuid === key).longText = longText
    setQuestions(cp)
  }

  // outer format of creat page
  return (
    <div>
      <div>
      <div> Let's create forms! </div>

      {
        questions.map((question, index) => {
          return <QuestionBox key={question.uuid}
            question={question}
            index={index}
            updateQType={updateQType}
            updateQTitle={updateQTitle}
            updateQDesc={updateQDesc}
            deleteQuestion={deleteQuestion}
            addSelectOption={addSelectOption}
            updateOptionTitle={updateOptionTitle}
            updateOptionDesc={updateOptionDesc}
            deletSelectOption={deleteSelectOption}
            updateText={updateText}
            updateLongText={updateLongText}
            />
        })
      }
      <br/>

      <button onClick= {e => addQuestion()}>add</button>
      </div>
    </div>
  )
}

// component: questionBox
const QuestionBox = ({
  question, 
  updateQType, 
  updateQTitle, 
  updateQDesc, 
  deleteQuestion, 
  addSelectOption, 
  updateOptionTitle,
  updateOptionDesc, 
  deletSelectOption,
  updateText,
  updateLongText}) => {
  return <div>
    {/* common area for all qTypes */}
    <br/> 
    <div>{question.qType} - {question.title} - {question.desc}</div>
    <select value={question.qType} onChange={e => updateQType(e.target.value, question.uuid)}>
      <option value="checkbox">checkbox</option>
      <option value="radio">radio</option>
      <option value="text">text</option>
      <option value="longText">long text</option>
    </select>

    <input placeholder='title' value={question.title} onChange={e => updateQTitle(e.target.value, question.uuid)}/>
    <input placeholder='description' value={question.desc} onChange={e => updateQDesc(e.target.value, question.uuid)}/>
    <button onClick={e => deleteQuestion(question.uuid)}>delete</button>
    <br/>

    {/* qType: checkbox */}
    {
      (question.qType === "checkbox") &&
      question.selectOptions.map((option, index) => {
        return <div key={option.uuid}>
          <br/>
          <div> {option.title} - {option.desc} </div>
          <input type="checkbox" id={option.uuid} value={option.title} name = "option"/>
          <label for={option.uuid}>{option.title}</label>
          <br/>
          <input placeholder='option title' value={option.title} onChange={e => updateOptionTitle(e.target.value, question.uuid, option.uuid)}/>
          <input placeholder='option description' value={option.desc} onChange={e => updateOptionDesc(e.target.value, question.uuid, option.uuid)}/>
          <button onClick={e => deletSelectOption(question.uuid, option.uuid)}>delete option</button>
        </div>
      })
    }

    {/* qType: radio */}
    {
      (question.qType === "radio") &&
      question.selectOptions.map((option, index) => {
        return <div key={option.uuid}>
          <br/>
          <div> {option.title} - {option.desc} </div>
          <input type="radio" id={option.uuid} value={option.title} name = "option"/>
          <label for={option.uuid}>{option.title}</label>
          <br/>
          <input placeholder='option title' value={option.title} onChange={e => updateOptionTitle(e.target.value, question.uuid, option.uuid)}/>
          <input placeholder='option description' value={option.desc} onChange={e => updateOptionDesc(e.target.value, question.uuid, option.uuid)}/>
          <button onClick={e => deletSelectOption(question.uuid, option.uuid)}>delete option</button>
        </div>
      })
    }

    {/* qType: text */}
    {
      (question.qType === "text") &&
      <div>
          <div> {question.text} </div>
          <input placeholder='text' value={question.text} onChange={e => updateText(e.target.value, question.uuid)}/>
      </div>
    }
    
    {/* qType: longText */}
    {
      (question.qType === "longText") &&
      <div>
          <div> {question.longText} </div>
          <textarea placeholder='text' value={question.longText} onChange={e => updateLongText(e.target.value, question.uuid)}/>
      </div>
    }
    <button onClick={e => addSelectOption(question.uuid)}>add option</button>
    <br/>
  </div>
}
