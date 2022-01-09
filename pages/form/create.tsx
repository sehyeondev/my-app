import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import styles from '../../styles/Home.module.css'
import Question from '../../src/components/question'
import { QuestionInterface } from '../../src/interfaces/question'

export default function Create() {
  const [questions, setQuestions] = useState<Array<QuestionInterface>>([])
  const [formTitle, setFormTitle] = useState<string>("Untitled form")
  const [formDesc, setFormDesc] = useState("")

  const addQuestion = () => {
    const cp = [...questions]
    cp.push({
      uuid: uuidv4(),
      qType: "checkbox",
      title: "",
      desc: "",
      text: "",
      selectOptions: [
        {
          uuid: uuidv4(),
          title: "",
          desc: ""
        }
      ]
    })
    setQuestions(cp)
  }

  const deleteQuestion = (key) => {
    const cp = [...questions]
    const index = cp.findIndex(ele => ele.uuid === key)
    cp.splice(index, 1)
    setQuestions(cp)
  }

  const updateQuestion = (key, value, uuid) => {
    const cp = [...questions]
    const targetQuestion = cp.find(ele => ele.uuid === uuid)
    switch(key){
      case "qType":
        targetQuestion.qType=value;
        break;
      case "title":
        targetQuestion.title=value;
        break;
      case "desc":
        targetQuestion.desc=value;
        break;
      case "text" :
          targetQuestion.text=value;
          break;
    }
    setQuestions(cp)
  }

  const addSelectOption = (key) => {
    const cp = [...questions]
    const index = cp.findIndex(ele => ele.uuid === key)
    const question = cp[index]
    question.selectOptions.push({
      uuid: uuidv4(),
      title: "",
      desc: "",
    })
    setQuestions(cp)
  }

  const deleteSelectOption = (key, okey) => {
    const cp=[...questions]
    const index = cp.findIndex(ele => ele.uuid === key)
    const oindex = cp[index].selectOptions.findIndex(ele => ele.uuid === okey)
    cp[index].selectOptions.splice(oindex, 1)
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

  // outer format of creat page
  return (
    <div className={styles.page}>
      <div className={styles.formTitle}> {formTitle} </div>

      <div className={styles.info}>
        <div className={styles.solidBar}></div>
        <input className={styles.title} placeholder='Form title' value={formTitle} onChange={e => setFormTitle(e.target.value)}/>
        <input className={styles.desc} placeholder='Form description' value={formDesc} onChange={e => setFormDesc(e.target.value)}/>
      </div>

      {
        questions.map((question, index) => {
          return <Question key={question.uuid}
            question={question}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
            addSelectOption={addSelectOption}
            updateOptionTitle={updateOptionTitle}
            updateOptionDesc={updateOptionDesc}
            deleteSelectOption={deleteSelectOption}
            />
        })
      }
      <br/>

      <button className={styles.addBtn} onClick= {e => addQuestion()}>+</button>
    </div>
  )
}