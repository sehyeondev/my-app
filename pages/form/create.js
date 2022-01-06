import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import styles from '../../styles/Home.module.css'

export default function Create() {
  const [questions, setQuestions] = useState([])
  const [title, setTitle] = useState("Untitled form")
  const [desc, setDesc] = useState("")

  class SelectOption {
    constructor() {
      this.uuid = uuidv4();
      this.title = "";
      this.desc = ""
    }
  }

  class Question {
    constructor(qType) {
      this.uuid = uuidv4();
      this.qType = qType;
      this.title = "";
      this.desc = "";
      this.selectOptions = [
        new SelectOption()
      ];
      this.text = ""
      // this.longText = "default long text"
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

  // outer format of creat page
  return (
    // <html style={{backgroundColor: "purple", height: "100vh"}}>
    <div className={styles.page}>
      <div className={styles.formTitle}> {title} </div>

      <div className={styles.info}>
        <div className={styles.solidBar}></div>
        <input className={styles.title} placeholder='Form title' value={title} onChange={e => setTitle(e.target.value)}/>
        <input className={styles.desc} placeholder='Form description' value={desc} onChange={e => setDesc(e.target.value)}/>
      </div>

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
            deleteSelectOption={deleteSelectOption}
            updateText={updateText}
            />
        })
      }
      <br/>

      <button className={styles.addBtn} onClick= {e => addQuestion()}>add</button>
    </div>
    // </html>
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
  deleteSelectOption,
  updateText}) => {
  return <div className={styles.question}>
    {/* common area for all qTypes */}
    {/* <div>{question.qType} - {question.title} - {question.desc}</div> */}
    <div>
    <input className={styles.title} placeholder='Question Title' value={question.title} onChange={e => updateQTitle(e.target.value, question.uuid)}/>
    <select className={styles.select} value={question.qType} onChange={e => updateQType(e.target.value, question.uuid)}>
      <option value="checkbox">checkbox</option>
      <option value="radio">radio</option>
      <option value="text">text</option>
      <option value="longText">long text</option>
    </select>
    <button className={styles.delete} onClick={e => deleteQuestion(question.uuid)}>delete</button>
    </div>
    {/* <input placeholder='Question Description' value={question.desc} onChange={e => updateQDesc(e.target.value, question.uuid)}/> */}
    

    {/* qType: checkbox or radio*/}
    {
      ((question.qType === "checkbox") || (question.qType === "radio"))  &&
      <div className={styles.optionContainer}>
        {question.selectOptions.map((option, index) => {
          return (
            <Option qType={question.qType} uuid={option.uuid} title={option.title} desc={option.desc} question={question} 
                            updateOptionDesc={updateOptionDesc} updateOptionTitle={updateOptionTitle} deleteSelectOption={deleteSelectOption} />
          )
        })}
        <button className={styles.addOption} onClick={e => addSelectOption(question.uuid)}>add option</button>
      </div>
    }

    {/* qType: text or longText*/}
    {
      ((question.qType === "text") || (question.qType === "longText")) &&
      <Text question={question} updateText={updateText} />
    }
    
    
  </div>
}

function Option(props){
  return (
    <div className={styles.option}>
      <input className={styles.optionBtn} type={props.qType} name = "option"/>
      <input className={styles.optionTitle} placeholder='Option Title' value={props.title} onChange={e => props.updateOptionTitle(e.target.value, props.question.uuid, props.uuid)}/>
      {/* <input className={styles.desc} placeholder='Option Description' value={props.desc} onChange={e => props.updateOptionDesc(e.target.value, props.question.uuid, props.uuid)}/> */}
      <button className={styles.optionDelete} onClick={e => props.deleteSelectOption(props.question.uuid, props.uuid)}>X</button>
    </div>
  )
}

function Text(props){
  return (
    <div>
      <textarea placeholder={props.question.qType} value={props.question.text} onChange={e => props.updateText(e.target.value, props.question.uuid)}/>
    </div>
  )
}